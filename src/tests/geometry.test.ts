/**
 * @license
 * SPDX-License-Identifier: MIT
 */

import assert from 'node:assert/strict';
import { calculateFourCircles } from '../math/FourCirclesModel.ts';
import { validateFourCirclesInvariants } from '../math/FourCirclesValidators.ts';
import { calculateRightTriangle } from '../math/RightTriangle.ts';
import { calculateSquareA, calculateSquareB, calculateSquareC } from '../math/SquareConstruction.ts';
import { InvalidTriangleInputError } from '../math/inputValidation.ts';

const TOL = 1e-9;

const EXPECTED_INVARIANT_IDS = [
  'incircle_positive',
  'squares_construction',
  'square_circles_tangency',
  'incircle_tangency',
  'four_circle_areas',
  'central_sqrt_identity',
  'pythagorean_circle_areas',
  'area_non_equality_contrast',
];

function assertClose(actual: number, expected: number, message: string, tol = TOL) {
  const diff = Math.abs(actual - expected);
  assert.ok(diff <= tol, `${message}: expected ${expected}, got ${actual} (diff=${diff})`);
}

const controlTriangles = [
  { a: 3, b: 4, expectedC: 5, expectedR: 1, label: '(3, 4, 5)' },
  { a: 4, b: 3, expectedC: 5, expectedR: 1, label: '(4, 3, 5)' },
  { a: 5, b: 12, expectedC: 13, expectedR: 2, label: '(5, 12, 13)' },
  { a: 4, b: 4, expectedC: 4 * Math.SQRT2, expectedR: 4 - 2 * Math.SQRT2, label: '(4, 4, 4√2)' },
  { a: 1, b: 10, expectedC: Math.sqrt(101), expectedR: (11 - Math.sqrt(101)) / 2, label: '(1, 10, √101)' },
  { a: 10, b: 1, expectedC: Math.sqrt(101), expectedR: (11 - Math.sqrt(101)) / 2, label: '(10, 1, √101)' },
];

console.log('Running Pythagoras — Four Circles Laboratory Test Suite...\n');

// ============================================================================
// 1. Control Triangles Verification: (3,4,5), (5,12,13), (4,4,4√2), (1,10,√101)
// ============================================================================
for (const tc of controlTriangles) {
  const calc = calculateFourCircles(tc.a, tc.b);
  const invariants = validateFourCirclesInvariants(calc, TOL);

  assert.deepEqual(
    invariants.map((inv) => inv.id),
    EXPECTED_INVARIANT_IDS,
    'Invariant IDs must match Four Circles specification'
  );

  for (const inv of invariants) {
    assert.ok(inv.isValid, `${tc.label} invariant failed: ${inv.name} (delta=${inv.delta})`);
  }

  // Hypotenuse & positive inradius
  assertClose(calc.triangle.c, tc.expectedC, `${tc.label} hypotenuse c`);
  assertClose(calc.incircle.radius, tc.expectedR, `${tc.label} inradius r`);
  assert.ok(calc.incircle.radius > 0, `${tc.label} inradius r must be strictly positive`);

  // Circle centers & diameters
  assertClose(calc.circleA.center.x, -tc.a / 2, `${tc.label} Oa.x`);
  assertClose(calc.circleA.center.y, tc.a / 2, `${tc.label} Oa.y`);
  assertClose(calc.circleA.diameter, tc.a, `${tc.label} da`);

  assertClose(calc.circleB.center.x, tc.b / 2, `${tc.label} Ob.x`);
  assertClose(calc.circleB.center.y, -tc.b / 2, `${tc.label} Ob.y`);
  assertClose(calc.circleB.diameter, tc.b, `${tc.label} db`);

  assertClose(calc.circleC.center.x, (tc.a + tc.b) / 2, `${tc.label} Oc.x`);
  assertClose(calc.circleC.center.y, (tc.a + tc.b) / 2, `${tc.label} Oc.y`);
  assertClose(calc.circleC.diameter, tc.expectedC, `${tc.label} dc`);

  assertClose(calc.incircle.center.x, tc.expectedR, `${tc.label} I.x`);
  assertClose(calc.incircle.center.y, tc.expectedR, `${tc.label} I.y`);

  // Four circle areas
  assertClose(calc.circleA.area, (Math.PI * tc.a * tc.a) / 4, `${tc.label} Ka`);
  assertClose(calc.circleB.area, (Math.PI * tc.b * tc.b) / 4, `${tc.label} Kb`);
  assertClose(calc.circleC.area, (Math.PI * tc.expectedC * tc.expectedC) / 4, `${tc.label} Kc`);
  assertClose(calc.incircle.area, Math.PI * tc.expectedR * tc.expectedR, `${tc.label} Ki`);

  // Central identity: sqrt(Ka) + sqrt(Kb) = sqrt(Kc) + sqrt(Ki)
  assertClose(calc.sqrtSumLegs, calc.sqrtSumHypAndIn, `${tc.label} central sqrt identity`);

  // Area contrast: Ka + Kb = Kc and Ka + Kb - Kc - Ki = -Ki != 0
  assertClose(calc.areaSumLegs, calc.circleC.area, `${tc.label} Ka + Kb = Kc`);
  assertClose(calc.areaMinusAll, -calc.incircle.area, `${tc.label} Ka + Kb - Kc - Ki = -Ki`);
  assert.ok(calc.areaMinusAll < 0, `${tc.label} area sum mismatch must be strictly negative (-Ki)`);

  console.log(`✓ Control triangle ${tc.label}: all 8 invariants, tangencies, and central identity passed.`);
}

// ============================================================================
// 2. Symmetry Under Leg Swap (a <-> b)
// ============================================================================
const s1 = calculateFourCircles(3, 7);
const s2 = calculateFourCircles(7, 3);
assertClose(s1.circleA.area, s2.circleB.area, 'Leg swap exchanges Ka and Kb');
assertClose(s1.circleC.area, s2.circleC.area, 'Leg swap preserves Kc');
assertClose(s1.incircle.radius, s2.incircle.radius, 'Leg swap preserves inradius r');
assertClose(s1.incircle.area, s2.incircle.area, 'Leg swap preserves Ki');
console.log('✓ Leg-swap symmetry (a <-> b) passed.');

// ============================================================================
// 3. Strict Input Validation Contract
// ============================================================================
const invalidPairs: Array<[number, number]> = [
  [0, 4],
  [4, 0],
  [-5, 4],
  [4, -0.001],
  [NaN, 4],
  [4, NaN],
  [Infinity, 4],
  [4, Infinity],
  [-Infinity, 4],
];

for (const [ia, ib] of invalidPairs) {
  assert.throws(
    () => calculateFourCircles(ia, ib),
    InvalidTriangleInputError,
    `calculateFourCircles(${ia}, ${ib}) must reject invalid input`
  );
  assert.throws(
    () => calculateRightTriangle(ia, ib),
    InvalidTriangleInputError,
    `calculateRightTriangle(${ia}, ${ib}) must reject invalid input`
  );
  assert.throws(
    () => calculateSquareC(ia, ib),
    InvalidTriangleInputError,
    `calculateSquareC(${ia}, ${ib}) must reject invalid input`
  );
}
assert.throws(() => calculateSquareA(0), InvalidTriangleInputError);
assert.throws(() => calculateSquareB(-1), InvalidTriangleInputError);
console.log('✓ Input validation rejected all invalid values (0, <0, NaN, ±Infinity).');

// ============================================================================
// 4. Micro, Macro & Extreme Aspect Ratio Stability
// ============================================================================
const scaleCases: Array<[number, number]> = [
  [1e-6, 1e-6],
  [1e-4, 3e-4],
  [0.2, 15],
  [15, 0.2],
  [1, 1e5],
  [1e5, 1],
  [1e50, 2e50],
];

for (const [sa, sb] of scaleCases) {
  const calc = calculateFourCircles(sa, sb);
  const invs = validateFourCirclesInvariants(calc, TOL);
  for (const inv of invs) {
    assert.ok(inv.isValid, `Scale/aspect case (${sa}, ${sb}) failed ${inv.id}: delta=${inv.delta}`);
  }
}
console.log('✓ Micro, macro, and extreme aspect ratio stability tests passed.');

// ============================================================================
// 5. Mutation Tests (Validators Must Catch Broken Geometry / Identities)
// ============================================================================
{
  const base = calculateFourCircles(4, 3);

  // 5a. Perturb incircle center
  const shiftedIncenter = {
    ...base,
    incircle: { ...base.incircle, center: { x: base.incircle.center.x + 0.05, y: base.incircle.center.y } },
  };
  const m1 = Object.fromEntries(validateFourCirclesInvariants(shiftedIncenter, TOL).map((i) => [i.id, i]));
  assert.equal(m1['incircle_positive'].isValid, false, 'Shifted incenter must fail incircle_positive');
  assert.equal(m1['incircle_tangency'].isValid, false, 'Shifted incenter must fail incircle_tangency');

  // 5b. Perturb Ki area (e.g. mistakenly using excircle instead of incircle)
  const wrongKi = {
    ...base,
    incircle: { ...base.incircle, area: base.incircle.area * 4 },
  };
  const m2 = Object.fromEntries(validateFourCirclesInvariants(wrongKi, TOL).map((i) => [i.id, i]));
  assert.equal(m2['four_circle_areas'].isValid, false, 'Wrong Ki area must fail four_circle_areas');
  assert.equal(m2['central_sqrt_identity'].isValid, false, 'Wrong Ki area must fail central_sqrt_identity');

  // 5c. Perturb Qc vertex
  const skewedQc = {
    ...base,
    squareC: { ...base.squareC, Bc: { x: base.squareC.Bc.x + 0.2, y: base.squareC.Bc.y } },
  };
  const m3 = Object.fromEntries(validateFourCirclesInvariants(skewedQc, TOL).map((i) => [i.id, i]));
  assert.equal(m3['squares_construction'].isValid, false, 'Skewed Qc must fail squares_construction');
  assert.equal(m3['square_circles_tangency'].isValid, false, 'Skewed Qc must fail square_circles_tangency');
}
import {
  computeFourCirclesSpectralAnalysis,
  evaluateParametricFourCircles,
  getNormalizedValuesForMode,
  legsFromRatioAndHypotenuse,
  sampleSpectralCurves,
} from '../math/FourCirclesSpectralAnalysis.ts';

// ============================================================================
// 6. Spectral Analysis Unit Tests
// ============================================================================
{
  const calc = calculateFourCircles(4, 3); // Egyptian (3,4,5), r=1
  const spectral = computeFourCirclesSpectralAnalysis(calc);

  assert.equal(spectral.items.length, 4, 'Spectral analysis must return exactly 4 items');

  // Total area sum check
  const sumAreas = spectral.items.reduce((acc, i) => acc + i.area, 0);
  assertClose(spectral.totalArea, sumAreas, 'Total area matches sum of item areas');

  // Percentage shares sum to 100%
  const sumPercent = spectral.items.reduce((acc, i) => acc + i.areaSharePercent, 0);
  assertClose(sumPercent, 100, 'Area percentage shares sum to 100%');

  // Perimeters check
  for (const item of spectral.items) {
    const expectedPerimeter = 2 * Math.PI * item.radius;
    assertClose(item.perimeter, expectedPerimeter, `Perimeter for ${item.id}`);
    assertClose(item.diameter, 2 * item.radius, `Diameter = 2*radius for ${item.id}`);
    assert.ok(Number.isFinite(item.area) && item.area > 0, `Area for ${item.id} must be finite & positive`);
    assert.ok(Number.isFinite(item.perimeter) && item.perimeter > 0, `Perimeter for ${item.id} must be finite & positive`);
  }

  // Leg swap symmetry test for spectral analysis
  const s1a = calculateFourCircles(3, 4);
  const s2a = calculateFourCircles(4, 3);
  const spec1 = computeFourCirclesSpectralAnalysis(s1a);
  const spec2 = computeFourCirclesSpectralAnalysis(s2a);

  const itemA1 = spec1.items.find((i) => i.id === 'Ka')!;
  const itemB2 = spec2.items.find((i) => i.id === 'Kb')!;
  assertClose(itemA1.area, itemB2.area, 'Ka(3,4) equals Kb(4,3)');
}
console.log('✓ Spectral analysis unit tests passed successfully.');

// ============================================================================
// 7. Parametric Spectral Graph & Synchronization Tests (t = 0.1, 0.5, 1, 2, 10)
// ============================================================================
{
  const testRatios = [0.1, 0.5, 1.0, 2.0, 10.0];

  for (const t of testRatios) {
    const p = evaluateParametricFourCircles(t);

    // Independent reference calculations (a = 1, b = t)
    const refC = Math.sqrt(1 + t * t);
    const refR = (1 + t - refC) / 2;

    const refKa = Math.PI / 4;
    const refKb = (Math.PI * t * t) / 4;
    const refKc = (Math.PI * (1 + t * t)) / 4;
    const refKi = Math.PI * refR * refR;

    const refPa = Math.PI;
    const refPb = Math.PI * t;
    const refPc = Math.PI * refC;
    const refPi = 2 * Math.PI * refR;

    // Positivity and finiteness
    assert.ok(p.rNorm > 0 && Number.isFinite(p.rNorm), `t=${t}: r must be positive & finite`);
    for (const k of ['Ka', 'Kb', 'Kc', 'Ki'] as const) {
      assert.ok(p.areasAbs[k] > 0 && Number.isFinite(p.areasAbs[k]), `t=${t}: area ${k} positive`);
      assert.ok(p.radiiAbs[k] > 0 && Number.isFinite(p.radiiAbs[k]), `t=${t}: radius ${k} positive`);
      assert.ok(Number.isFinite(p.areas[k]), `t=${t}: normalized area ${k} finite`);
      assert.ok(Number.isFinite(p.perimeters[k]), `t=${t}: normalized perimeter ${k} finite`);
      assert.ok(Number.isFinite(p.radii[k]), `t=${t}: normalized radius ${k} finite`);
      assert.ok(Number.isFinite(p.diameters[k]), `t=${t}: normalized diameter ${k} finite`);
    }

    // Mode A: Areas normalized to Kc
    assertClose(p.areas.Ka, refKa / refKc, `t=${t}: Ka/Kc`);
    assertClose(p.areas.Kb, refKb / refKc, `t=${t}: Kb/Kc`);
    assertClose(p.areas.Kc, 1.0, `t=${t}: Kc/Kc`);
    assertClose(p.areas.Ki, refKi / refKc, `t=${t}: Ki/Kc`);

    // Pythagorean area sum: Ka + Kb = Kc => Ka/Kc + Kb/Kc = 1
    assertClose(p.areasAbs.Ka + p.areasAbs.Kb, p.areasAbs.Kc, `t=${t}: Ka + Kb = Kc`);
    assertClose(p.areas.Ka + p.areas.Kb, 1.0, `t=${t}: Ka/Kc + Kb/Kc = 1`);

    // Central identity: sqrt(Ka) + sqrt(Kb) = sqrt(Kc) + sqrt(Ki)
    const lhsSqrt = Math.sqrt(p.areasAbs.Ka) + Math.sqrt(p.areasAbs.Kb);
    const rhsSqrt = Math.sqrt(p.areasAbs.Kc) + Math.sqrt(p.areasAbs.Ki);
    assertClose(lhsSqrt, rhsSqrt, `t=${t}: central sqrt identity`);
    assertClose(p.identityResidualAbs, 0, `t=${t}: identity residual`);

    // Mode B: Perimeters normalized to Pc
    assertClose(p.perimeters.Ka, refPa / refPc, `t=${t}: Pa/Pc`);
    assertClose(p.perimeters.Kb, refPb / refPc, `t=${t}: Pb/Pc`);
    assertClose(p.perimeters.Kc, 1.0, `t=${t}: Pc/Pc`);
    assertClose(p.perimeters.Ki, refPi / refPc, `t=${t}: Pi/Pc`);

    // Mode C: Radii and Diameters normalized curves must coincide (D = 2R)
    for (const k of ['Ka', 'Kb', 'Kc', 'Ki'] as const) {
      assertClose(p.radii[k], p.diameters[k], `t=${t}: normalized radius == normalized diameter for ${k}`);
      assertClose(p.radii[k], p.perimeters[k], `t=${t}: normalized radius == normalized perimeter for ${k}`);
    }

    // Synchronization check: legsFromRatioAndHypotenuse -> calculateFourCircles -> same normalized ratios
    const { a: syncA, b: syncB } = legsFromRatioAndHypotenuse(t, 5);
    assertClose(syncB / syncA, t, `t=${t}: legsFromRatioAndHypotenuse preserves t = b/a`);
    const syncCalc = calculateFourCircles(syncA, syncB);
    const syncSpec = computeFourCirclesSpectralAnalysis(syncCalc);
    const syncById = Object.fromEntries(syncSpec.items.map((item) => [item.id, item]));
    assertClose(syncById.Ka.areaRatioToKc, p.areas.Ka, `t=${t}: synced Ka/Kc matches curve`);
    assertClose(syncById.Kb.areaRatioToKc, p.areas.Kb, `t=${t}: synced Kb/Kc matches curve`);
    assertClose(syncById.Ki.areaRatioToKc, p.areas.Ki, `t=${t}: synced Ki/Kc matches curve`);
    assertClose(syncById.Ki.radiusRatioToC, p.radii.Ki, `t=${t}: synced Ri/Rc matches curve`);
  }

  // Symmetry t = 1 exact checks
  const sym = evaluateParametricFourCircles(1.0);
  assertClose(sym.areas.Ka, 0.5, 'Symmetry t=1: Ka/Kc = 0.5');
  assertClose(sym.areas.Kb, 0.5, 'Symmetry t=1: Kb/Kc = 0.5');
  assertClose(sym.areas.Ki, 3 - 2 * Math.SQRT2, 'Symmetry t=1: Ki/Kc = 3 - 2√2');
  assertClose(sym.radii.Ka, Math.SQRT1_2, 'Symmetry t=1: Ra/Rc = 1/√2');
  assertClose(sym.radii.Kb, Math.SQRT1_2, 'Symmetry t=1: Rb/Rc = 1/√2');

  // Curve sampler includes symmetry point t = 1 and matches single-point evaluations
  const sampledAreas = sampleSpectralCurves({
    tMin: 0.1,
    tMax: 10,
    steps: 100,
    mode: 'areas',
    scaleMode: 'log',
  });
  assert.ok(sampledAreas.length >= 101, 'Sampled curve must have >= 101 points');
  const symSample = sampledAreas.find((pt) => Math.abs(pt.t - 1) < 1e-9);
  assert.ok(symSample, 'Sampled curve must explicitly contain symmetry point t = 1');
  assertClose(symSample!.Ka, 0.5, 'Sampled symmetry point Ka/Kc = 0.5');
  assertClose(symSample!.Ki, 3 - 2 * Math.SQRT2, 'Sampled symmetry point Ki/Kc');

  const sampledModeC = getNormalizedValuesForMode(sym, 'radii_diameters', 'diameter');
  assertClose(sampledModeC.Ka, Math.SQRT1_2, 'getNormalizedValuesForMode diameter matches 1/√2');
}
console.log('✓ Parametric spectral graph & synchronization tests (t = 0.1, 0.5, 1, 2, 10) passed.');

console.log('\nALL PYTHAGORAS — FOUR CIRCLES TESTS PASSED SUCCESSFULLY!');
