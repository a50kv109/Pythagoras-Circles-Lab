/**
 * @license
 * SPDX-License-Identifier: MIT
 */

/**
 * CANONICAL MIGRATED TEST #3 (`CT-03`, migrated from Legacy `LT-03`:
 *   src/tests/geometry.test.ts, Section 3: Strict Input Validation Contract)
 *
 * Mathematical Claim (Canonical Opposite-Side Notation):
 *   The canonical right triangle domain is strictly (sideA, sideB) in (0, +infinity)^2 subset of R^2,
 *   where sideA = |BC| (opposite A) and sideB = |AC| (opposite B).
 *   Zero, negative, NaN, and +/-Infinity inputs violate non-degeneracy / finiteness and MUST throw
 *   InvalidCanonicalTriangleInputError across all canonical entry points:
 *     - calculateCanonicalFourCircles(sideA, sideB)
 *     - buildCanonicalRightTriangle(sideA, sideB)
 *     - buildCanonicalSquareC(sideA, sideB)
 *     - buildCanonicalSquareA(sideA)
 *     - buildCanonicalSquareB(sideB)
 *     - assertValidCanonicalSide / assertValidCanonicalSides
 */

import assert from 'node:assert/strict';
import {
  InvalidCanonicalTriangleInputError,
  assertValidCanonicalSide,
  assertValidCanonicalSides,
  buildCanonicalRightTriangle,
  buildCanonicalSquareA,
  buildCanonicalSquareB,
  buildCanonicalSquareC,
  calculateCanonicalFourCircles,
} from '../../canonical/index.ts';
import { calculateFourCircles as calculateLegacyFourCircles } from '../../math/FourCirclesModel.ts';
import { calculateRightTriangle as calculateLegacyRightTriangle } from '../../math/RightTriangle.ts';
import {
  calculateSquareA as calculateLegacySquareA,
  calculateSquareB as calculateLegacySquareB,
  calculateSquareC as calculateLegacySquareC,
} from '../../math/SquareConstruction.ts';
import { InvalidTriangleInputError as LegacyInvalidTriangleInputError } from '../../math/inputValidation.ts';

console.log('Running Canonical Shadow Stand Test CT-03 (Migrated from LT-03: Strict Input Validation Contract)...\n');

// ============================================================================
// Part A: Pure Canonical Input Domain Validation Contract (Zero Legacy Calls)
// ============================================================================
// All 9 invalid pairs from LT-03 plus additional boundary pairs (-0, (4, -Infinity))
const invalidSidePairs: Array<{ sideA: number; sideB: number; badParam: 'sideA' | 'sideB' }> = [
  { sideA: 0, sideB: 4, badParam: 'sideA' },
  { sideA: 4, sideB: 0, badParam: 'sideB' },
  { sideA: -5, sideB: 4, badParam: 'sideA' },
  { sideA: 4, sideB: -0.001, badParam: 'sideB' },
  { sideA: Number.NaN, sideB: 4, badParam: 'sideA' },
  { sideA: 4, sideB: Number.NaN, badParam: 'sideB' },
  { sideA: Number.POSITIVE_INFINITY, sideB: 4, badParam: 'sideA' },
  { sideA: 4, sideB: Number.POSITIVE_INFINITY, badParam: 'sideB' },
  { sideA: Number.NEGATIVE_INFINITY, sideB: 4, badParam: 'sideA' },
  { sideA: 4, sideB: Number.NEGATIVE_INFINITY, badParam: 'sideB' },
  { sideA: -0, sideB: 4, badParam: 'sideA' },
];

for (const tc of invalidSidePairs) {
  assert.throws(
    () => calculateCanonicalFourCircles(tc.sideA, tc.sideB),
    (err: unknown) =>
      err instanceof InvalidCanonicalTriangleInputError && err.sideName === tc.badParam,
    `calculateCanonicalFourCircles(${tc.sideA}, ${tc.sideB}) must reject ${tc.badParam}`
  );
  assert.throws(
    () => buildCanonicalRightTriangle(tc.sideA, tc.sideB),
    (err: unknown) =>
      err instanceof InvalidCanonicalTriangleInputError && err.sideName === tc.badParam,
    `buildCanonicalRightTriangle(${tc.sideA}, ${tc.sideB}) must reject ${tc.badParam}`
  );
  assert.throws(
    () => buildCanonicalSquareC(tc.sideA, tc.sideB),
    (err: unknown) =>
      err instanceof InvalidCanonicalTriangleInputError && err.sideName === tc.badParam,
    `buildCanonicalSquareC(${tc.sideA}, ${tc.sideB}) must reject ${tc.badParam}`
  );
  assert.throws(
    () => assertValidCanonicalSides(tc.sideA, tc.sideB),
    InvalidCanonicalTriangleInputError,
    `assertValidCanonicalSides(${tc.sideA}, ${tc.sideB}) must throw`
  );
}

// Single-side square constructors Q_a (on sideA = BC) and Q_b (on sideB = AC)
const invalidSingleValues = [0, -1, -0, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
for (const badVal of invalidSingleValues) {
  assert.throws(
    () => buildCanonicalSquareA(badVal),
    (err: unknown) => err instanceof InvalidCanonicalTriangleInputError && err.sideName === 'sideA',
    `buildCanonicalSquareA(${badVal}) must reject invalid sideA`
  );
  assert.throws(
    () => buildCanonicalSquareB(badVal),
    (err: unknown) => err instanceof InvalidCanonicalTriangleInputError && err.sideName === 'sideB',
    `buildCanonicalSquareB(${badVal}) must reject invalid sideB`
  );
  assert.throws(() => assertValidCanonicalSide(badVal, 'sideA'), InvalidCanonicalTriangleInputError);
}

// Reproducibility & positive acceptance check
const validTriA = buildCanonicalSquareA(4);
const validTriB = buildCanonicalSquareB(3);
assert.equal(validTriA.id, 'Qa');
assert.equal(validTriA.attachedSide, 'sideA');
assert.equal(validTriB.id, 'Qb');
assert.equal(validTriB.attachedSide, 'sideB');

// ============================================================================
// Part B: Equivalence Check Against Legacy LT-03 Validation Contract
// ============================================================================
// Under Vertex-Preserving map: (legacy.a = sideB, legacy.b = sideA)
const lt03LegacyPairs: Array<[number, number]> = [
  [0, 4],
  [4, 0],
  [-5, 4],
  [4, -0.001],
  [Number.NaN, 4],
  [4, Number.NaN],
  [Number.POSITIVE_INFINITY, 4],
  [4, Number.POSITIVE_INFINITY],
  [Number.NEGATIVE_INFINITY, 4],
];

for (const [legA, legB] of lt03LegacyPairs) {
  // Mapped canonical pair: sideA = legB, sideB = legA
  const sideA = legB;
  const sideB = legA;

  let legacyThrew = false;
  let canonicalThrew = false;

  try {
    calculateLegacyFourCircles(legA, legB);
  } catch (err) {
    assert.ok(err instanceof LegacyInvalidTriangleInputError);
    legacyThrew = true;
  }

  try {
    calculateCanonicalFourCircles(sideA, sideB);
  } catch (err) {
    assert.ok(err instanceof InvalidCanonicalTriangleInputError);
    canonicalThrew = true;
  }

  assert.equal(legacyThrew, true, `Legacy must throw for (${legA}, ${legB})`);
  assert.equal(canonicalThrew, true, `Canonical must throw for mapped (${sideA}, ${sideB})`);

  assert.throws(() => calculateLegacyRightTriangle(legA, legB), LegacyInvalidTriangleInputError);
  assert.throws(() => buildCanonicalRightTriangle(sideA, sideB), InvalidCanonicalTriangleInputError);

  assert.throws(() => calculateLegacySquareC(legA, legB), LegacyInvalidTriangleInputError);
  assert.throws(() => buildCanonicalSquareC(sideA, sideB), InvalidCanonicalTriangleInputError);
}

// Legacy calculateSquareA(0) (vertical leg |OA|=0) corresponds to Canonical buildCanonicalSquareB(0) (sideB=0)
// Legacy calculateSquareB(-1) (horizontal leg |OB|=-1) corresponds to Canonical buildCanonicalSquareA(-1) (sideA=-1)
assert.throws(() => calculateLegacySquareA(0), LegacyInvalidTriangleInputError);
assert.throws(() => buildCanonicalSquareB(0), InvalidCanonicalTriangleInputError);
assert.throws(() => calculateLegacySquareB(-1), LegacyInvalidTriangleInputError);
assert.throws(() => buildCanonicalSquareA(-1), InvalidCanonicalTriangleInputError);

console.log('✓ Rejected all invalid pairs (0, -0, <0, NaN, ±Infinity) across Canonical & Legacy contracts with exact parameter role correspondence.');
console.log('\nCANONICAL TEST CT-03 (3/23 MIGRATED) PASSED SUCCESSFULLY!');
