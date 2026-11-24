/**
 * @license
 * SPDX-License-Identifier: MIT
 */

import React from 'react';
import { X, BookOpen, CircleDot, CheckCircle2 } from 'lucide-react';
import { MathFormula } from '../common/MathFormula.tsx';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Справка: Лаборатория Пифагора — четыре круга
              </h3>
              <p className="text-xs text-slate-500">
                Геометрическая модель четырёх окружностей, порождённых прямоугольным треугольником
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto text-xs text-slate-700 leading-relaxed">
          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <CircleDot className="w-4 h-4 text-indigo-600" />
              Четыре окружности единой параметрической системы
            </h4>
            <p>
              Все объекты конструкции вычисляются детерминированно из двух независимых параметров —
              катетов <MathFormula tex="a" /> и <MathFormula tex="b" /> прямоугольного треугольника{' '}
              <MathFormula tex="OAB" /> (<MathFormula tex="c = \sqrt{a^2 + b^2}" />):
            </p>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              <li>
                <strong><MathFormula tex="K_a" /> (синий):</strong> окружность диаметра <MathFormula tex="a" />,
                вписанная в квадрат <MathFormula tex="Q_a" /> на катете <MathFormula tex="OA" />. Площадь{' '}
                <MathFormula tex="K_a = \frac{\pi a^2}{4}" />.
              </li>
              <li>
                <strong><MathFormula tex="K_b" /> (зелёный):</strong> окружность диаметра <MathFormula tex="b" />,
                вписанная в квадрат <MathFormula tex="Q_b" /> на катете <MathFormula tex="OB" />. Площадь{' '}
                <MathFormula tex="K_b = \frac{\pi b^2}{4}" />.
              </li>
              <li>
                <strong><MathFormula tex="K_c" /> (красный):</strong> окружность диаметра <MathFormula tex="c" />,
                вписанная в квадрат <MathFormula tex="Q_c" /> на гипотенузе <MathFormula tex="AB" />. Площадь{' '}
                <MathFormula tex="K_c = \frac{\pi c^2}{4}" />.
              </li>
              <li>
                <strong><MathFormula tex="K_i" /> (янтарный):</strong> обычная вписанная окружность строго
                внутри треугольника <MathFormula tex="OAB" />, касающаяся всех трёх его сторон. Радиус{' '}
                <MathFormula tex="r = \frac{a + b - c}{2}" />, площадь <MathFormula tex="K_i = \pi r^2" />.
              </li>
            </ul>
          </section>

          <section className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            <h4 className="font-bold text-slate-900">Центральное четырёхкруговое тождество:</h4>
            <div className="py-1 font-mono text-center text-sm">
              <MathFormula tex="\sqrt{K_a} + \sqrt{K_b} = \sqrt{K_c} + \sqrt{K_i}" />
            </div>
            <p className="text-slate-600">
              Так как <MathFormula tex="\sqrt{K_a} = \frac{\sqrt{\pi}}{2}a" />,{' '}
              <MathFormula tex="\sqrt{K_b} = \frac{\sqrt{\pi}}{2}b" />,{' '}
              <MathFormula tex="\sqrt{K_c} = \frac{\sqrt{\pi}}{2}c" /> и{' '}
              <MathFormula tex="\sqrt{K_i} = \sqrt{\pi}\frac{a+b-c}{2}" />, сумма правых частей равна{' '}
              <MathFormula tex="\frac{\sqrt{\pi}}{2}(c + a + b - c) = \frac{\sqrt{\pi}}{2}(a + b)" /> —
              тождественно совпадая с левой частью!
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900">Почему равенство самих площадей неверно:</h4>
            <div className="space-y-1 text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  По теореме Пифагора для трёх квадратных кругов выполняется{' '}
                  <MathFormula tex="K_a + K_b = K_c" />.
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>
                  Поскольку вписанный круг имеет положительную площадь <MathFormula tex="K_i > 0" />,
                  выражение <MathFormula tex="K_a + K_b - K_c - K_i = -K_i \neq 0" />.
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};
