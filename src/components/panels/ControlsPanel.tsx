/**
 * @license
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect, useRef, useState } from 'react';
import { FourCirclesCalculations } from '../../types/geometry.ts';
import { FOUR_CIRCLES_PRESETS } from '../../math/presets.ts';
import { Play, Pause, RotateCcw, Sliders } from 'lucide-react';

interface ControlsPanelProps {
  calc: FourCirclesCalculations;
  onChangeA: (newA: number, recordHistory?: boolean) => void;
  onChangeB: (newB: number, recordHistory?: boolean) => void;
  onSetBoth: (newA: number, newB: number, recordHistory?: boolean) => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  calc,
  onChangeA,
  onChangeB,
  onSetBoth,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animSpeed, setAnimSpeed] = useState<number>(1);
  const animFrameRef = useRef<number | null>(null);
  const animTimeRef = useRef<number>(0);

  // Smooth parametric sweep keeping c near 5 while varying proportions a/b
  useEffect(() => {
    if (!isAnimating) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let lastTimestamp = performance.now();
    const animate = (timestamp: number) => {
      const dt = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      animTimeRef.current += dt * animSpeed * 0.8;
      const logT = Math.sin(animTimeRef.current) * 1.15;
      const targetT = Math.exp(logT);

      const baseC = 6;
      const newA = Math.max(0.5, Math.min(12, baseC / Math.sqrt(1 + targetT * targetT)));
      const newB = Math.max(0.5, Math.min(12, newA * targetT));

      onSetBoth(Math.round(newA * 100) / 100, Math.round(newB * 100) / 100, false);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAnimating, animSpeed, onSetBoth]);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Параметры треугольника (a, b)
          </h3>
        </div>
        <button
          onClick={() => onSetBoth(4, 4, true)}
          className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors whitespace-nowrap shrink-0"
          title="Установить равнобедренный треугольник a = b = 4"
        >
          a = b = 4
        </button>
      </div>

      {/* Sliders for legs a and b */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Vertical leg a */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="slider-leg-a" className="text-xs font-semibold text-slate-700">
              Катет <i className="text-blue-700 font-bold">a</i> (OA, ед.):
            </label>
            <input
              id="slider-leg-a"
              type="number"
              step="0.1"
              min="0.5"
              max="15"
              value={Number(calc.triangle.a.toFixed(3))}
              onChange={(e) => onChangeA(parseFloat(e.target.value) || 1, true)}
              className="w-16 px-1.5 py-0.5 text-right font-mono tabular-nums text-xs font-bold border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-indigo-500"
            />
          </div>
          <input
            type="range"
            min="0.5"
            max="12"
            step="0.1"
            value={calc.triangle.a}
            onChange={(e) => onChangeA(parseFloat(e.target.value), false)}
            onPointerUp={() => onChangeA(calc.triangle.a, true)}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono tabular-nums">
            <span>0.5</span>
            <span>6.0</span>
            <span>12.0</span>
          </div>
        </div>

        {/* Horizontal leg b */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="slider-leg-b" className="text-xs font-semibold text-slate-700">
              Катет <i className="text-emerald-700 font-bold">b</i> (OB, ед.):
            </label>
            <input
              id="slider-leg-b"
              type="number"
              step="0.1"
              min="0.5"
              max="15"
              value={Number(calc.triangle.b.toFixed(3))}
              onChange={(e) => onChangeB(parseFloat(e.target.value) || 1, true)}
              className="w-16 px-1.5 py-0.5 text-right font-mono tabular-nums text-xs font-bold border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-indigo-500"
            />
          </div>
          <input
            type="range"
            min="0.5"
            max="12"
            step="0.1"
            value={calc.triangle.b}
            onChange={(e) => onChangeB(parseFloat(e.target.value), false)}
            onPointerUp={() => onChangeB(calc.triangle.b, true)}
            className="w-full accent-emerald-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono tabular-nums">
            <span>0.5</span>
            <span>6.0</span>
            <span>12.0</span>
          </div>
        </div>
      </div>

      {/* Control Triangles Presets */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] font-semibold text-slate-500">Контрольные треугольники:</span>
        <div className="flex flex-wrap gap-1.5">
          {FOUR_CIRCLES_PRESETS.map((preset) => {
            const isActive =
              Math.abs(calc.triangle.a - preset.a) < 0.05 &&
              Math.abs(calc.triangle.b - preset.b) < 0.05;
            return (
              <button
                key={preset.id}
                onClick={() => onSetBoth(preset.a, preset.b, true)}
                title={preset.description}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                {preset.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Parametric Sweep Toolbar */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
              isAnimating
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
            }`}
          >
            {isAnimating ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Пауза
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Плавное изменение (a, b)
              </>
            )}
          </button>

          {isAnimating && (
            <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
              {[0.5, 1, 2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setAnimSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded ${animSpeed === spd ? 'bg-slate-200 font-bold text-slate-900' : ''}`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setIsAnimating(false);
            onSetBoth(4, 3, true);
          }}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Сброс (3-4-5)
        </button>
      </div>
    </div>
  );
};
