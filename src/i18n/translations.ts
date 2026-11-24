/**
 * @license
 * SPDX-License-Identifier: MIT
 */

export type LanguageCode = 'ru' | 'uk' | 'en';

export interface Translations {
  brandTitle: string;
  modules: {
    fourCircles: string;
    identityProof: string;
    incircleFocus: string;
    spectralAnalysis: string;
  };
  actions: {
    compare: string;
    tests: string;
    help: string;
    undo: string;
    redo: string;
    reset: string;
    save: string;
    load: string;
    snapshotPng: string;
    snapshotSvg: string;
    buildAnim: string;
    expandBoard: string;
    showPanel: string;
  };
  modes: {
    school: string;
    research: string;
  };
  board: {
    layers: string;
    all: string;
    triIncircle: string;
    squares: string;
    squareCircles: string;
    grid: string;
    labels: string;
    centers: string;
    radii: string;
    angles: string;
    dragHint: string;
    hoverDefault: string;
  };
  panel: {
    title: string;
    subtitle: string;
    identityTitle: string;
    identityHold: string;
    areaContrastTitle: string;
    coordinatesTitle: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  ru: {
    brandTitle: 'Pythagoras — Four Circles',
    modules: {
      fourCircles: '01. Четыре круга',
      identityProof: '02. Тождество √K',
      incircleFocus: '03. Вписанный круг Kᵢ',
      spectralAnalysis: '04. Спектральный анализ',
    },
    actions: {
      compare: 'Сравнить',
      tests: 'Тесты 8/8',
      help: 'Справка',
      undo: 'Отменить',
      redo: 'Вернуть',
      reset: 'Сброс',
      save: 'Сохранить',
      load: 'Загрузить',
      snapshotPng: 'Снимок PNG',
      snapshotSvg: 'SVG',
      buildAnim: 'Пошагово',
      expandBoard: 'Скрыть панель',
      showPanel: 'Показать панель',
    },
    modes: {
      school: 'Наглядный',
      research: 'Исследовательский',
    },
    board: {
      layers: 'Слои:',
      all: 'Все',
      triIncircle: '△ и Kᵢ',
      squares: 'Квадраты Q',
      squareCircles: 'Круги K_a,b,c',
      grid: 'Сетка',
      labels: 'Подписи',
      centers: 'Центры',
      radii: 'Радиусы',
      angles: 'Углы',
      dragHint: 'Тяните A по вертикали или B по горизонтали · Колёсико для зума',
      hoverDefault: 'Наведите на круг, квадрат или сторону для инспекции',
    },
    panel: {
      title: 'Числовая панель четырёх кругов',
      subtitle: 'Синхронный пересчёт площадей, корней и невязки',
      identityTitle: 'Центральное четырёхкруговое тождество',
      identityHold: 'Тождество выполняется точно',
      areaContrastTitle: 'Соотношение самих площадей (контраст)',
      coordinatesTitle: 'Координаты центров и точек касания',
    },
  },
  uk: {
    brandTitle: 'Pythagoras — Four Circles',
    modules: {
      fourCircles: '01. Чотири кола',
      identityProof: '02. Тотожність √K',
      incircleFocus: '03. Вписане коло Kᵢ',
      spectralAnalysis: '04. Спектральний аналіз',
    },
    actions: {
      compare: 'Порівняти',
      tests: 'Тести 8/8',
      help: 'Довідка',
      undo: 'Скасувати',
      redo: 'Повернути',
      reset: 'Скидання',
      save: 'Зберегти',
      load: 'Завантажити',
      snapshotPng: 'Знімок PNG',
      snapshotSvg: 'SVG',
      buildAnim: 'Покроково',
      expandBoard: 'Сховати панель',
      showPanel: 'Показати панель',
    },
    modes: {
      school: 'Наочний',
      research: 'Дослідницький',
    },
    board: {
      layers: 'Шари:',
      all: 'Усі',
      triIncircle: '△ та Kᵢ',
      squares: 'Квадрати Q',
      squareCircles: 'Кола K_a,b,c',
      grid: 'Сітка',
      labels: 'Підписи',
      centers: 'Центри',
      radii: 'Радіуси',
      angles: 'Кути',
      dragHint: 'Тягніть A по вертикалі або B по горизонталі · Коліщатко для зуму',
      hoverDefault: 'Наведіть на коло, квадрат або сторону для інспекції',
    },
    panel: {
      title: 'Числова панель чотирьох кіл',
      subtitle: 'Синхронний перерахунок площ, коренів та нев’язки',
      identityTitle: 'Центральна тотожність чотирьох кіл',
      identityHold: 'Тотожність виконується точно',
      areaContrastTitle: 'Співвідношення самих площ (контраст)',
      coordinatesTitle: 'Координати центрів та точок дотику',
    },
  },
  en: {
    brandTitle: 'Pythagoras — Four Circles',
    modules: {
      fourCircles: '01. Four Circles',
      identityProof: '02. √K Identity',
      incircleFocus: '03. Incircle Kᵢ',
      spectralAnalysis: '04. Spectral Analysis',
    },
    actions: {
      compare: 'Compare',
      tests: 'Tests 8/8',
      help: 'Help',
      undo: 'Undo',
      redo: 'Redo',
      reset: 'Reset',
      save: 'Save',
      load: 'Load',
      snapshotPng: 'Snapshot PNG',
      snapshotSvg: 'SVG',
      buildAnim: 'Step Build',
      expandBoard: 'Hide Panel',
      showPanel: 'Show Panel',
    },
    modes: {
      school: 'Visual',
      research: 'Research',
    },
    board: {
      layers: 'Layers:',
      all: 'All',
      triIncircle: '△ & Kᵢ',
      squares: 'Squares Q',
      squareCircles: 'Circles K_a,b,c',
      grid: 'Grid',
      labels: 'Labels',
      centers: 'Centers',
      radii: 'Radii',
      angles: 'Angles',
      dragHint: 'Drag A vertically or B horizontally · Scroll to zoom',
      hoverDefault: 'Hover any circle, square, or side to inspect',
    },
    panel: {
      title: 'Four Circles Numeric Observer',
      subtitle: 'Synchronized areas, square roots, and identity residual',
      identityTitle: 'Central Four-Circle Identity',
      identityHold: 'Identity holds exactly',
      areaContrastTitle: 'Direct Area Contrast (Non-Equality)',
      coordinatesTitle: 'Centers & Tangency Coordinates',
    },
  },
};
