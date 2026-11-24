/**
 * @license
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { FourCirclesCalculations } from '../../types/geometry.ts';
import {
  AxisScaleMode,
  CIRCLE_SERIES_META,
  CircleKey,
  LinearMeasureKind,
  REFERENCE_T_VALUES,
  SpectralGraphMode,
  computeFourCirclesSpectralAnalysis,
  evaluateParametricFourCircles,
  getNormalizedValuesForMode,
  sampleSpectralCurves,
} from '../../math/FourCirclesSpectralAnalysis.ts';
import { MathFormula } from '../common/MathFormula.tsx';
import { Translations, TRANSLATIONS } from '../../i18n/translations.ts';
import {
  Activity,
  ChevronDown,
  ChevronUp,
  Layers,
  Pause,
  PieChart,
  Play,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

interface SpectralAnalysisPanelProps {
  calc: FourCirclesCalculations;
  onChangeT: (targetT: number, recordHistory?: boolean) => void;
  t?: Translations;
}

const SERIES_ORDER: CircleKey[] = ['Ka', 'Kb', 'Kc', 'Ki'];

const PLOT = {
  width: 640,
  height: 300,
  left: 50,
  right: 20,
  top: 22,
  bottom: 38,
};

const PLOT_W = PLOT.width - PLOT.left - PLOT.right;
const PLOT_H = PLOT.height - PLOT.top - PLOT.bottom;
const Y_MIN = 0;
const Y_MAX = 1.06;

function formatTLabel(val: number): string {
  if (Math.abs(val - 1) < 1e-6) return '1';
  if (val >= 10) return val.toFixed(0);
  if (val >= 1) return Number(val.toFixed(2)).toString();
  if (val >= 0.1) return Number(val.toFixed(2)).toString();
  return Number(val.toFixed(3)).toString();
}

export const SpectralAnalysisPanel: React.FC<SpectralAnalysisPanelProps> = ({
  calc,
  onChangeT,
  t = TRANSLATIONS.ru,
}) => {
  const [graphMode, setGraphMode] = useState<SpectralGraphMode>('areas');
  const [linearKind, setLinearKind] = useState<LinearMeasureKind>('radius');
  const [scaleMode, setScaleMode] = useState<AxisScaleMode>('log');
  const [tMin, setTMin] = useState<number>(0.1);
  const [tMax, setTMax] = useState<number>(10);
  const [showShareBars, setShowShareBars] = useState<boolean>(false);
  const [isSweepingSymmetry, setIsSweepingSymmetry] = useState<boolean>(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const sweepDirRef = useRef<number>(1);
  const sweepFrameRef = useRef<number | null>(null);

  // Authoritative parameter t = b / a from unified geometry model
  const currentT = calc.triangle.b / calc.triangle.a;

  // Authoritative current-state spectral calculations
  const spectral = useMemo(() => computeFourCirclesSpectralAnalysis(calc), [calc]);

  // Parametric normalized evaluation at exact currentT (synchronizes 100% with curves)
  const currentParametric = useMemo(
    () => evaluateParametricFourCircles(currentT),
    [currentT]
  );

  const currentNormalized = useMemo(
    () => getNormalizedValuesForMode(currentParametric, graphMode, linearKind),
    [currentParametric, graphMode, linearKind]
  );

  // Sample four mathematical curves across [tMin, tMax]
  const curveSamples = useMemo(
    () =>
      sampleSpectralCurves({
        tMin,
        tMax,
        steps: 220,
        mode: graphMode,
        linearKind,
        scaleMode,
      }),
    [tMin, tMax, graphMode, linearKind, scaleMode]
  );

  // Precompute reference points for active mode
  const referenceReadouts = useMemo(
    () =>
      REFERENCE_T_VALUES.map((refT) => {
        const ratios = evaluateParametricFourCircles(refT);
        const norm = getNormalizedValuesForMode(ratios, graphMode, linearKind);
        return { t: refT, norm };
      }),
    [graphMode, linearKind]
  );

  // Smooth symmetry sweep animation across t = 1
  useEffect(() => {
    if (!isSweepingSymmetry) {
      if (sweepFrameRef.current) cancelAnimationFrame(sweepFrameRef.current);
      return;
    }

    let lastTime = performance.now();
    let logT = Math.log10(Math.max(tMin, Math.min(tMax, currentT)));
    const logMin = Math.log10(tMin);
    const logMax = Math.log10(tMax);

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const span = Math.max(0.2, logMax - logMin);
      logT += sweepDirRef.current * dt * span * 0.35;
      if (logT >= logMax) {
        logT = logMax;
        sweepDirRef.current = -1;
      } else if (logT <= logMin) {
        logT = logMin;
        sweepDirRef.current = 1;
      }

      onChangeT(Math.pow(10, logT), false);
      sweepFrameRef.current = requestAnimationFrame(step);
    };

    sweepFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (sweepFrameRef.current) cancelAnimationFrame(sweepFrameRef.current);
    };
  }, [isSweepingSymmetry, tMin, tMax, onChangeT]);

  // Coordinate mapping helpers
  const xToPx = useCallback(
    (tVal: number): number => {
      if (scaleMode === 'log') {
        const lMin = Math.log10(tMin);
        const lMax = Math.log10(tMax);
        const lVal = Math.log10(Math.max(1e-9, tVal));
        return PLOT.left + ((lVal - lMin) / (lMax - lMin)) * PLOT_W;
      }
      return PLOT.left + ((tVal - tMin) / (tMax - tMin)) * PLOT_W;
    },
    [scaleMode, tMin, tMax]
  );

  const pxToT = useCallback(
    (svgX: number): number => {
      const clampedX = Math.max(PLOT.left, Math.min(PLOT.left + PLOT_W, svgX));
      const u = (clampedX - PLOT.left) / PLOT_W;
      if (scaleMode === 'log') {
        const lMin = Math.log10(tMin);
        const lMax = Math.log10(tMax);
        return Math.pow(10, lMin + u * (lMax - lMin));
      }
      return tMin + u * (tMax - tMin);
    },
    [scaleMode, tMin, tMax]
  );

  const yToPx = useCallback((yVal: number): number => {
    const ratio = (yVal - Y_MIN) / (Y_MAX - Y_MIN);
    return PLOT.top + PLOT_H - ratio * PLOT_H;
  }, []);

  // Build SVG path string for a given circle key
  const buildCurvePath = useCallback(
    (key: CircleKey): string => {
      if (curveSamples.length === 0) return '';
      return curveSamples
        .map((pt, idx) => {
          const px = xToPx(pt.t);
          const py = yToPx(pt[key]);
          return `${idx === 0 ? 'M' : 'L'}${px.toFixed(2)},${py.toFixed(2)}`;
        })
        .join(' ');
    },
    [curveSamples, xToPx, yToPx]
  );

  // Pointer scrubbing handlers directly on the SVG graph
  const updateTFromPointerEvent = useCallback(
    (e: React.PointerEvent<SVGSVGElement>, recordHistory: boolean) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      if (rect.width <= 0) return;
      const svgX = ((e.clientX - rect.left) / rect.width) * PLOT.width;
      const nextT = pxToT(svgX);
      onChangeT(nextT, recordHistory);
    },
    [pxToT, onChangeT]
  );

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    setIsSweepingSymmetry(false);
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateTFromPointerEvent(e, false);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current) return;
    updateTFromPointerEvent(e, false);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }
    updateTFromPointerEvent(e, true);
  };

  // Zoom & Reset helpers
  const handleZoomIn = () => {
    const centerT = currentT >= tMin && currentT <= tMax ? currentT : Math.sqrt(tMin * tMax);
    if (scaleMode === 'log') {
      const lCenter = Math.log10(centerT);
      const halfSpan = Math.max(0.15, (Math.log10(tMax) - Math.log10(tMin)) * 0.35);
      setTMin(Math.max(0.02, Math.pow(10, lCenter - halfSpan)));
      setTMax(Math.min(50, Math.pow(10, lCenter + halfSpan)));
    } else {
      const span = Math.max(0.4, (tMax - tMin) * 0.65);
      const nextMin = Math.max(0.02, centerT - span / 2);
      const nextMax = Math.min(50, nextMin + span);
      setTMin(nextMin);
      setTMax(nextMax);
    }
  };

  const handleZoomOut = () => {
    const centerT = currentT >= tMin && currentT <= tMax ? currentT : Math.sqrt(tMin * tMax);
    if (scaleMode === 'log') {
      const lCenter = Math.log10(centerT);
      const halfSpan = Math.min(1.6, (Math.log10(tMax) - Math.log10(tMin)) * 0.72);
      setTMin(Math.max(0.02, Math.pow(10, lCenter - halfSpan)));
      setTMax(Math.min(50, Math.pow(10, lCenter + halfSpan)));
    } else {
      const span = Math.min(40, (tMax - tMin) * 1.45);
      const nextMin = Math.max(0.02, centerT - span / 2);
      const nextMax = Math.min(50, nextMin + span);
      setTMin(nextMin);
      setTMax(nextMax);
    }
  };

  const handleResetRange = () => {
    setTMin(0.1);
    setTMax(10);
  };

  const handleFitCurrentT = () => {
    setTMin(Math.min(0.1, currentT * 0.7));
    setTMax(Math.max(10, currentT * 1.4));
  };

  // X-axis tick values
  const xTicks = useMemo(() => {
    if (scaleMode === 'log') {
      const standardLog = [0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50];
      const inside = standardLog.filter((v) => v >= tMin * 0.999 && v <= tMax * 1.001);
      if (inside.length >= 3) return inside;
      const out: number[] = [];
      const lMin = Math.log10(tMin);
      const lMax = Math.log10(tMax);
      for (let i = 0; i <= 4; i++) {
        out.push(Math.pow(10, lMin + (i / 4) * (lMax - lMin)));
      }
      return out;
    }
    const count = 5;
    const out: number[] = [];
    for (let i = 0; i <= count; i++) {
      out.push(tMin + (i / count) * (tMax - tMin));
    }
    return out;
  }, [scaleMode, tMin, tMax]);

  const yTicks = [0, 0.25, 0.5, 0.75, 1.0];

  const isSymmetryInRange = tMin <= 1 && 1 <= tMax;
  const symmetryX = isSymmetryInRange ? xToPx(1) : null;
  const isCurrentTInRange = currentT >= tMin * 0.999 && currentT <= tMax * 1.001;
  const cursorX = xToPx(Math.max(tMin, Math.min(tMax, currentT)));

  // Active mode labels & formulas
  const modeSymbolPrefix =
    graphMode === 'areas'
      ? 'K'
      : graphMode === 'perimeters'
      ? 'P'
      : linearKind === 'radius'
      ? 'R'
      : 'D';

  const modeFormulaTex =
    graphMode === 'areas'
      ? '\\frac{K_x(t)}{K_c(t)}, \\quad K_a=\\frac{\\pi}{4},\\; K_b=\\frac{\\pi t^2}{4},\\; K_c=\\frac{\\pi(1+t^2)}{4},\\; K_i=\\pi r^2'
      : graphMode === 'perimeters'
      ? '\\frac{P_x(t)}{P_c(t)}, \\quad P = 2\\pi R = \\pi D'
      : linearKind === 'radius'
      ? '\\frac{R_x(t)}{R_c(t)}, \\quad R_a=\\frac{1}{2},\\; R_b=\\frac{t}{2},\\; R_c=\\frac{\\sqrt{1+t^2}}{2},\\; R_i=r(t)'
      : '\\frac{D_x(t)}{D_c(t)}, \\quad D_a=1,\\; D_b=t,\\; D_c=\\sqrt{1+t^2},\\; D_i=2r(t)';

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 space-y-4">
      {/* Header (zero-pill clean scientific header) */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            {t.spectral.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.spectral.subtitleBefore} <span className="font-mono font-semibold text-slate-700">t = b / a</span>
            <span className="mx-1.5" aria-hidden="true">·</span>
            {t.spectral.subtitleAfter} <span className="font-mono">K_c</span>
          </p>
        </div>

        <div className="text-xs font-mono tabular-nums text-slate-600">
          t = <span className="font-bold text-slate-900">{currentT.toFixed(4)}</span>
        </div>
      </div>

      {/* Mode Selector Tabs: Areas | Perimeters | Radii & Diameters */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
        <button
          onClick={() => setGraphMode('areas')}
          className={`flex-1 px-2 py-1.5 text-[11px] sm:text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
            graphMode === 'areas'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <PieChart className="w-3.5 h-3.5 text-blue-600" /> {t.spectral.tabAreas}
        </button>
        <button
          onClick={() => setGraphMode('perimeters')}
          className={`flex-1 px-2 py-1.5 text-[11px] sm:text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
            graphMode === 'perimeters'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-emerald-600" /> {t.spectral.tabPerimeters}
        </button>
        <button
          onClick={() => setGraphMode('radii_diameters')}
          className={`flex-1 px-2 py-1.5 text-[11px] sm:text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
            graphMode === 'radii_diameters'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-600" /> {t.spectral.tabRadiiDiameters}
        </button>
      </div>

      {/* Mode C Sub-Switch (Radius vs Diameter) + Proportional Note */}
      {graphMode === 'radii_diameters' && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
          <span className="text-slate-600">
            {t.spectral.linearNoteBefore} <span className="font-mono">D = 2R</span> — {t.spectral.linearNoteMiddle}{' '}
            <span className="font-mono">R_x/R_c</span> {t.spectral.linearNoteAnd} <span className="font-mono">D_x/D_c</span> {t.spectral.linearNoteAfter}
          </span>
          <div className="flex items-center gap-1 p-0.5 bg-slate-200/70 rounded-md text-[11px] font-semibold">
            <button
              onClick={() => setLinearKind('radius')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                linearKind === 'radius'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.spectral.radiiBtn}
            </button>
            <button
              onClick={() => setLinearKind('diameter')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                linearKind === 'diameter'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.spectral.diametersBtn}
            </button>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* PRIMARY VISUALIZATION: INTERACTIVE CARTESIAN FUNCTION PLOT          */}
      {/* ================================================================== */}
      <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-2.5">
        {/* Plot Header: Title & 4-Curve Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-bold text-slate-800">
            {t.spectral.plotTitle} <span className="font-mono">t = b/a</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-semibold">
            {SERIES_ORDER.map((key) => {
              const meta = CIRCLE_SERIES_META[key];
              return (
                <span key={key} className="inline-flex items-center gap-1.5" style={{ color: meta.color }}>
                  <span
                    className="inline-block w-3 h-0.5 rounded-full"
                    style={{
                      backgroundColor: meta.color,
                      borderBottom: key === 'Kc' ? '1px dashed #e11d48' : undefined,
                    }}
                  />
                  {modeSymbolPrefix}_{key.replace('K', '')}/{modeSymbolPrefix}_c
                </span>
              );
            })}
          </div>
        </div>

        {/* Formula Strip */}
        <div className="px-2.5 py-1.5 rounded bg-slate-50 border border-slate-200/70 text-center overflow-x-auto">
          <MathFormula tex={modeFormulaTex} />
        </div>

        {/* Graph Controls Bar: Scale, Zoom, Symmetry Sweep */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5">
            {/* Axis scale mode */}
            <div className="flex items-center gap-0.5 p-0.5 bg-slate-100 rounded-md font-semibold">
              <button
                onClick={() => setScaleMode('log')}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                  scaleMode === 'log' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
                title={t.spectral.logScaleTitle}
              >
                {t.spectral.logScaleBtn}
              </button>
              <button
                onClick={() => setScaleMode('linear')}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                  scaleMode === 'linear' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
                title={t.spectral.linearScaleTitle}
              >
                {t.spectral.linearScaleBtn}
              </button>
            </div>

            {/* Zoom & Reset buttons */}
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
              title={t.spectral.zoomInTitle}
              aria-label={t.spectral.zoomInTitle}
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
              title={t.spectral.zoomOutTitle}
              aria-label={t.spectral.zoomOutTitle}
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetRange}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-mono flex items-center gap-1 whitespace-nowrap shrink-0"
              title={t.spectral.resetRangeTitle}
            >
              <RotateCcw className="w-3 h-3" /> [0.1, 10]
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                setIsSweepingSymmetry(false);
                onChangeT(1.0, true);
              }}
              className={`px-2.5 py-1 rounded font-semibold transition-colors whitespace-nowrap shrink-0 ${
                Math.abs(currentT - 1) < 1e-3
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
              title={t.spectral.symmetryBtnTitle}
            >
              {t.spectral.symmetryBtn}
            </button>
            <button
              onClick={() => setIsSweepingSymmetry(!isSweepingSymmetry)}
              className={`px-2.5 py-1 rounded font-semibold flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 ${
                isSweepingSymmetry
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {isSweepingSymmetry ? (
                <>
                  <Pause className="w-3 h-3" /> {t.spectral.pauseBtn}
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" /> {t.spectral.sweepBtn}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Out-of-range alert when user zoomed away from currentT */}
        {!isCurrentTInRange && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 py-1.5 rounded bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
            <span>
              {t.spectral.outOfRangeBefore} <span className="font-mono font-bold">t = {currentT.toFixed(3)}</span>{' '}
              {t.spectral.outOfRangeMiddle} [{formatTLabel(tMin)}, {formatTLabel(tMax)}].
            </span>
            <button
              onClick={handleFitCurrentT}
              className="font-semibold underline hover:text-amber-700 whitespace-nowrap"
            >
              {t.spectral.fitRangeBtn}
            </button>
          </div>
        )}

        {/* Cartesian SVG Plot */}
        <div className="relative select-none">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${PLOT.width} ${PLOT.height}`}
            className="w-full h-auto block cursor-crosshair touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="img"
            aria-label={t.spectral.svgAriaLabel}
          >
            {/* Plot Area Background */}
            <rect
              x={PLOT.left}
              y={PLOT.top}
              width={PLOT_W}
              height={PLOT_H}
              fill="#fcfdff"
              stroke="#cbd5e1"
              strokeWidth="1"
            />

            {/* Horizontal Gridlines & Y-Axis Ticks */}
            {yTicks.map((yVal) => {
              const py = yToPx(yVal);
              return (
                <g key={`y-${yVal}`}>
                  <line
                    x1={PLOT.left}
                    y1={py}
                    x2={PLOT.left + PLOT_W}
                    y2={py}
                    stroke={yVal === 0 ? '#94a3b8' : '#e2e8f0'}
                    strokeWidth={yVal === 0 ? '1.2' : '0.8'}
                  />
                  <text
                    x={PLOT.left - 8}
                    y={py + 3.5}
                    textAnchor="end"
                    fontSize="10.5"
                    fill="#64748b"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  >
                    {yVal.toFixed(2)}
                  </text>
                </g>
              );
            })}

            {/* Vertical Gridlines & X-Axis Ticks */}
            {xTicks.map((tTick) => {
              const px = xToPx(tTick);
              const nearSymmetry = symmetryX !== null && Math.abs(px - symmetryX) < 22 && Math.abs(tTick - 1) > 1e-3;
              return (
                <g key={`x-${tTick}`}>
                  <line
                    x1={px}
                    y1={PLOT.top}
                    x2={px}
                    y2={PLOT.top + PLOT_H}
                    stroke="#e2e8f0"
                    strokeWidth="0.8"
                  />
                  {!nearSymmetry && Math.abs(tTick - 1) > 1e-3 && (
                    <text
                      x={px}
                      y={PLOT.top + PLOT_H + 15}
                      textAnchor="middle"
                      fontSize="10.5"
                      fill="#64748b"
                      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    >
                      {formatTLabel(tTick)}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Axis Titles */}
            <text
              x={PLOT.left + PLOT_W / 2}
              y={PLOT.height - 5}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="#475569"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              t = b / a {scaleMode === 'log' ? t.spectral.axisLogLabel : t.spectral.axisLinearLabel}
            </text>
            <text
              x={14}
              y={PLOT.top + PLOT_H / 2}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="#475569"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              transform={`rotate(-90 14 ${PLOT.top + PLOT_H / 2})`}
            >
              {modeSymbolPrefix}_x / {modeSymbolPrefix}_c
            </text>

            {/* Symmetry Line t = 1 */}
            {symmetryX !== null && (
              <g>
                <line
                  x1={symmetryX}
                  y1={PLOT.top}
                  x2={symmetryX}
                  y2={PLOT.top + PLOT_H}
                  stroke="#64748b"
                  strokeWidth="1.25"
                  strokeDasharray="4 4"
                />
                <text
                  x={symmetryX}
                  y={PLOT.top + PLOT_H + 15}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="700"
                  fill="#334155"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                >
                  t = 1
                </text>
                <text
                  x={symmetryX + 4}
                  y={PLOT.top + 12}
                  textAnchor="start"
                  fontSize="9.5"
                  fontWeight="600"
                  fill="#475569"
                >
                  {t.spectral.symmetryTag}
                </text>
              </g>
            )}

            {/* Four Mathematical Function Curves */}
            <path
              d={buildCurvePath('Kc')}
              fill="none"
              stroke={CIRCLE_SERIES_META.Kc.color}
              strokeWidth="1.9"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
            <path
              d={buildCurvePath('Ka')}
              fill="none"
              stroke={CIRCLE_SERIES_META.Ka.color}
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={buildCurvePath('Kb')}
              fill="none"
              stroke={CIRCLE_SERIES_META.Kb.color}
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={buildCurvePath('Ki')}
              fill="none"
              stroke={CIRCLE_SERIES_META.Ki.color}
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Vertical Cursor & 4 Moving Markers */}
            {isCurrentTInRange && (
              <g>
                <line
                  x1={cursorX}
                  y1={PLOT.top}
                  x2={cursorX}
                  y2={PLOT.top + PLOT_H}
                  stroke="#ec4899"
                  strokeWidth="1.8"
                />
                {SERIES_ORDER.map((key) => {
                  const cy = yToPx(currentNormalized[key]);
                  return (
                    <circle
                      key={`marker-${key}`}
                      cx={cursorX}
                      cy={cy}
                      r="4.5"
                      fill={CIRCLE_SERIES_META[key].color}
                      stroke="#ffffff"
                      strokeWidth="1.75"
                    />
                  );
                })}
              </g>
            )}
          </svg>
        </div>

        {/* Synchronized Current Point Readout Bar (directly under graph) */}
        <div className="px-3 py-2 rounded-md bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono tabular-nums">
          <span className="text-slate-700 font-semibold">
            {t.spectral.currentPointLabel} <span className="text-slate-900">t = {currentT.toFixed(4)}</span>
          </span>
          <div className="flex flex-wrap items-center gap-3 font-bold">
            {SERIES_ORDER.map((key) => {
              const meta = CIRCLE_SERIES_META[key];
              const sub = key.replace('K', '');
              return (
                <span key={key} style={{ color: meta.color }}>
                  {modeSymbolPrefix}_{sub}/{modeSymbolPrefix}_c = {currentNormalized[key].toFixed(4)}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* REFERENCE PARAMETER VALUES (Click to Jump & Sync Geometry)         */}
      {/* ================================================================== */}
      <div className="space-y-1.5">
        <div className="text-xs font-semibold text-slate-600">
          {t.spectral.referenceTitle} <span className="font-mono">t = b/a</span>:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {referenceReadouts.map((ref) => {
            const isSym = Math.abs(ref.t - 1) < 1e-6;
            const isActive = Math.abs(currentT - ref.t) / ref.t < 0.015;
            return (
              <button
                key={ref.t}
                onClick={() => {
                  setIsSweepingSymmetry(false);
                  onChangeT(ref.t, true);
                }}
                className={`p-2 rounded-lg border text-left transition-colors font-mono tabular-nums ${
                  isActive
                    ? 'border-indigo-500 bg-indigo-50/70 ring-1 ring-indigo-500/30'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100/80'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">
                  t = {ref.t.toFixed(1)}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 space-y-0.5">
                  <div>
                    {modeSymbolPrefix}_a: {ref.norm.Ka.toFixed(3)}
                  </div>
                  <div>
                    {modeSymbolPrefix}_b: {ref.norm.Kb.toFixed(3)}
                  </div>
                  <div className="text-amber-700 font-semibold">
                    {modeSymbolPrefix}_i: {ref.norm.Ki.toFixed(3)}
                  </div>
                  {isSym && <div className="font-sans text-indigo-700 font-semibold">({t.spectral.symmetryTag})</div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================================================================== */}
      {/* SYNCHRONIZED NUMERICAL READOUT TABLE (Same State as Geometry & Plot)*/}
      {/* ================================================================== */}
      <div className="space-y-2.5 pt-1 border-t border-slate-100">
        {/* Geometry Parameters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-center font-mono tabular-nums">
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200/70">
            <div className="text-[10px] font-sans text-slate-500">t = b/a</div>
            <div className="text-xs font-bold text-slate-900">{currentT.toFixed(4)}</div>
          </div>
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200/70">
            <div className="text-[10px] font-sans text-slate-500">{t.spectral.legAShort}</div>
            <div className="text-xs font-bold text-blue-700">{calc.triangle.a.toFixed(3)}</div>
          </div>
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200/70">
            <div className="text-[10px] font-sans text-slate-500">{t.spectral.legBShort}</div>
            <div className="text-xs font-bold text-emerald-700">{calc.triangle.b.toFixed(3)}</div>
          </div>
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200/70">
            <div className="text-[10px] font-sans text-slate-500">{t.spectral.hypCShort}</div>
            <div className="text-xs font-bold text-rose-700">{calc.triangle.c.toFixed(3)}</div>
          </div>
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200/70 col-span-2 sm:col-span-1">
            <div className="text-[10px] font-sans text-slate-500">{t.spectral.radRShort}</div>
            <div className="text-xs font-bold text-amber-700">{calc.incircle.radius.toFixed(3)}</div>
          </div>
        </div>

        {/* Complete 4-Circle Readout Table */}
        <div className="border border-slate-200 rounded-lg overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-2 px-2.5 text-left">{t.spectral.colCircle}</th>
                <th className="py-2 px-2.5 text-right">
                  {modeSymbolPrefix}_x / {modeSymbolPrefix}_c
                </th>
                <th className="py-2 px-2.5 text-right">{t.spectral.colArea}</th>
                <th className="py-2 px-2.5 text-right">{t.spectral.colPerimeter}</th>
                <th className="py-2 px-2.5 text-right">{t.spectral.colRadius}</th>
                <th className="py-2 px-2.5 text-right">{t.spectral.colDiameter}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
              {spectral.items.map((item) => {
                const normVal =
                  graphMode === 'areas'
                    ? item.areaRatioToKc
                    : graphMode === 'perimeters'
                    ? item.perimeterRatioToKc
                    : linearKind === 'radius'
                    ? item.radiusRatioToC
                    : item.diameterRatioToC;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/70">
                    <td className="py-1.5 px-2.5 font-bold" style={{ color: item.color }}>
                      {item.label}
                    </td>
                    <td className="py-1.5 px-2.5 text-right font-bold text-slate-900">
                      {normVal.toFixed(4)}
                    </td>
                    <td className="py-1.5 px-2.5 text-right text-slate-700">
                      {item.area.toFixed(4)}
                    </td>
                    <td className="py-1.5 px-2.5 text-right text-slate-700">
                      {item.perimeter.toFixed(4)}
                    </td>
                    <td className="py-1.5 px-2.5 text-right text-slate-700">
                      {item.radius.toFixed(4)}
                    </td>
                    <td className="py-1.5 px-2.5 text-right text-slate-700">
                      {item.diameter.toFixed(4)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collapsible Secondary Numerical Comparison (Proportion Bars) */}
      <div className="pt-1 border-t border-slate-100">
        <button
          onClick={() => setShowShareBars(!showShareBars)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-slate-900 py-1"
        >
          <span>{t.spectral.shareToggle}</span>
          {showShareBars ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showShareBars && (
          <div className="mt-2 space-y-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
            {spectral.items.map((item) => {
              const normVal =
                graphMode === 'areas'
                  ? item.areaRatioToKc
                  : graphMode === 'perimeters'
                  ? item.perimeterRatioToKc
                  : linearKind === 'radius'
                  ? item.radiusRatioToC
                  : item.diameterRatioToC;
              const widthPct = Math.max(4, Math.min(100, normVal * 100));
              return (
                <div key={`bar-${item.id}`} className="space-y-1 text-[11px] font-mono tabular-nums">
                  <div className="flex justify-between">
                    <span className="font-bold" style={{ color: item.color }}>
                      {item.label}
                    </span>
                    <span className="text-slate-700">
                      {modeSymbolPrefix}_x/{modeSymbolPrefix}_c = {normVal.toFixed(4)} ({t.spectral.shareLabel}{' '}
                      {(graphMode === 'areas' ? item.areaSharePercent : item.perimeterSharePercent).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${widthPct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
