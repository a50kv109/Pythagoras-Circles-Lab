/**
 * @license
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';
import { FourCirclesCalculations } from '../../types/geometry.ts';
import { validateFourCirclesInvariants } from '../../math/FourCirclesValidators.ts';
import { MathFormula } from '../common/MathFormula.tsx';
import { ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

interface InvariantsPanelProps {
  calc: FourCirclesCalculations;
}

export const InvariantsPanel: React.FC<InvariantsPanelProps> = ({ calc }) => {
  const invariants = useMemo(() => validateFourCirclesInvariants(calc), [calc]);

  const passedCount = invariants.filter((inv) => inv.isValid).length;
  const allPassed = passedCount === invariants.length;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className={`w-4 h-4 ${allPassed ? 'text-emerald-600' : 'text-rose-600'}`} />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Верификация геометрии и тождеств
          </h3>
        </div>

        <span
          className={`text-xs font-semibold tabular-nums whitespace-nowrap shrink-0 ${
            allPassed ? 'text-emerald-700' : 'text-rose-700'
          }`}
        >
          {passedCount} / {invariants.length} подтверждены
        </span>
      </div>

      <p className="text-xs text-slate-500">
        Проверка евклидовых условий касания, площадей и четырёхкругового тождества (допуск 10⁻⁹):
      </p>

      {/* Invariants list */}
      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {invariants.map((inv) => (
          <div
            key={inv.id}
            className="p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/70 hover:bg-white transition-colors space-y-1.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5 min-w-0">
                <span className="text-xs font-bold text-slate-800 block">{inv.name}</span>
                <div className="text-xs font-mono text-indigo-700 overflow-x-auto">
                  <MathFormula tex={inv.formula} />
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`text-[10px] font-mono tabular-nums font-semibold ${
                    inv.isValid ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {Number.isFinite(inv.delta)
                    ? inv.delta < 1e-12
                      ? 'Δ < 10⁻¹²'
                      : `Δ = ${inv.delta.toExponential(1)}`
                    : `Δ = ${String(inv.delta)}`}
                </span>
                {inv.isValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                )}
              </div>
            </div>

            <p className="text-[11px] text-slate-500">{inv.description}</p>

            <div className="flex items-center justify-between text-[11px] font-mono tabular-nums pt-1 border-t border-slate-200/50 text-slate-600">
              <span>Расчёт: {inv.calculatedValue}</span>
              <span>Эталон: {inv.expectedValue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
