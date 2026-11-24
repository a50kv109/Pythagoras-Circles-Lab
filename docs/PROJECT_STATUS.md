# Project Status — Four-Circles Pythagorean Geometry Lab

This document summarizes the verified current state of the repository based on direct inspection of the source code, test suite, and build configuration.

---

## 1. Implemented

- **Deterministic Four-Circles Core (`src/math/`):**
  - Right triangle geometry (`RightTriangle.ts`), three exterior squares (`SquareConstruction.ts`), three square-inscribed circles $K_a, K_b, K_c$, and cancellation-free triangle incircle $K_i$ (`FourCirclesModel.ts`), input contract (`inputValidation.ts`), and presets (`presets.ts`).
  - Scale-normalized validation of 8 geometric and algebraic invariants (`FourCirclesValidators.ts`).
- **Interactive Parametric Analysis (`FourCirclesSpectralAnalysis.ts`, `SpectralAnalysisPanel.tsx`):**
  - Dimensionless $t = b/a$ model evaluation via `calculateFourCircles(1, t)`.
  - Interactive SVG Cartesian function plot with 3 modes (Areas, Perimeters, Radii/Diameters with Radius/Diameter switch), logarithmic/linear horizontal axis toggle, zoom/reset (`[0.1, 10]`), symmetry line $t = 1$, symmetry sweep animation, clickable reference ratio cards (`0.1, 0.5, 1.0, 2.0, 10.0`), movable vertical cursor + 4 curve markers, and full synchronized numerical table.
  - Bidirectional synchronization with `App.tsx` via `handleChangeT` (`legsFromRatioAndHypotenuse`).
- **Interactive Geometry Board & Research Tools:**
  - Dragging vertices $A(0,a)$ and $B(b,0)$, pan/zoom, layer filters, hover inspection (`GeometryBoard.tsx`, `FourCirclesView.tsx`, `RightTriangleView.tsx`, `CoordinateGrid.tsx`).
  - Live identity & invariant observers (`FourCirclesPanel.tsx`, `InvariantsPanel.tsx`), side-by-side comparison (`ComparisonModal.tsx`), interactive test runner (`TestRunnerModal.tsx`), help modal (`HelpModal.tsx`), Undo/Redo, JSON save/load, PNG/SVG export, and step-by-step build animation (`BottomToolbar.tsx`).

---

## 2. Tested

Verified by executing `npm test`, `npm run lint`, and `npm run build`:
- All 7 test sections in `src/tests/geometry.test.ts` pass at tolerance `1e-9` (control triangles, leg-swap symmetry, invalid input rejection, extreme micro/macro/aspect stability, validator mutation tests, current-state spectral metrics, and parametric graph + synchronization checks at $t = 0.1, 0.5, 1.0, 2.0, 10.0$).
- `tsc --noEmit` completes with zero TypeScript errors.
- `vite build` produces a clean production bundle in `dist/`.

---

## 3. Documented

- Bilingual READMEs: `README.md` (English) and `README_RU.md` (Russian).
- Complete mathematical & parametric foundation: `docs/MATHEMATICAL_FOUNDATION.md` and `docs/MATHEMATICAL_PROOFS.md`.
- Verified software architecture: `docs/ARCHITECTURE.md`.
- User guide, verification reference, status report, release readiness report, and roadmap: `docs/USER_GUIDE.md`, `docs/VERIFICATION_AND_TESTING.md`, `docs/PROJECT_STATUS.md`, `docs/RELEASE_READINESS.md`, `docs/ROADMAP.md`.
- UMFP formula passports, DAG, proofs, numerical analysis, and verification matrix (`PCL-A01`–`PCL-F24`): `docs/FORMULA_PASSPORTS.md`, `docs/FORMULA_DEPENDENCY_GRAPH.md`, `docs/MATHEMATICAL_PROOFS.md`, `docs/NUMERICAL_ANALYSIS.md`, `docs/VERIFICATION_MATRIX.md` *(methodological conformance; no runtime UMFP engine dependency imported)*.

---

## 4. Not Yet Verified

1. **Automated Headless Browser / Visual E2E Testing:** No browser automation suite (Playwright/Cypress) is installed or executed in this repository; visual rendering of all three parametric graph modes and interactive pointer dragging have not been tested via automated browser tests in this environment.
2. **Full EN / UK Translation Coverage Inside Analytical Panels:**
   - **Localized (`RU / UK / EN`) via `src/i18n/translations.ts`:** `Header.tsx`, `BottomToolbar.tsx` (main toolbar labels), `GeometryBoard.tsx` (toolbar toggles and hints), and `FourCirclesPanel.tsx` (section titles and Visual/Research toggle).
   - **Primarily Russian-only:** `ControlsPanel.tsx`, `SpectralAnalysisPanel.tsx`, `InvariantsPanel.tsx`, `FourCirclesValidators.ts` (invariant titles/descriptions), `ComparisonModal.tsx`, `TestRunnerModal.tsx`, `HelpModal.tsx`, `presets.ts`, hover tooltips in `FourCirclesView.tsx` / `RightTriangleView.tsx`, and the Load popover in `BottomToolbar.tsx`.
3. **Offline Bundle Without CDN:** `index.html` currently loads Google Fonts and `katex@0.16.11` CSS from external CDNs; offline rendering without internet access has not been verified.

---

## 5. Repository Hygiene & Cleanup Status

1. **Legacy Upstream v1.0 Documentation Archived:** The five legacy files from the earlier prototype (`INVARIANT_PROOFS_v1.0.md`, `MATHEMATICAL_FOUNDATION_v1.0.md`, `MATHEMATICAL_SPEC_v1.0.md`, `NUMERICAL_ANALYSIS_v1.0.md`, `VERIFICATION_MATRIX_v1.0.md`) remain unmodified inside [`docs/archive/legacy-pythagorean-pants/`](archive/legacy-pythagorean-pants/) as archival provenance; unused session screenshot assets under `public/assets/aistudio/` were removed prior to release, and `docs/assets/four-circles-diagram.svg` provides a clean original geometric diagram.
2. **Dependency Audit (`package.json`):**
   - **Definitely required:** `react`, `react-dom`, `katex`, `lucide-react`, `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `tailwindcss`, `typescript`, `tsx`, `@types/react`, `@types/react-dom`, `@types/katex`, `@types/node`.
   - **Apparently unused (zero imports in `src/` or `vite.config.ts`):** `@google/genai`, `express`, `dotenv`, `canvas-confetti`, `motion`, `@types/express`, `@types/canvas-confetti`.
   - **Uncertain (manual review recommended before pruning):** `autoprefixer`, `esbuild` (indirect Vite/`tsx` build tooling).
3. **Project Metadata:** Both `package.json` (`"name": "four-circles-pythagorean-lab"`) and `metadata.json` (`"name": "Four-Circles Pythagorean Geometry Lab"`) identify the project consistently. (`metadata.json` retains `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` from the AI Studio host environment, though no Gemini API calls are made in `src/`.)
4. **License & Provenance:** The repository is licensed under the **MIT License** (`LICENSE`, `Copyright (c) 2026 Andrey Artsybashev`), matching `"license": "MIT"` in `package.json`, `README.md`, `README_RU.md`, and `SPDX-License-Identifier: MIT` headers across all 29 `.ts`/`.tsx` files in `src/`. All runtime dependencies imported in `src/` (`react`, `react-dom`, `katex`, `lucide-react`) use permissive MIT or ISC licenses; `typescript` and unused template package `@google/genai` remain separate npm dependencies under Apache-2.0. *(Origin note: initialized from an AI Studio workspace remix template previously carrying default Apache-2.0 boilerplate.)*
