/**
 * @license
 * SPDX-License-Identifier: MIT
 */

import React from 'react';
import {
  ActiveModuleId,
  BoardLayerFilter,
  FourCirclesCalculations,
  HoveredObject,
  Point2D,
} from '../../types/geometry.ts';
import { toScreen } from '../../geometry/transforms.ts';
import { Translations, TRANSLATIONS } from '../../i18n/translations.ts';

interface FourCirclesViewProps {
  calc: FourCirclesCalculations;
  origin: Point2D;
  scale: number;
  activeModule: ActiveModuleId;
  layerFilter: BoardLayerFilter;
  showLabels?: boolean;
  showCenters?: boolean;
  showRadii?: boolean;
  onHoverObject?: (obj: HoveredObject | null) => void;
  t?: Translations;
}

export const FourCirclesView: React.FC<FourCirclesViewProps> = ({
  calc,
  origin,
  scale,
  activeModule,
  layerFilter,
  showLabels = true,
  showCenters = true,
  showRadii = true,
  onHoverObject,
  t = TRANSLATIONS.ru,
}) => {
  const { squareA, squareB, squareC, circleA, circleB, circleC, incircle, triangle } = calc;

  // Screen coordinates of squares
  const pO = toScreen(squareA.O, origin, scale);
  const pA = toScreen(squareA.legVertex, origin, scale);
  const pCa = toScreen(squareA.outerVertex, origin, scale);
  const pDa = toScreen(squareA.baseVertex, origin, scale);

  const pB = toScreen(squareB.legVertex, origin, scale);
  const pCb = toScreen(squareB.outerVertex, origin, scale);
  const pDb = toScreen(squareB.baseVertex, origin, scale);

  const pBc = toScreen(squareC.Bc, origin, scale);
  const pAc = toScreen(squareC.Ac, origin, scale);

  // Screen coordinates of 4 circle centers & radii in pixels
  const pOa = toScreen(circleA.center, origin, scale);
  const pOb = toScreen(circleB.center, origin, scale);
  const pOc = toScreen(circleC.center, origin, scale);
  const pI = toScreen(incircle.center, origin, scale);

  const pxRa = circleA.radius * scale;
  const pxRb = circleB.radius * scale;
  const pxRc = circleC.radius * scale;
  const pxRi = incircle.radius * scale;

  // Screen coordinates of tangency points
  const pTa = toScreen(incircle.tangencyOA, origin, scale);
  const pTb = toScreen(incircle.tangencyOB, origin, scale);
  const pTc = toScreen(incircle.tangencyAB, origin, scale);

  // Layer visibility logic
  const showSquares = layerFilter === 'all' || layerFilter === 'squares' || layerFilter === 'square_circles';
  const showSquareCircles = layerFilter === 'all' || layerFilter === 'square_circles';
  const showIncircle = layerFilter === 'all' || layerFilter === 'triangle_incircle';

  // Module emphasis opacities
  const exteriorOpacity = activeModule === 'incircle_focus' ? 0.25 : 1;
  const incircleFocusGlow = activeModule === 'incircle_focus';

  return (
    <g className="four-circles-view-group">
      {/* ================================================================= */}
      {/* 1. Three Exterior Squares Qa, Qb, Qc                              */}
      {/* ================================================================= */}
      {showSquares && (
        <g style={{ opacity: exteriorOpacity }} className="transition-opacity duration-150">
          {/* Square Qa on vertical leg OA */}
          <polygon
            points={`${pO.x},${pO.y} ${pA.x},${pA.y} ${pCa.x},${pCa.y} ${pDa.x},${pDa.y}`}
            fill="#2563eb"
            fillOpacity="0.05"
            stroke="#3b82f6"
            strokeWidth="1.6"
            strokeLinejoin="round"
            className="cursor-pointer"
            onPointerEnter={() =>
              onHoverObject?.({
                id: 'square-Qa',
                title: t.hover.squareQaTitle,
                details: `${t.hover.sideLabel} a = ${squareA.side.toFixed(2)}, ${t.hover.areaLabel} a² = ${squareA.area.toFixed(2)}`,
                category: 'polygon',
              })
            }
            onPointerLeave={() => onHoverObject?.(null)}
          />

          {/* Square Qb on horizontal leg OB */}
          <polygon
            points={`${pO.x},${pO.y} ${pB.x},${pB.y} ${pCb.x},${pCb.y} ${pDb.x},${pDb.y}`}
            fill="#059669"
            fillOpacity="0.05"
            stroke="#10b981"
            strokeWidth="1.6"
            strokeLinejoin="round"
            className="cursor-pointer"
            onPointerEnter={() =>
              onHoverObject?.({
                id: 'square-Qb',
                title: t.hover.squareQbTitle,
                details: `${t.hover.sideLabel} b = ${squareB.side.toFixed(2)}, ${t.hover.areaLabel} b² = ${squareB.area.toFixed(2)}`,
                category: 'polygon',
              })
            }
            onPointerLeave={() => onHoverObject?.(null)}
          />

          {/* Square Qc on hypotenuse AB */}
          <polygon
            points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pBc.x},${pBc.y} ${pAc.x},${pAc.y}`}
            fill="#e11d48"
            fillOpacity="0.05"
            stroke="#f43f5e"
            strokeWidth="1.8"
            strokeLinejoin="round"
            className="cursor-pointer"
            onPointerEnter={() =>
              onHoverObject?.({
                id: 'square-Qc',
                title: t.hover.squareQcTitle,
                details: `${t.hover.sideLabel} c = ${squareC.side.toFixed(3)}, ${t.hover.areaLabel} c² = ${squareC.area.toFixed(2)}`,
                category: 'polygon',
              })
            }
            onPointerLeave={() => onHoverObject?.(null)}
          />

          {/* Square corner labels */}
          {showLabels && (
            <>
              <text
                x={pCa.x + 6}
                y={pCa.y + 14}
                className="text-[10px] font-mono font-semibold fill-blue-700/80 select-none pointer-events-none"
              >
                Q_a
              </text>
              <text
                x={pCb.x - 18}
                y={pCb.y - 6}
                className="text-[10px] font-mono font-semibold fill-emerald-700/80 select-none pointer-events-none"
              >
                Q_b
              </text>
              <text
                x={pAc.x + 6}
                y={pAc.y + 16}
                className="text-[10px] font-mono font-semibold fill-rose-700/80 select-none pointer-events-none"
              >
                Q_c
              </text>
            </>
          )}
        </g>
      )}

      {/* ================================================================= */}
      {/* 2. Three Circles Ka, Kb, Kc Inscribed in the Squares              */}
      {/* ================================================================= */}
      {showSquareCircles && (
        <g style={{ opacity: exteriorOpacity }} className="transition-opacity duration-150">
          {/* Circle Ka (Blue) */}
          <circle
            cx={pOa.x}
            cy={pOa.y}
            r={pxRa}
            fill="#3b82f6"
            fillOpacity="0.16"
            stroke="#2563eb"
            strokeWidth="2.2"
            className="cursor-pointer"
            onPointerEnter={() =>
              onHoverObject?.({
                id: 'circle-Ka',
                title: t.hover.circleKaTitle,
                details: `d = a = ${circleA.diameter.toFixed(2)} · K_a = ${circleA.area.toFixed(3)} · √K_a = ${circleA.sqrtArea.toFixed(3)}`,
                category: 'circle',
              })
            }
            onPointerLeave={() => onHoverObject?.(null)}
          />

          {/* Circle Kb (Emerald) */}
          <circle
            cx={pOb.x}
            cy={pOb.y}
            r={pxRb}
            fill="#10b981"
            fillOpacity="0.16"
            stroke="#059669"
            strokeWidth="2.2"
            className="cursor-pointer"
            onPointerEnter={() =>
              onHoverObject?.({
                id: 'circle-Kb',
                title: t.hover.circleKbTitle,
                details: `d = b = ${circleB.diameter.toFixed(2)} · K_b = ${circleB.area.toFixed(3)} · √K_b = ${circleB.sqrtArea.toFixed(3)}`,
                category: 'circle',
              })
            }
            onPointerLeave={() => onHoverObject?.(null)}
          />

          {/* Circle Kc (Crimson / Rose) */}
          <circle
            cx={pOc.x}
            cy={pOc.y}
            r={pxRc}
            fill="#f43f5e"
            fillOpacity="0.14"
            stroke="#e11d48"
            strokeWidth="2.4"
            className="cursor-pointer"
            onPointerEnter={() =>
              onHoverObject?.({
                id: 'circle-Kc',
                title: t.hover.circleKcTitle,
                details: `d = c = ${circleC.diameter.toFixed(3)} · K_c = ${circleC.area.toFixed(3)} · √K_c = ${circleC.sqrtArea.toFixed(3)}`,
                category: 'circle',
              })
            }
            onPointerLeave={() => onHoverObject?.(null)}
          />

          {/* Radii / Diameter Lines in Squares */}
          {(showRadii || activeModule === 'identity_proof') && (
            <>
              <line
                x1={pOa.x}
                y1={pOa.y}
                x2={pOa.x + pxRa}
                y2={pOa.y}
                stroke="#1d4ed8"
                strokeWidth="1.4"
                strokeDasharray="3,2"
                className="pointer-events-none"
              />
              <line
                x1={pOb.x}
                y1={pOb.y}
                x2={pOb.x}
                y2={pOb.y - pxRb}
                stroke="#047857"
                strokeWidth="1.4"
                strokeDasharray="3,2"
                className="pointer-events-none"
              />
              <line
                x1={pOc.x}
                y1={pOc.y}
                x2={toScreen(circleC.tangencyPoints[0], origin, scale).x}
                y2={toScreen(circleC.tangencyPoints[0], origin, scale).y}
                stroke="#be123c"
                strokeWidth="1.4"
                strokeDasharray="3,2"
                className="pointer-events-none"
              />
            </>
          )}

          {/* Tangency Dots on Square Sides */}
          {showCenters && (
            <>
              {[...circleA.tangencyPoints, ...circleB.tangencyPoints, ...circleC.tangencyPoints].map(
                (pt, idx) => {
                  const sPt = toScreen(pt, origin, scale);
                  const fillColor = idx < 4 ? '#2563eb' : idx < 8 ? '#059669' : '#e11d48';
                  return (
                    <circle
                      key={`sq-tan-${idx}`}
                      cx={sPt.x}
                      cy={sPt.y}
                      r="2.5"
                      fill={fillColor}
                      fillOpacity="0.7"
                      className="pointer-events-none"
                    />
                  );
                }
              )}

              {/* Circle Centers Oa, Ob, Oc */}
              <circle cx={pOa.x} cy={pOa.y} r="3.5" fill="#1d4ed8" stroke="#fff" strokeWidth="1.2" className="pointer-events-none" />
              <circle cx={pOb.x} cy={pOb.y} r="3.5" fill="#047857" stroke="#fff" strokeWidth="1.2" className="pointer-events-none" />
              <circle cx={pOc.x} cy={pOc.y} r="3.5" fill="#be123c" stroke="#fff" strokeWidth="1.2" className="pointer-events-none" />
            </>
          )}

          {/* Labels for Ka, Kb, Kc */}
          {showLabels && (
            <>
              {pxRa > 18 && (
                <g transform={`translate(${pOa.x}, ${pOa.y - (showCenters ? 12 : 0)})`} className="pointer-events-none select-none">
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-mono font-bold fill-blue-900"
                  >
                    K_a
                  </text>
                  {activeModule === 'identity_proof' && pxRa > 32 && (
                    <text
                      y="15"
                      textAnchor="middle"
                      className="text-[10px] font-mono font-semibold fill-blue-700"
                    >
                      √K_a={circleA.sqrtArea.toFixed(2)}
                    </text>
                  )}
                </g>
              )}

              {pxRb > 18 && (
                <g transform={`translate(${pOb.x}, ${pOb.y + (showCenters ? 14 : 0)})`} className="pointer-events-none select-none">
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-mono font-bold fill-emerald-900"
                  >
                    K_b
                  </text>
                  {activeModule === 'identity_proof' && pxRb > 32 && (
                    <text
                      y="14"
                      textAnchor="middle"
                      className="text-[10px] font-mono font-semibold fill-emerald-700"
                    >
                      √K_b={circleB.sqrtArea.toFixed(2)}
                    </text>
                  )}
                </g>
              )}

              {pxRc > 22 && (
                <g transform={`translate(${pOc.x}, ${pOc.y - (showCenters ? 14 : 0)})`} className="pointer-events-none select-none">
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-mono font-bold fill-rose-900"
                  >
                    K_c
                  </text>
                  {activeModule === 'identity_proof' && pxRc > 36 && (
                    <text
                      y="15"
                      textAnchor="middle"
                      className="text-[10px] font-mono font-semibold fill-rose-700"
                    >
                      √K_c={circleC.sqrtArea.toFixed(2)}
                    </text>
                  )}
                </g>
              )}

              {showCenters && (
                <>
                  {pxRa > 24 && (
                    <text x={pOa.x + 6} y={pOa.y + 12} className="text-[10px] font-mono font-semibold fill-blue-800 select-none pointer-events-none">
                      O_a
                    </text>
                  )}
                  {pxRb > 24 && (
                    <text x={pOb.x + 6} y={pOb.y - 6} className="text-[10px] font-mono font-semibold fill-emerald-800 select-none pointer-events-none">
                      O_b
                    </text>
                  )}
                  {pxRc > 24 && (
                    <text x={pOc.x + 6} y={pOc.y + 12} className="text-[10px] font-mono font-semibold fill-rose-800 select-none pointer-events-none">
                      O_c
                    </text>
                  )}
                </>
              )}
            </>
          )}
        </g>
      )}

      {/* ================================================================= */}
      {/* 3. Fourth Circle Ki: Standard Incircle Strictly Inside Triangle   */}
      {/* ================================================================= */}
      {showIncircle && (
        <g className="incircle-Ki-group">
          <circle
            cx={pI.x}
            cy={pI.y}
            r={pxRi}
            fill="#f59e0b"
            fillOpacity={incircleFocusGlow ? '0.32' : '0.24'}
            stroke="#b45309"
            strokeWidth={incircleFocusGlow ? '2.8' : '2.3'}
            className="cursor-pointer"
            onPointerEnter={() =>
              onHoverObject?.({
                id: 'circle-Ki',
                title: t.hover.circleKiTitle,
                details: `r = (a+b-c)/2 = ${incircle.radius.toFixed(3)} · K_i = ${incircle.area.toFixed(3)} · √K_i = ${incircle.sqrtArea.toFixed(3)}`,
                category: 'circle',
              })
            }
            onPointerLeave={() => onHoverObject?.(null)}
          />

          {/* Incircle radii to the 3 tangency points */}
          {(showRadii || incircleFocusGlow || activeModule === 'identity_proof') && (
            <>
              <line
                x1={pI.x}
                y1={pI.y}
                x2={pTa.x}
                y2={pTa.y}
                stroke="#92400e"
                strokeWidth="1.4"
                strokeDasharray="3,2"
                className="pointer-events-none"
              />
              <line
                x1={pI.x}
                y1={pI.y}
                x2={pTb.x}
                y2={pTb.y}
                stroke="#92400e"
                strokeWidth="1.4"
                strokeDasharray="3,2"
                className="pointer-events-none"
              />
              <line
                x1={pI.x}
                y1={pI.y}
                x2={pTc.x}
                y2={pTc.y}
                stroke="#92400e"
                strokeWidth="1.6"
                className="pointer-events-none"
              />
            </>
          )}

          {/* Tangency points on OA, OB, AB & center I */}
          {(showCenters || incircleFocusGlow) && (
            <>
              <circle
                cx={pTa.x}
                cy={pTa.y}
                r="3"
                fill="#b45309"
                stroke="#fff"
                strokeWidth="1"
                className="cursor-pointer"
                onPointerEnter={() =>
                  onHoverObject?.({
                    id: 'tan-OA',
                    title: t.hover.tanOATitle,
                    details: `T_a = (0, ${incircle.radius.toFixed(3)})`,
                    category: 'vertex',
                  })
                }
                onPointerLeave={() => onHoverObject?.(null)}
              />
              <circle
                cx={pTb.x}
                cy={pTb.y}
                r="3"
                fill="#b45309"
                stroke="#fff"
                strokeWidth="1"
                className="cursor-pointer"
                onPointerEnter={() =>
                  onHoverObject?.({
                    id: 'tan-OB',
                    title: t.hover.tanOBTitle,
                    details: `T_b = (${incircle.radius.toFixed(3)}, 0)`,
                    category: 'vertex',
                  })
                }
                onPointerLeave={() => onHoverObject?.(null)}
              />
              <circle
                cx={pTc.x}
                cy={pTc.y}
                r="3.2"
                fill="#b45309"
                stroke="#fff"
                strokeWidth="1"
                className="cursor-pointer"
                onPointerEnter={() =>
                  onHoverObject?.({
                    id: 'tan-AB',
                    title: t.hover.tanABTitle,
                    details: `T_c = (${incircle.tangencyAB.x.toFixed(3)}, ${incircle.tangencyAB.y.toFixed(3)})`,
                    category: 'vertex',
                  })
                }
                onPointerLeave={() => onHoverObject?.(null)}
              />

              {/* Incenter I = (r, r) */}
              <circle
                cx={pI.x}
                cy={pI.y}
                r="3.8"
                fill="#92400e"
                stroke="#ffffff"
                strokeWidth="1.4"
                className="cursor-pointer"
                onPointerEnter={() =>
                  onHoverObject?.({
                    id: 'incenter-I',
                    title: t.hover.incenterTitle,
                    details: `I = (${incircle.center.x.toFixed(3)}, ${incircle.center.y.toFixed(3)}), r = ${incircle.radius.toFixed(3)}`,
                    category: 'vertex',
                  })
                }
                onPointerLeave={() => onHoverObject?.(null)}
              />
            </>
          )}

          {/* Labels for Ki, I, and radius r */}
          {showLabels && (
            <>
              <text
                x={pI.x}
                y={pxRi > 20 ? pI.y - 8 : pI.y - pxRi - 8}
                textAnchor="middle"
                className="text-xs font-mono font-bold fill-amber-950 select-none pointer-events-none"
              >
                K_i
              </text>
              {(showRadii || incircleFocusGlow) && (
                <text
                  x={(pI.x + pTc.x) / 2 + 5}
                  y={(pI.y + pTc.y) / 2 - 4}
                  className="text-[10px] font-mono font-bold fill-amber-900 select-none pointer-events-none"
                >
                  r={incircle.radius.toFixed(2)}
                </text>
              )}
              {showCenters && pxRi > 16 && (
                <text
                  x={pI.x + 6}
                  y={pI.y + 11}
                  className="text-[10px] font-mono font-semibold fill-amber-900 select-none pointer-events-none"
                >
                  I
                </text>
              )}
              {incircleFocusGlow && pxRi > 16 && (
                <>
                  <text x={pTa.x - 16} y={pTa.y + 3} className="text-[10px] font-mono fill-amber-900 select-none pointer-events-none">
                    T_a
                  </text>
                  <text x={pTb.x - 4} y={pTb.y + 12} className="text-[10px] font-mono fill-amber-900 select-none pointer-events-none">
                    T_b
                  </text>
                  <text x={pTc.x + 6} y={pTc.y - 4} className="text-[10px] font-mono fill-amber-900 select-none pointer-events-none">
                    T_c
                  </text>
                </>
              )}
            </>
          )}
        </g>
      )}

      {/* Subtle bounding hint for leg ratio in extreme cases */}
      {triangle.a > 0 && triangle.b > 0 && false && <g />}
    </g>
  );
};
