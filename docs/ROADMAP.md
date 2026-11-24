# Development Roadmap — Four-Circles Pythagorean Geometry Lab

The items below represent **proposed future directions** for the project. None of the features in this document are currently implemented.

---

## 1. Mathematical & Analytical Extensions

- **Additional Circle & Triangle Identities:**
  - Explore relationships involving the three **excircles** ($r_a = \frac{a+c-b}{2}$, $r_b = \frac{b+c-a}{2}$, $r_c = \frac{a+b+c}{2}$) alongside $K_i$ and the square-inscribed circles.
  - Examine the semiperimeter and circumradius ($R_{\triangle} = c/2$) connections with $K_c$ (whose radius equals the circumradius of $\triangle OAB$).
- **True Discrete Harmonic / Spectral Analysis Layer:**
  - If harmonic decomposition of the four-circle angular intervals ($N = 4$) is pursued as a dedicated analytical layer, implement an explicit DFT amplitude/phase/symmetry module separate from the current parametric ratio plots.
- **Additional Parametric Modes:**
  - Plot absolute area residual $K_i(t) / K_c(t)$ alongside normalized $\sqrt{K_x(t)} / \sqrt{K_c(t)}$ curves.
  - Plot sensitivities (analytical derivatives $\frac{d}{dt}(K_x/K_c)$ and $\frac{d}{dt}(R_i/R_c)$) showing explicitly where $d(R_i/R_c)/dt = 0$ at $t = 1$.

---

## 2. Data Export & Reproducibility

- **Parametric Dataset Export (CSV / JSON):**
  - Export sampled curve tables across $[t_{\min}, t_{\max}]$ (areas, perimeters, radii, diameters, and identity residuals) as CSV or JSON for external inspection in Python/NumPy/R/Mathematica.
- **Shareable URL State:**
  - Encode `(a, b)`, active module, and graph settings in URL query parameters for reproducible experiment links.

---

## 3. UI, Localization & Educational Features

- **Complete Multi-Language Support (`EN` / `UK` / `RU`):**
  - Move remaining Russian-only strings in `ControlsPanel.tsx`, `FourCirclesPanel.tsx`, `SpectralAnalysisPanel.tsx`, `InvariantsPanel.tsx`, and modals into `src/i18n/translations.ts` so switching to `EN` or `UK` translates 100% of the interface.
- **Guided Interactive Experiments:**
  - Built-in step-by-step inquiry scenarios (e.g., *"Why does $K_a + K_b = K_c$ hold while $\sqrt{K_a} + \sqrt{K_b} = \sqrt{K_c} + \sqrt{K_i}$?"*, *"Finding the maximum of $K_i/K_c$ at $t = 1$"*).
- **Self-Contained KaTeX & Font Bundling:**
  - Bundle `katex/dist/katex.min.css` locally via Vite instead of relying on an external CDN so the app works completely offline.

---

## 4. Verification & Repository Infrastructure

- **Browser & Component Testing:**
  - Add Vitest + React Testing Library tests for `SpectralAnalysisPanel` and `GeometryBoard`, plus Playwright E2E visual regression checks.
- **GitHub Actions CI Workflow:**
  - Automate `npm ci`, `npm test`, `npm run lint`, and `npm run build` on pull requests.
- **Repository Cleanup Before Tagging `v1.0.0`:**
  - Optionally remove `docs/archive/legacy-pythagorean-pants/` if archival history is no longer needed in the standalone release, and prune unused template dependencies from `package.json` after manual review.
