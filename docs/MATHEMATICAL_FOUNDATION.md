# Mathematical Foundation — Four-Circles Pythagorean Geometry Lab

This document presents the complete mathematical model, coordinate constructions, algebraic derivations, dimensionless parametric representation, and analytical observations implemented in the **Four-Circles Pythagorean Geometry Lab** (`src/math/`).

Every formula below has been verified directly against the TypeScript implementation (`RightTriangle.ts`, `SquareConstruction.ts`, `FourCirclesModel.ts`, and `FourCirclesSpectralAnalysis.ts`) and cataloged in the UMFP registry ([`FORMULA_PASSPORTS.md`](FORMULA_PASSPORTS.md), [`FORMULA_DEPENDENCY_GRAPH.md`](FORMULA_DEPENDENCY_GRAPH.md)).

---

## 1. Right Triangle Geometry (`RightTriangle.ts` — `PCL-A01`–`PCL-A04`)

On the Euclidean plane $\mathbb{R}^2$ with standard orthonormal Cartesian coordinates $(x, y)$, let $a, b \in \mathbb{R}_{>0}$ be two finite positive real parameters (`assertValidLegs(a, b)`, `PCL-A01`).

1. **Vertices:**
   $$O = (0, 0), \qquad A = (0, a), \qquad B = (b, 0)$$
   - Leg $OA$ lies along the positive $+y$ axis with length $|OA| = a$.
   - Leg $OB$ lies along the positive $+x$ axis with length $|OB| = b$.
   - Right angle $\angle AOB = 90^\circ$ is fixed at the origin $O$.
2. **Hypotenuse ($c$):**
   $$c = |AB| = \sqrt{a^2 + b^2} > 0$$
   Implemented as `Math.hypot(validA, validB)` to prevent intermediate overflow/underflow.
3. **Acute Angles, Area, Perimeter, and Altitude:**
   - $\alpha = \angle OAB = \operatorname{atan2}(b, a)$, $\beta = \angle OBA = \operatorname{atan2}(a, b)$, with $\alpha + \beta = \frac{\pi}{2}$.
   - Area: $S_{\triangle OAB} = \frac{1}{2}ab$.
   - Perimeter: $P_{\triangle OAB} = a + b + c$.
   - Altitude to hypotenuse: $h_c = \frac{ab}{c} = a \sin\alpha$, foot $H = \left(b \frac{a^2}{c^2},\; a \frac{b^2}{c^2}\right)$.
   - Leg projections on $AB$: $c_a = \frac{a^2}{c}$, $c_b = \frac{b^2}{c}$.

---

## 2. Construction of the Three Exterior Squares (`SquareConstruction.ts` — `PCL-B05`–`PCL-B07`)

Three squares are constructed externally on the sides of $\triangle OAB$:

1. **Square $Q_a$ on vertical leg $OA$** (in Quadrant II, side length $a$, area $a^2$):
   $$O(0,0),\quad A(0,a),\quad C_a(-a, a),\quad D_a(-a, 0)$$
2. **Square $Q_b$ on horizontal leg $OB$** (in Quadrant IV, side length $b$, area $b^2$):
   $$O(0,0),\quad B(b,0),\quad C_b(b,-b),\quad D_b(0,-b)$$
3. **Square $Q_c$ on hypotenuse $AB$** (outward into Quadrant I, side length $c$, area $c^2$):
   $$A(0,a),\quad B(b,0),\quad B_c(b + a,\; b),\quad A_c(a,\; a + b)$$
   *Verification of orthogonality:* $\overrightarrow{AB} = (b, -a)$ and outward normal $\overrightarrow{BB_c} = (a, b)$ satisfy $\overrightarrow{AB} \cdot \overrightarrow{BB_c} = ba - ab = 0$ and $\|\overrightarrow{BB_c}\| = \sqrt{a^2+b^2} = c$.

---

## 3. Construction of the Four Circles (`FourCirclesModel.ts` — `PCL-C08`–`PCL-D15`)

### 3.1 Three Square-Inscribed Circles ($K_a, K_b, K_c$, `PCL-C08`–`PCL-C11`)

Each square of side $s$ inscribes a circle centered at the square's midpoint with radius $R = s/2$ and diameter $D = s$:

1. **Circle $K_a$ inside $Q_a$:**
   - Center: $O_a = \left(-\frac{a}{2},\; \frac{a}{2}\right)$, Radius: $R_a = \frac{a}{2}$, Diameter: $D_a = a$.
   - Tangency points on $Q_a$: $(0, \frac{a}{2}),\; (-\frac{a}{2}, a),\; (-a, \frac{a}{2}),\; (-\frac{a}{2}, 0)$.
   - Area:
     $$K_a = \pi \left(\frac{a}{2}\right)^2 = \frac{\pi a^2}{4}$$

2. **Circle $K_b$ inside $Q_b$:**
   - Center: $O_b = \left(\frac{b}{2},\; -\frac{b}{2}\right)$, Radius: $R_b = \frac{b}{2}$, Diameter: $D_b = b$.
   - Tangency points on $Q_b$: $(\frac{b}{2}, 0),\; (b, -\frac{b}{2}),\; (\frac{b}{2}, -b),\; (0, -\frac{b}{2})$.
   - Area:
     $$K_b = \pi \left(\frac{b}{2}\right)^2 = \frac{\pi b^2}{4}$$

3. **Circle $K_c$ inside $Q_c$:**
   - Center: $O_c = \left(\frac{a+b}{2},\; \frac{a+b}{2}\right)$, Radius: $R_c = \frac{c}{2}$, Diameter: $D_c = c$.
   - Tangency points on $Q_c$: $\left(\frac{b}{2}, \frac{a}{2}\right),\; \left(b+\frac{a}{2}, \frac{b}{2}\right),\; \left(a+\frac{b}{2}, b+\frac{a}{2}\right),\; \left(\frac{a}{2}, a+\frac{b}{2}\right)$.
   - Area:
     $$K_c = \pi \left(\frac{c}{2}\right)^2 = \frac{\pi c^2}{4}$$

### 3.2 Fourth Circle — Triangle Incircle $K_i$ (`PCL-D12`–`PCL-D15`)

The circle $K_i$ is inscribed strictly inside $\triangle OAB$:

- **Inradius ($r$):**
  $$r = \frac{a + b - c}{2} = \frac{ab}{a + b + c}$$
  *Implementation note:* `FourCirclesModel.ts` evaluates `rIn = (validA / (validA + validB + c)) * validB`, which is algebraically identical to $(a+b-c)/2$ and avoids subtractive cancellation when $a \ll b$ or $b \ll a$.
- **Incenter ($I$):** Because $K_i$ is tangent to both coordinate axes $+Ox$ and $+Oy$ inside Quadrant I, its center is $I = (r, r)$.
- **Diameter & Area:** $D_i = 2r$, $K_i = \pi r^2$.
- **Tangency Points:**
  $$T_a = (0, r) \text{ on } OA, \qquad T_b = (r, 0) \text{ on } OB, \qquad T_c = \left(r\left(1 + \frac{a}{c}\right),\; r\left(1 + \frac{b}{c}\right)\right) \text{ on } AB$$

---

## 4. Step-by-Step Derivation of the Central Identity (`PCL-E16`, `PCL-E17`)

### 4.1 Inradius Formula $r = \frac{a + b - c}{2}$

1. Equating the area of $\triangle OAB$ computed from legs and from semiperimeter $p = \frac{a+b+c}{2}$:
   $$\frac{1}{2}ab = pr = \frac{a + b + c}{2}\,r \implies r = \frac{ab}{a + b + c}$$
2. Multiply numerator and denominator by $(a + b - c)$:
   $$r = \frac{ab(a + b - c)}{(a + b)^2 - c^2} = \frac{ab(a + b - c)}{(a^2 + b^2 + 2ab) - c^2}$$
3. By the Pythagorean theorem, $a^2 + b^2 = c^2$, so the denominator simplifies to $2ab$:
   $$r = \frac{ab(a + b - c)}{2ab} = \frac{a + b - c}{2}$$

### 4.2 Central Four-Circle Square-Root Identity

Taking the positive square root of each of the four circle areas:
$$\sqrt{K_a} = \frac{\sqrt{\pi}}{2}a, \qquad \sqrt{K_b} = \frac{\sqrt{\pi}}{2}b, \qquad \sqrt{K_c} = \frac{\sqrt{\pi}}{2}c, \qquad \sqrt{K_i} = \sqrt{\pi}\,r = \frac{\sqrt{\pi}}{2}(a + b - c)$$

Evaluating both sides:
- **Left-hand side:**
  $$\sqrt{K_a} + \sqrt{K_b} = \frac{\sqrt{\pi}}{2}(a + b)$$
- **Right-hand side:**
  $$\sqrt{K_c} + \sqrt{K_i} = \frac{\sqrt{\pi}}{2}c + \frac{\sqrt{\pi}}{2}(a + b - c) = \frac{\sqrt{\pi}}{2}(a + b)$$

Therefore, for every right triangle with $a, b > 0$:
$$\sqrt{K_a} + \sqrt{K_b} = \sqrt{K_c} + \sqrt{K_i}$$

### 4.3 Contrast with Direct Circle Area Sums

Summing the areas directly (instead of their square roots) satisfies the Pythagorean relation for $K_a, K_b, K_c$:
$$K_a + K_b = \frac{\pi}{4}(a^2 + b^2) = \frac{\pi c^2}{4} = K_c$$
Subtracting $K_c + K_i$ gives:
$$K_a + K_b - K_c - K_i = -K_i = -\pi r^2 < 0$$
Thus $K_a + K_b = K_c + K_i$ never holds for any non-degenerate right triangle ($r > 0 \implies K_i > 0$).

---

## 5. Mathematical Assumptions

1. **Euclidean plane geometry:** Flat Euclidean metric ($\mathbb{R}^2$), standard $\pi$.
2. **Non-degeneracy:** Strictly positive finite legs $a > 0$, $b > 0$ (enforced by `assertValidLegs` in `inputValidation.ts`).
3. **Scale invariance of ratios:** Scaling $(a, b) \mapsto (\lambda a, \lambda b)$ for $\lambda > 0$ scales linear quantities ($c, r, R, D, P$) by $\lambda$, square roots $\sqrt{K}$ by $\lambda$, and areas ($K$) by $\lambda^2$. Hence all dimensionless ratios relative to $K_c$ depend solely on $t = b/a$.

---

## 6. Parametric Representation ($t = b / a$) and Normalized Curves (`PCL-F18`–`PCL-F24`)

In `FourCirclesSpectralAnalysis.ts`, setting the dimensionless leg ratio $t = b / a > 0$ and normalizing $a = 1, b = t$:
$$c(t) = \sqrt{1 + t^2}, \qquad r(t) = \frac{1 + t - \sqrt{1 + t^2}}{2} = \frac{t}{1 + t + \sqrt{1 + t^2}}$$

The implementation evaluates `calculateFourCircles(1, t)` (`evaluateParametricFourCircles(t)`) and plots four curves normalized to the hypotenuse circle $K_c$ over a configurable range (default $0.1 \le t \le 10$):

1. **Mode A — Normalized Areas ($K_x(t) / K_c(t)$):**
   $$\frac{K_a(t)}{K_c(t)} = \frac{1}{1 + t^2}, \qquad \frac{K_b(t)}{K_c(t)} = \frac{t^2}{1 + t^2}, \qquad \frac{K_c(t)}{K_c(t)} = 1, \qquad \frac{K_i(t)}{K_c(t)} = \frac{\left(1 + t - \sqrt{1+t^2}\right)^2}{1 + t^2}$$

2. **Mode B — Normalized Perimeters ($P_x(t) / P_c(t)$, where $P = 2\pi R = \pi D$):**
   $$\frac{P_a(t)}{P_c(t)} = \frac{1}{\sqrt{1 + t^2}}, \qquad \frac{P_b(t)}{P_c(t)} = \frac{t}{\sqrt{1 + t^2}}, \qquad \frac{P_c(t)}{P_c(t)} = 1, \qquad \frac{P_i(t)}{P_c(t)} = \frac{1 + t - \sqrt{1 + t^2}}{\sqrt{1 + t^2}}$$

3. **Mode C — Normalized Radii and Diameters ($R_x(t)/R_c(t)$ and $D_x(t)/D_c(t)$):**
   Since $D_x = 2R_x$ and $P_x = 2\pi R_x = \pi D_x$, the dimensionless ratios satisfy:
   $$\frac{R_x(t)}{R_c(t)} \equiv \frac{D_x(t)}{D_c(t)} \equiv \frac{P_x(t)}{P_c(t)} \qquad \forall x \in \{a, b, c, i\}$$
   The UI provides a `Radius | Diameter` switch that updates labels and absolute readouts ($R$ vs. $D$) while plotting identical normalized curves without artificial distortion.

---

## 7. Analytical Observations from Parametric Analysis

1. **Exact Symmetry at $t = 1$ (Isosceles Right Triangle $a = b$):**
   - $K_a(1)/K_c(1) = K_b(1)/K_c(1) = \frac{1}{2} = 0.5$.
   - $P_a(1)/P_c(1) = P_b(1)/P_c(1) = R_a(1)/R_c(1) = \frac{1}{\sqrt{2}} \approx 0.7071$.
   - The incircle-to-hypotenuse ratio achieves its **global maximum** at $t = 1$:
     $$\max_{t > 0} \frac{R_i(t)}{R_c(t)} = \frac{2 - \sqrt{2}}{\sqrt{2}} = \sqrt{2} - 1 \approx 0.41421, \qquad \max_{t > 0} \frac{K_i(t)}{K_c(t)} = (\sqrt{2} - 1)^2 = 3 - 2\sqrt{2} \approx 0.17157$$
2. **Reciprocal Duality ($t \leftrightarrow 1/t$):**
   Swapping legs ($a \leftrightarrow b$) maps $t \mapsto 1/t$, exchanging the $K_a$ and $K_b$ curves while leaving $K_c$ and $K_i$ invariant:
   $$\frac{K_a(1/t)}{K_c(1/t)} = \frac{K_b(t)}{K_c(t)}, \qquad \frac{K_i(1/t)}{K_c(1/t)} = \frac{K_i(t)}{K_c(t)}$$
   On the default logarithmic horizontal scale ($\log_{10} t$), this duality appears as exact mirror symmetry across the vertical line $t = 1$.
3. **Asymptotic Limits ($t \to 0^+$ or $t \to +\infty$):**
   As the triangle becomes arbitrarily slender ($t \to 0^+$ or $t \to \infty$), $K_i(t)/K_c(t) \to 0$ (approaching $\sim t^2$ as $t \to 0^+$ and $\sim 1/t^2$ as $t \to \infty$), while one leg-circle approaches $K_c$ and the other vanishes.

---

## 8. Mathematical Proof vs. Numerical Visualization

- **Deductive Proofs** (Section 4 and [`MATHEMATICAL_PROOFS.md`](MATHEMATICAL_PROOFS.md)) hold identically for **all** real $a, b > 0$ without tolerance bounds.
- **Numerical Computation & Interactive Plots** operate in IEEE-754 `float64` precision (~15–17 decimal digits, detailed in [`NUMERICAL_ANALYSIS.md`](NUMERICAL_ANALYSIS.md)), evaluated over discrete sampled points (`steps = 220` plus explicit inclusion of $t = 1$ in `sampleSpectralCurves`), and verified against analytical formulas within tolerance $\text{tol} = 10^{-9}$ (`FourCirclesValidators.ts`, `src/tests/geometry.test.ts`, [`VERIFICATION_MATRIX.md`](VERIFICATION_MATRIX.md)). Visualization confirms behavior over the inspected domain but does not replace algebraic proof.
