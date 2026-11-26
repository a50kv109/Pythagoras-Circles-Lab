/**
 * @license
 * SPDX-License-Identifier: MIT
 */

/**
 * STAGE 4 — EXPERIMENT 06 STRICT ROOT AUDIT & INDEPENDENT CERTIFICATION SCRIPT
 *
 * Independent calculus + interval-enclosure verification in Canonical Opposite-Side Notation
 * (MATHEMATICAL_NOTATION_STANDARD.md):
 *   - C = (0,0) right angle (gamma = 90 deg)
 *   - A = (0, sideB), angle alpha = angle(A) in (0, pi/2)
 *   - B = (sideA, 0), angle beta  = angle(B) = pi/2 - alpha
 *   - sideA = |BC| opp A, sideB = |AC| opp B, sideC = |AB| opp C
 *
 * Also cross-verifies against Legacy `computeArcSideAreaPoint(r, alphaExp06)` where
 * `alphaExp06 = betaDeg = 90 - alphaDeg` (the known Exp 03–06 parameter collision).
 */

import assert from 'node:assert/strict';
import { calculateCanonicalFourCircles } from '../../canonical/index.ts';
import {
  computeArcSideAreaPoint,
  findCrossSystemShareCoincidences,
} from '../../math/experiments/arcSideAreaCorrespondence.ts';

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

function assertClose(actual: number, expected: number, label: string, tol = 1e-12): void {
  const diff = Math.abs(actual - expected);
  const scale = Math.max(1, Math.abs(expected));
  assert.ok(diff <= tol * scale, `${label}: expected ${expected}, got ${actual} (diff=${diff})`);
}

// Pure canonical normalized distribution functions directly from alphaRad in (0, pi/2)
function wArcA(alphaRad: number): number {
  return (Math.PI - alphaRad) / (2 * Math.PI);
}
function wArcB(alphaRad: number): number {
  return (Math.PI / 2 + alphaRad) / (2 * Math.PI);
}
function wArcC(): number {
  return 0.25;
}

function wAreaA(alphaRad: number): number {
  const s = Math.sin(alphaRad);
  const c = Math.cos(alphaRad);
  return s / (1 + s + c);
}
function wAreaB(alphaRad: number): number {
  const s = Math.sin(alphaRad);
  const c = Math.cos(alphaRad);
  return c / (1 + s + c);
}
function wAreaC(alphaRad: number): number {
  const s = Math.sin(alphaRad);
  const c = Math.cos(alphaRad);
  return 1 / (1 + s + c);
}

// Certified interval-bisection solver returning tight enclosing bracket [loRad, hiRad]
// with guaranteed opposite signs at endpoints (using exact monotonicity/concavity interval)
function certifyBracketedRoot(
  fn: (alphaRad: number) => number,
  loRad: number,
  hiRad: number,
  name: string
): {
  rootRad: number;
  rootDeg: number;
  loDeg: number;
  hiDeg: number;
  halfWidthDeg: number;
  residualAtMid: number;
  shareAtMid: number;
} {
  let a = loRad;
  let b = hiRad;
  let fa = fn(a);
  const fb = fn(b);
  assert.ok(
    (fa < 0 && fb > 0) || (fa > 0 && fb < 0),
    `${name}: endpoints must have opposite signs (fa=${fa}, fb=${fb})`
  );

  for (let i = 0; i < 60; i += 1) {
    const mid = 0.5 * (a + b);
    const fmid = fn(mid);
    if (fmid === 0) {
      a = mid;
      b = mid;
      break;
    }
    if ((fa < 0 && fmid < 0) || (fa > 0 && fmid > 0)) {
      a = mid;
      fa = fmid;
    } else {
      b = mid;
    }
  }

  const rootRad = 0.5 * (a + b);
  return {
    rootRad,
    rootDeg: rootRad * RAD2DEG,
    loDeg: a * RAD2DEG,
    hiDeg: b * RAD2DEG,
    halfWidthDeg: 0.5 * (b - a) * RAD2DEG,
    residualAtMid: fn(rootRad),
    shareAtMid: 0,
  };
}

console.log('Running Stage 4 — Experiment 06 Strict Root Audit & Certification...\n');

// ============================================================================
// 1. Verify Exact Analytical Derivatives & Half-Angle Rational Forms
// ============================================================================
const h = 1e-7;
for (let deg = 1; deg <= 89; deg += 1) {
  const a = deg * DEG2RAD;
  const u = Math.tan(a / 2);
  const D = 1 + Math.sin(a) + Math.cos(a);

  // dwAreaA/da = (1 + cos(a)) / D^2 = (1 + u^2) / (2 * (1 + u)^2)
  const numDerivA = (wAreaA(a + h) - wAreaA(a - h)) / (2 * h);
  const exactDerivA = (1 + Math.cos(a)) / (D * D);
  const rationalDerivA = (1 + u * u) / (2 * (1 + u) * (1 + u));
  assertClose(numDerivA, exactDerivA, `dwAreaA/da at ${deg} deg`, 1e-8);
  assertClose(exactDerivA, rationalDerivA, `rational dwAreaA/da at ${deg} deg`, 1e-13);

  // dwAreaB/da = -(1 + sin(a)) / D^2 = -(1 + u^2) / 4? Wait:
  // Wait! (1 + sin a)/D^2 = (1 + u^2)/4! Let's verify that exact identity!
  const numDerivB = (wAreaB(a + h) - wAreaB(a - h)) / (2 * h);
  const exactDerivB = -(1 + Math.sin(a)) / (D * D);
  const rationalDerivB = -(1 + u * u) / 4;
  assertClose(numDerivB, exactDerivB, `dwAreaB/da at ${deg} deg`, 1e-8);
  assertClose(exactDerivB, rationalDerivB, `rational dwAreaB/da at ${deg} deg`, 1e-13);

  // dwAreaC/da = (sin(a) - cos(a)) / D^2
  const numDerivC = (wAreaC(a + h) - wAreaC(a - h)) / (2 * h);
  const exactDerivC = (Math.sin(a) - Math.cos(a)) / (D * D);
  assertClose(numDerivC, exactDerivC, `dwAreaC/da at ${deg} deg`, 1e-8);

  // Strict concavity of f_{B,C} on [pi/4, pi/2] and f_{A,C} on [0, pi/4]:
  // d^2/da^2(wAreaC) = sqrt(2) * (cos(theta) + sqrt(2)*(1 + sin^2(theta))) / (1 + sqrt(2)*cos(theta))^3 > 0!
  if (deg >= 45) {
    const h2 = 1e-4;
    const theta = a - Math.PI / 4;
    const d2wC =
      (Math.SQRT2 * (Math.cos(theta) + Math.SQRT2 * (1 + Math.sin(theta) * Math.sin(theta)))) /
      Math.pow(1 + Math.SQRT2 * Math.cos(theta), 3);
    const numD2wC = (wAreaC(a + h2) - 2 * wAreaC(a) + wAreaC(a - h2)) / (h2 * h2);
    assertClose(numD2wC, d2wC, `d2wAreaC/da2 at ${deg} deg`, 1e-6);
    assert.ok(d2wC > 0, `wAreaC strictly convex => f_{B,C} strictly concave at ${deg} deg`);
  }

  // Strict lower bound on f'_{A,B}(a) >= 1/4 - 1/(2*pi) > 0:
  const derivFAB = -1 / (2 * Math.PI) - exactDerivB;
  assert.ok(derivFAB >= 0.25 - 1 / (2 * Math.PI) - 1e-15, `f'_{A,B} > 0 at ${deg} deg`);
}

// ============================================================================
// 2. Certify All 6 Roots in Canonical alpha = angle(A)
// ============================================================================
// 1. (A, A): f_{A,A}(alpha) = wArcA(alpha) - wAreaA(alpha), strictly decreasing on (0, pi/2)
const rAA = certifyBracketedRoot(
  (a) => wArcA(a) - wAreaA(a),
  1e-6,
  Math.PI / 2 - 1e-6,
  'Canonical (A,A)'
);
rAA.shareAtMid = wArcA(rAA.rootRad);

// 2. (B, B): f_{B,B}(alpha) = wArcB(alpha) - wAreaB(alpha), strictly increasing on (0, pi/2)
const rBB = certifyBracketedRoot(
  (a) => wArcB(a) - wAreaB(a),
  1e-6,
  Math.PI / 2 - 1e-6,
  'Canonical (B,B)'
);
rBB.shareAtMid = wArcB(rBB.rootRad);

// 3. (B, C): f_{B,C}(alpha) = wArcB(alpha) - wAreaC(alpha), strictly concave on [pi/4, pi/2]
//    Sub-interval [pi/4, pi/2 - 1e-6]: f(pi/4) < 0 and f(pi/2 - 1e-4) > 0
const rBC = certifyBracketedRoot(
  (a) => wArcB(a) - wAreaC(a),
  Math.PI / 4,
  Math.PI / 2 - 1e-4,
  'Canonical (B,C)'
);
rBC.shareAtMid = wArcB(rBC.rootRad);

// 4. (A, C): f_{A,C}(alpha) = wArcA(alpha) - wAreaC(alpha), strictly concave on [0, pi/4]
//    Sub-interval [1e-4, pi/4]: f(1e-4) > 0 and f(pi/4) < 0
const rAC = certifyBracketedRoot(
  (a) => wArcA(a) - wAreaC(a),
  1e-4,
  Math.PI / 4,
  'Canonical (A,C)'
);
rAC.shareAtMid = wArcA(rAC.rootRad);

// 5. (C, B): wArcC - wAreaB = 0, exact root alpha = atan(4/3) (a:b:c = 4:3:5)
const rCB = certifyBracketedRoot(
  (a) => wArcC() - wAreaB(a),
  1e-6,
  Math.PI / 2 - 1e-6,
  'Canonical (C,B)'
);
rCB.shareAtMid = wArcC();
assertClose(rCB.rootRad, Math.atan2(4, 3), 'Canonical (C,B) exact atan(4/3)', 1e-13);

// 6. (C, A): wArcC - wAreaA = 0, exact root alpha = atan(3/4) (a:b:c = 3:4:5)
const rCA = certifyBracketedRoot(
  (a) => wArcC() - wAreaA(a),
  1e-6,
  Math.PI / 2 - 1e-6,
  'Canonical (C,A)'
);
rCA.shareAtMid = wArcC();
assertClose(rCA.rootRad, Math.atan2(3, 4), 'Canonical (C,A) exact atan(3/4)', 1e-13);

// Mirror symmetry checks in Canonical alpha:
assertClose(rAA.rootDeg + rBB.rootDeg, 90, 'Mirror rAA + rBB = 90 deg', 1e-12);
assertClose(rAC.rootDeg + rBC.rootDeg, 90, 'Mirror rAC + rBC = 90 deg', 1e-12);
assertClose(rCA.rootDeg + rCB.rootDeg, 90, 'Mirror rCA + rCB = 90 deg', 1e-12);

// ============================================================================
// 3. Cross-Check Against Canonical Stand & Legacy Exp 06 Implementation
// ============================================================================
const legCrossings = findCrossSystemShareCoincidences();

// Legacy Exp 06 already uses standard opposite-side A/a, B/b, C/c labels,
// differing from Canonical ONLY by input parameterization alphaExp06 === Canonical beta = 90 - alpha!
assertClose(legCrossings.alphaArcAEqualsAreaADeg, 90 - rAA.rootDeg, 'Legacy (A,a) === Canonical (A,A) via beta=90-alpha', 1e-11);
assertClose(legCrossings.alphaArcBEqualsAreaBDeg, 90 - rBB.rootDeg, 'Legacy (B,b) === Canonical (B,B) via beta=90-alpha', 1e-11);
assertClose(legCrossings.alphaArcBEqualsAreaCDeg, 90 - rBC.rootDeg, 'Legacy (B,c) === Canonical (B,C) via beta=90-alpha', 1e-11);
assertClose(legCrossings.alphaArcAEqualsAreaCDeg, 90 - rAC.rootDeg, 'Legacy (A,c) === Canonical (A,C) via beta=90-alpha', 1e-11);
assertClose(legCrossings.alphaArcCEqualsAreaBDeg, 90 - rCB.rootDeg, 'Legacy (C,b) === Canonical (C,B) via beta=90-alpha', 1e-11);
assertClose(legCrossings.alphaArcCEqualsAreaADeg, 90 - rCA.rootDeg, 'Legacy (C,a) === Canonical (C,A) via beta=90-alpha', 1e-11);

// Verify Canonical Four Circles Stand (sideA, sideB) matches exact formulas at all 6 roots
for (const [label, root] of [
  ['(A,A)', rAA],
  ['(B,B)', rBB],
  ['(B,C)', rBC],
  ['(A,C)', rAC],
  ['(C,B)', rCB],
  ['(C,A)', rCA],
] as const) {
  const m = calculateCanonicalFourCircles(Math.sin(root.rootRad), Math.cos(root.rootRad));
  const legacyAtBeta = computeArcSideAreaPoint(m.incircleKi.radius, m.triangle.angleBetaDeg);
  assertClose(m.incenterPartition.arcShareA, wArcA(root.rootRad), `${label}: Canonical arcShareA`);
  assertClose(m.incenterPartition.arcShareB, wArcB(root.rootRad), `${label}: Canonical arcShareB`);
  assertClose(m.incenterPartition.areaShareA, wAreaA(root.rootRad), `${label}: Canonical areaShareA`);
  assertClose(m.incenterPartition.areaShareB, wAreaB(root.rootRad), `${label}: Canonical areaShareB`);
  assertClose(m.incenterPartition.areaShareC, wAreaC(root.rootRad), `${label}: Canonical areaShareC`);
  // Cross-verify against Legacy Exp 06 at beta = m.triangle.angleBetaDeg
  assertClose(m.incenterPartition.areaShareA, legacyAtBeta.areaShareA, `${label}: matches Legacy areaShareA`);
  assertClose(m.incenterPartition.areaShareB, legacyAtBeta.areaShareB, `${label}: matches Legacy areaShareB`);
  assertClose(m.incenterPartition.areaShareC, legacyAtBeta.areaShareC, `${label}: matches Legacy areaShareC`);
  assertClose(m.incenterPartition.arcShareA, legacyAtBeta.arcShareA, `${label}: matches Legacy arcShareA`);
  assertClose(m.incenterPartition.arcShareB, legacyAtBeta.arcShareB, `${label}: matches Legacy arcShareB`);
}

// ============================================================================
// 4. Special Cases: 3:4:5, 4:3:5, Isosceles 45 deg, Limits 0+ and 90-
// ============================================================================
{
  // 3:4:5 (Canonical sideA=3, sideB=4, sideC=5, r=1, S=6, p=6)
  const tri345 = calculateCanonicalFourCircles(3, 4);
  assertClose(tri345.triangle.angleAlphaDeg, Math.atan2(3, 4) * RAD2DEG, '3:4:5 alpha = atan(3/4)');
  assertClose(tri345.incenterPartition.areaShareA, 3 / 12, '3:4:5 w_area_A = 1/4 = w_arc_C');
  assertClose(tri345.incenterPartition.areaShareB, 4 / 12, '3:4:5 w_area_B = 1/3');
  assertClose(tri345.incenterPartition.areaShareC, 5 / 12, '3:4:5 w_area_C = 5/12');

  // 4:3:5 (Canonical sideA=4, sideB=3, sideC=5, r=1, S=6, p=6)
  const tri435 = calculateCanonicalFourCircles(4, 3);
  assertClose(tri435.triangle.angleAlphaDeg, Math.atan2(4, 3) * RAD2DEG, '4:3:5 alpha = atan(4/3)');
  assertClose(tri435.incenterPartition.areaShareA, 4 / 12, '4:3:5 w_area_A = 1/3');
  assertClose(tri435.incenterPartition.areaShareB, 3 / 12, '4:3:5 w_area_B = 1/4 = w_arc_C');
  assertClose(tri435.incenterPartition.areaShareC, 5 / 12, '4:3:5 w_area_C = 5/12');

  // Isosceles 45 deg
  const iso = calculateCanonicalFourCircles(1, 1);
  assertClose(iso.incenterPartition.arcShareA, 0.375, '45 deg: wArcA = 3/8');
  assertClose(iso.incenterPartition.arcShareB, 0.375, '45 deg: wArcB = 3/8');
  assertClose(iso.incenterPartition.arcShareC, 0.25, '45 deg: wArcC = 1/4');
  assertClose(iso.incenterPartition.areaShareA, 1 / (2 + Math.SQRT2), '45 deg: wAreaA');
  assertClose(iso.incenterPartition.areaShareB, 1 / (2 + Math.SQRT2), '45 deg: wAreaB');
  assertClose(iso.incenterPartition.areaShareC, Math.SQRT2 - 1, '45 deg: wAreaC = sqrt(2)-1');
}

console.log('=== Certified Roots in Canonical Notation (alpha = angle(A) in (0, 90) deg) ===');
for (const [id, r] of [
  ['1. wArcA = wAreaA', rAA],
  ['2. wArcB = wAreaB', rBB],
  ['3. wArcB = wAreaC', rBC],
  ['4. wArcA = wAreaC', rAC],
  ['5. wArcC = wAreaB (4:3:5)', rCB],
  ['6. wArcC = wAreaA (3:4:5)', rCA],
] as const) {
  console.log(
    `${id}: alpha=${r.rootDeg.toFixed(12)}° (beta=${(90 - r.rootDeg).toFixed(12)}°), halfErr<=${r.halfWidthDeg.toExponential(2)}°, |res|=${Math.abs(r.residualAtMid).toExponential(2)}, share=${(r.shareAtMid * 100).toFixed(8)}%`
  );
}

console.log('\nSTAGE 4 EXPERIMENT 06 STRICT ROOT AUDIT — ALL ANALYTICAL & NUMERICAL CHECKS PASSED!');
