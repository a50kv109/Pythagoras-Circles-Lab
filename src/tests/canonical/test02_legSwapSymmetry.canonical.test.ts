/**
 * @license
 * SPDX-License-Identifier: MIT
 */

/**
 * CANONICAL MIGRATED TEST #2 (`CT-02`, migrated from Legacy `LT-02`:
 *   src/tests/geometry.test.ts, Section 2: Symmetry Under Leg Swap)
 *
 * Mathematical Claim (Canonical Opposite-Side Notation):
 *   Under leg-swap involution (sideA, sideB) <-> (sideB, sideA) (geometric reflection across y = x):
 *     1. Exterior squares and inscribed circles on legs exchange roles and reflect coordinates (x, y) <-> (y, x):
 *          squareA(sideA, sideB) <-> squareB(sideB, sideA)
 *          circleKa(sideA, sideB) <-> circleKb(sideB, sideA)
 *     2. Acute vertex angles and incenter partitions exchange roles:
 *          angleAlpha <-> angleBeta, subtriangleAreaA <-> subtriangleAreaB, arcAngleA <-> arcAngleB
 *     3. Symmetric hypotenuse & circle invariants are preserved:
 *          sideC, squareC, circleKc, circumcircleKo, incircleKi (center, radius, area), perimeter, triangleArea.
 *     4. Verified both purely on Canonical Shadow Stand AND semantically against Legacy LT-02 via verifyLegacyToCanonicalMapping.
 */

import assert from 'node:assert/strict';
import {
  calculateCanonicalFourCircles,
  validateCanonicalFourCirclesInvariants,
  verifyLegacyToCanonicalMapping,
} from '../../canonical/index.ts';
import { calculateFourCircles as calculateLegacyFourCircles } from '../../math/FourCirclesModel.ts';

const TOL = 1e-9;

function assertClose(actual: number, expected: number, message: string, tol = TOL): void {
  const diff = Math.abs(actual - expected);
  assert.ok(diff <= tol, `${message}: expected ${expected}, got ${actual} (diff=${diff})`);
}

console.log('Running Canonical Shadow Stand Test CT-02 (Migrated from LT-02: Leg-Swap Symmetry)...\n');

// ============================================================================
// Part A: Pure Canonical Leg-Swap Symmetry (Zero Legacy Calls)
// ============================================================================
const canonicalSwapPairs: Array<{ sideA: number; sideB: number; label: string }> = [
  { sideA: 7, sideB: 3, label: '(sideA=7, sideB=3) <- Legacy (3, 7)' },
  { sideA: 1.25, sideB: 4.8, label: '(sideA=1.25, sideB=4.8) non-integer pair' },
];

for (const tc of canonicalSwapPairs) {
  const m1 = calculateCanonicalFourCircles(tc.sideA, tc.sideB);
  const m2 = calculateCanonicalFourCircles(tc.sideB, tc.sideA);

  // Reproducibility check (two independent calls yield identical results)
  const m1Repeat = calculateCanonicalFourCircles(tc.sideA, tc.sideB);
  assert.deepEqual(m1, m1Repeat, `${tc.label}: pure canonical calculation must be strictly reproducible`);

  // Both configurations satisfy all 8 canonical invariants
  for (const inv of validateCanonicalFourCirclesInvariants(m1, TOL)) {
    assert.ok(inv.isValid, `${tc.label} m1 invariant failed: ${inv.id}`);
  }
  for (const inv of validateCanonicalFourCirclesInvariants(m2, TOL)) {
    assert.ok(inv.isValid, `${tc.label} m2 invariant failed: ${inv.id}`);
  }

  // 1. Exchange of Ka and Kb areas, radii, diameters, circumferences, and y=x center reflection
  assertClose(m1.circleKa.area, m2.circleKb.area, `${tc.label}: swaps Ka(m1) === Kb(m2)`);
  assertClose(m1.circleKb.area, m2.circleKa.area, `${tc.label}: swaps Kb(m1) === Ka(m2)`);
  assertClose(m1.circleKa.diameter, m2.circleKb.diameter, `${tc.label}: swaps d_a(m1) === d_b(m2)`);
  assertClose(m1.circleKa.center.x, m2.circleKb.center.y, `${tc.label}: center reflection (x <-> y) for Ka->Kb`);
  assertClose(m1.circleKa.center.y, m2.circleKb.center.x, `${tc.label}: center reflection (y <-> x) for Ka->Kb`);
  assertClose(m1.squareA.area, m2.squareB.area, `${tc.label}: swaps Qa(m1) === Qb(m2)`);

  // 2. Preservation of Kc, Ko, Ki, sideC, and triangle scalars
  assertClose(m1.circleKc.area, m2.circleKc.area, `${tc.label}: preserves Kc`);
  assertClose(m1.circleKc.center.x, m2.circleKc.center.x, `${tc.label}: preserves Kc center.x`);
  assertClose(m1.circleKc.center.y, m2.circleKc.center.y, `${tc.label}: preserves Kc center.y`);
  assertClose(m1.circumcircleKo.area, m2.circumcircleKo.area, `${tc.label}: preserves Ko`);
  assertClose(m1.incircleKi.radius, m2.incircleKi.radius, `${tc.label}: preserves inradius r`);
  assertClose(m1.incircleKi.area, m2.incircleKi.area, `${tc.label}: preserves Ki`);
  assertClose(m1.triangle.sideC, m2.triangle.sideC, `${tc.label}: preserves hypotenuse sideC`);
  assertClose(m1.triangle.triangleArea, m2.triangle.triangleArea, `${tc.label}: preserves triangleArea S`);

  // 3. Opposite-angle & incenter-partition involution
  assertClose(m1.triangle.angleAlphaDeg, m2.triangle.angleBetaDeg, `${tc.label}: swaps angleAlpha <-> angleBeta`);
  assertClose(m1.triangle.angleBetaDeg, m2.triangle.angleAlphaDeg, `${tc.label}: swaps angleBeta <-> angleAlpha`);
  assertClose(
    m1.incenterPartition.subtriangleAreaA,
    m2.incenterPartition.subtriangleAreaB,
    `${tc.label}: swaps subtriangleAreaA <-> subtriangleAreaB`
  );
  assertClose(
    m1.incenterPartition.arcAngleADeg,
    m2.incenterPartition.arcAngleBDeg,
    `${tc.label}: swaps arcAngleA <-> arcAngleB`
  );

  // 4. Tangency point reflection across y = x
  assertClose(m1.incircleKi.tangencySideA.x, m2.incircleKi.tangencySideB.y, `${tc.label}: T_a <-> T_b (x<->y)`);
  assertClose(m1.incircleKi.tangencySideA.y, m2.incircleKi.tangencySideB.x, `${tc.label}: T_a <-> T_b (y<->x)`);
  assertClose(m1.incircleKi.tangencySideC.x, m2.incircleKi.tangencySideC.y, `${tc.label}: T_c reflects x <-> y`);
}

// ============================================================================
// Part B: Semantic Comparison Against Legacy LT-02 Pair (3, 7) <-> (7, 3)
// ============================================================================
{
  // In LT-02: s1 = calculateLegacyFourCircles(legOA=3, legOB=7) -> canonical (sideA=7, sideB=3)
  //            s2 = calculateLegacyFourCircles(legOA=7, legOB=3) -> canonical (sideA=3, sideB=7)
  const legacyS1 = calculateLegacyFourCircles(3, 7);
  const legacyS2 = calculateLegacyFourCircles(7, 3);

  const canonDirect1 = calculateCanonicalFourCircles(7, 3);
  const canonDirect2 = calculateCanonicalFourCircles(3, 7);

  const map1 = verifyLegacyToCanonicalMapping(legacyS1, 1e-12);
  const map2 = verifyLegacyToCanonicalMapping(legacyS2, 1e-12);

  assert.equal(map1.mapping.overallEquivalencePassed, true, 'Semantic bridge failed for Legacy (3,7)');
  assert.equal(map2.mapping.overallEquivalencePassed, true, 'Semantic bridge failed for Legacy (7,3)');

  // Verify geometric identity:
  // Legacy s1.circleA (on OA, length 3) === Canonical canonDirect1.circleKb (on AC, sideB=3)
  // Legacy s2.circleB (on OB, length 3) === Canonical canonDirect2.circleKa (on BC, sideA=3)
  assertClose(legacyS1.circleA.area, canonDirect1.circleKb.area, 'Legacy s1.circleA === Canonical(7,3).circleKb');
  assertClose(legacyS2.circleB.area, canonDirect2.circleKa.area, 'Legacy s2.circleB === Canonical(3,7).circleKa');
  assertClose(
    canonDirect1.circleKb.area,
    canonDirect2.circleKa.area,
    'Canonical swap preserves correspondence with Legacy LT-02'
  );
  assertClose(legacyS1.circleC.area, canonDirect1.circleKc.area, 'Legacy Kc matches Canonical Kc');
  assertClose(legacyS1.incircle.radius, canonDirect1.incircleKi.radius, 'Legacy r matches Canonical r');
  assertClose(legacyS1.incircle.area, canonDirect1.incircleKi.area, 'Legacy Ki matches Canonical Ki');

  console.log(
    `✓ Semantic Legacy<->Canonical swap verified: maxDev(3,7)=${map1.mapping.maxDeviation.toExponential(
      2
    )}, maxDev(7,3)=${map2.mapping.maxDeviation.toExponential(2)}`
  );
}

console.log('\nCANONICAL TEST CT-02 (2/23 MIGRATED) PASSED SUCCESSFULLY!');
