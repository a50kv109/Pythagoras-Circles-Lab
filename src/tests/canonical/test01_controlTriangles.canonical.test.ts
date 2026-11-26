/**
 * @license
 * SPDX-License-Identifier: MIT
 */

/**
 * CANONICAL MIGRATED TEST #1 (`CT-01`, migrated from Legacy `LT-01`:
 *   src/tests/geometry.test.ts, Section 1: Control Triangles Verification)
 *
 * Strictly uses the Canonical Opposite-Side Standard:
 *   - Right angle at C = (0, 0), gamma = 90 deg
 *   - Vertex A = (0, sideB) on +Oy, angle alpha = atan2(sideA, sideB)
 *   - Vertex B = (sideA, 0) on +Ox, angle beta  = atan2(sideB, sideA)
 *   - sideA = |BC| (opposite A), sideB = |AC| (opposite B), sideC = |AB| (opposite C)
 *   - squareA / circleKa built on BC (sideA), squareB / circleKb built on AC (sideB)
 *
 * Explicitly proves SEMANTIC EQUIVALENCE (not merely numeric equality) against
 * Legacy `calculateFourCircles(legOA, legOB)` via `verifyLegacyToCanonicalMapping`.
 */

import assert from 'node:assert/strict';
import {
  calculateCanonicalFourCircles,
  validateCanonicalFourCirclesInvariants,
  verifyLegacyToCanonicalMapping,
} from '../../canonical/index.ts';
import { calculateFourCircles as calculateLegacyFourCircles } from '../../math/FourCirclesModel.ts';

const TOL = 1e-9;

const EXPECTED_CANONICAL_INVARIANT_IDS = [
  'incircle_positive',
  'squares_construction',
  'square_circles_tangency',
  'incircle_tangency',
  'four_circle_areas',
  'central_sqrt_identity',
  'pythagorean_circle_areas',
  'area_non_equality_contrast',
] as const;

function assertClose(actual: number, expected: number, message: string, tol = TOL): void {
  const diff = Math.abs(actual - expected);
  assert.ok(diff <= tol, `${message}: expected ${expected}, got ${actual} (diff=${diff})`);
}

/**
 * Each control case records BOTH:
 *   - Legacy inputs (legOA = |OA| = sideB, legOB = |OB| = sideA) from LT-01
 *   - Canonical opposite-side inputs (sideA = |BC|, sideB = |AC|)
 */
const canonicalControlTriangles = [
  {
    legacyA_legOA: 3,
    legacyB_legOB: 4,
    sideA: 4,
    sideB: 3,
    expectedSideC: 5,
    expectedInradius: 1,
    label: 'Canonical (sideA=4, sideB=3, sideC=5) <- Legacy (3,4,5)',
  },
  {
    legacyA_legOA: 4,
    legacyB_legOB: 3,
    sideA: 3,
    sideB: 4,
    expectedSideC: 5,
    expectedInradius: 1,
    label: 'Canonical (sideA=3, sideB=4, sideC=5) <- Legacy (4,3,5)',
  },
  {
    legacyA_legOA: 5,
    legacyB_legOB: 12,
    sideA: 12,
    sideB: 5,
    expectedSideC: 13,
    expectedInradius: 2,
    label: 'Canonical (sideA=12, sideB=5, sideC=13) <- Legacy (5,12,13)',
  },
  {
    legacyA_legOA: 4,
    legacyB_legOB: 4,
    sideA: 4,
    sideB: 4,
    expectedSideC: 4 * Math.SQRT2,
    expectedInradius: 4 - 2 * Math.SQRT2,
    label: 'Canonical (sideA=4, sideB=4, sideC=4√2) <- Legacy (4,4,4√2)',
  },
  {
    legacyA_legOA: 1,
    legacyB_legOB: 10,
    sideA: 10,
    sideB: 1,
    expectedSideC: Math.sqrt(101),
    expectedInradius: (11 - Math.sqrt(101)) / 2,
    label: 'Canonical (sideA=10, sideB=1, sideC=√101) <- Legacy (1,10,√101)',
  },
  {
    legacyA_legOA: 10,
    legacyB_legOB: 1,
    sideA: 1,
    sideB: 10,
    expectedSideC: Math.sqrt(101),
    expectedInradius: (11 - Math.sqrt(101)) / 2,
    label: 'Canonical (sideA=1, sideB=10, sideC=√101) <- Legacy (10,1,√101)',
  },
] as const;

console.log('Running Canonical Shadow Stand Test CT-01 (Migrated from LT-01: Control Triangles)...\n');

for (const tc of canonicalControlTriangles) {
  // 1. Evaluate Canonical Shadow Stand purely from canonical opposite sides (sideA, sideB)
  const model = calculateCanonicalFourCircles(tc.sideA, tc.sideB);
  const invariants = validateCanonicalFourCirclesInvariants(model, TOL);

  assert.deepEqual(
    invariants.map((inv) => inv.id),
    [...EXPECTED_CANONICAL_INVARIANT_IDS],
    'Canonical invariant IDs must match specification'
  );
  for (const inv of invariants) {
    assert.ok(inv.isValid, `${tc.label} canonical invariant failed: ${inv.name} (delta=${inv.delta})`);
  }

  // 2. Canonical opposite-side geometry & monotonicity (sideA > sideB <=> alpha > beta)
  assertClose(model.triangle.sideA, tc.sideA, `${tc.label} sideA`);
  assertClose(model.triangle.sideB, tc.sideB, `${tc.label} sideB`);
  assertClose(model.triangle.sideC, tc.expectedSideC, `${tc.label} hypotenuse sideC`);
  assertClose(model.triangle.angleGammaDeg, 90, `${tc.label} right angle gamma = 90 deg`);
  assertClose(
    model.triangle.angleAlphaDeg + model.triangle.angleBetaDeg,
    90,
    `${tc.label} alpha + beta = 90 deg`
  );
  if (tc.sideA > tc.sideB) {
    assert.ok(
      model.triangle.angleAlphaDeg > model.triangle.angleBetaDeg,
      `${tc.label}: sideA > sideB must imply angleAlpha > angleBeta`
    );
  } else if (tc.sideB > tc.sideA) {
    assert.ok(
      model.triangle.angleBetaDeg > model.triangle.angleAlphaDeg,
      `${tc.label}: sideB > sideA must imply angleBeta > angleAlpha`
    );
  }

  // 3. Positive inradius & exact canonical circle centers/diameters/areas
  assertClose(model.incircleKi.radius, tc.expectedInradius, `${tc.label} inradius r`);
  assert.ok(model.incircleKi.radius > 0, `${tc.label} inradius r must be strictly positive`);

  // Ka is on sideA = BC along +Ox (IV quadrant): center (sideA/2, -sideA/2), diameter = sideA
  assertClose(model.circleKa.center.x, tc.sideA / 2, `${tc.label} O_Ka.x`);
  assertClose(model.circleKa.center.y, -tc.sideA / 2, `${tc.label} O_Ka.y`);
  assertClose(model.circleKa.diameter, tc.sideA, `${tc.label} d_a = sideA`);
  assertClose(model.circleKa.area, (Math.PI * tc.sideA * tc.sideA) / 4, `${tc.label} K_a`);

  // Kb is on sideB = AC along +Oy (II quadrant): center (-sideB/2, sideB/2), diameter = sideB
  assertClose(model.circleKb.center.x, -tc.sideB / 2, `${tc.label} O_Kb.x`);
  assertClose(model.circleKb.center.y, tc.sideB / 2, `${tc.label} O_Kb.y`);
  assertClose(model.circleKb.diameter, tc.sideB, `${tc.label} d_b = sideB`);
  assertClose(model.circleKb.area, (Math.PI * tc.sideB * tc.sideB) / 4, `${tc.label} K_b`);

  // Kc is on hypotenuse sideC = AB (I quadrant)
  assertClose(model.circleKc.center.x, (tc.sideA + tc.sideB) / 2, `${tc.label} O_Kc.x`);
  assertClose(model.circleKc.center.y, (tc.sideA + tc.sideB) / 2, `${tc.label} O_Kc.y`);
  assertClose(model.circleKc.diameter, tc.expectedSideC, `${tc.label} d_c = sideC`);
  assertClose(model.circleKc.area, (Math.PI * tc.expectedSideC * tc.expectedSideC) / 4, `${tc.label} K_c`);

  // Ki incircle center (r, r) & area
  assertClose(model.incircleKi.center.x, tc.expectedInradius, `${tc.label} I.x`);
  assertClose(model.incircleKi.center.y, tc.expectedInradius, `${tc.label} I.y`);
  assertClose(model.incircleKi.area, Math.PI * tc.expectedInradius * tc.expectedInradius, `${tc.label} K_i`);

  // 4. Central identity & area contrast
  assertClose(model.sqrtSumLegs, model.sqrtSumHypAndIn, `${tc.label} central sqrt identity`);
  assertClose(model.areaSumLegs, model.circleKc.area, `${tc.label} K_a + K_b = K_c`);
  assertClose(model.areaMinusAll, -model.incircleKi.area, `${tc.label} K_a + K_b - K_c - K_i = -K_i`);
  assert.ok(model.areaMinusAll < 0, `${tc.label} area sum mismatch must be strictly negative (-K_i)`);

  // 5. Canonical incenter partition consistency (S_A + S_B + S_C = S = p*r, sum phi = 360)
  assertClose(
    model.incenterPartition.subtriangleAreaSum,
    model.triangle.triangleArea,
    `${tc.label} S_A + S_B + S_C = S`
  );
  assertClose(
    model.triangle.semiperimeter * model.incircleKi.radius,
    model.triangle.triangleArea,
    `${tc.label} p*r = S`
  );
  assertClose(
    model.incenterPartition.arcAngleADeg +
      model.incenterPartition.arcAngleBDeg +
      model.incenterPartition.arcAngleCDeg,
    360,
    `${tc.label} phi_A + phi_B + phi_C = 360`
  );

  // 6. Strict Semantic Equivalence Proof against Legacy Stand (Vertex-Preserving Mapping)
  const legacyModel = calculateLegacyFourCircles(tc.legacyA_legOA, tc.legacyB_legOB);
  const { canonical: mappedCanonical, mapping } = verifyLegacyToCanonicalMapping(legacyModel, 1e-12);

  assert.equal(
    mapping.overallEquivalencePassed,
    true,
    `${tc.label} semantic equivalence failed: maxDeviation=${mapping.maxDeviation}`
  );
  assert.equal(mapping.vertices.legacyO_to_canonicalC.coordsMatch, true);
  assert.equal(mapping.vertices.legacyA_to_canonicalA.coordsMatch, true);
  assert.equal(mapping.vertices.legacyB_to_canonicalB.coordsMatch, true);

  // Verify explicitly that Legacy circleA corresponds to Canonical circleKb, and Legacy circleB to Canonical circleKa
  assertClose(
    mappedCanonical.circleKa.area,
    model.circleKa.area,
    `${tc.label} mapped K_a === canonical K_a`
  );
  assertClose(
    legacyModel.circleB.area,
    model.circleKa.area,
    `${tc.label} Legacy circleB (on OB) === Canonical circleKa (on BC)`
  );
  assertClose(
    legacyModel.circleA.area,
    model.circleKb.area,
    `${tc.label} Legacy circleA (on OA) === Canonical circleKb (on AC)`
  );
  assertClose(
    legacyModel.triangle.alphaDeg,
    model.triangle.angleAlphaDeg,
    `${tc.label} Legacy alphaDeg (at A) === Canonical angleAlphaDeg (at A)`
  );
  assertClose(
    legacyModel.triangle.betaDeg,
    model.triangle.angleBetaDeg,
    `${tc.label} Legacy betaDeg (at B) === Canonical angleBetaDeg (at B)`
  );

  console.log(
    `✓ ${tc.label}: 8 canonical invariants + opposite-side monotonicity + exact semantic Legacy↔Canonical bridge (maxDev=${mapping.maxDeviation.toExponential(
      2
    )}) PASSED.`
  );
}

console.log('\nCANONICAL TEST CT-01 (1/23 MIGRATED) PASSED SUCCESSFULLY!');
