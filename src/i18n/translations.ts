/**
 * @license
 * SPDX-License-Identifier: MIT
 */

export type LanguageCode = 'ru' | 'uk' | 'en';

export interface InvariantText {
  name: string;
  description: string;
}

export interface Translations {
  brandTitle: string;
  aria: {
    boardSection: string;
    panelAside: string;
  };
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
    saved: string;
    load: string;
    snapshotPng: string;
    snapshotSvg: string;
    buildAnim: string;
    expandBoard: string;
    showPanel: string;
    close: string;
  };
  toolbar: {
    configsTitle: string;
    exportJson: string;
    importJson: string;
    noSavedConfigs: string;
    deleteConfig: string;
    snapshotPngTitle: string;
    snapshotSvgTitle: string;
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
    zoomInTitle: string;
    zoomOutTitle: string;
    fitViewTitle: string;
    resetViewTitle: string;
    dragHint: string;
    hoverDefault: string;
  };
  hover: {
    vertexPrefix: string;
    coordsLabel: string;
    dragY: string;
    dragX: string;
    fixedVertex: string;
    originTitle: string;
    originDetails: string;
    triangleTitle: string;
    triangleLegsPrefix: string;
    triangleHypLabel: string;
    legOATitle: string;
    legOBTitle: string;
    lengthUnit: string;
    projHyp: string;
    hypABTitle: string;
    hypDetailsSuffix: string;
    squareQaTitle: string;
    squareQbTitle: string;
    squareQcTitle: string;
    sideLabel: string;
    areaLabel: string;
    circleKaTitle: string;
    circleKbTitle: string;
    circleKcTitle: string;
    circleKiTitle: string;
    tanOATitle: string;
    tanOBTitle: string;
    tanABTitle: string;
    incenterTitle: string;
  };
  controls: {
    title: string;
    setIsoscelesTitle: string;
    legALabel: string;
    legBLabel: string;
    unitShort: string;
    presetsTitle: string;
    pause: string;
    smoothSweep: string;
    reset345: string;
    presetDescriptions: Record<string, string>;
  };
  panel: {
    title: string;
    subtitle: string;
    identityTitle: string;
    identityHold: string;
    identityFail: string;
    lhsLabel: string;
    rhsLabel: string;
    residualLabel: string;
    proofTitle: string;
    incircleTitle: string;
    incircleDescBefore: string;
    incircleDescMiddle: string;
    incircleDescAfter: string;
    legA: string;
    legB: string;
    hypC: string;
    radiusKi: string;
    colCircle: string;
    colLocation: string;
    colDim: string;
    colArea: string;
    colSqrt: string;
    locSquareQa: string;
    locSquareQb: string;
    locSquareQc: string;
    locInsideTri: string;
    areaContrastTitle: string;
    equalsMinusKi: string;
    contrastNoteBefore: string;
    contrastNoteMiddle: string;
    contrastNoteAfter: string;
    coordinatesTitle: string;
  };
  spectral: {
    title: string;
    subtitleBefore: string;
    subtitleAfter: string;
    tabAreas: string;
    tabPerimeters: string;
    tabRadiiDiameters: string;
    linearNoteBefore: string;
    linearNoteMiddle: string;
    linearNoteAnd: string;
    linearNoteAfter: string;
    radiiBtn: string;
    diametersBtn: string;
    plotTitle: string;
    logScaleBtn: string;
    logScaleTitle: string;
    linearScaleBtn: string;
    linearScaleTitle: string;
    zoomInTitle: string;
    zoomOutTitle: string;
    resetRangeTitle: string;
    symmetryBtn: string;
    symmetryBtnTitle: string;
    pauseBtn: string;
    sweepBtn: string;
    outOfRangeBefore: string;
    outOfRangeMiddle: string;
    fitRangeBtn: string;
    svgAriaLabel: string;
    axisLogLabel: string;
    axisLinearLabel: string;
    symmetryTag: string;
    currentPointLabel: string;
    referenceTitle: string;
    legAShort: string;
    legBShort: string;
    hypCShort: string;
    radRShort: string;
    colCircle: string;
    colArea: string;
    colPerimeter: string;
    colRadius: string;
    colDiameter: string;
    shareToggle: string;
    shareLabel: string;
    formulaSecA: string;
    formulaAsteriskNote: string;
    formulaSecBNormalizedAreas: string;
    formulaSecBNormalizedPerimeters: string;
    formulaSecBNormalizedRadii: string;
    formulaSecBNormalizedDiameters: string;
    formulaSecCRatioAreas: string;
    formulaSecCRatioPerimeters: string;
    formulaSecCRatioRadii: string;
    formulaSecCRatioDiameters: string;
    atSymmetryNotice: string;
  };
  invariants: {
    title: string;
    confirmedSuffix: string;
    subtitle: string;
    calcLabel: string;
    expectedLabel: string;
    items: Record<string, InvariantText>;
  };
  compareModal: {
    title: string;
    subtitle: string;
    captureBtn: string;
    loadBtn: string;
    config1: string;
    config2: string;
    colQuantity: string;
    colConf1: string;
    colConf2: string;
    metrics: {
      legA: string;
      legB: string;
      hypC: string;
      inradiusR: string;
      areaKa: string;
      areaKb: string;
      areaKc: string;
      areaKi: string;
    };
  };
  testModal: {
    title: string;
    subtitle: string;
    colTriangle: string;
    colProfile: string;
    colChecks: string;
    colDelta: string;
    colAction: string;
    okStatus: string;
    failStatus: string;
    openBtn: string;
    openTitle: string;
    allPassBanner: string;
    failBanner: string;
    cases: Record<string, string>;
  };
  helpModal: {
    title: string;
    subtitle: string;
    sec1Title: string;
    sec1IntroBefore: string;
    sec1IntroAnd: string;
    sec1IntroTriangle: string;
    kaDesc1: string;
    kaDesc2: string;
    kaDesc3: string;
    kbDesc1: string;
    kbDesc2: string;
    kbDesc3: string;
    kcDesc1: string;
    kcDesc2: string;
    kcDesc3: string;
    kiDesc1: string;
    kiDesc2: string;
    kiDesc3: string;
    kaColor: string;
    kbColor: string;
    kcColor: string;
    kiColor: string;
    sec2Title: string;
    sec2Text1: string;
    sec2TextAnd: string;
    sec2Text2: string;
    sec2Text3: string;
    sec3Title: string;
    sec3Bullet1: string;
    sec3Bullet2Before: string;
    sec3Bullet2After: string;
    gotItBtn: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  ru: {
    brandTitle: 'Pythagoras — Four Circles',
    aria: {
      boardSection: 'Интерактивная геометрическая сцена четырёх кругов',
      panelAside: 'Панель управления и числового наблюдения',
    },
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
      saved: 'Сохранено',
      load: 'Загрузить',
      snapshotPng: 'Снимок PNG',
      snapshotSvg: 'SVG',
      buildAnim: 'Пошагово',
      expandBoard: 'Скрыть панель',
      showPanel: 'Показать панель',
      close: 'Закрыть',
    },
    toolbar: {
      configsTitle: 'Конфигурации',
      exportJson: 'Экспорт JSON',
      importJson: 'Импорт JSON',
      noSavedConfigs: 'Нет сохранённых точек',
      deleteConfig: 'Удалить',
      snapshotPngTitle: 'Скачать снимок эксперимента (PNG)',
      snapshotSvgTitle: 'Скачать векторный чертёж (SVG)',
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
      zoomInTitle: 'Увеличить',
      zoomOutTitle: 'Уменьшить',
      fitViewTitle: 'Вписать конструкцию',
      resetViewTitle: 'Сброс вида',
      dragHint: 'Тяните A по вертикали или B по горизонтали · Колёсико для зума',
      hoverDefault: 'Наведите на круг, квадрат или сторону для инспекции',
    },
    hover: {
      vertexPrefix: 'Вершина',
      coordsLabel: 'Координаты',
      dragY: 'Перемещение по вертикальной оси (x = 0)',
      dragX: 'Перемещение по горизонтальной оси (y = 0)',
      fixedVertex: 'Фиксированная вершина',
      originTitle: 'Вершина O (Прямой угол 90°)',
      originDetails: 'Фиксированное начало координат (0, 0). Гарантирует сохранение прямого угла.',
      triangleTitle: 'Прямоугольный треугольник OAB',
      triangleLegsPrefix: 'Катеты',
      triangleHypLabel: 'гипотенуза',
      legOATitle: 'Вертикальный катет OA',
      legOBTitle: 'Горизонтальный катет OB',
      lengthUnit: 'Длина',
      projHyp: 'Проекция на гипотенузу',
      hypABTitle: 'Гипотенуза AB',
      hypDetailsSuffix: 'Сторона квадрата Q_c и диаметр круга K_c',
      squareQaTitle: 'Квадрат Q_a на катете a',
      squareQbTitle: 'Квадрат Q_b на катете b',
      squareQcTitle: 'Квадрат Q_c на гипотенузе c',
      sideLabel: 'Сторона',
      areaLabel: 'Площадь',
      circleKaTitle: 'Круг K_a (вписан в квадрат Q_a)',
      circleKbTitle: 'Круг K_b (вписан в квадрат Q_b)',
      circleKcTitle: 'Круг K_c (вписан в квадрат Q_c)',
      circleKiTitle: 'Вписанный круг K_i (внутри треугольника OAB)',
      tanOATitle: 'Точка касания на катете OA',
      tanOBTitle: 'Точка касания на катете OB',
      tanABTitle: 'Точка касания на гипотенузе AB',
      incenterTitle: 'Центр вписанной окружности I = (r, r)',
    },
    controls: {
      title: 'Параметры треугольника (a, b)',
      setIsoscelesTitle: 'Установить равнобедренный треугольник a = b = 4',
      legALabel: 'Катет',
      legBLabel: 'Катет',
      unitShort: 'ед.',
      presetsTitle: 'Контрольные треугольники:',
      pause: 'Пауза',
      smoothSweep: 'Плавное изменение (a, b)',
      reset345: 'Сброс (3-4-5)',
      presetDescriptions: {
        classic_3_4_5: 'Классический египетский треугольник: целые стороны и целочисленный вписанный радиус r = 1.',
        classic_5_12_13: 'Пифагорова тройка с целым радиусом вписанной окружности r = (5 + 12 - 13)/2 = 2.',
        sym_4_4: 'Симметричный прямоугольный треугольник: K_a = K_b, r = 4 - 2√2 ≈ 1.1716.',
        extreme_1_10: 'Сильно вытянутый треугольник (b/a = 10): маленький вписанный круг K_i (r ≈ 0.475).',
        extreme_10_1: 'Зеркальное вытягивание вдоль вертикального катета: K_a и K_b меняются местами, K_i и K_c неизменны.',
        classic_8_15_17: 'Ещё одна примитивная пифагорова тройка с целым радиусом вписанной окружности r = 3.',
      },
    },
    panel: {
      title: 'Числовая панель четырёх кругов',
      subtitle: 'Синхронный пересчёт площадей, корней и невязки',
      identityTitle: 'Центральное четырёхкруговое тождество',
      identityHold: 'Тождество выполняется точно',
      identityFail: 'Обнаружена невязка',
      lhsLabel: 'Левая часть: √K_a + √K_b',
      rhsLabel: 'Правая часть: √K_c + √K_i',
      residualLabel: 'Невязка тождества',
      proofTitle: 'Алгебраическое доказательство тождества',
      incircleTitle: 'Геометрия вписанной окружности K_i',
      incircleDescBefore: 'Обычная вписанная окружность касается катетов в точках',
      incircleDescMiddle: 'и гипотенузы в точке',
      incircleDescAfter: 'Её радиус всегда положителен:',
      legA: 'Катет a',
      legB: 'Катет b',
      hypC: 'Гипотенуза c',
      radiusKi: 'Радиус K_i',
      colCircle: 'Круг',
      colLocation: 'Расположение',
      colDim: 'Диаметр / Радиус',
      colArea: 'Площадь K',
      colSqrt: 'Корень √K',
      locSquareQa: 'Квадрат Q_a',
      locSquareQb: 'Квадрат Q_b',
      locSquareQc: 'Квадрат Q_c',
      locInsideTri: 'Внутри △OAB',
      areaContrastTitle: 'Соотношение самих площадей (контраст)',
      equalsMinusKi: 'равняется -K_i',
      contrastNoteBefore: 'Прямое равенство площадей',
      contrastNoteMiddle: 'неверно, так как по теореме Пифагора',
      contrastNoteAfter: ', а площадь вписанной окружности',
      coordinatesTitle: 'Координаты центров и точек касания',
    },
    spectral: {
      title: 'Параметрический спектральный анализ четырёх кругов',
      subtitleBefore: 'Безразмерный параметр',
      subtitleAfter: 'нормировка на гипотенузный круг',
      tabAreas: 'Площади',
      tabPerimeters: 'Периметры',
      tabRadiiDiameters: 'Радиусы / Диаметры',
      linearNoteBefore: 'Линейный масштаб:',
      linearNoteMiddle: 'нормированные кривые',
      linearNoteAnd: 'и',
      linearNoteAfter: 'совпадают',
      radiiBtn: 'Радиусы (R)',
      diametersBtn: 'Диаметры (D)',
      plotTitle: 'Графики функций от отношения катетов',
      logScaleBtn: 'Лог. t',
      logScaleTitle: 'Логарифмическая шкала t (симметрия t ↔ 1/t вокруг t = 1)',
      linearScaleBtn: 'Линейн. t',
      linearScaleTitle: 'Линейная шкала t',
      zoomInTitle: 'Приблизить диапазон t',
      zoomOutTitle: 'Отдалить диапазон t',
      resetRangeTitle: 'Сбросить диапазон на [0.1, 10]',
      symmetryBtn: 't = 1 (Симметрия)',
      symmetryBtnTitle: 'Установить симметричный треугольник t = 1 (a = b)',
      pauseBtn: 'Пауза',
      sweepBtn: 'Пройти через симметрию',
      outOfRangeBefore: 'Текущее значение',
      outOfRangeMiddle: 'вне видимого диапазона',
      fitRangeBtn: 'Включить в диапазон',
      svgAriaLabel: 'Декартовый график нормированных характеристик четырёх кругов в зависимости от t = b/a',
      axisLogLabel: '(логарифмическая шкала)',
      axisLinearLabel: '(линейная шкала)',
      symmetryTag: 'Симметрия',
      currentPointLabel: 'Текущая точка:',
      referenceTitle: 'Эталонные точки отношения катетов',
      legAShort: 'Катет a',
      legBShort: 'Катет b',
      hypCShort: 'Гипот. c',
      radRShort: 'Радиус r',
      colCircle: 'Круг',
      colArea: 'Площадь K',
      colPerimeter: 'Периметр P',
      colRadius: 'Радиус R',
      colDiameter: 'Диаметр D',
      shareToggle: 'Долевое распределение в текущем состоянии (вспомогательно)',
      shareLabel: 'доля',
      formulaSecA: 'A. Параметрическое отношение и нормированная геометрия (a_norm = 1)',
      formulaAsteriskNote: 'Символ * обозначает нормированные величины при a_norm = 1 (не размерные величины исходного треугольника).',
      formulaSecBNormalizedAreas: 'B. Нормированные площади (a_norm = 1)',
      formulaSecBNormalizedPerimeters: 'B. Нормированные периметры (a_norm = 1)',
      formulaSecBNormalizedRadii: 'B. Нормированные радиусы (a_norm = 1)',
      formulaSecBNormalizedDiameters: 'B. Нормированные диаметры (a_norm = 1)',
      formulaSecCRatioAreas: 'C. Отношения площадей (функции на графике)',
      formulaSecCRatioPerimeters: 'C. Отношения периметров (функции на графике)',
      formulaSecCRatioRadii: 'C. Отношения радиусов (функции на графике)',
      formulaSecCRatioDiameters: 'C. Отношения диаметров (функции на графике)',
      atSymmetryNotice: 'Треугольник уже на оси симметрии t = 1 (a = b, 1/t = t).',
    },
    invariants: {
      title: 'Верификация геометрии и тождеств',
      confirmedSuffix: 'подтверждены',
      subtitle: 'Проверка евклидовых условий касания, площадей и четырёхкругового тождества (допуск 10⁻⁹):',
      calcLabel: 'Расчёт',
      expectedLabel: 'Эталон',
      items: {
        incircle_positive: {
          name: 'Положительность вписанного радиуса r',
          description: 'Вписанная окружность K_i существует, r > 0 и центр I строго внутри треугольника OAB.',
        },
        squares_construction: {
          name: 'Построение трёх квадратов Q_a, Q_b, Q_c',
          description: 'Все стороны квадратов равны соответствующим сторонам треугольника, углы строго 90°.',
        },
        square_circles_tangency: {
          name: 'Касание K_a, K_b, K_c сторон квадратов',
          description: 'Каждая из трёх окружностей в квадратах касается всех четырёх сторон своего квадрата.',
        },
        incircle_tangency: {
          name: 'Касание K_i всех сторон треугольника',
          description: 'Четвёртая окружность K_i касается обоих катетов и гипотенузы треугольника OAB.',
        },
        four_circle_areas: {
          name: 'Точность площадей четырёх кругов',
          description: 'Согласованность вычисленных площадей всех четырёх окружностей с их аналитическими формулами.',
        },
        central_sqrt_identity: {
          name: 'Центральное тождество корней площадей',
          description: 'Сумма квадратных корней из площадей кругов на катетах равна сумме корней для гипотенузы и вписанного круга.',
        },
        pythagorean_circle_areas: {
          name: 'Пифагорова сумма площадей на сторонах',
          description: 'Сумма площадей кругов в квадратах на катетах равна площади круга на гипотенузе.',
        },
        area_non_equality_contrast: {
          name: 'Отличие тождества от суммы площадей',
          description: 'Прямая сумма площадей не равна K_c + K_i: расхождение строго равно -K_i < 0.',
        },
      },
    },
    compareModal: {
      title: 'Сравнение четырёхкруговых конфигураций',
      subtitle: 'Сопоставление эталонного треугольника и текущей конструкции',
      captureBtn: 'Зафиксировать текущую в Конфигурацию 1',
      loadBtn: 'Загрузить Конфигурацию 1',
      config1: 'Конфигурация 1',
      config2: 'Конфигурация 2',
      colQuantity: 'Величина',
      colConf1: 'Конф. 1',
      colConf2: 'Конф. 2',
      metrics: {
        legA: 'Катет a',
        legB: 'Катет b',
        hypC: 'Гипотенуза c',
        inradiusR: 'Вписанный радиус r',
        areaKa: 'Площадь K_a',
        areaKb: 'Площадь K_b',
        areaKc: 'Площадь K_c',
        areaKi: 'Площадь K_i',
      },
    },
    testModal: {
      title: 'Контрольные треугольники и проверка тождества',
      subtitle: 'Автоматическая верификация 8 геометрических и алгебраических инвариантов четырёх кругов',
      colTriangle: 'Треугольник',
      colProfile: 'Геометрический профиль',
      colChecks: 'Проверки',
      colDelta: 'Невязка Δ',
      colAction: 'Действие',
      okStatus: 'OK',
      failStatus: 'ОШИБКА',
      openBtn: 'Открыть',
      openTitle: 'Загрузить этот треугольник на планшет',
      allPassBanner: 'Все контрольные треугольники подтвердили построение квадратов, касание четырёх окружностей, положительность вписанного радиуса r > 0 и тождество √K_a + √K_b = √K_c + √K_i.',
      failBanner: 'Обнаружено расхождение инвариантов в одной или нескольких конфигурациях.',
      cases: {
        '3_4': 'Египетский треугольник: c = 5, r = 1',
        '5_12': 'Пифагорова тройка: c = 13, r = 2',
        '4_4': 'Симметрия a = b: K_a = K_b, r ≈ 1.1716',
        '1_10': 'Вытянутый треугольник: c ≈ 10.0499, r ≈ 0.4751',
        '10_1': 'Зеркальный вытянутый: K_a ↔ K_b, K_i неизменен',
      },
    },
    helpModal: {
      title: 'Справка: Лаборатория Пифагора — четыре круга',
      subtitle: 'Геометрическая модель четырёх окружностей, порождённых прямоугольным треугольником',
      sec1Title: 'Четыре окружности единой параметрической системы',
      sec1IntroBefore: 'Все объекты конструкции вычисляются детерминированно из двух независимых параметров — катетов',
      sec1IntroAnd: 'и',
      sec1IntroTriangle: 'прямоугольного треугольника',
      kaColor: 'синий',
      kaDesc1: 'окружность диаметра',
      kaDesc2: 'вписанная в квадрат',
      kaDesc3: 'на катете',
      kbColor: 'зелёный',
      kbDesc1: 'окружность диаметра',
      kbDesc2: 'вписанная в квадрат',
      kbDesc3: 'на катете',
      kcColor: 'красный',
      kcDesc1: 'окружность диаметра',
      kcDesc2: 'вписанная в квадрат',
      kcDesc3: 'на гипотенузе',
      kiColor: 'янтарный',
      kiDesc1: 'обычная вписанная окружность строго внутри треугольника',
      kiDesc2: 'касающаяся всех трёх его сторон. Радиус',
      kiDesc3: 'площадь',
      sec2Title: 'Центральное четырёхкруговое тождество:',
      sec2Text1: 'Так как',
      sec2TextAnd: 'и',
      sec2Text2: 'сумма правых частей равна',
      sec2Text3: '— тождественно совпадая с левой частью!',
      sec3Title: 'Почему равенство самих площадей неверно:',
      sec3Bullet1: 'По теореме Пифагора для трёх квадратных кругов выполняется',
      sec3Bullet2Before: 'Поскольку вписанный круг имеет положительную площадь',
      sec3Bullet2After: ', выражение',
      gotItBtn: 'Понятно',
    },
  },
  uk: {
    brandTitle: 'Pythagoras — Four Circles',
    aria: {
      boardSection: 'Інтерактивна геометрична сцена чотирьох кіл',
      panelAside: 'Панель керування та числового спостереження',
    },
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
      saved: 'Збережено',
      load: 'Завантажити',
      snapshotPng: 'Знімок PNG',
      snapshotSvg: 'SVG',
      buildAnim: 'Покроково',
      expandBoard: 'Сховати панель',
      showPanel: 'Показати панель',
      close: 'Закрити',
    },
    toolbar: {
      configsTitle: 'Конфігурації',
      exportJson: 'Експорт JSON',
      importJson: 'Імпорт JSON',
      noSavedConfigs: 'Немає збережених точок',
      deleteConfig: 'Видалити',
      snapshotPngTitle: 'Завантажити знімок експерименту (PNG)',
      snapshotSvgTitle: 'Завантажити векторне креслення (SVG)',
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
      zoomInTitle: 'Збільшити',
      zoomOutTitle: 'Зменшити',
      fitViewTitle: 'Вписати конструкцію',
      resetViewTitle: 'Скинути вигляд',
      dragHint: 'Тягніть A по вертикалі або B по горизонталі · Коліщатко для зуму',
      hoverDefault: 'Наведіть на коло, квадрат або сторону для інспекції',
    },
    hover: {
      vertexPrefix: 'Вершина',
      coordsLabel: 'Координати',
      dragY: 'Переміщення по вертикальній осі (x = 0)',
      dragX: 'Переміщення по горизонтальній осі (y = 0)',
      fixedVertex: 'Фіксована вершина',
      originTitle: 'Вершина O (Прямий кут 90°)',
      originDetails: 'Фіксований початок координат (0, 0). Гарантує збереження прямого кута.',
      triangleTitle: 'Прямокутний трикутник OAB',
      triangleLegsPrefix: 'Катети',
      triangleHypLabel: 'гіпотенуза',
      legOATitle: 'Вертикальний катет OA',
      legOBTitle: 'Горизонтальний катет OB',
      lengthUnit: 'Довжина',
      projHyp: 'Проєкція на гіпотенузу',
      hypABTitle: 'Гіпотенуза AB',
      hypDetailsSuffix: 'Сторона квадрата Q_c і діаметр кола K_c',
      squareQaTitle: 'Квадрат Q_a на катеті a',
      squareQbTitle: 'Квадрат Q_b на катеті b',
      squareQcTitle: 'Квадрат Q_c на гіпотенузі c',
      sideLabel: 'Сторона',
      areaLabel: 'Площа',
      circleKaTitle: 'Коло K_a (вписане у квадрат Q_a)',
      circleKbTitle: 'Коло K_b (вписане у квадрат Q_b)',
      circleKcTitle: 'Коло K_c (вписане у квадрат Q_c)',
      circleKiTitle: 'Вписане коло K_i (усередині трикутника OAB)',
      tanOATitle: 'Точка дотику на катеті OA',
      tanOBTitle: 'Точка дотику на катеті OB',
      tanABTitle: 'Точка дотику на гіпотенузі AB',
      incenterTitle: 'Центр вписаного кола I = (r, r)',
    },
    controls: {
      title: 'Параметри трикутника (a, b)',
      setIsoscelesTitle: 'Встановити рівнобедрений трикутник a = b = 4',
      legALabel: 'Катет',
      legBLabel: 'Катет',
      unitShort: 'од.',
      presetsTitle: 'Контрольні трикутники:',
      pause: 'Пауза',
      smoothSweep: 'Плавна зміна (a, b)',
      reset345: 'Скидання (3-4-5)',
      presetDescriptions: {
        classic_3_4_5: 'Класичний єгипетський трикутник: цілі сторони та цілочисловий вписаний радіус r = 1.',
        classic_5_12_13: 'Піфагорова трійка з цілим радіусом вписаного кола r = (5 + 12 - 13)/2 = 2.',
        sym_4_4: 'Симетричний прямокутний трикутник: K_a = K_b, r = 4 - 2√2 ≈ 1.1716.',
        extreme_1_10: 'Сильно витягнутий трикутник (b/a = 10): мале вписане коло K_i (r ≈ 0.475).',
        extreme_10_1: 'Дзеркальне витягування вздовж вертикального катета: K_a і K_b міняються місцями, K_i та K_c незмінні.',
        classic_8_15_17: 'Ще одна примітивна піфагорова трійка з цілим радіусом вписаного кола r = 3.',
      },
    },
    panel: {
      title: 'Числова панель чотирьох кіл',
      subtitle: 'Синхронний перерахунок площ, коренів та нев’язки',
      identityTitle: 'Центральна тотожність чотирьох кіл',
      identityHold: 'Тотожність виконується точно',
      identityFail: 'Виявлено нев’язку',
      lhsLabel: 'Ліва частина: √K_a + √K_b',
      rhsLabel: 'Права частина: √K_c + √K_i',
      residualLabel: 'Нев’язка тотожності',
      proofTitle: 'Алгебраїчне доведення тотожності',
      incircleTitle: 'Геометрія вписаного кола K_i',
      incircleDescBefore: 'Звичайне вписане коло торкається катетів у точках',
      incircleDescMiddle: 'та гіпотенузи в точці',
      incircleDescAfter: 'Його радіус завжди додатний:',
      legA: 'Катет a',
      legB: 'Катет b',
      hypC: 'Гіпотенуза c',
      radiusKi: 'Радіус K_i',
      colCircle: 'Коло',
      colLocation: 'Розташування',
      colDim: 'Діаметр / Радіус',
      colArea: 'Площа K',
      colSqrt: 'Корінь √K',
      locSquareQa: 'Квадрат Q_a',
      locSquareQb: 'Квадрат Q_b',
      locSquareQc: 'Квадрат Q_c',
      locInsideTri: 'Всередині △OAB',
      areaContrastTitle: 'Співвідношення самих площ (контраст)',
      equalsMinusKi: 'дорівнює -K_i',
      contrastNoteBefore: 'Пряма рівність площ',
      contrastNoteMiddle: 'хибна, оскільки за теоремою Піфагора',
      contrastNoteAfter: ', а площа вписаного кола',
      coordinatesTitle: 'Координати центрів та точок дотику',
    },
    spectral: {
      title: 'Параметричний спектральний аналіз чотирьох кіл',
      subtitleBefore: 'Безрозмірний параметр',
      subtitleAfter: 'нормування на гіпотенузне коло',
      tabAreas: 'Площі',
      tabPerimeters: 'Периметри',
      tabRadiiDiameters: 'Радіуси / Діаметри',
      linearNoteBefore: 'Лінійний масштаб:',
      linearNoteMiddle: 'нормовані криві',
      linearNoteAnd: 'та',
      linearNoteAfter: 'збігаються',
      radiiBtn: 'Радіуси (R)',
      diametersBtn: 'Діаметри (D)',
      plotTitle: 'Графіки функцій від відношення катетів',
      logScaleBtn: 'Лог. t',
      logScaleTitle: 'Логарифмічна шкала t (симетрія t ↔ 1/t навколо t = 1)',
      linearScaleBtn: 'Лінійна t',
      linearScaleTitle: 'Лінійна шкала t',
      zoomInTitle: 'Наблизити діапазон t',
      zoomOutTitle: 'Віддалити діапазон t',
      resetRangeTitle: 'Скинути діапазон на [0.1, 10]',
      symmetryBtn: 't = 1 (Симетрія)',
      symmetryBtnTitle: 'Встановити симетричний трикутник t = 1 (a = b)',
      pauseBtn: 'Пауза',
      sweepBtn: 'Пройти через симетрію',
      outOfRangeBefore: 'Поточне значення',
      outOfRangeMiddle: 'поза видимим діапазоном',
      fitRangeBtn: 'Включити в діапазон',
      svgAriaLabel: 'Декартовий графік нормованих характеристик чотирьох кіл залежно від t = b/a',
      axisLogLabel: '(логарифмічна шкала)',
      axisLinearLabel: '(лінійна шкала)',
      symmetryTag: 'Симетрія',
      currentPointLabel: 'Поточна точка:',
      referenceTitle: 'Еталонні точки відношення катетів',
      legAShort: 'Катет a',
      legBShort: 'Катет b',
      hypCShort: 'Гіпот. c',
      radRShort: 'Радіус r',
      colCircle: 'Коло',
      colArea: 'Площа K',
      colPerimeter: 'Периметр P',
      colRadius: 'Радіус R',
      colDiameter: 'Діаметр D',
      shareToggle: 'Частковий розподіл у поточному стані (допоміжно)',
      shareLabel: 'частка',
      formulaSecA: 'A. Параметричне відношення та нормована геометрія (a_norm = 1)',
      formulaAsteriskNote: 'Символ * позначає нормовані величини при a_norm = 1 (не розмірні величини вихідного трикутника).',
      formulaSecBNormalizedAreas: 'B. Нормовані площі (a_norm = 1)',
      formulaSecBNormalizedPerimeters: 'B. Нормовані периметри (a_norm = 1)',
      formulaSecBNormalizedRadii: 'B. Нормовані радіуси (a_norm = 1)',
      formulaSecBNormalizedDiameters: 'B. Нормовані діаметри (a_norm = 1)',
      formulaSecCRatioAreas: 'C. Відношення площ (функції на графіку)',
      formulaSecCRatioPerimeters: 'C. Відношення периметрів (функції на графіку)',
      formulaSecCRatioRadii: 'C. Відношення радіусів (функції на графіку)',
      formulaSecCRatioDiameters: 'C. Відношення діаметрів (функції на графіку)',
      atSymmetryNotice: 'Трикутник уже на осі симетрії t = 1 (a = b, 1/t = t).',
    },
    invariants: {
      title: 'Верифікація геометрії та тотожностей',
      confirmedSuffix: 'підтверджені',
      subtitle: 'Перевірка евклідових умов дотику, площ та тотожності чотирьох кіл (допуск 10⁻⁹):',
      calcLabel: 'Розрахунок',
      expectedLabel: 'Еталон',
      items: {
        incircle_positive: {
          name: 'Додатність вписаного радіуса r',
          description: 'Вписане коло K_i існує, r > 0 і центр I суворо всередині трикутника OAB.',
        },
        squares_construction: {
          name: 'Побудова трьох квадратів Q_a, Q_b, Q_c',
          description: 'Усі сторони квадратів дорівнюють відповідним сторонам трикутника, кути суворо 90°.',
        },
        square_circles_tangency: {
          name: 'Дотик K_a, K_b, K_c до сторін квадратів',
          description: 'Кожне з трьох кіл у квадратах торкається всіх чотирьох сторін свого квадрата.',
        },
        incircle_tangency: {
          name: 'Дотик K_i до всіх сторін трикутника',
          description: 'Четверте коло K_i торкається обох катетів та гіпотенузи трикутника OAB.',
        },
        four_circle_areas: {
          name: 'Точність площ чотирьох кіл',
          description: 'Узгодженість обчислених площ усіх чотирьох кіл із їх аналітичними формулами.',
        },
        central_sqrt_identity: {
          name: 'Центральна тотожність коренів площ',
          description: 'Сума квадратних коренів із площ кіл на катетах дорівнює сумі коренів для гіпотенузи та вписаного кола.',
        },
        pythagorean_circle_areas: {
          name: 'Піфагорова сума площ на сторонах',
          description: 'Сума площ кіл у квадратах на катетах дорівнює площі кола на гіпотенузі.',
        },
        area_non_equality_contrast: {
          name: 'Відмінність тотожності від суми площ',
          description: 'Пряма сума площ не дорівнює K_c + K_i: розбіжність суворо дорівнює -K_i < 0.',
        },
      },
    },
    compareModal: {
      title: 'Порівняння чотириколових конфігурацій',
      subtitle: 'Зіставлення еталонного трикутника та поточної конструкції',
      captureBtn: 'Зафіксувати поточну в Конфігурацію 1',
      loadBtn: 'Завантажити Конфігурацію 1',
      config1: 'Конфігурація 1',
      config2: 'Конфігурація 2',
      colQuantity: 'Величина',
      colConf1: 'Конф. 1',
      colConf2: 'Конф. 2',
      metrics: {
        legA: 'Катет a',
        legB: 'Катет b',
        hypC: 'Гіпотенуза c',
        inradiusR: 'Вписаний радіус r',
        areaKa: 'Площа K_a',
        areaKb: 'Площа K_b',
        areaKc: 'Площа K_c',
        areaKi: 'Площа K_i',
      },
    },
    testModal: {
      title: 'Контрольні трикутники та перевірка тотожності',
      subtitle: 'Автоматична верифікація 8 геометричних та алгебраїчних інваріантів чотирьох кіл',
      colTriangle: 'Трикутник',
      colProfile: 'Геометричний профіль',
      colChecks: 'Перевірки',
      colDelta: 'Нев’язка Δ',
      colAction: 'Дія',
      okStatus: 'OK',
      failStatus: 'ПОМИЛКА',
      openBtn: 'Відкрити',
      openTitle: 'Завантажити цей трикутник на полотно',
      allPassBanner: 'Усі контрольні трикутники підтвердили побудову квадратів, дотик чотирьох кіл, додатність вписаного радіуса r > 0 та тотожність √K_a + √K_b = √K_c + √K_i.',
      failBanner: 'Виявлено розбіжність інваріантів в одній або кількох конфігураціях.',
      cases: {
        '3_4': 'Єгипетський трикутник: c = 5, r = 1',
        '5_12': 'Піфагорова трійка: c = 13, r = 2',
        '4_4': 'Симетрія a = b: K_a = K_b, r ≈ 1.1716',
        '1_10': 'Витягнутий трикутник: c ≈ 10.0499, r ≈ 0.4751',
        '10_1': 'Дзеркальний витягнутий: K_a ↔ K_b, K_i незмінний',
      },
    },
    helpModal: {
      title: 'Довідка: Лабораторія Піфагора — чотири кола',
      subtitle: 'Геометрична модель чотирьох кіл, породжених прямокутним трикутником',
      sec1Title: 'Чотири кола єдиної параметричної системи',
      sec1IntroBefore: 'Усі об’єкти конструкції обчислюються детерміновано з двох незалежних параметрів — катетів',
      sec1IntroAnd: 'і',
      sec1IntroTriangle: 'прямокутного трикутника',
      kaColor: 'синій',
      kaDesc1: 'коло діаметра',
      kaDesc2: 'вписане у квадрат',
      kaDesc3: 'на катеті',
      kbColor: 'зелений',
      kbDesc1: 'коло діаметра',
      kbDesc2: 'вписане у квадрат',
      kbDesc3: 'на катеті',
      kcColor: 'червоний',
      kcDesc1: 'коло діаметра',
      kcDesc2: 'вписане у квадрат',
      kcDesc3: 'на гіпотенузі',
      kiColor: 'бурштиновий',
      kiDesc1: 'звичайне вписане коло суворо всередині трикутника',
      kiDesc2: 'що торкається всіх трьох його сторін. Радіус',
      kiDesc3: 'площа',
      sec2Title: 'Центральна тотожність чотирьох кіл:',
      sec2Text1: 'Оскільки',
      sec2TextAnd: 'та',
      sec2Text2: 'сума правих частин дорівнює',
      sec2Text3: '— тотожно збігаючись із лівою частиною!',
      sec3Title: 'Чому рівність самих площ хибна:',
      sec3Bullet1: 'За теоремою Піфагора для трьох квадратних кіл виконується',
      sec3Bullet2Before: 'Оскільки вписане коло має додатну площу',
      sec3Bullet2After: ', вираз',
      gotItBtn: 'Зрозуміло',
    },
  },
  en: {
    brandTitle: 'Pythagoras — Four Circles',
    aria: {
      boardSection: 'Interactive Four-Circles geometry canvas',
      panelAside: 'Controls and numeric observer panel',
    },
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
      saved: 'Saved',
      load: 'Load',
      snapshotPng: 'Snapshot PNG',
      snapshotSvg: 'SVG',
      buildAnim: 'Step Build',
      expandBoard: 'Hide Panel',
      showPanel: 'Show Panel',
      close: 'Close',
    },
    toolbar: {
      configsTitle: 'Configurations',
      exportJson: 'Export JSON',
      importJson: 'Import JSON',
      noSavedConfigs: 'No saved points',
      deleteConfig: 'Delete',
      snapshotPngTitle: 'Download experiment snapshot (PNG)',
      snapshotSvgTitle: 'Download vector drawing (SVG)',
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
      zoomInTitle: 'Zoom in',
      zoomOutTitle: 'Zoom out',
      fitViewTitle: 'Fit construction',
      resetViewTitle: 'Reset view',
      dragHint: 'Drag A vertically or B horizontally · Scroll to zoom',
      hoverDefault: 'Hover any circle, square, or side to inspect',
    },
    hover: {
      vertexPrefix: 'Vertex',
      coordsLabel: 'Coordinates',
      dragY: 'Constrained along vertical axis (x = 0)',
      dragX: 'Constrained along horizontal axis (y = 0)',
      fixedVertex: 'Fixed vertex',
      originTitle: 'Vertex O (Right angle 90°)',
      originDetails: 'Fixed coordinate origin (0, 0). Preserves the 90° right angle.',
      triangleTitle: 'Right Triangle OAB',
      triangleLegsPrefix: 'Legs',
      triangleHypLabel: 'hypotenuse',
      legOATitle: 'Vertical Leg OA',
      legOBTitle: 'Horizontal Leg OB',
      lengthUnit: 'Length',
      projHyp: 'Projection onto hypotenuse',
      hypABTitle: 'Hypotenuse AB',
      hypDetailsSuffix: 'Side of square Q_c and diameter of circle K_c',
      squareQaTitle: 'Square Q_a on leg a',
      squareQbTitle: 'Square Q_b on leg b',
      squareQcTitle: 'Square Q_c on hypotenuse c',
      sideLabel: 'Side',
      areaLabel: 'Area',
      circleKaTitle: 'Circle K_a (inscribed in square Q_a)',
      circleKbTitle: 'Circle K_b (inscribed in square Q_b)',
      circleKcTitle: 'Circle K_c (inscribed in square Q_c)',
      circleKiTitle: 'Incircle K_i (inside triangle OAB)',
      tanOATitle: 'Tangency point on leg OA',
      tanOBTitle: 'Tangency point on leg OB',
      tanABTitle: 'Tangency point on hypotenuse AB',
      incenterTitle: 'Incircle center I = (r, r)',
    },
    controls: {
      title: 'Triangle Parameters (a, b)',
      setIsoscelesTitle: 'Set isosceles right triangle a = b = 4',
      legALabel: 'Leg',
      legBLabel: 'Leg',
      unitShort: 'u.',
      presetsTitle: 'Control triangles:',
      pause: 'Pause',
      smoothSweep: 'Smooth sweep (a, b)',
      reset345: 'Reset (3-4-5)',
      presetDescriptions: {
        classic_3_4_5: 'Classic Egyptian right triangle: integer sides and integer inradius r = 1.',
        classic_5_12_13: 'Pythagorean triple with integer incircle radius r = (5 + 12 - 13)/2 = 2.',
        sym_4_4: 'Symmetric isosceles right triangle: K_a = K_b, r = 4 - 2√2 ≈ 1.1716.',
        extreme_1_10: 'Elongated triangle (b/a = 10): small incircle K_i (r ≈ 0.475).',
        extreme_10_1: 'Mirrored elongation along vertical leg: K_a and K_b swap, while K_i and K_c stay unchanged.',
        classic_8_15_17: 'Another primitive Pythagorean triple with integer inradius r = 3.',
      },
    },
    panel: {
      title: 'Four Circles Numeric Observer',
      subtitle: 'Synchronized areas, square roots, and identity residual',
      identityTitle: 'Central Four-Circle Identity',
      identityHold: 'Identity holds exactly',
      identityFail: 'Residual detected',
      lhsLabel: 'LHS: √K_a + √K_b',
      rhsLabel: 'RHS: √K_c + √K_i',
      residualLabel: 'Identity residual',
      proofTitle: 'Algebraic Proof of the Identity',
      incircleTitle: 'Incircle K_i Geometry',
      incircleDescBefore: 'The triangle incircle touches both legs at',
      incircleDescMiddle: 'and the hypotenuse at',
      incircleDescAfter: 'Its radius is always strictly positive:',
      legA: 'Leg a',
      legB: 'Leg b',
      hypC: 'Hypotenuse c',
      radiusKi: 'Radius K_i',
      colCircle: 'Circle',
      colLocation: 'Construction',
      colDim: 'Diameter / Radius',
      colArea: 'Area K',
      colSqrt: 'Root √K',
      locSquareQa: 'Square Q_a',
      locSquareQb: 'Square Q_b',
      locSquareQc: 'Square Q_c',
      locInsideTri: 'Inside △OAB',
      areaContrastTitle: 'Direct Area Contrast (Non-Equality)',
      equalsMinusKi: 'equals -K_i',
      contrastNoteBefore: 'Direct area equality',
      contrastNoteMiddle: 'is false because by the Pythagorean theorem',
      contrastNoteAfter: ', while the incircle area is',
      coordinatesTitle: 'Centers & Tangency Coordinates',
    },
    spectral: {
      title: 'Four-Circles Parametric Spectral Analysis',
      subtitleBefore: 'Dimensionless ratio',
      subtitleAfter: 'normalized to hypotenuse circle',
      tabAreas: 'Areas',
      tabPerimeters: 'Perimeters',
      tabRadiiDiameters: 'Radii / Diameters',
      linearNoteBefore: 'Linear scale:',
      linearNoteMiddle: 'normalized curves',
      linearNoteAnd: 'and',
      linearNoteAfter: 'coincide',
      radiiBtn: 'Radii (R)',
      diametersBtn: 'Diameters (D)',
      plotTitle: 'Normalized functions vs. leg ratio',
      logScaleBtn: 'Log t',
      logScaleTitle: 'Logarithmic t-axis (t ↔ 1/t symmetry around t = 1)',
      linearScaleBtn: 'Linear t',
      linearScaleTitle: 'Linear t-axis',
      zoomInTitle: 'Zoom in t-range',
      zoomOutTitle: 'Zoom out t-range',
      resetRangeTitle: 'Reset range to [0.1, 10]',
      symmetryBtn: 't = 1 (Symmetry)',
      symmetryBtnTitle: 'Set symmetric triangle t = 1 (a = b)',
      pauseBtn: 'Pause',
      sweepBtn: 'Play Through Symmetry',
      outOfRangeBefore: 'Current value',
      outOfRangeMiddle: 'is outside visible range',
      fitRangeBtn: 'Include in range',
      svgAriaLabel: 'Cartesian plot of normalized four-circle metrics vs. t = b/a',
      axisLogLabel: '(logarithmic scale)',
      axisLinearLabel: '(linear scale)',
      symmetryTag: 'Symmetry',
      currentPointLabel: 'Current point:',
      referenceTitle: 'Reference leg-ratio points',
      legAShort: 'Leg a',
      legBShort: 'Leg b',
      hypCShort: 'Hypot. c',
      radRShort: 'Radius r',
      colCircle: 'Circle',
      colArea: 'Area K',
      colPerimeter: 'Perimeter P',
      colRadius: 'Radius R',
      colDiameter: 'Diameter D',
      shareToggle: 'Current-state proportional breakdown (auxiliary)',
      shareLabel: 'share',
      formulaSecA: 'A. Parameter Ratio & Normalized Geometry (a_norm = 1)',
      formulaAsteriskNote: 'The asterisk (*) denotes normalized quantities with a_norm = 1 (distinct from dimensional triangle values).',
      formulaSecBNormalizedAreas: 'B. Normalized Areas (a_norm = 1)',
      formulaSecBNormalizedPerimeters: 'B. Normalized Perimeters (a_norm = 1)',
      formulaSecBNormalizedRadii: 'B. Normalized Radii (a_norm = 1)',
      formulaSecBNormalizedDiameters: 'B. Normalized Diameters (a_norm = 1)',
      formulaSecCRatioAreas: 'C. Area Ratios (Plotted Graph Functions)',
      formulaSecCRatioPerimeters: 'C. Perimeter Ratios (Plotted Graph Functions)',
      formulaSecCRatioRadii: 'C. Radius Ratios (Plotted Graph Functions)',
      formulaSecCRatioDiameters: 'C. Diameter Ratios (Plotted Graph Functions)',
      atSymmetryNotice: 'Already at the symmetry axis t = 1 (a = b, 1/t = t).',
    },
    invariants: {
      title: 'Geometry & Identity Verification',
      confirmedSuffix: 'verified',
      subtitle: 'Live Euclidean tangency, area, and four-circle identity checks (tolerance 10⁻⁹):',
      calcLabel: 'Computed',
      expectedLabel: 'Expected',
      items: {
        incircle_positive: {
          name: 'Inradius Positivity (r > 0)',
          description: 'Incircle K_i exists with r > 0 and center I strictly inside triangle OAB.',
        },
        squares_construction: {
          name: 'Three Squares Q_a, Q_b, Q_c Construction',
          description: 'All square sides match triangle side lengths with exact 90° orthogonality.',
        },
        square_circles_tangency: {
          name: 'Square-Inscribed Circles Tangency (K_a, K_b, K_c)',
          description: 'Each of the three square circles is tangent to all four sides of its square.',
        },
        incircle_tangency: {
          name: 'Incircle K_i Tangency to Triangle Sides',
          description: 'Fourth circle K_i is tangent to both legs OA, OB and hypotenuse AB.',
        },
        four_circle_areas: {
          name: 'Four-Circle Area Consistency',
          description: 'All four circle areas match their closed-form analytical expressions.',
        },
        central_sqrt_identity: {
          name: 'Central Square-Root Area Identity',
          description: 'Sum of square roots of leg circle areas equals the sum for hypotenuse and incircle.',
        },
        pythagorean_circle_areas: {
          name: 'Pythagorean Square-Circle Area Sum',
          description: 'Sum of square-inscribed circle areas on legs equals the hypotenuse circle area.',
        },
        area_non_equality_contrast: {
          name: 'Direct Area Contrast (Non-Equality)',
          description: 'Direct area sum differs from K_c + K_i by exactly -K_i < 0.',
        },
      },
    },
    compareModal: {
      title: 'Compare Four-Circles Configurations',
      subtitle: 'Side-by-side comparison of reference triangle and current construction',
      captureBtn: 'Capture current as Config 1',
      loadBtn: 'Load Config 1',
      config1: 'Config 1',
      config2: 'Config 2',
      colQuantity: 'Metric',
      colConf1: 'Config 1',
      colConf2: 'Config 2',
      metrics: {
        legA: 'Leg a',
        legB: 'Leg b',
        hypC: 'Hypotenuse c',
        inradiusR: 'Inradius r',
        areaKa: 'Area K_a',
        areaKb: 'Area K_b',
        areaKc: 'Area K_c',
        areaKi: 'Area K_i',
      },
    },
    testModal: {
      title: 'Control Triangles & Identity Verification',
      subtitle: 'Automated verification of 8 geometric and algebraic four-circle invariants',
      colTriangle: 'Triangle',
      colProfile: 'Geometric Profile',
      colChecks: 'Checks',
      colDelta: 'Residual Δ',
      colAction: 'Action',
      okStatus: 'OK',
      failStatus: 'FAIL',
      openBtn: 'Open',
      openTitle: 'Load this triangle onto the board',
      allPassBanner: 'All control triangles verified square construction, four-circle tangency, inradius positivity r > 0, and identity √K_a + √K_b = √K_c + √K_i.',
      failBanner: 'Invariant discrepancy detected in one or more configurations.',
      cases: {
        '3_4': 'Egyptian triangle: c = 5, r = 1',
        '5_12': 'Pythagorean triple: c = 13, r = 2',
        '4_4': 'Symmetry a = b: K_a = K_b, r ≈ 1.1716',
        '1_10': 'Elongated triangle: c ≈ 10.0499, r ≈ 0.4751',
        '10_1': 'Mirrored elongated: K_a ↔ K_b, K_i unchanged',
      },
    },
    helpModal: {
      title: 'Help: Pythagoras — Four Circles Laboratory',
      subtitle: 'Geometric model of four circles generated by a right triangle',
      sec1Title: 'Four Circles in a Single Parametric System',
      sec1IntroBefore: 'Every object in the construction is computed deterministically from two independent parameters — legs',
      sec1IntroAnd: 'and',
      sec1IntroTriangle: 'of right triangle',
      kaColor: 'blue',
      kaDesc1: 'circle of diameter',
      kaDesc2: 'inscribed in square',
      kaDesc3: 'on leg',
      kbColor: 'emerald',
      kbDesc1: 'circle of diameter',
      kbDesc2: 'inscribed in square',
      kbDesc3: 'on leg',
      kcColor: 'crimson',
      kcDesc1: 'circle of diameter',
      kcDesc2: 'inscribed in square',
      kcDesc3: 'on hypotenuse',
      kiColor: 'amber',
      kiDesc1: 'the triangle incircle strictly inside',
      kiDesc2: 'tangent to all three sides. Radius',
      kiDesc3: 'area',
      sec2Title: 'Central Four-Circle Identity:',
      sec2Text1: 'Since',
      sec2TextAnd: 'and',
      sec2Text2: 'adding the right-hand terms gives',
      sec2Text3: '— matching the left-hand side identically!',
      sec3Title: 'Why Direct Area Equality Fails:',
      sec3Bullet1: 'By the Pythagorean theorem on the three square circles:',
      sec3Bullet2Before: 'Since the incircle has strictly positive area',
      sec3Bullet2After: ', we obtain',
      gotItBtn: 'Got it',
    },
  },
};
