(() => {
  'use strict';

  const levels = [
    { name: 'Pulmão', short: 'Pulmão', scale: '10⁰', category: 'ANATOMIA · ESCALA 1', subtitle: 'Da arquitetura pulmonar à resposta imune celular', title: 'Pulmão' },
    { name: 'Lóbulo', short: 'Lóbulo', scale: '10⁻¹', category: 'ANATOMIA · ESCALA 2', subtitle: 'Unidade funcional delimitada por septos conjuntivos', title: 'Lóbulo pulmonar' },
    { name: 'Bronquíolo', short: 'Bronquíolo', scale: '10⁻²', category: 'ANATOMIA · ESCALA 3', subtitle: 'Ramificação que conduz o ar até os alvéolos', title: 'Bronquíolo' },
    { name: 'Alvéolo', short: 'Alvéolo', scale: '10⁻³', category: 'MICROANATOMIA · ESCALA 4', subtitle: 'Interface entre o ar e a rede capilar', title: 'Alvéolo pulmonar' }
  ];

  const concepts = {
    scene: {
      icon: '◉', title: null,
      description: 'Explore a defesa pulmonar em diferentes escalas. A navegação conecta a anatomia do órgão aos processos celulares e às estruturas de Mycobacterium tuberculosis.',
      focusTitle: 'Uma jornada entre escalas',
      focusText: 'A resposta à infecção emerge da interação entre barreiras do hospedeiro, células imunes e características do patógeno.',
      tags: ['pulmão', 'macrófago', 'M. tuberculosis']
    },
    pathway: {
      icon: '⌁', title: 'Via imune',
      description: 'Uma rota didática conecta o reconhecimento microbiano a mecanismos antimicrobianos. TLR2 pode sinalizar por MyD88 e contribuir para a ativação de NF-κB.',
      focusTitle: 'Do reconhecimento ao peptídeo',
      focusText: 'Em contextos apropriados, a sinalização e a vitamina D podem favorecer a expressão de CYP27B1, VDR e CAMP. O gene CAMP codifica o precursor da catelicidina LL-37.',
      tags: ['TLR2', 'MyD88', 'NF-κB', 'CYP27B1', 'VDR', 'CAMP', 'LL-37']
    },
    antigen: {
      icon: '◈', title: 'Apresentação antigênica',
      description: 'Após processamento de material internalizado, peptídeos podem ser carregados em moléculas de MHC-II e apresentados na superfície para reconhecimento por linfócitos T CD4⁺.',
      focusTitle: 'Fagocitose → MHC-II',
      focusText: 'Endossomos e compartimentos acidificados processam proteínas. Complexos peptídeo–MHC-II trafegam até a membrana; o reconhecimento por T CD4⁺ depende de coestimulação e do contexto imunológico.',
      tags: ['endossomo', 'peptídeo', 'MHC-II', 'T CD4⁺']
    },
    phage: {
      icon: '✳', title: 'Fago & CRISPR tipo III-A',
      description: 'Este módulo apresenta uma analogia visual e conceitual entre interação fago–bactéria e sistemas CRISPR. Não descreve protocolo, desempenho ou precisão experimental.',
      focusTitle: 'Memória e interferência — em conceito',
      focusText: 'Em alguns sistemas tipo III-A, um complexo guiado por RNA reconhece transcritos correspondentes e pode desencadear interferência dependente de transcrição. A resposta varia entre sistemas e contextos.',
      tags: ['fago', 'RNA guia', 'complexo Csm', 'interferência']
    }
  };

  const levelNotes = [
    'O pulmão contém uma árvore de vias aéreas e milhões de alvéolos envolvidos nas trocas gasosas.',
    'Cada lóbulo reúne bronquíolos e unidades alveolares irrigadas por uma rede vascular.',
    'Bronquíolos conduzem o ar; não possuem cartilagem e se ramificam em vias menores.',
    'A parede alveolar fina aproxima o ar inspirado dos capilares sanguíneos.'
  ];

  const featureTags = [
    ['vias aéreas', 'alvéolos', 'capilares'],
    ['septos', 'bronquíolos', 'alvéolos'],
    ['epitélio', 'músculo liso', 'muco'],
    ['pneumócito I', 'pneumócito II', 'surfactante']
  ];

  const pathwayLabels = ['TLR2', 'MyD88', 'NF-κB', 'CYP27B1', 'VDR', 'CAMP', 'LL-37'];
  const pathwayDescriptions = [
    'Reconhecer sinais microbianos',
    'Adaptador de sinalização',
    'Regulação de genes de resposta',
    'Metabolismo local da vitamina D',
    'Receptor nuclear de vitamina D',
    'Expressão do precursor da catelicidina',
    'Peptídeo antimicrobiano efetor'
  ];
  const infectionViews = [
    { id: 'alveolus', label: 'Alvéolo', title: 'Patrulha alveolar', description: 'Encontre bacilos livres no espaço alveolar e aproxime o macrófago para internalizá-los.' },
    { id: 'phagosome', label: 'Fagossomo', title: 'Bacilo no fagossomo', description: 'Observe o tráfego do bacilo entre compartimentos e a possível ruptura fagossomal, representados de modo esquemático.' },
    { id: 'host-cytosol', label: 'Citosol', title: 'Bacilo no citosol do macrófago', description: 'O escape do fagossomo associado a ESX-1 e a mobilidade intracelular são representações didáticas, não motilidade flagelar.' },
    { id: 'neutrophil-cytosol', label: 'Neutrófilo', title: 'Bacilo no neutrófilo', description: 'Acompanhe bacilos em fagossomos ou no citosol do neutrófilo; escape e dano são possibilidades do modelo, não taxas biológicas.' },
    { id: 'wall', label: 'Parede', title: 'Parede bacteriana', description: 'LL-37 e os pontos de permeabilização são desenhados como uma hipótese visual, não como resultado garantido em M. tuberculosis.' },
    { id: 'cytoplasm', label: 'Citoplasma', title: 'Citoplasma bacteriano', description: 'Os elementos fágicos no citoplasma são uma metáfora visual: partículas fágicas não são mostradas como virions livres em biologia real.' },
    { id: 'phagolysosome', label: 'Fagolisossomo', title: 'Fagolisossomo', description: 'A etapa final representa maturação e degradação conceituais após a ativação dos requisitos definidos pelo cenário.' },
    { id: 'granuloma', label: 'Granuloma', title: 'Organização do granuloma', description: 'Veja uma organização celular esquemática; granulomas podem conter bacilos ou também favorecer sua persistência.' }
  ];
  const initialBacteriaCount = 18;
  const maxBacteriaCount = 120;
  const maxMacrophages = 10;
  const maxNeutrophils = 6;
  const maxPlasmaCells = 6;
  const conceptualPhageCount = 1000;
  const alveoliPerLung = 500;
  const totalAlveoli = alveoliPerLung * 2;
  const alveolarColumns = 20;
  const alveolarRows = 25;
  const cytokineModules = [
    { name: 'IL-1β', role: 'Inflamação local', active: false },
    { name: 'TNF', role: 'Ativa endótelio', active: false },
    { name: 'CXCL8', role: 'Quimioatrai neutrófilos', active: false },
    { name: 'IL-6', role: 'Ativa resposta sistêmica', active: false },
    { name: 'IL-12', role: 'Ajuda ativação de T helper', active: false }
  ];
  const macrophageDefenses = [
    { id: 'ifng', name: 'IFN-γ · JAK/STAT1', short: 'IFN-γ', role: 'Licenciamento transcricional dependente do contexto', active: false },
    { id: 'acidification', name: 'V-ATPase · acidificação', short: 'pH lisossomal', role: 'Acidificação e entrega de hidrolases ao compartimento', active: false },
    { id: 'lap', name: 'LAP · LC3 no fagossomo', short: 'LAP', role: 'Fagocitose associada a LC3; não confundir com autofagia canônica', active: false },
    { id: 'xenophagy', name: 'Xenofagia seletiva', short: 'Xenofagia', role: 'Reconhecimento de material microbiano exposto e direcionamento ao autofagossomo', active: false },
    { id: 'ros', name: 'NOX2 · ROS', short: 'NOX2 / ROS', role: 'Estresse oxidativo no fagossomo; atividade variável e combatida pelo patógeno', active: false },
    { id: 'rns', name: 'iNOS · RNS', short: 'iNOS / RNS', role: 'Espécies reativas de nitrogênio; relevância depende de espécie e contexto', active: false },
    { id: 'cgas', name: 'cGAS–STING', short: 'cGAS–STING', role: 'Sensoriamento de DNA citosólico e sinalização de interferons tipo I', active: false },
    { id: 'inflammasome', name: 'NLRP3 · caspase-1', short: 'NLRP3', role: 'Processamento de IL-1β/IL-18 e inflamação; não é uma via bactericida direta', active: false }
  ];
  const sceneCanvas = document.getElementById('scene-canvas');
  const overlayCanvas = document.getElementById('overlay-canvas');
  const gl = sceneCanvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false, preserveDrawingBuffer: true });
  const ctx = overlayCanvas.getContext('2d');
  const minimap = document.getElementById('minimap');
  const mapCtx = minimap.getContext('2d');
  const levelTrack = document.getElementById('hierarchy-track');
  const toast = document.getElementById('toast');
  const state = {
    level: 0,
    topic: 'scene',
    particles: true,
    paused: false,
    keys: new Set(),
    joy: { x: 0, y: 0 },
    navVelocity: { x: 0, y: 0 },
    camera: { x: 0, y: 0 },
    particleItems: [],
    pathwayActive: Array(pathwayLabels.length).fill(false),
    patrol: {
      active: false, running: false, initialized: false, complete: false,
      bacteria: [], phagosomes: [], macrophages: [], granulomas: [],
      defenseUnits: [], helperT: [], bCells: [], neutrophils: [],
      plasmaCells: [], antibodies: [], complement: [], nets: [], deaths: [],
      spreadSites: [], spreadTimer: 0, lysisCount: 0, neutrophilLysisCount: 0,
      nextNetId: 1, nextNeutrophilId: 1, nextPlasmaId: 1,
      cleared: 0, phageTherapy: false, infectionView: 'alveolus', toastTimer: 0,
      playerCount: 1, activePlayer: 0, worldSeed: 0, readyPlayers: [false, false, false],
      infectedAlveoli: 1, fociRefreshTimer: 0,
      nextAntibodyIsotype: 'IgG',
      cytokines: cytokineModules.map(module => ({ ...module })),
      defenses: macrophageDefenses.map(module => ({ ...module })),
      playerRoles: ['Macrófago', 'Neutrófilo', 'Lin. B']
    },
    mapVisible: true,
    toastTimer: 0
  };
  let alveolarWorld = null;
  function createAlveolarWorld(seed) {
    let randomState = (seed >>> 0) || 0x6d2b79f5;
    const random = () => {
      randomState += 0x6d2b79f5;
      let value = randomState;
      value = Math.imul(value ^ value >>> 15, value | 1);
      value ^= value + Math.imul(value ^ value >>> 7, value | 61);
      return ((value ^ value >>> 14) >>> 0) / 4294967296;
    };
    const nodes = [];
    const passages = [];
    const connect = (leftId, rightId) => {
      const left = nodes[leftId];
      const right = nodes[rightId];
      left.neighbors.push(rightId);
      right.neighbors.push(leftId);
      passages.push({ a: leftId, b: rightId });
    };
    for (let lung = 0; lung < 2; lung++) {
      const side = lung === 0 ? -1 : 1;
      for (let row = 0; row < alveolarRows; row++) {
        const v = row / (alveolarRows - 1) * 2 - 1;
        const width = Math.sqrt(Math.max(.12, 1 - .58 * v * v));
        for (let column = 0; column < alveolarColumns; column++) {
          const u = column / (alveolarColumns - 1) * 2 - 1;
          const id = lung * alveoliPerLung + row * alveolarColumns + column;
          nodes.push({
            id, lung: lung === 0 ? 'esquerdo' : 'direito', row, column, neighbors: [],
            x: side * 5.2 + u * 4.25 * width + (random() - .5) * .075,
            y: v * 5.8 + (random() - .5) * .075
          });
        }
      }
    }
    for (let lung = 0; lung < 2; lung++) {
      const offset = lung * alveoliPerLung;
      for (let row = 0; row < alveolarRows; row++) {
        for (let column = 0; column < alveolarColumns; column++) {
          const id = offset + row * alveolarColumns + column;
          if (column < alveolarColumns - 1) connect(id, id + 1);
          if (row < alveolarRows - 1) connect(id, id + alveolarColumns);
        }
      }
    }
    connect(alveoliPerLung - 1 - Math.floor(alveolarRows / 2) * alveolarColumns,
      alveoliPerLung + Math.floor(alveolarRows / 2) * alveolarColumns);
    return { seed: seed >>> 0, nodes, passages };
  }
  function getAlveolarWorld() {
    const seed = state.patrol.worldSeed >>> 0;
    if (!alveolarWorld || alveolarWorld.seed !== seed) alveolarWorld = createAlveolarWorld(seed);
    return alveolarWorld;
  }
  function nearestAlveolus(x, y) {
    const nodes = getAlveolarWorld().nodes;
    let nearest = nodes[0];
    let distance = Infinity;
    for (const node of nodes) {
      const nextDistance = (node.x - x) ** 2 + (node.y - y) ** 2;
      if (nextDistance < distance) {
        nearest = node;
        distance = nextDistance;
      }
    }
    return nearest;
  }
  function isInsideAlveolarWorld(x, y) {
    const leftLung = ((x + 5.2) / 4.6) ** 2 + (y / 7.6) ** 2 <= 1;
    const rightLung = ((x - 5.2) / 4.6) ** 2 + (y / 7.6) ** 2 <= 1;
    const centralPassage = Math.abs(x) <= .65 && Math.abs(y) <= .3;
    return leftLung || rightLung || centralPassage;
  }
  function getPlayerEntity(player) {
    const patrol = state.patrol;
    const role = patrol.playerRoles[player] || ['Macrófago', 'Neutrófilo', 'Lin. B'][player];
    const cells = role === 'Neutrófilo' ? patrol.neutrophils
      : role === 'Plasmócito' ? patrol.plasmaCells
        : role === 'Lin. B' ? patrol.bCells.concat(patrol.plasmaCells) : patrol.macrophages;
    const isAlive = cell => role === 'Neutrófilo' ? cell.alive !== false
      : role === 'Macrófago' ? cell.alive : true;
    return cells.find(cell => cell.playerSlot === player && isAlive(cell))
      || cells.find(cell => cell.playerSlot === undefined && isAlive(cell));
  }
  function getWorldCameraPosition() {
    const actor = getPlayerEntity(state.patrol.activePlayer);
    return actor ? { x: actor.x, y: actor.y } : { x: 0, y: 0 };
  }
  if (!gl) {
    document.getElementById('scene-title').textContent = 'WebGL indisponível';
    document.getElementById('scene-subtitle').textContent = 'Ative WebGL no navegador para explorar a visualização.';
    throw new Error('Este navegador não disponibiliza WebGL.');
  }

  const vertexSource = `
    attribute vec2 a_position;
    attribute vec4 a_color;
    uniform vec2 u_resolution;
    varying vec4 v_color;
    void main() {
      vec2 clip = (a_position / u_resolution) * 2.0 - 1.0;
      gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
      v_color = a_color;
    }`;
  const fragmentSource = `
    precision mediump float;
    varying vec4 v_color;
    void main() { gl_FragColor = v_color; }`;

  function makeShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Falha ao compilar shader: ${error}`);
    }
    return shader;
  }
  const program = gl.createProgram();
  gl.attachShader(program, makeShader(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, makeShader(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(`Falha ao vincular programa WebGL: ${gl.getProgramInfoLog(program)}`);
  const positionBuffer = gl.createBuffer();
  const colorBuffer = gl.createBuffer();
  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const colorLocation = gl.getAttribLocation(program, 'a_color');
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  const colorValues = {
    air: [0.12, 0.42, 0.47, 0.92], airLight: [0.27, 0.64, 0.63, 0.72],
    tissue: [0.28, 0.56, 0.52, 0.8], tissueLight: [0.51, 0.77, 0.68, 0.72],
    capillary: [0.73, 0.34, 0.39, 0.78], cell: [0.21, 0.59, 0.49, 0.78],
    cellLight: [0.38, 0.77, 0.61, 0.84], nucleus: [0.31, 0.42, 0.76, 0.92],
    nucleusLight: [0.54, 0.62, 0.89, 0.88], vesicle: [0.78, 0.62, 0.32, 0.8],
    vesicleLight: [0.91, 0.75, 0.44, 0.9], bacteria: [0.9, 0.57, 0.3, 0.96],
    bacteriaDark: [0.63, 0.31, 0.22, 0.96], dna: [0.53, 0.75, 0.93, 0.94],
    purple: [0.64, 0.48, 0.77, 0.9], white: [0.69, 0.83, 0.82, 0.6],
    dark: [0.06, 0.16, 0.19, 0.97], glow: [0.16, 0.48, 0.43, 0.25]
  };
  let shapeVertices = [];

  function pushTriangle(a, b, c, color) {
    const rgba = colorValues[color] || color;
    shapeVertices.push(a[0], a[1], rgba[0], rgba[1], rgba[2], rgba[3],
      b[0], b[1], rgba[0], rgba[1], rgba[2], rgba[3],
      c[0], c[1], rgba[0], rgba[1], rgba[2], rgba[3]);
  }
  function circle(x, y, radius, color, segments) {
    const n = segments || 40;
    const center = [x, y];
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2;
      const b = (i + 1) / n * Math.PI * 2;
      pushTriangle(center, [x + Math.cos(a) * radius, y + Math.sin(a) * radius],
        [x + Math.cos(b) * radius, y + Math.sin(b) * radius], color);
    }
  }
  function ring(x, y, outer, inner, color, segments) {
    const n = segments || 56;
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2;
      const b = (i + 1) / n * Math.PI * 2;
      const a0 = [x + Math.cos(a) * outer, y + Math.sin(a) * outer];
      const b0 = [x + Math.cos(b) * outer, y + Math.sin(b) * outer];
      const a1 = [x + Math.cos(a) * inner, y + Math.sin(a) * inner];
      const b1 = [x + Math.cos(b) * inner, y + Math.sin(b) * inner];
      pushTriangle(a0, b0, a1, color);
      pushTriangle(b0, b1, a1, color);
    }
  }
  function filledPolygon(points, color) {
    const center = points.reduce((sum, point) => [sum[0] + point[0] / points.length, sum[1] + point[1] / points.length], [0, 0]);
    for (let i = 0; i < points.length; i++) {
      pushTriangle(center, points[i], points[(i + 1) % points.length], color);
    }
  }
  function drawLung(cx, cy, scale, side) {
    const centerX = cx + side * scale * .17;
    const centerY = cy + scale * .07;
    const outline = [];
    for (let i = 0; i < 72; i++) {
      const angle = i / 72 * Math.PI * 2;
      const vertical = Math.sin(angle);
      const horizontal = Math.cos(angle);
      const taper = vertical < 0 ? .78 + .22 * (vertical + 1) : 1;
      const medial = horizontal * side < -.58 ? 1 - .12 * ((-horizontal * side - .58) / .42) : 1;
      const x = centerX + horizontal * scale * .175 * taper * medial;
      const y = centerY + vertical * scale * .305;
      outline.push([x, y]);
    }
    filledPolygon(outline, 'tissueLight');
    const inner = outline.map(([x, y]) => [centerX + (x - centerX) * .94, centerY + (y - centerY) * .97]);
    filledPolygon(inner, 'tissue');
  }
  function drawAlveolarCluster(cx, cy, scale) {
    circle(cx, cy, scale * .33, 'air', 72);
    const sacs = [
      [-.14, -.19], [0, -.21], [.14, -.18],
      [-.22, -.04], [-.07, -.06], [.09, -.04], [.23, -.02],
      [-.18, .12], [-.02, .13], [.15, .12], [0, .25]
    ];
    sacs.forEach(([offsetX, offsetY], index) => {
      const x = cx + offsetX * scale;
      const y = cy + offsetY * scale;
      const radius = scale * (.085 + (index % 3) * .004);
      circle(x, y, radius, 'tissueLight', 36);
      circle(x, y, radius * .84, 'airLight', 34);
      ring(x, y, radius, radius * .94, 'capillary', 36);
      if (index % 2 === 0) {
        circle(x + radius * .72, y - radius * .24, radius * .19, 'vesicleLight', 12);
        circle(x + radius * .72, y - radius * .24, radius * .1, 'vesicle', 10);
        for (let granule = 0; granule < 3; granule++) {
          circle(x + radius * (.86 + granule * .09), y - radius * (.27 - granule * .11), radius * .035, 'white', 7);
        }
      }
      if (index % 3 === 1) circle(x - radius * .73, y + radius * .23, radius * .065, 'nucleus', 8);
    });

    for (let i = 0; i < 10; i++) {
      const angle = i * Math.PI * 2 / 10;
      const x1 = cx + Math.cos(angle) * scale * .12;
      const y1 = cy + Math.sin(angle) * scale * .12;
      const x2 = cx + Math.cos(angle + .72) * scale * .25;
      const y2 = cy + Math.sin(angle + .72) * scale * .25;
      const dx = x2 - x1;
      const dy = y2 - y1;
      capsule((x1 + x2) / 2, (y1 + y2) / 2, Math.hypot(dx, dy), scale * .0035, 'capillary', Math.atan2(dy, dx));
      circle(x2, y2, scale * .006, 'nucleus', 8);
    }

    circle(cx + scale * .025, cy + scale * .045, scale * .037, 'cell', 28);
    ring(cx + scale * .025, cy + scale * .045, scale * .037, scale * .032, 'cellLight', 24);
    circle(cx + scale * .015, cy + scale * .043, scale * .012, 'nucleus', 14);
    for (let i = 0; i < 4; i++) {
      const angle = i * Math.PI / 2 + .4;
      circle(cx + scale * .025 + Math.cos(angle) * scale * .021,
        cy + scale * .045 + Math.sin(angle) * scale * .021, scale * .004, 'vesicleLight', 7);
    }
  }
  function capsule(x, y, length, radius, color, angleValue) {
    const angle = typeof angleValue === 'number' ? angleValue : -0.22;
    const ux = Math.cos(angle) * length / 2;
    const uy = Math.sin(angle) * length / 2;
    const px = -Math.sin(angle) * radius;
    const py = Math.cos(angle) * radius;
    const a = [x - ux + px, y - uy + py];
    const b = [x + ux + px, y + uy + py];
    const c = [x + ux - px, y + uy - py];
    const d = [x - ux - px, y - uy - py];
    pushTriangle(a, b, c, color);
    pushTriangle(a, c, d, color);
    circle(x - ux, y - uy, radius, color, 18);
    circle(x + ux, y + uy, radius, color, 18);
  }
  function drawBacteria(x, y, size) {
    capsule(x, y, size * 2.4, size * .82, 'bacteria');
    capsule(x, y, size * 1.9, size * .32, 'bacteriaDark');
    circle(x - size * .4, y - size * .1, size * .16, 'vesicleLight', 12);
  }
  function drawVesselLine(x, y, length, thickness, color) {
    const points = [];
    for (let i = 0; i <= 16; i++) {
      const t = i / 16;
      points.push([x + (t - .5) * length, y + Math.sin(t * Math.PI * 3) * thickness * 1.4]);
    }
    const c = colorValues[color];
    ctx.save();
    ctx.strokeStyle = `rgba(${Math.round(c[0] * 255)},${Math.round(c[1] * 255)},${Math.round(c[2] * 255)},${c[3]})`;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    points.forEach((point, index) => index ? ctx.lineTo(point[0], point[1]) : ctx.moveTo(point[0], point[1]));
    ctx.stroke();
    ctx.restore();
  }
  function drawPatrolMacrophage(x, y, radius, phase, phagosomes, progress, defenses, damage, mitosisProgress) {
    const contained = phagosomes.filter(item => item.location !== 'cytosol');
    const cytosolic = phagosomes.filter(item => item.location === 'cytosol');
    const phagosomeCount = contained.length;
    circle(x, y, radius, 'cell', 44);
    for (let i = 0; i < 7; i++) {
      const angle = i * Math.PI * 2 / 7 + phase;
      circle(x + Math.cos(angle) * radius * .78, y + Math.sin(angle) * radius * .78, radius * .28, 'cell', 18);
    }
    ring(x, y, radius, radius * .91, 'cellLight', 44);
    if (typeof mitosisProgress === 'number') {
      const furrow = Math.sin(mitosisProgress * Math.PI);
      capsule(x, y, radius * (.15 + furrow * 1.15), radius * (.025 + furrow * .035), 'purple', Math.PI / 2);
    }
    circle(x - radius * .22, y + radius * .08, radius * .34, 'nucleus', 24);
    circle(x - radius * .29, y + radius * .03, radius * .17, 'nucleusLight', 18);
    ring(x - radius * .22, y + radius * .08, radius * .38, radius * .34, 'purple', 24);
    for (let i = 0; i < 4; i++) {
      const angle = i * 1.3;
      circle(x + Math.cos(angle) * radius * .54, y + Math.sin(angle) * radius * .52, radius * .075, i % 2 ? 'vesicleLight' : 'vesicle', 10);
    }
    capsule(x + radius * .38, y - radius * .22, radius * .32, radius * .09, 'vesicle');
    capsule(x + radius * .38, y - radius * .22, radius * .2, radius * .035, 'vesicleLight');
    const phagosomeOffsets = [[.2, -.42], [.58, .12], [-.02, .55], [-.54, -.28]];
    for (let i = 0; i < Math.min(phagosomeCount, phagosomeOffsets.length); i++) {
      const px = x + radius * phagosomeOffsets[i][0];
      const py = y + radius * phagosomeOffsets[i][1];
      circle(px, py, radius * .19, 'vesicle', 16);
      ring(px, py, radius * .19, radius * .16, 'vesicleLight', 16);
      if (defenses && defenses.some(module => module.id === 'lap' && module.active)) {
        ring(px, py, radius * .23, radius * .21, 'dna', 18);
      }
      if (defenses && defenses.some(module => module.id === 'acidification' && module.active)) {
        for (let granule = 0; granule < 3; granule++) {
          circle(px + (granule - 1) * radius * .04, py + radius * .03, radius * .025, 'purple', 8);
        }
      }
      if (!state.patrol.complete) {
        const bacillus = contained[i];
        const movement = bacillus ? bacillus.phase : phase;
        drawBacteria(px + Math.cos(movement) * radius * .07, py + Math.sin(movement * .8) * radius * .065, radius * .04);
      }
      if (progress > 0) ring(px, py, radius * (.22 + Math.sin(progress * 5 + i) * .01), radius * .2, 'purple', 16);
    }
    cytosolic.forEach((bacillus, index) => {
      const angle = bacillus.phase + index * 2.4;
      drawBacteria(x + Math.cos(angle) * radius * .55, y + Math.sin(angle * .8) * radius * .48, radius * .065);
    });
    if ((phagosomeCount || cytosolic.length) && damage > .05) {
      ring(x, y, radius * 1.06, radius * (1.02 - Math.min(.035, damage * .035)), 'capillary', 48);
    }
    if (defenses) {
      defenses.forEach((module, index) => {
        if (!module.active) return;
        const angle = phase + index * 2.4;
        const armX = x + Math.cos(angle) * radius * 1.15;
        const armY = y + Math.sin(angle) * radius * 1.15;
        circle(armX, armY, radius * .075, module.id === 'ros' ? 'vesicleLight' : module.id === 'rns' ? 'dna' : 'purple', 8);
      });
    }
  }
  function drawNeutrophil(x, y, radius, phase, phagosomes, damage, mitosisProgress) {
    circle(x, y, radius, 'vesicleLight', 30);
    ring(x, y, radius, radius * .82, 'vesicle', 26);
    if (typeof mitosisProgress === 'number') {
      capsule(x, y, radius * (.15 + Math.sin(mitosisProgress * Math.PI) * .9),
        radius * .045, 'purple', Math.PI / 2);
    }
    for (let i = 0; i < 3; i++) {
      const angle = i * Math.PI * 2 / 3 + phase;
      circle(x + Math.cos(angle) * radius * .28, y + Math.sin(angle) * radius * .28, radius * .18, 'nucleus', 16);
    }
    const contained = phagosomes.filter(item => item.location !== 'cytosol');
    const offsets = [[.38, -.34], [.42, .34], [-.36, .34], [-.4, -.28]];
    contained.slice(0, offsets.length).forEach((bacillus, index) => {
      const [offsetX, offsetY] = offsets[index];
      const px = x + radius * offsetX;
      const py = y + radius * offsetY;
      circle(px, py, radius * .19, 'vesicle', 14);
      ring(px, py, radius * .19, radius * .16, 'vesicleLight', 14);
      drawBacteria(px + Math.cos(bacillus.phase) * radius * .035,
        py + Math.sin(bacillus.phase) * radius * .035, radius * .035);
    });
    phagosomes.filter(item => item.location === 'cytosol').forEach((bacillus, index) => {
      const angle = bacillus.phase + index * 2.4;
      drawBacteria(x + Math.cos(angle) * radius * .53, y + Math.sin(angle * .8) * radius * .45, radius * .06);
    });
    if (damage > .05) {
      ring(x, y, radius * 1.06, radius * (1.02 - Math.min(.035, damage * .035)), 'capillary', 36);
    }
  }
  function drawTHelper(x, y, radius, phase) {
    circle(x, y, radius, 'purple', 24);
    ring(x, y, radius, radius * .82, 'nucleusLight', 20);
    circle(x, y, radius * .24, 'nucleus', 14);
    ring(x - radius * .45, y - radius * .15, radius * .12, radius * .08, 'white', 10);
  }
  function drawBCell(x, y, radius, phase, mitosisProgress) {
    circle(x, y, radius, 'nucleusLight', 24);
    ring(x, y, radius, radius * .82, 'white', 18);
    if (typeof mitosisProgress === 'number') {
      capsule(x, y, radius * (.15 + Math.sin(mitosisProgress * Math.PI) * .9),
        radius * .045, 'purple', Math.PI / 2);
    }
    for (let i = 0; i < 5; i++) {
      const angle = i * Math.PI * 2 / 5;
      ring(x + Math.cos(angle) * radius * .78, y + Math.sin(angle) * radius * .78, radius * .13, radius * .09, 'purple', 8);
    }
  }
  function drawPlasmaCell(x, y, radius, phase, mitosisProgress) {
    circle(x, y, radius, 'nucleusLight', 28);
    ring(x, y, radius, radius * .84, 'cellLight', 24);
    if (typeof mitosisProgress === 'number') {
      capsule(x, y, radius * (.15 + Math.sin(mitosisProgress * Math.PI) * .9),
        radius * .045, 'purple', Math.PI / 2);
    }
    capsule(x - radius * .12, y, radius * .38, radius * .055, 'purple', phase);
    for (let i = 0; i < 6; i++) {
      const angle = i * Math.PI / 3 + phase;
      circle(x + Math.cos(angle) * radius * 1.05, y + Math.sin(angle) * radius * 1.05, radius * .055, 'white', 8);
    }
  }
  function drawPatrolScene(cx, cy, scale) {
    const world = getAlveolarWorld();
    const camera = getWorldCameraPosition();
    const worldX = (x) => cx + (x - camera.x) * scale;
    const worldY = (y) => cy + (y - camera.y) * scale;
    const halfWidth = cx / scale + .55;
    const halfHeight = cy / scale + .55;
    world.passages.forEach(({ a, b }) => {
      const start = world.nodes[a], end = world.nodes[b];
      if (Math.abs((start.x + end.x) / 2 - camera.x) > halfWidth
        || Math.abs((start.y + end.y) / 2 - camera.y) > halfHeight) return;
      const x1 = worldX(start.x), y1 = worldY(start.y);
      const x2 = worldX(end.x), y2 = worldY(end.y);
      const dx = x2 - x1, dy = y2 - y1;
      capsule((x1 + x2) / 2, (y1 + y2) / 2, Math.hypot(dx, dy), scale * .075, 'tissueLight', Math.atan2(dy, dx));
      capsule((x1 + x2) / 2, (y1 + y2) / 2, Math.hypot(dx, dy), scale * .05, 'air', Math.atan2(dy, dx));
    });
    world.nodes.forEach(node => {
      if (Math.abs(node.x - camera.x) > halfWidth || Math.abs(node.y - camera.y) > halfHeight) return;
      const x = worldX(node.x), y = worldY(node.y);
      circle(x, y, scale * .22, 'tissueLight', 24);
      circle(x, y, scale * .185, 'air', 22);
      ring(x, y, scale * .205, scale * .19, 'capillary', 22);
      for (let vessel = 0; vessel < 3; vessel++) {
        const angle = vessel * Math.PI * 2 / 3 + node.id * .71;
        circle(x + Math.cos(angle) * scale * .16, y + Math.sin(angle) * scale * .16,
          scale * .012, 'vesicleLight', 7);
      }
    });
    const visible = (x, y, margin) => Math.abs(x - camera.x) < halfWidth + margin
      && Math.abs(y - camera.y) < halfHeight + margin;
    state.patrol.granulomas.forEach(granuloma => {
      if (visible(granuloma.x, granuloma.y, 1)) drawGranuloma(worldX(granuloma.x), worldY(granuloma.y), scale, granuloma.maturity);
    });
    state.patrol.bacteria.forEach(bacillus => {
      if (!visible(bacillus.x, bacillus.y, .2)) return;
      const x = worldX(bacillus.x), y = worldY(bacillus.y);
      if (bacillus.progress > 0) ring(x, y, scale * .045, scale * .032, 'vesicleLight', 12);
      if (bacillus.netId) ring(x, y, scale * .04, scale * .028, 'dna', 12);
      drawBacteria(x, y, scale * .025);
    });
    state.patrol.nets.forEach(net => {
      if (!visible(net.x, net.y, net.radius)) return;
      const x = worldX(net.x), y = worldY(net.y), radius = scale * net.radius;
      for (let i = 0; i < 10; i++) {
        const angle = i * Math.PI * 2 / 10 + net.phase;
        const nextAngle = angle + Math.PI * 2 / 10;
        const x1 = x + Math.cos(angle) * radius, y1 = y + Math.sin(angle) * radius;
        const x2 = x + Math.cos(nextAngle) * radius, y2 = y + Math.sin(nextAngle) * radius;
        capsule((x1 + x2) / 2, (y1 + y2) / 2, Math.hypot(x2 - x1, y2 - y1), scale * .008, 'dna', Math.atan2(y2 - y1, x2 - x1));
      }
    });
    state.patrol.spreadSites.forEach((site, index) => {
      if (!visible(site.x, site.y, .3)) return;
      const x = worldX(site.x), y = worldY(site.y);
      ring(x, y, scale * (.1 + (index % 3) * .025), scale * (.07 + (index % 3) * .018), 'capillary', 14);
    });
    state.patrol.macrophages.forEach((macrophage, index) => {
      if (!macrophage.alive || !visible(macrophage.x, macrophage.y, .2)) return;
      const infected = state.patrol.phagosomes.filter(item => item.cellType !== 'neutrophil' && item.cellIndex === index);
      const birthScale = typeof macrophage.birthProgress === 'number' ? .18 + macrophage.birthProgress * .82 : 1;
      const divisionScale = typeof macrophage.mitosisProgress === 'number'
        ? 1 + Math.sin(macrophage.mitosisProgress * Math.PI) * .12 : 1;
      drawPatrolMacrophage(worldX(macrophage.x), worldY(macrophage.y),
        scale * (index ? .075 : .09) * birthScale * divisionScale, macrophage.phase, infected,
        infected[0] ? infected[0].progress : 0, state.patrol.defenses, macrophage.damage || 0, macrophage.mitosisProgress);
    });
    state.patrol.neutrophils.filter(unit => unit.alive !== false && visible(unit.x, unit.y, .2)).forEach(unit => {
      const infected = state.patrol.phagosomes.filter(item => item.cellType === 'neutrophil' && item.cellId === unit.id);
      const birthScale = typeof unit.birthProgress === 'number' ? .18 + unit.birthProgress * .82 : 1;
      drawNeutrophil(worldX(unit.x), worldY(unit.y), scale * .075 * birthScale, unit.phase,
        infected, unit.damage || 0, unit.mitosisProgress);
    });
    state.patrol.helperT.forEach(unit => {
      if (visible(unit.x, unit.y, .2)) drawTHelper(worldX(unit.x), worldY(unit.y), scale * .052, unit.phase);
    });
    state.patrol.bCells.forEach(unit => {
      if (visible(unit.x, unit.y, .2)) drawBCell(worldX(unit.x), worldY(unit.y), scale * .05,
        unit.phase, unit.mitosisProgress);
    });
    state.patrol.plasmaCells.forEach(unit => {
      if (visible(unit.x, unit.y, .2)) drawPlasmaCell(worldX(unit.x), worldY(unit.y), scale * .06,
        unit.phase, unit.mitosisProgress);
    });
    state.patrol.antibodies.forEach(unit => {
      if (!visible(unit.x, unit.y, .2)) return;
      const x = worldX(unit.x), y = worldY(unit.y), color = unit.isotype === 'IgA' ? 'vesicleLight' : 'white';
      capsule(x - scale * .012, y, scale * .025, scale * .006, color, unit.phase);
      capsule(x + scale * .012, y, scale * .025, scale * .006, color, -unit.phase);
    });
    state.patrol.complement.forEach(unit => {
      if (!visible(unit.x, unit.y, .2)) return;
      const x = worldX(unit.x), y = worldY(unit.y);
      ring(x, y, scale * .045, scale * .03, 'nucleusLight', 12);
      for (let i = 0; i < 6; i++) {
        const angle = i * Math.PI / 3 + unit.phase;
        circle(x + Math.cos(angle) * scale * .03, y + Math.sin(angle) * scale * .03, scale * .008, 'dna', 6);
      }
    });
  }
  function drawGranuloma(cx, cy, scale, maturity) {
    const radius = scale * (.055 + maturity * .06);
    ring(cx, cy, radius, radius * .82, 'tissueLight', 40);
    ring(cx, cy, radius * .78, radius * .68, 'capillary', 36);
    const cellCount = 5 + Math.round(maturity * 7);
    for (let i = 0; i < cellCount; i++) {
      const angle = i * Math.PI * 2 / cellCount;
      const x = cx + Math.cos(angle) * radius * .72;
      const y = cy + Math.sin(angle) * radius * .72;
      circle(x, y, scale * .009, 'cellLight', 14);
      circle(x - scale * .002, y, scale * .0035, 'nucleus', 10);
    }
    if (maturity > .25) {
      const lymphocyteCount = Math.round(maturity * 10);
      for (let i = 0; i < lymphocyteCount; i++) {
        const angle = i * Math.PI * 2 / lymphocyteCount;
        circle(cx + Math.cos(angle) * radius * 1.12, cy + Math.sin(angle) * radius * 1.12,
          scale * .006, 'purple', 10);
      }
    }
  }
  function drawGranulomaScene(cx, cy, scale) {
    const granuloma = state.patrol.granulomas[0];
    const maturity = granuloma ? granuloma.maturity : 0;
    const shell = scale * (.28 + maturity * .04);
    circle(cx, cy, shell, 'tissue', 72);
    ring(cx, cy, shell, shell * .94, 'capillary', 64);
    ring(cx, cy, shell * .88, shell * .81, 'tissueLight', 56);
    const coreRadius = scale * (.09 + maturity * .045);
    circle(cx, cy, coreRadius, maturity > .72 ? 'bacteriaDark' : 'cell', 48);
    ring(cx, cy, coreRadius, coreRadius * .78, 'vesicle', 40);
    for (let i = 0; i < 9; i++) {
      const angle = i * Math.PI * 2 / 9;
      const radius = coreRadius + scale * .075;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      circle(x, y, scale * .045, 'cell', 24);
      circle(x - scale * .01, y, scale * .014, 'nucleus', 14);
      circle(x + scale * .008, y - scale * .01, scale * .009, 'nucleusLight', 10);
    }
    if (maturity > .18) {
      ring(cx, cy, shell * .79, shell * .74, 'purple', 52);
      const lymphocyteCount = 12 + Math.round(maturity * 12);
      for (let i = 0; i < lymphocyteCount; i++) {
        const angle = i * Math.PI * 2 / lymphocyteCount;
        const radius = shell * .84;
        circle(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius, scale * .012, 'purple', 12);
        circle(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius, scale * .005, 'nucleusLight', 8);
      }
    }
    if (maturity > .68) ring(cx, cy, shell * .99, shell * .96, 'vesicleLight', 56);
    const bacillusCount = Math.min(7, state.patrol.phagosomes.length + state.patrol.bacteria.length);
    for (let i = 0; i < bacillusCount; i++) {
      const angle = i * 2.4 + performance.now() / 1200;
      drawBacteria(cx + Math.cos(angle) * coreRadius * .55, cy + Math.sin(angle) * coreRadius * .45, scale * .014);
    }
    for (let i = 0; i < 5; i++) {
      const angle = i * Math.PI * 2 / 5 + performance.now() / 5000;
      circle(cx + Math.cos(angle) * shell * 1.08, cy + Math.sin(angle) * shell * 1.08, scale * .018, 'nucleusLight', 16);
    }
  }
  function drawIntracellularScene(cx, cy, scale, view) {
    const progress = getFocusProgress();
    const eligible = canClearIntracellular(getFocusPhagosome());
    const hasBacillus = state.patrol.phagosomes.length > 0 && !state.patrol.complete;
    if (view === 'phagosome') {
      const focus = getFocusPhagosome();
      if (focus && focus.cellType === 'neutrophil') {
        const infected = state.patrol.phagosomes.filter(item =>
          item.cellType === 'neutrophil' && item.cellId === focus.cellId);
        const damage = Math.max(0, ...state.patrol.neutrophils.filter(unit => unit.alive !== false)
          .map(unit => unit.id === focus.cellId ? unit.damage || 0 : 0));
        drawNeutrophil(cx, cy, scale * .35, performance.now() / 1800, infected, damage);
      } else {
        circle(cx, cy, scale * .36, 'cell', 64);
        ring(cx, cy, scale * .36, scale * .33, 'cellLight', 56);
        circle(cx - scale * .12, cy, scale * .11, 'nucleus', 34);
        circle(cx - scale * .14, cy - scale * .02, scale * .05, 'nucleusLight', 22);
        circle(cx + scale * .12, cy - scale * .06, scale * .16, 'vesicle', 40);
        ring(cx + scale * .12, cy - scale * .06, scale * .16, scale * .14, 'vesicleLight', 40);
        const contained = state.patrol.phagosomes.filter(item => item.location !== 'cytosol');
        if (contained.length) {
          const bacillus = contained[0];
          const phase = bacillus ? bacillus.phase : 0;
          drawBacteria(cx + scale * (.12 + Math.cos(phase) * .045),
            cy + scale * (-.06 + Math.sin(phase * .8) * .035), scale * .047);
          for (let i = 0; i < 5; i++) {
            const angle = phase + i * Math.PI * 2 / 5;
            circle(cx + scale * (.12 + Math.cos(angle) * .105),
              cy + scale * (-.06 + Math.sin(angle) * .105), scale * .008, 'vesicleLight', 8);
          }
        }
        for (let i = 0; i < 5; i++) circle(cx + (i - 2) * scale * .052, cy + scale * .19, scale * .012, 'purple', 12);
      }
    } else if (view === 'host-cytosol') {
      circle(cx, cy, scale * .35, 'cell', 64);
      ring(cx, cy, scale * .35, scale * .32, 'cellLight', 56);
      circle(cx - scale * .14, cy - scale * .02, scale * .12, 'nucleus', 36);
      circle(cx - scale * .17, cy - scale * .04, scale * .055, 'nucleusLight', 22);
      for (let i = 0; i < 7; i++) {
        const angle = i * Math.PI * 2 / 7;
        capsule(cx + Math.cos(angle) * scale * .1, cy + Math.sin(angle) * scale * .1,
          scale * .12, scale * .006, 'vesicleLight', angle);
      }
      const escaped = state.patrol.phagosomes.filter(item => item.location === 'cytosol');
      escaped.forEach((bacillus, index) => {
        const angle = bacillus.phase + index * 2.4;
        const radius = scale * (.085 + (index % 3) * .045);
        drawBacteria(cx + Math.cos(angle) * radius, cy + Math.sin(angle * .8) * radius, scale * .038);
      });
      if (!escaped.length) {
        for (let i = 0; i < 3; i++) drawBacteria(cx + scale * (.08 + i * .06), cy + scale * (i - 1) * .055, scale * .026);
      }
      const damage = Math.max(0, ...state.patrol.macrophages.filter(unit => unit.alive).map(unit => unit.damage || 0));
      if (damage > .05) ring(cx, cy, scale * (.37 + damage * .02), scale * (.35 + damage * .02), 'capillary', 48);
    } else if (view === 'neutrophil-cytosol') {
      const infected = state.patrol.phagosomes.filter(item => item.cellType === 'neutrophil');
      const damage = Math.max(0, ...state.patrol.neutrophils.filter(unit => unit.alive !== false).map(unit => unit.damage || 0));
      if (infected.length || getLiveNeutrophilCount()) {
        drawNeutrophil(cx, cy, scale * .35, performance.now() / 1800, infected, damage);
      } else if (state.patrol.neutrophilLysisCount) {
        for (let i = 0; i < 10; i++) {
          const angle = i * Math.PI * 2 / 10;
          circle(cx + Math.cos(angle) * scale * (.12 + (i % 3) * .035),
            cy + Math.sin(angle) * scale * (.12 + (i % 3) * .035), scale * .035, 'vesicleLight', 12);
        }
        for (let i = 0; i < 5; i++) {
          const angle = i * Math.PI * 2 / 5 + performance.now() / 1100;
          drawBacteria(cx + Math.cos(angle) * scale * (.2 + (i % 2) * .07),
            cy + Math.sin(angle) * scale * (.2 + (i % 2) * .07), scale * .022);
        }
      } else {
        drawBacteria(cx + scale * .1, cy - scale * .04, scale * .045);
        circle(cx + scale * .22, cy + scale * .17, scale * .045, 'vesicle', 16);
        ring(cx + scale * .22, cy + scale * .17, scale * .045, scale * .037, 'vesicleLight', 16);
        drawBacteria(cx + scale * .22, cy + scale * .17, scale * .018);
      }
    } else if (view === 'wall') {
      capsule(cx, cy, scale * .56, scale * .18, 'bacteriaDark', 0);
      capsule(cx, cy, scale * .53, scale * .15, 'bacteria', 0);
      capsule(cx, cy, scale * .45, scale * .105, 'vesicle', 0);
      capsule(cx, cy, scale * .36, scale * .072, 'dark', 0);
      const poreCount = eligible && progress > 1 ? Math.min(12, Math.floor((progress - 1) * 12)) : 0;
      for (let i = 0; i < 12; i++) {
        const x = cx + (i - 5.5) * scale * .041;
        const y = i % 2 ? cy - scale * .145 : cy + scale * .145;
        if (hasBacillus && i < poreCount) {
          circle(x, y, scale * .014, 'dark', 12);
          circle(x, y, scale * .006, 'white', 10);
        } else {
          circle(x, y, scale * .006, 'vesicleLight', 8);
        }
      }
      if (eligible && progress >= 1) {
        for (let i = 0; i < 8; i++) {
          const angle = i * Math.PI / 4 + performance.now() / 1200;
          const distance = scale * .22;
          circle(cx + Math.cos(angle) * distance, cy + Math.sin(angle) * distance * .62, scale * .012, 'purple', 12);
        }
      }
    } else if (view === 'cytoplasm') {
      capsule(cx, cy, scale * .58, scale * .19, 'bacteria', 0);
      capsule(cx, cy, scale * .5, scale * .145, 'dark', 0);
      for (let i = 0; i < 25; i++) {
        const t = i / 24;
        const x = cx + (t - .5) * scale * .36;
        const y = cy + Math.sin(t * Math.PI * 6) * scale * .06;
        circle(x, y, scale * .008, i % 2 ? 'dna' : 'purple', 9);
      }
      for (let i = 0; i < 12; i++) {
        const x = cx + (i - 5.5) * scale * .045;
        const y = cy + Math.cos(i * 1.8) * scale * .09;
        circle(x, y, scale * .006, 'vesicleLight', 8);
      }
      if (eligible && progress > 2 && hasBacillus) {
        for (let i = 0; i < 10; i++) {
          const x = cx + Math.sin(i * 12.989) * scale * .19;
          const y = cy + Math.cos(i * 6.412) * scale * .105;
          circle(x, y, scale * .014, 'purple', 12);
          circle(x, y, scale * .006, 'white', 9);
        }
      }
    } else {
      circle(cx, cy, scale * .34, 'vesicle', 64);
      ring(cx, cy, scale * .34, scale * .31, 'vesicleLight', 56);
      ring(cx, cy, scale * .28, scale * .255, 'purple', 48);
      for (let i = 0; i < 16; i++) {
        const angle = i * 2.4;
        const radius = scale * (.12 + (i % 3) * .025);
        circle(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius, scale * .012, i % 2 ? 'purple' : 'vesicleLight', 10);
      }
      if (hasBacillus && progress >= 3 && progress < 3.7) drawBacteria(cx, cy, scale * .075);
      else if (hasBacillus && progress >= 3) {
        for (let i = 0; i < 5; i++) capsule(cx + (i - 2) * scale * .035, cy + Math.sin(i) * scale * .025,
          scale * .035, scale * .012, i % 2 ? 'bacteriaDark' : 'bacteria', 0);
      }
    }
  }
  function drawScene() {
    shapeVertices = [];
    const w = sceneCanvas.width / pixelRatio();
    const h = sceneCanvas.height / pixelRatio();
    const cx = w / 2 + state.camera.x;
    const cy = h / 2 + state.camera.y;
    const scale = Math.min(w, h);
    const level = state.level;

    if (state.patrol.active) {
      if (state.patrol.infectionView === 'alveolus') drawPatrolScene(w / 2, h / 2, scale * .42);
      else if (state.patrol.infectionView === 'granuloma') drawGranulomaScene(cx, cy, scale);
      else drawIntracellularScene(cx, cy, scale, state.patrol.infectionView);
    } else if (level === 0) {
      drawLung(cx, cy, scale, -1);
      drawLung(cx, cy, scale, 1);
      capsule(cx, cy - scale * .20, scale * .25, scale * .026, 'airLight', Math.PI / 2);
      ring(cx, cy - scale * .20, scale * .027, scale * .018, 'tissueLight', 20);
      capsule(cx - scale * .075, cy - scale * .015, scale * .21, scale * .021, 'airLight', 2.15);
      capsule(cx + scale * .075, cy - scale * .015, scale * .21, scale * .021, 'airLight', .99);
      for (let branch = 0; branch < 3; branch++) {
        const offset = branch * scale * .047;
        const length = scale * (.12 - branch * .012);
        capsule(cx - scale * .105 - offset, cy + scale * (.015 + branch * .045), length, scale * .009, 'airLight', 2.55 + branch * .12);
        capsule(cx + scale * .105 + offset, cy + scale * (.015 + branch * .045), length, scale * .009, 'airLight', .59 - branch * .12);
      }
      for (let side of [-1, 1]) {
        for (let vessel = 0; vessel < 5; vessel++) {
          const x = cx + side * scale * (.13 + vessel * .032);
          const y = cy + scale * (.16 + (vessel % 3) * .052);
          capsule(x, y, scale * .12, scale * .0035, 'capillary', .7 + vessel * .38);
          circle(x, y, scale * .006, 'nucleus', 8);
        }
      }
    } else if (level === 1) {
      circle(cx, cy, scale * .34, 'tissue', 72);
      ring(cx, cy, scale * .34, scale * .32, 'tissueLight', 64);
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * Math.PI * 2;
        circle(cx + Math.cos(a) * scale * .23, cy + Math.sin(a) * scale * .23, scale * .068, 'air', 30);
        ring(cx + Math.cos(a) * scale * .23, cy + Math.sin(a) * scale * .23, scale * .068, scale * .059, 'tissueLight', 26);
      }
      circle(cx - scale * .05, cy, scale * .09, 'airLight', 36);
    } else if (level === 2) {
      ring(cx, cy, scale * .31, scale * .23, 'tissue', 70);
      circle(cx, cy, scale * .228, 'air', 58);
      ring(cx, cy, scale * .23, scale * .22, 'tissueLight', 58);
      for (let i = 0; i < 24; i++) {
        const a = i / 24 * Math.PI * 2;
        circle(cx + Math.cos(a) * scale * .267, cy + Math.sin(a) * scale * .267, 3, i % 3 === 0 ? 'nucleus' : 'vesicle', 10);
      }
    } else if (level === 3) {
      drawAlveolarCluster(cx, cy, scale);
    } else if (level === 4) {
      const perimeter = [];
      for (let i = 0; i < 44; i++) {
        const angle = i / 44 * Math.PI * 2;
        const undulation = 1 + .055 * Math.sin(angle * 5 + .4) + .025 * Math.sin(angle * 9);
        perimeter.push([cx + Math.cos(angle) * scale * .34 * undulation,
          cy + Math.sin(angle) * scale * .30 * undulation]);
      }
      filledPolygon(perimeter, 'cell');
      ring(cx, cy, scale * .35, scale * .33, 'cellLight', 56);
      circle(cx - scale * .105, cy + scale * .005, scale * .13, 'nucleus', 42);
      circle(cx - scale * .14, cy - scale * .045, scale * .075, 'nucleusLight', 32);
      ring(cx - scale * .105, cy + scale * .005, scale * .153, scale * .144, 'purple', 44);
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * Math.PI * 2 + .3;
        capsule(cx - scale * .105 + Math.cos(a) * scale * .155,
          cy + Math.sin(a) * scale * .14, scale * .07, scale * .006, 'vesicle', a + Math.PI / 2);
      }
      for (let i = 0; i < 5; i++) {
        const y = cy - scale * .09 + i * scale * .035;
        capsule(cx + scale * .035, y, scale * (.085 - (i % 2) * .014), scale * .008, 'vesicleLight', -.08);
        for (let dot = 0; dot < 5; dot++) {
          circle(cx + scale * (.01 + dot * .016), y + scale * .009, scale * .0032, 'nucleusLight', 6);
        }
      }
      for (let i = 0; i < 4; i++) {
        const y = cy + scale * .075 + i * scale * .027;
        capsule(cx + scale * .13, y, scale * .09, scale * .013, 'vesicle', -.18);
        capsule(cx + scale * .13, y, scale * .067, scale * .004, 'vesicleLight', -.18);
      }
      for (let i = 0; i < 4; i++) {
        const angle = i * Math.PI / 2 + .25;
        const x = cx + Math.cos(angle) * scale * .225;
        const y = cy + Math.sin(angle) * scale * .19;
        capsule(x, y, scale * .095, scale * .026, 'vesicle', angle);
        capsule(x, y, scale * .06, scale * .006, 'vesicleLight', angle);
        for (let fold = -1; fold <= 1; fold++) {
          capsule(x + Math.cos(angle + Math.PI / 2) * fold * scale * .008,
            y + Math.sin(angle + Math.PI / 2) * fold * scale * .008,
            scale * .038, scale * .0025, 'cellLight', angle);
        }
      }
      circle(cx + scale * .23, cy + scale * .03, scale * .026, 'vesicleLight', 18);
      ring(cx + scale * .23, cy + scale * .03, scale * .033, scale * .026, 'purple', 18);
      circle(cx - scale * .23, cy - scale * .13, scale * .04, 'vesicleLight', 20);
      circle(cx - scale * .23, cy - scale * .13, scale * .013, 'dark', 12);
      circle(cx + scale * .055, cy + scale * .22, scale * .018, 'nucleusLight', 12);
      drawBacteria(cx + scale * .19, cy - scale * .17, scale * .022);
      const defenseActive = id => state.patrol.defenses.some(module => module.id === id && module.active);
      if (defenseActive('ifng')) ring(cx, cy, scale * .365, scale * .355, 'purple', 64);
      if (defenseActive('acidification')) {
        for (let i = 0; i < 5; i++) {
          circle(cx + scale * (.17 + i * .018), cy - scale * .2, scale * .011, 'vesicleLight', 9);
        }
      }
      if (defenseActive('lap') || defenseActive('xenophagy')) {
        ring(cx + scale * .19, cy - scale * .17, scale * .045, scale * .038, 'dna', 24);
      }
      if (defenseActive('ros') || defenseActive('rns')) {
        for (let i = 0; i < 9; i++) {
          const angle = i * Math.PI * 2 / 9;
          circle(cx + scale * .19 + Math.cos(angle) * scale * .055,
            cy - scale * .17 + Math.sin(angle) * scale * .045, scale * .008,
            i % 2 ? 'vesicleLight' : 'dna', 7);
        }
      }
      if (defenseActive('cgas')) {
        circle(cx - scale * .04, cy + scale * .05, scale * .025, 'dna', 16);
        ring(cx - scale * .04, cy + scale * .05, scale * .033, scale * .029, 'white', 16);
      }
      if (defenseActive('inflammasome')) {
        ring(cx + scale * .13, cy + scale * .19, scale * .045, scale * .035, 'purple', 20);
        for (let i = 0; i < 3; i++) circle(cx + scale * (.11 + i * .02), cy + scale * .19, scale * .01, 'nucleusLight', 8);
      }
    } else if (level === 5) {
      circle(cx, cy, scale * .33, 'nucleus', 72);
      ring(cx, cy, scale * .33, scale * .31, 'nucleusLight', 64);
      for (let i = 0; i < 7; i++) {
        const a = i * 2.4;
        circle(cx + Math.cos(a) * scale * .14, cy + Math.sin(a) * scale * .12, scale * .035, i % 2 ? 'purple' : 'nucleusLight', 18);
      }
      ring(cx, cy, scale * .09, scale * .075, 'white', 40);
    } else if (level === 6 || level === 7) {
      circle(cx, cy, scale * .32, level === 7 ? 'vesicle' : 'vesicleLight', 70);
      ring(cx, cy, scale * .32, scale * .29, level === 7 ? 'vesicleLight' : 'tissueLight', 64);
      for (let i = 0; i < 8; i++) {
        const a = i * .79;
        circle(cx + Math.cos(a) * scale * .17, cy + Math.sin(a) * scale * .17, scale * .028, i % 2 ? 'purple' : 'vesicleLight', 14);
      }
      drawBacteria(cx + scale * .035, cy + scale * .03, scale * .055);
      circle(cx - scale * .15, cy - scale * .12, scale * .055, 'dark', 28);
      if (level === 7) ring(cx, cy, scale * .26, scale * .245, 'purple', 48);
    } else if (level === 8) {
      drawBacteria(cx, cy, scale * .115);
      for (let i = 0; i < 10; i++) {
        const a = i / 10 * Math.PI * 2;
        circle(cx + Math.cos(a) * scale * .2, cy + Math.sin(a) * scale * .2, 4, i % 2 ? 'vesicleLight' : 'purple', 10);
      }
      ring(cx, cy, scale * .29, scale * .275, 'dark', 64);
    } else if (level === 9) {
      circle(cx, cy, scale * .35, 'bacteriaDark', 64);
      ring(cx, cy, scale * .37, scale * .32, 'vesicle', 72);
      ring(cx, cy, scale * .32, scale * .285, 'bacteria', 72);
      ring(cx, cy, scale * .285, scale * .26, 'purple', 72);
      ring(cx, cy, scale * .25, scale * .225, 'vesicleLight', 72);
      circle(cx, cy, scale * .222, 'dark', 64);
      for (let i = 0; i < 22; i++) {
        const a = i * .286;
        circle(cx + Math.cos(a) * scale * .30, cy + Math.sin(a) * scale * .30, 2.5, 'white', 9);
      }
    } else if (level === 10) {
      circle(cx, cy, scale * .35, 'dark', 64);
      ring(cx, cy, scale * .35, scale * .33, 'bacteria', 64);
      for (let i = 0; i < 26; i++) {
        const x = cx + Math.sin(i * 12.989) * scale * .22;
        const y = cy + Math.cos(i * 6.412) * scale * .2;
        circle(x, y, 2.1, i % 3 ? 'vesicleLight' : 'dna', 8);
      }
      for (let i = 0; i < 4; i++) circle(cx - scale * .17 + i * scale * .105, cy + scale * .04, scale * .018, 'purple', 15);
      circle(cx - scale * .11, cy - scale * .14, scale * .05, 'nucleusLight', 22);
    } else if (level === 11) {
      ring(cx, cy, scale * .29, scale * .275, 'dna', 64);
      for (let i = 0; i < 55; i++) {
        const t = i / 55 * Math.PI * 4;
        const x = cx + Math.cos(t) * scale * (.12 + i / 55 * .12);
        const y = cy + Math.sin(t) * scale * (.12 + i / 55 * .12);
        circle(x, y, 2.4, i % 2 ? 'dna' : 'purple', 9);
      }
      for (let i = 0; i < 11; i++) {
        const t = i / 10 * Math.PI * 2;
        const x = cx + Math.cos(t) * scale * .18;
        const y = cy + Math.sin(t) * scale * .18;
        ring(x, y, scale * .054, scale * .048, 'white', 20);
      }
    } else {
      circle(cx, cy, scale * .33, 'dark', 64);
      ring(cx, cy, scale * .33, scale * .31, 'dna', 64);
      const genes = [
        ['esxA', -0.20, -0.12, 'bacteria'], ['esxB', -0.08, -0.12, 'bacteria'],
        ['katG', 0.07, -0.12, 'vesicle'], ['inhA', 0.19, -0.12, 'vesicle'],
        ['rpoB', -0.12, 0.06, 'purple'], ['embB', 0.06, 0.06, 'purple']
      ];
      genes.forEach((gene, index) => {
        const x = cx + scale * gene[1];
        const y = cy + scale * gene[2];
        capsule(x, y, scale * .11, scale * .018, gene[3]);
        if (index === 0 || index === 1) circle(x, y, scale * .024, 'bacteria', 16);
      });
    }

    gl.viewport(0, 0, sceneCanvas.width, sceneCanvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform2f(resolutionLocation, sceneCanvas.width / pixelRatio(), sceneCanvas.height / pixelRatio());
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const positions = [];
    const colors = [];
    for (let i = 0; i < shapeVertices.length; i += 6) {
      positions.push(shapeVertices[i], shapeVertices[i + 1]);
      colors.push(shapeVertices[i + 2], shapeVertices[i + 3], shapeVertices[i + 4], shapeVertices[i + 5]);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2);
  }

  let dpr = 1;
  function pixelRatio() { return dpr; }
  function resize() {
    const rect = sceneCanvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));
    if (sceneCanvas.width !== width || sceneCanvas.height !== height) {
      sceneCanvas.width = width;
      sceneCanvas.height = height;
      overlayCanvas.width = width;
      overlayCanvas.height = height;
    }
    drawScene();
    drawMinimap();
  }

  function renderOverlay(time) {
    const w = overlayCanvas.width / dpr;
    const h = overlayCanvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2 + state.camera.x;
    const cy = h / 2 + state.camera.y;
    drawLabels(ctx, cx, cy, w, h);
    if (!state.patrol.active && state.level === 0) {
      ctx.save();
      ctx.strokeStyle = 'rgba(136,220,201,.24)';
      ctx.lineWidth = Math.max(1, Math.min(w, h) * .002);
      ctx.beginPath();
      ctx.moveTo(cx, cy - Math.min(w, h) * .32);
      ctx.lineTo(cx, cy - Math.min(w, h) * .12);
      ctx.bezierCurveTo(cx, cy - Math.min(w, h) * .05, cx - Math.min(w, h) * .08, cy - Math.min(w, h) * .04, cx - Math.min(w, h) * .15, cy + Math.min(w, h) * .08);
      ctx.moveTo(cx, cy - Math.min(w, h) * .12);
      ctx.bezierCurveTo(cx, cy - Math.min(w, h) * .05, cx + Math.min(w, h) * .08, cy - Math.min(w, h) * .04, cx + Math.min(w, h) * .15, cy + Math.min(w, h) * .08);
      ctx.stroke();
      const airflow = (time / 1800) % 1;
      for (let i = 0; i < 6; i++) {
        const t = (airflow + i / 6) % 1;
        const y = cy - Math.min(w, h) * .29 + t * Math.min(w, h) * .34;
        const x = cx + Math.sin(t * Math.PI * 3 + i) * Math.min(w, h) * .06;
        ctx.beginPath();
        ctx.fillStyle = `rgba(150,236,215,${.22 + .38 * Math.sin(t * Math.PI)})`;
        ctx.arc(x, y, 1.5 + Math.min(w, h) * .002, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    } else if (!state.patrol.active && state.level === 3) {
      ctx.save();
      const sacs = [[-.14, -.19], [0, -.21], [.14, -.18], [-.22, -.04], [-.07, -.06],
        [.09, -.04], [.23, -.02], [-.18, .12], [-.02, .13], [.15, .12], [0, .25]];
      sacs.forEach(([x, y], index) => {
        const pulse = 1 + .035 * Math.sin(time / 650 + index * .8);
        const radius = Math.min(w, h) * (.084 + (index % 3) * .004) * pulse;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(144,223,208,${.12 + .08 * (1 + Math.sin(time / 520 + index))})`;
        ctx.lineWidth = 1;
        ctx.arc(cx + x * Math.min(w, h), cy + y * Math.min(w, h), radius, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();
    }
    if (state.patrol.active && state.patrol.infectionView === 'alveolus') {
      const scale = Math.min(w, h);
      state.patrol.macrophages.forEach((unit) => {
        if (!unit.alive) return;
        state.patrol.defenses.forEach((module, index) => {
          if (!module.active) return;
          const angle = time / 850 + index * 2.2 + unit.phase;
          const radius = scale * (.055 + (index % 3) * .012);
          const x = cx + unit.x * scale + Math.cos(angle) * radius;
          const y = cy + unit.y * scale + Math.sin(angle) * radius * .7;
          ctx.beginPath();
          ctx.fillStyle = module.id === 'ros' ? 'rgba(255,195,103,.8)'
            : module.id === 'rns' ? 'rgba(131,188,255,.82)'
              : module.id === 'lap' || module.id === 'xenophagy' ? 'rgba(126,222,215,.82)'
                : 'rgba(196,158,228,.8)';
          ctx.shadowBlur = 7;
          ctx.shadowColor = ctx.fillStyle;
          ctx.arc(x, y, 2 + Math.sin(time / 300 + index) * .7, 0, Math.PI * 2);
          ctx.fill();
        });
      });
      ctx.shadowBlur = 0;
    } else if (!state.patrol.active && state.level === 4) {
      const scale = Math.min(w, h);
      state.patrol.defenses.forEach((module, index) => {
        if (!module.active) return;
        const angle = time / 900 + index * 2.2;
        const radius = scale * (.245 + (index % 3) * .014);
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * .82;
        ctx.beginPath();
        ctx.fillStyle = module.id === 'ros' ? 'rgba(255,195,103,.8)'
          : module.id === 'rns' ? 'rgba(131,188,255,.82)'
            : module.id === 'lap' || module.id === 'xenophagy' ? 'rgba(126,222,215,.82)'
              : 'rgba(196,158,228,.8)';
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(191,220,212,.82)';
        ctx.font = '8px "Cascadia Code", monospace';
        ctx.fillText(module.short, x + 5, y - 4);
      });
    }
    if (state.patrol.active && state.patrol.infectionView === 'alveolus') {
      state.patrol.granulomas.forEach(granuloma => {
        const x = cx + granuloma.x * Math.min(w, h);
        const y = cy + granuloma.y * Math.min(w, h);
        const radius = Math.min(w, h) * (.055 + granuloma.maturity * .06);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(208,170,231,${.35 + .2 * Math.sin(time / 420 + granuloma.phase)})`;
        ctx.lineWidth = 1.5;
        ctx.arc(x, y, radius + Math.sin(time / 360) * 2, 0, Math.PI * 2);
        ctx.stroke();
      });
    }
    if (state.patrol.active && state.patrol.running) {
      state.patrol.macrophages.forEach((unit) => {
        if (!unit.alive || (typeof unit.mitosisProgress !== 'number'
          && typeof unit.birthProgress !== 'number' && typeof unit.mitosisEffect !== 'number')) return;
        const x = cx + unit.x * Math.min(w, h);
        const y = cy + unit.y * Math.min(w, h);
        ctx.fillStyle = 'rgba(204,239,222,.92)';
        ctx.font = '8px "Cascadia Code", monospace';
        ctx.fillText(unit.mitosisEffect > 0 && unit.birthProgress === undefined ? 'NOVA CÉLULA' : 'MITOSE', x + 7, y - 10);
      });
    }
    if (state.particles) {
      state.particleItems.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -15 || particle.x > w + 15) particle.vx *= -1;
        if (particle.y < -15 || particle.y > h + 15) particle.vy *= -1;
        const pulse = .65 + Math.sin(time / 420 + particle.phase) * .2;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${particle.color},${pulse})`;
        ctx.shadowBlur = particle.kind === 'LL-37' ? 8 : 4;
        ctx.shadowColor = `rgba(${particle.color},.8)`;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
    }
    if (state.patrol.active) {
      const scale = Math.min(w, h);
      state.patrol.deaths.forEach((death) => {
        const x = cx + death.x * scale;
        const y = cy + death.y * scale;
        const progress = Math.max(0, Math.min(1, death.life));
        ctx.save();
        ctx.globalAlpha = 1 - progress;
        if (death.type === 'osmotic') {
          ctx.strokeStyle = '#a8e1ff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 5 + progress * 18, 0, Math.PI * 2);
          ctx.stroke();
          for (let i = 0; i < 10; i++) {
            const angle = i * Math.PI * 2 / 10;
            ctx.beginPath();
            ctx.fillStyle = '#e6f7ff';
            ctx.arc(x + Math.cos(angle) * (8 + progress * 20), y + Math.sin(angle) * (8 + progress * 20), 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = '#ccefff';
          ctx.font = '8px "Cascadia Code", monospace';
          ctx.fillText('Lise osmótica · MAC', x + 10, y - 12);
        } else if (death.type === 'peptide') {
          ctx.strokeStyle = '#ffd3a1';
          ctx.lineWidth = 1.5;
          for (let i = 0; i < 8; i++) {
            const angle = i * Math.PI / 4 + progress * 2;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(angle) * (10 + progress * 24), y + Math.sin(angle) * (10 + progress * 24));
            ctx.stroke();
          }
          ctx.fillStyle = '#ffd3a1';
          ctx.font = '8px "Cascadia Code", monospace';
          ctx.fillText('Peptídeos antimicrobianos', x + 8, y - 12);
        } else if (death.type === 'neutrophil') {
          ctx.strokeStyle = '#d7c8ff';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, 4 + progress * 18, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = '#e2d9ff';
          ctx.font = '8px "Cascadia Code", monospace';
          ctx.fillText('Fagocitose neutrofílica · modelo', x + 8, y - 12);
        } else if (death.type === 'oxidative') {
          ctx.strokeStyle = '#ffc66f';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          for (let i = 0; i < 7; i++) {
            const angle = i * Math.PI * 2 / 7 + progress * 3;
            const radius = 5 + progress * 18;
            ctx.moveTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
            ctx.lineTo(x + Math.cos(angle + .4) * (radius + 4), y + Math.sin(angle + .4) * (radius + 4));
          }
          ctx.stroke();
          ctx.fillStyle = '#ffd899';
          ctx.font = '8px "Cascadia Code", monospace';
          ctx.fillText('ROS/RNS · estresse oxidativo', x + 8, y - 12);
        } else if (death.type === 'macrophage-lysis' || death.type === 'neutrophil-lysis') {
          ctx.strokeStyle = '#ff927d';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 7 + progress * 30, 0, Math.PI * 2);
          ctx.stroke();
          for (let i = 0; i < 10; i++) {
            const angle = i * Math.PI * 2 / 10;
            const distance = 8 + progress * 34;
            ctx.beginPath();
            ctx.fillStyle = i % 2 ? '#f5ad79' : '#f47d6d';
            ctx.arc(x + Math.cos(angle) * distance, y + Math.sin(angle) * distance, 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = '#ffc2a3';
          ctx.font = '8px "Cascadia Code", monospace';
          ctx.fillText(death.type === 'neutrophil-lysis'
            ? 'Ruptura do neutrófilo · bacilos liberados'
            : 'Ruptura do macrófago · bacilos liberados', x + 8, y - 12);
        } else {
          ctx.fillStyle = '#bda4df';
          for (let i = 0; i < 12; i++) {
            const angle = i * Math.PI * 2 / 12;
            ctx.beginPath();
            ctx.arc(x + Math.cos(angle) * progress * 18, y + Math.sin(angle) * progress * 18, 2 + (1 - progress) * 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.font = '8px "Cascadia Code", monospace';
          ctx.fillText('Fagolisossomo', x + 8, y - 12);
        }
        ctx.restore();
      });
    }
    if (state.patrol.active && state.patrol.running) {
      const signalLength = getActiveSignalLength();
      const scale = Math.min(w, h);
      const colors = ['121,225,182', '255,184,99', '125,178,255'];
      state.patrol.macrophages.forEach((macrophage) => {
        if (!macrophage.alive) return;
        for (let i = 0; i < signalLength * 2; i++) {
          const angle = time / 900 + i * 2.4 + macrophage.phase;
          const radius = scale * (.055 + (i % 3) * .013);
          ctx.beginPath();
          ctx.fillStyle = `rgba(${colors[i % colors.length]},${.46 + .25 * Math.sin(time / 300 + i)})`;
          ctx.arc(w / 2 + macrophage.x * scale + Math.cos(angle) * radius,
            h / 2 + macrophage.y * scale + Math.sin(angle) * radius, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }
    if (state.patrol.active && state.patrol.phagosomes.length && state.patrol.phageTherapy && canClearIntracellular()
      && ['wall', 'cytoplasm'].includes(state.patrol.infectionView)) {
      const scale = Math.min(w, h);
      for (let i = 0; i < 18; i++) {
        const angle = time / 560 + i * Math.PI * 2 / 18;
        const radius = scale * (.08 + (i % 4) * .014);
        const x = w / 2 + Math.cos(angle) * radius;
        const y = h / 2 + Math.sin(angle) * radius * .55;
        ctx.beginPath();
        ctx.fillStyle = `rgba(199,157,236,${.48 + .3 * Math.sin(time / 300 + i)})`;
        ctx.shadowBlur = 7;
        ctx.shadowColor = 'rgba(190,148,235,.8)';
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(218,190,240,.9)';
      ctx.font = '9px "Cascadia Code", Consolas, monospace';
      ctx.fillText('1.000 fagos simbólicos', Math.max(12, w / 2 - scale * .2), h / 2 + scale * .2);
    }
  }
  function drawLabels(c, cx, cy, w, h) {
    c.save();
    c.font = '9px "Cascadia Code", Consolas, monospace';
    c.textBaseline = 'middle';
    c.lineWidth = 1;
    const addLabel = (text, x, y, anchorX, anchorY) => {
      c.strokeStyle = 'rgba(144,205,192,.38)';
      c.beginPath(); c.moveTo(x, y); c.lineTo(anchorX, anchorY); c.stroke();
      c.fillStyle = 'rgba(159,216,199,.87)'; c.fillText(text, x + (x < cx ? -c.measureText(text).width : 5), y);
      c.beginPath(); c.fillStyle = '#7ce0be'; c.arc(anchorX, anchorY, 2, 0, Math.PI * 2); c.fill();
    };
    if (state.patrol.active && state.patrol.infectionView !== 'alveolus') {
      const stage = infectionViews.find(item => item.id === state.patrol.infectionView);
      addLabel(stage ? stage.title : 'infecção', cx - Math.min(w, h) * .35, cy - Math.min(w, h) * .2,
        cx, cy - Math.min(w, h) * .08);
      if (state.patrol.infectionView === 'wall') addLabel('LAM · ácidos micólicos', cx + Math.min(w, h) * .2, cy + Math.min(w, h) * .2,
        cx + Math.min(w, h) * .16, cy + Math.min(w, h) * .08);
      if (state.patrol.infectionView === 'cytoplasm') addLabel('nucleoide · ribossomos', cx + Math.min(w, h) * .2, cy + Math.min(w, h) * .2,
        cx + Math.min(w, h) * .12, cy);
      if (state.patrol.infectionView === 'host-cytosol') addLabel('escape fagossomal · ESX-1 (esquema)', cx + Math.min(w, h) * .2,
        cy + Math.min(w, h) * .2, cx + Math.min(w, h) * .1, cy);
      if (state.patrol.infectionView === 'neutrophil-cytosol') addLabel('fagossomo · citosol · dano', cx + Math.min(w, h) * .2,
        cy + Math.min(w, h) * .2, cx + Math.min(w, h) * .1, cy);
      if (state.patrol.infectionView === 'phagosome') addLabel('compartimento intracelular', cx + Math.min(w, h) * .2, cy + Math.min(w, h) * .2,
        cx + Math.min(w, h) * .1, cy);
      if (state.patrol.infectionView === 'phagolysosome') addLabel('maturação · degradação', cx + Math.min(w, h) * .2, cy + Math.min(w, h) * .2,
        cx + Math.min(w, h) * .1, cy + Math.min(w, h) * .08);
      if (state.patrol.infectionView === 'granuloma') {
        addLabel('macrófagos infectados', cx - Math.min(w, h) * .18, cy - Math.min(w, h) * .23,
          cx - Math.min(w, h) * .12, cy - Math.min(w, h) * .08);
        addLabel('linfócitos periféricos', cx + Math.min(w, h) * .12, cy + Math.min(w, h) * .32,
          cx + Math.min(w, h) * .15, cy + Math.min(w, h) * .12);
      }
    } else if (state.patrol.active) {
      const camera = getWorldCameraPosition();
      const location = nearestAlveolus(camera.x, camera.y);
      addLabel(`pulmão ${location.lung} · alvéolo ${location.id + 1}`,
        cx - Math.min(w, h) * .37, cy - Math.min(w, h) * .16, cx, cy);
      const actor = getPlayerEntity(state.patrol.activePlayer);
      if (actor) addLabel(getPlayerRoleName(state.patrol.activePlayer),
        cx + Math.min(w, h) * .23, cy + Math.min(w, h) * .24,
        cx + Math.min(w, h) * .08, cy + Math.min(w, h) * .08);
    } else if (state.level === 0) {
      addLabel('árvore brônquica', cx + 9, cy - Math.min(w, h) * .2, cx, cy - Math.min(w, h) * .11);
      addLabel('lóbulo', cx - Math.min(w, h) * .34, cy + 25, cx - Math.min(w, h) * .17, cy + 10);
      addLabel('alvéolos', cx + Math.min(w, h) * .22, cy + 55, cx + Math.min(w, h) * .17, cy + 12);
    } else if (state.level === 3) {
      addLabel('espaço aéreo', cx - Math.min(w, h) * .41, cy - 15, cx - 15, cy - 10);
      addLabel('rede capilar', cx + Math.min(w, h) * .3, cy + 22, cx + Math.min(w, h) * .34, cy);
    } else if (state.level === 4) {
      addLabel('núcleo', cx - Math.min(w, h) * .42, cy - 17, cx - Math.min(w, h) * .1, cy);
      addLabel('RER', cx - Math.min(w, h) * .4, cy - Math.min(w, h) * .23, cx - Math.min(w, h) * .1, cy - Math.min(w, h) * .14);
      addLabel('Golgi', cx + Math.min(w, h) * .25, cy + Math.min(w, h) * .2, cx + Math.min(w, h) * .11, cy + Math.min(w, h) * .14);
      addLabel('mitocôndria', cx + Math.min(w, h) * .24, cy - Math.min(w, h) * .21, cx + Math.min(w, h) * .18, cy - Math.min(w, h) * .12);
      addLabel('lisossomo · endossomo', cx - Math.min(w, h) * .42, cy + Math.min(w, h) * .25, cx - Math.min(w, h) * .22, cy - Math.min(w, h) * .12);
      c.save();
      c.strokeStyle = 'rgba(152,221,194,.37)';
      c.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const angle = i * Math.PI / 4;
        c.beginPath();
        c.moveTo(cx - Math.min(w, h) * .1, cy);
        c.quadraticCurveTo(cx + Math.cos(angle) * Math.min(w, h) * .19, cy + Math.sin(angle) * Math.min(w, h) * .19,
          cx + Math.cos(angle) * Math.min(w, h) * .29, cy + Math.sin(angle) * Math.min(w, h) * .29);
        c.stroke();
      }
      c.restore();
    } else if (state.level === 9) {
      addLabel('LAM', cx - Math.min(w, h) * .4, cy - 45, cx - Math.min(w, h) * .25, cy - Math.min(w, h) * .22);
      addLabel('ácidos micólicos', cx + Math.min(w, h) * .25, cy + 20, cx + Math.min(w, h) * .32, cy);
      addLabel('membrana', cx - Math.min(w, h) * .36, cy + 55, cx - Math.min(w, h) * .28, cy + Math.min(w, h) * .2);
    } else if (state.level === 12) {
      addLabel('esxA · esxB', cx - Math.min(w, h) * .4, cy - 55, cx - Math.min(w, h) * .15, cy - Math.min(w, h) * .12);
      addLabel('katG · inhA', cx + Math.min(w, h) * .25, cy - 45, cx + Math.min(w, h) * .12, cy - Math.min(w, h) * .12);
      addLabel('rpoB · embB', cx + Math.min(w, h) * .25, cy + 48, cx + Math.min(w, h) * .06, cy + Math.min(w, h) * .06);
    }
    if (state.topic === 'antigen') {
      const x = Math.min(w - 18, cx + Math.min(w, h) * .19);
      c.fillStyle = 'rgba(173,218,206,.86)';
      c.font = '10px "Segoe UI", Arial, sans-serif';
      c.fillText('peptídeo → MHC-II → T CD4⁺', Math.max(18, cx - 100), h * .74);
    } else if (state.topic === 'phage') {
      c.fillStyle = 'rgba(205,179,229,.9)';
      c.font = '10px "Segoe UI", Arial, sans-serif';
      c.fillText('fago → RNA guia / Csm → interferência (conceitual)', Math.max(18, cx - 130), h * .74);
    }
    c.restore();
  }

  const particleColors = [
    { kind: 'LL-37', color: '121,225,182' },
    { kind: 'ROS', color: '255,184,99' },
    { kind: 'RNS', color: '125,178,255' },
    { kind: 'Citocina', color: '224,144,205' }
  ];
  function resetParticles() {
    const w = overlayCanvas.width / dpr || 700;
    const h = overlayCanvas.height / dpr || 400;
    state.particleItems = Array.from({ length: 42 }, (_, index) => {
      const kind = particleColors[index % particleColors.length];
      return { x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .32, vy: (Math.random() - .5) * .32, radius: 1 + Math.random() * 1.6, phase: Math.random() * 8, ...kind };
    });
  }

  function drawMinimap() {
    const w = minimap.width, h = minimap.height;
    mapCtx.clearRect(0, 0, w, h);
    mapCtx.fillStyle = 'rgba(10,31,37,.74)';
    mapCtx.fillRect(0, 0, w, h);
    if (state.patrol.active) {
      const world = getAlveolarWorld();
      const mapX = (x) => w * (.5 + x / 21);
      const mapY = (y) => h * (.5 + y / 13);
      mapCtx.fillStyle = 'rgba(72,140,121,.15)';
      mapCtx.strokeStyle = 'rgba(118,212,182,.42)';
      mapCtx.lineWidth = 1;
      mapCtx.beginPath(); mapCtx.ellipse(mapX(-5.2), mapY(0), w * .215, h * .46, 0, 0, Math.PI * 2); mapCtx.fill(); mapCtx.stroke();
      mapCtx.beginPath(); mapCtx.ellipse(mapX(5.2), mapY(0), w * .215, h * .46, 0, 0, Math.PI * 2); mapCtx.fill(); mapCtx.stroke();
      mapCtx.beginPath(); mapCtx.moveTo(mapX(-.9), mapY(0)); mapCtx.lineTo(mapX(.9), mapY(0)); mapCtx.stroke();
      mapCtx.fillStyle = 'rgba(173,220,200,.55)';
      world.nodes.forEach(node => {
        mapCtx.beginPath();
        mapCtx.arc(mapX(node.x), mapY(node.y), .7, 0, Math.PI * 2);
        mapCtx.fill();
      });
      state.patrol.bacteria.forEach(bacillus => {
        mapCtx.beginPath(); mapCtx.fillStyle = '#e88a72';
        mapCtx.arc(mapX(bacillus.x), mapY(bacillus.y), 1.2, 0, Math.PI * 2); mapCtx.fill();
      });
      const drawCellDot = (cell, color, radius) => {
        mapCtx.beginPath(); mapCtx.fillStyle = color;
        mapCtx.arc(mapX(cell.x), mapY(cell.y), radius, 0, Math.PI * 2); mapCtx.fill();
      };
      state.patrol.macrophages.filter(cell => cell.alive).forEach((cell, index) =>
        drawCellDot(cell, index ? '#b49be2' : '#9cf0d8', 2));
      state.patrol.neutrophils.filter(cell => cell.alive !== false).forEach(cell =>
        drawCellDot(cell, '#d7c8ff', 1.8));
      state.patrol.bCells.forEach(cell => drawCellDot(cell, '#89b6ff', 1.5));
      state.patrol.plasmaCells.forEach(cell => drawCellDot(cell, '#b9a2df', 1.8));
      state.patrol.granulomas.forEach(granuloma => {
        mapCtx.beginPath(); mapCtx.strokeStyle = 'rgba(204,166,224,.8)'; mapCtx.lineWidth = 1;
        mapCtx.arc(mapX(granuloma.x), mapY(granuloma.y), 2 + granuloma.maturity * 3, 0, Math.PI * 2);
        mapCtx.stroke();
      });
      const camera = getWorldCameraPosition();
      mapCtx.beginPath(); mapCtx.strokeStyle = '#87e7ca'; mapCtx.lineWidth = 1.2;
      mapCtx.arc(mapX(camera.x), mapY(camera.y), 5, 0, Math.PI * 2); mapCtx.stroke();
      mapCtx.fillStyle = '#9cf0d8'; mapCtx.beginPath();
      mapCtx.arc(mapX(camera.x), mapY(camera.y), 2, 0, Math.PI * 2); mapCtx.fill();
      return;
    }
    mapCtx.beginPath(); mapCtx.fillStyle = 'rgba(72,140,121,.38)';
    mapCtx.ellipse(w * .36, h * .54, 26, 36, -.12, 0, Math.PI * 2); mapCtx.fill();
    mapCtx.ellipse(w * .64, h * .54, 26, 36, .12, 0, Math.PI * 2); mapCtx.fill();
    mapCtx.strokeStyle = 'rgba(118,212,182,.68)'; mapCtx.lineWidth = 2;
    mapCtx.beginPath(); mapCtx.moveTo(w * .5, 10); mapCtx.lineTo(w * .5, 35);
    mapCtx.lineTo(w * .38, 44); mapCtx.moveTo(w * .5, 35); mapCtx.lineTo(w * .62, 44); mapCtx.stroke();
    for (let i = 0; i < 5; i++) {
      mapCtx.fillStyle = 'rgba(152,210,183,.54)';
      mapCtx.beginPath(); mapCtx.arc(w * (.22 + i * .14), h * (.52 + (i % 2) * .16), 1.7, 0, Math.PI * 2); mapCtx.fill();
    }
    const focus = Math.max(0, 1 - state.level * .062);
    const x = w * (.5 + state.camera.x / 800);
    const y = h * (.56 + state.camera.y / 500);
    mapCtx.strokeStyle = '#87e7ca';
    mapCtx.fillStyle = 'rgba(115,229,193,.14)';
    mapCtx.lineWidth = 1;
    mapCtx.beginPath(); mapCtx.arc(x, y, Math.max(4, 17 * focus), 0, Math.PI * 2); mapCtx.fill(); mapCtx.stroke();
    mapCtx.beginPath(); mapCtx.fillStyle = '#9cf0d8'; mapCtx.arc(x, y, 2, 0, Math.PI * 2); mapCtx.fill();
    if (state.patrol.active) {
      const focusX = w * .36;
      const focusY = h * .54;
      mapCtx.beginPath();
      mapCtx.strokeStyle = state.patrol.complete ? '#90edbc' : '#e5b46d';
      mapCtx.fillStyle = state.patrol.complete ? 'rgba(144,237,188,.1)' : 'rgba(229,180,109,.09)';
      mapCtx.arc(focusX, focusY, 8, 0, Math.PI * 2);
      mapCtx.fill();
      mapCtx.stroke();
      state.patrol.bacteria.forEach((bacillus) => {
        mapCtx.beginPath();
        mapCtx.fillStyle = '#e88a72';
        mapCtx.arc(focusX + bacillus.x * 72, focusY + bacillus.y * 48, 1.2, 0, Math.PI * 2);
        mapCtx.fill();
      });
      state.patrol.macrophages.forEach((macrophage, index) => {
        if (!macrophage.alive) return;
        mapCtx.beginPath();
        mapCtx.fillStyle = index ? '#b49be2' : '#9cf0d8';
        mapCtx.arc(focusX + macrophage.x * 72, focusY + macrophage.y * 48, index ? 2 : 2.8, 0, Math.PI * 2);
        mapCtx.fill();
      });
      state.patrol.neutrophils.filter(unit => unit.alive !== false).forEach(neutrophil => {
        mapCtx.beginPath();
        mapCtx.fillStyle = '#d7c8ff';
        mapCtx.arc(focusX + neutrophil.x * 72, focusY + neutrophil.y * 48, 2, 0, Math.PI * 2);
        mapCtx.fill();
      });
      state.patrol.granulomas.forEach((granuloma) => {
        mapCtx.beginPath();
        mapCtx.strokeStyle = 'rgba(204,166,224,.8)';
        mapCtx.lineWidth = 1.5;
        mapCtx.arc(focusX + granuloma.x * 72, focusY + granuloma.y * 48, 3 + granuloma.maturity * 5, 0, Math.PI * 2);
        mapCtx.stroke();
      });
    }
  }

  function getActivePathwayCount() {
    return state.pathwayActive.filter(Boolean).length;
  }
  function getActiveSignalLength() {
    let activeLength = 0;
    for (const active of state.pathwayActive) {
      if (!active) break;
      activeLength++;
    }
    return activeLength;
  }
  function canClearIntracellular(phagosome) {
    return (!phagosome || phagosome.cellType !== 'neutrophil')
      && getActiveSignalLength() === pathwayLabels.length && state.patrol.phageTherapy;
  }
  function getFocusPhagosome() {
    return state.patrol.phagosomes.find(item => item.cellType !== 'neutrophil')
      || state.patrol.phagosomes.find(item => item.cellType === 'neutrophil');
  }
  function getCytosolicBacilliCount(cellType) {
    return state.patrol.phagosomes.filter(item => item.location === 'cytosol'
      && (!cellType || item.cellType === cellType)).length;
  }
  function getInfectedAlveolusCount() {
    const infected = new Set();
    const world = getAlveolarWorld();
    [...state.patrol.bacteria, ...state.patrol.phagosomes].forEach(bacillus => {
      let nearest = world.nodes[0];
      let distance = Infinity;
      world.nodes.forEach(node => {
        const nextDistance = (node.x - bacillus.x) ** 2 + (node.y - bacillus.y) ** 2;
        if (nextDistance < distance) {
          nearest = node;
          distance = nextDistance;
        }
      });
      infected.add(nearest.id);
    });
    return infected.size;
  }
  function getLiveMacrophageCount() {
    return state.patrol.initialized
      ? state.patrol.macrophages.filter(item => item.alive !== false).length
      : 1;
  }
  function getLiveNeutrophilCount() {
    return state.patrol.neutrophils.filter(item => item.alive !== false).length;
  }
  function getImmuneCellSpawnPoint(index, distance) {
    const patrol = state.patrol;
    const target = patrol.bacteria.find(bacillus => !bacillus.netId)
      || patrol.bacteria[0]
      || patrol.phagosomes[0]
      || patrol.macrophages.find(macrophage => macrophage.alive)
      || { x: 0, y: 0 };
    const angle = index * 2.399963229728653;
    const position = { x: target.x + Math.cos(angle) * distance, y: target.y + Math.sin(angle) * distance };
    if (isInsideAlveolarWorld(position.x, position.y)) return position;
    const nearest = nearestAlveolus(position.x, position.y);
    return { x: nearest.x, y: nearest.y };
  }
  function deployNETForNeutrophil(unit) {
    const patrol = state.patrol;
    const target = patrol.bacteria.find(bacillus => !bacillus.netId
      && Math.hypot(unit.x - bacillus.x, unit.y - bacillus.y) < .17);
    if (!target) return false;
    const net = {
      id: patrol.nextNetId++, x: target.x, y: target.y, radius: .11,
      life: 0, duration: 9, phase: Math.random() * Math.PI * 2
    };
    patrol.nets.push(net);
    patrol.bacteria.forEach(bacillus => {
      if (Math.hypot(bacillus.x - net.x, bacillus.y - net.y) <= net.radius) bacillus.netId = net.id;
    });
    unit.netCooldown = net.duration;
    return true;
  }
  function spawnNeutrophil() {
    const liveCount = getLiveNeutrophilCount();
    if (liveCount >= maxNeutrophils) return false;
    const position = getImmuneCellSpawnPoint(liveCount, .09);
    const unit = {
      ...position,
      id: state.patrol.nextNeutrophilId++,
      phase: 0,
      netCooldown: 1,
      damage: 0,
      ruptureThreshold: .65 + Math.random() * .7,
      alive: true
    };
    state.patrol.neutrophils.push(unit);
    return unit;
  }
  function recruitNeutrophils() {
    if (!state.patrol.initialized || state.patrol.complete) return;
    const unit = spawnNeutrophil();
    if (!unit) return;
    const netDeployed = deployNETForNeutrophil(unit);
    updateSimulationUi();
    drawScene();
    showToast(netDeployed
      ? 'Neutrófilo recrutado: uma NET temporária aprisiona bacilos próximos, sem garantir sua morte.'
      : 'Neutrófilo recrutado: pode fagocitar e formar NETs ao alcançar bacilos.');
  }
  function recruitPlasmaCells() {
    if (!state.patrol.initialized || state.patrol.complete || state.patrol.plasmaCells.length >= maxPlasmaCells) return;
    const position = getImmuneCellSpawnPoint(state.patrol.plasmaCells.length, .045);
    state.patrol.plasmaCells.push({ ...position, id: state.patrol.nextPlasmaId++, phase: 0 });
    updateSimulationUi();
    drawScene();
    showToast('Plasmócito recrutado: anticorpos podem recrutar complemento no modelo didático.');
  }
  function renderPlayerControls(container, compact) {
    const patrol = state.patrol;
    const online = window.onlinePlay && window.onlinePlay.isConnected();
    const labels = ['Jogador 1', 'Jogador 2', 'Jogador 3'];
    const roles = patrol.playerRoles || ['Macrófago', 'Neutrófilo', 'Lin. B'];
    container.innerHTML = Array.from({ length: 3 }, (_, index) => {
      const available = index < patrol.playerCount;
      const nextPlayer = index === patrol.playerCount;
      const active = available && index === patrol.activePlayer;
      const disabled = online || (!available && !nextPlayer);
      const label = available ? labels[index] : nextPlayer ? `Adicionar ${labels[index]}` : `${labels[index]} indisponível`;
      return `<button type="button" class="player-control${active ? ' active' : ''}${available ? '' : ' vacant'}${compact ? ' compact' : ''}"
        data-player-index="${index}" ${nextPlayer && !online ? 'data-add-player="true"' : ''} ${disabled ? 'disabled' : ''}
        aria-pressed="${active}" aria-label="${label}: ${roles[index]}${active ? ', controle ativo' : ''}"
        title="${online ? `Papel online: ${roles[index]}` : available ? `Assumir controle: ${roles[index]}` : nextPlayer ? `Adicionar ${labels[index]}: ${roles[index]}` : `Adicione ${labels[index - 1]} primeiro`}">
        <b>${available ? compact ? `J${index + 1}` : labels[index] : '+'}</b>
        <small>${available ? roles[index] : compact ? `J${index + 1}` : nextPlayer && !online ? 'Adicionar jogador' : 'Aguardando'}</small>
      </button>`;
    }).join('');
  }
  function getPlayerRoleName(player) {
    const role = state.patrol.playerRoles[player];
    if (role === 'Lin. B') return 'Linfócito B / plasmócito';
    return role || 'Célula imune';
  }
  function setPlayerRole(player, role) {
    const patrol = state.patrol;
    if (!Number.isInteger(player) || player < 0 || player > 2
      || !['Macrófago', 'Neutrófilo', 'Plasmócito'].includes(role)) return;
    patrol.playerRoles[player] = role;
    if (patrol.initialized && role === 'Neutrófilo' && getLiveNeutrophilCount() === 0) spawnNeutrophil();
    if (patrol.initialized && role === 'Plasmócito' && patrol.plasmaCells.length === 0) {
      const position = getImmuneCellSpawnPoint(0, .12);
      patrol.plasmaCells.push({ ...position, id: patrol.nextPlasmaId++, phase: 0 });
    }
    if (patrol.running && patrol.readyPlayers[player]) {
      startPlayerForSlot(player);
      return;
    }
    updateSimulationUi();
    drawScene();
    drawMinimap();
    showToast(`Jogador ${player + 1} escolheu controlar ${role.toLowerCase()}.`);
  }
  function renderCellCommandDeck() {
    const patrol = state.patrol;
    const player = Math.max(0, Math.min(2, patrol.activePlayer));
    const role = getPlayerRoleName(player);
    const rawRole = patrol.playerRoles[player];
    const isMacrophage = rawRole === 'Macrófago';
    const isNeutrophil = rawRole === 'Neutrófilo';
    const isPlasma = rawRole === 'Plasmócito';
    const isBCell = rawRole === 'Lin. B';
    const ready = Boolean(patrol.readyPlayers[player]);
    const mitosisButton = document.getElementById('cell-mitosis-button');
    const specialButton = document.getElementById('cell-special-button');
    document.getElementById('cell-command-role').textContent = `Base: ${role}`;
    document.getElementById('cell-command-status').textContent = ready ? 'Na patrulha' : 'Aguardando início';
    document.getElementById('cell-command-description').textContent = isMacrophage
      ? 'Controle o macrófago, ative as vias de defesa e explore os dois pulmões.'
      : isNeutrophil
        ? 'Controle o neutrófilo, forme NETs e observe fagossomos, citosol e risco de ruptura.'
        : isBCell
          ? 'Controle o linfócito B; a sinalização IL-12 e o T helper apoiam sua diferenciação em plasmócito no cenário.'
          : 'Controle o plasmócito; produza anticorpos IgG e IgA para recrutar complemento no modelo.';
    document.getElementById('cell-start-button').textContent = ready ? 'Célula na patrulha' : 'Entrar na patrulha';
    document.getElementById('cell-start-button').disabled = ready;
    const count = isMacrophage ? getLiveMacrophageCount()
      : isNeutrophil ? getLiveNeutrophilCount()
        : isBCell ? patrol.bCells.length + patrol.plasmaCells.length : patrol.plasmaCells.length;
    const limit = isMacrophage ? maxMacrophages : isNeutrophil ? maxNeutrophils : maxPlasmaCells;
    mitosisButton.textContent = `Mitose · ${count}/${limit}`;
    mitosisButton.disabled = !patrol.running || !ready || count >= limit;
    specialButton.textContent = isMacrophage ? (patrol.phageTherapy ? 'Desativar terapia fágica' : 'Ativar terapia fágica')
      : isNeutrophil ? 'Lançar NET'
        : isBCell ? 'Sinalizar diferenciação'
          : 'Lançar IgG / IgA';
    specialButton.disabled = !patrol.running || !ready
      || (isNeutrophil && getLiveNeutrophilCount() === 0)
      || (isPlasma && patrol.plasmaCells.length === 0);
    document.querySelectorAll('[data-cell-role]').forEach(button => {
      button.classList.toggle('active', button.dataset.cellRole === patrol.playerRoles[player]);
      button.setAttribute('aria-pressed', String(button.dataset.cellRole === patrol.playerRoles[player]));
      button.disabled = Boolean(window.onlinePlay && window.onlinePlay.isConnected() && !window.onlinePlay.isHost() && ready);
    });
  }
  function selectPlayer(index, addPlayer) {
    const patrol = state.patrol;
    if (!Number.isInteger(index) || index < 0 || index >= 3) return;
    if (window.onlinePlay && window.onlinePlay.isConnected()) {
      showToast(`Seu papel online é ${patrol.playerRoles[window.onlinePlay.getLocalSlot()] || 'espectador'}.`);
      return;
    }
    if (addPlayer && index === patrol.playerCount) {
      patrol.playerCount++;
      if (patrol.playerRoles[index] === 'Neutrófilo' && getLiveNeutrophilCount() === 0) spawnNeutrophil();
      if (patrol.playerRoles[index] === 'Plasmócito' && patrol.plasmaCells.length === 0) {
        patrol.plasmaCells.push({ ...getImmuneCellSpawnPoint(0, .12), id: patrol.nextPlasmaId++, phase: 0 });
      }
      if (patrol.playerRoles[index] === 'Lin. B' && patrol.bCells.length === 0) {
        patrol.bCells.push({ ...getImmuneCellSpawnPoint(0, .12), phase: 0 });
      }
      showToast(`${patrol.playerRoles[index]} associado ao jogador ${index + 1}.`);
    } else if (index < patrol.playerCount) {
      showToast(`Controle transferido para ${patrol.playerRoles[index]}.`);
    } else {
      return;
    }
    patrol.activePlayer = index;
    updateSimulationUi();
    drawScene();
    drawMinimap();
  }
  function startPlayerForSlot(slot) {
    const patrol = state.patrol;
    if (!Number.isInteger(slot) || slot < 0 || slot >= 3) return;
    if (!patrol.initialized || patrol.complete) resetPatrol();
    let actor = getPlayerEntity(slot);
    if (!actor) {
      const position = getImmuneCellSpawnPoint(slot, .12);
      const role = patrol.playerRoles[slot];
      if (role === 'Neutrófilo') actor = spawnNeutrophil();
      else if (role === 'Plasmócito') {
        if (patrol.plasmaCells.length >= maxPlasmaCells) {
          showToast('Limite de plasmócitos do cenário atingido.');
          return;
        }
        actor = { ...position, id: patrol.nextPlasmaId++, phase: 0 };
        patrol.plasmaCells.push(actor);
      } else {
        if (getLiveMacrophageCount() >= maxMacrophages) {
          showToast('Limite de macrófagos do cenário atingido.');
          return;
        }
        actor = { ...position, phase: 0, damage: 0, alive: true, founder: false };
        patrol.macrophages.push(actor);
      }
    }
    if (!actor) {
      showToast('Não há vaga para uma célula desse tipo no cenário.');
      return;
    }
    if (actor) actor.playerSlot = slot;
    patrol.active = true;
    patrol.running = true;
    patrol.readyPlayers[slot] = true;
    if (!window.onlinePlay || !window.onlinePlay.isHost()) patrol.activePlayer = slot;
    state.level = 3;
    state.topic = 'scene';
    renderInfo();
    updateSimulationUi();
    drawScene();
    drawMinimap();
    showToast(`${getPlayerRoleName(slot)} entrou na patrulha alveolar.`);
  }
  function expandNeutrophilTeam(player) {
    const patrol = state.patrol;
    if (!patrol.running || getLiveNeutrophilCount() >= maxNeutrophils) return;
    const parent = getPlayerEntity(player);
    if (!parent) {
      if (!spawnNeutrophil()) return;
      updateSimulationUi();
      drawScene();
      showToast('Neutrófilo recrutado para a patrulha.');
      return;
    }
    const angle = getLiveNeutrophilCount() * 2.4;
    const position = { x: parent.x + Math.cos(angle) * .16, y: parent.y + Math.sin(angle) * .16 };
    if (!isInsideAlveolarWorld(position.x, position.y)) return;
    parent.mitosisProgress = 0;
    const child = spawnNeutrophil();
    if (!child) return;
    child.x = position.x;
    child.y = position.y;
    child.birthProgress = 0;
    updateSimulationUi();
    drawScene();
    showToast('Mitose esquemática do neutrófilo: uma célula-filha está se separando.');
  }
  function expandBLineage(player) {
    const patrol = state.patrol;
    if (!patrol.running) return;
    const parent = getPlayerEntity(player);
    if (!parent) return;
    const isPlasma = patrol.plasmaCells.includes(parent);
    const cells = isPlasma ? patrol.plasmaCells : patrol.bCells;
    if (cells.length >= maxPlasmaCells) return;
    const angle = cells.length * 2.4;
    const position = { x: parent.x + Math.cos(angle) * .14, y: parent.y + Math.sin(angle) * .14 };
    if (!isInsideAlveolarWorld(position.x, position.y)) return;
    parent.mitosisProgress = 0;
    const daughter = { ...position, phase: angle, birthProgress: 0, mitosisProgress: undefined };
    if (isPlasma) {
      daughter.id = patrol.nextPlasmaId++;
      patrol.plasmaCells.push(daughter);
    } else {
      patrol.bCells.push(daughter);
    }
    updateSimulationUi();
    drawScene();
    showToast(`Mitose esquemática da célula ${isPlasma ? 'plasmática' : 'B'} concluída no modelo.`);
  }
  function launchNeutrophilNET(player) {
    const unit = getPlayerEntity(player);
    if (!unit) return;
    if (unit.netCooldown > 0) {
      showToast(`NET indisponível por mais ${Math.ceil(unit.netCooldown)} s no cenário.`);
      return;
    }
    if (!deployNETForNeutrophil(unit)) {
      showToast('Aproxime o neutrófilo de bacilos livres para formar uma NET no cenário.');
      return;
    }
    updateSimulationUi();
    drawScene();
    drawMinimap();
    showToast('NET lançada: bacilos próximos ficam temporariamente aprisionados, sem morte garantida.');
  }
  function launchPlasmaAntibodies(player) {
    const plasma = getPlayerEntity(player);
    if (!plasma || !state.patrol.plasmaCells.includes(plasma)) {
      showToast('A célula B ainda precisa se diferenciar em plasmócito para liberar anticorpos no modelo.');
      return;
    }
    const patrol = state.patrol;
    const target = patrol.bacteria[0] || patrol.phagosomes[0] || plasma;
    const isotype = patrol.nextAntibodyIsotype === 'IgA' ? 'IgA' : 'IgG';
    patrol.nextAntibodyIsotype = isotype === 'IgG' ? 'IgA' : 'IgG';
    for (let i = 0; i < 5 && patrol.antibodies.length < 60; i++) {
      const angle = i * Math.PI * 2 / 5 + plasma.phase;
      patrol.antibodies.push({
        x: plasma.x + Math.cos(angle) * .04,
        y: plasma.y + Math.sin(angle) * .04,
        targetX: target.x, targetY: target.y, isotype, phase: angle
      });
    }
    updateSimulationUi();
    drawScene();
    showToast(`${isotype} lançada pelo plasmócito; anticorpos próximos podem recrutar complemento no cenário.`);
  }
  function runRoleMitosis(player) {
    const role = state.patrol.playerRoles[player];
    if (role === 'Neutrófilo') expandNeutrophilTeam(player);
    else if (role === 'Plasmócito' || role === 'Lin. B') expandBLineage(player);
    else expandMacrophageTeam(player);
  }
  function runCellSpecialAction(player) {
    const role = state.patrol.playerRoles[player];
    if (role === 'Neutrófilo') launchNeutrophilNET(player);
    else if (role === 'Plasmócito') launchPlasmaAntibodies(player);
    else if (role === 'Lin. B') {
      const index = state.patrol.cytokines.findIndex(item => item.name === 'IL-12');
      toggleCytokine(index);
    } else togglePhageTherapy();
  }
  function handlePlayerControl(event) {
    const control = event.target.closest('[data-player-index]');
    if (control) selectPlayer(Number(control.dataset.playerIndex), control.dataset.addPlayer === 'true');
  }
  function runOnlineAction(command, action) {
    if (!window.onlinePlay || !window.onlinePlay.isConnected() || window.onlinePlay.isHost()) {
      action();
      return;
    }
    if (window.onlinePlay.getLocalSlot() < 1) {
      showToast('Aguardando uma vaga de jogador na sala.');
      return;
    }
    window.onlinePlay.sendCommand(command);
    showToast('Comando enviado ao anfitrião da partida.');
  }
  function applyOnlineCommand(message) {
    if (!window.onlinePlay || !window.onlinePlay.isHost() || !message
      || !Number.isInteger(message.slot) || message.slot < 1 || message.slot > 2
      || !message.command || typeof message.command.type !== 'string') return;
    const command = message.command;
    switch (command.type) {
      case 'patrol-toggle': startOrPausePatrol(); break;
      case 'multiply': expandMacrophageTeam(message.slot); break;
      case 'recruit-neutrophils': recruitNeutrophils(); break;
      case 'recruit-plasma': recruitPlasmaCells(); break;
      case 'restart-infection': restartAfterMacrophageLysis(); break;
      case 'cell-start': startPlayerForSlot(message.slot); break;
      case 'cell-role':
        if (typeof command.role === 'string') setPlayerRole(message.slot, command.role);
        break;
      case 'cell-mitosis': runRoleMitosis(message.slot); break;
      case 'cell-special': runCellSpecialAction(message.slot); break;
      case 'pathway-toggle':
        if (Number.isInteger(command.index) && command.index >= 0 && command.index < pathwayLabels.length) togglePathwayModule(command.index);
        break;
      case 'defense-toggle':
        if (Number.isInteger(command.index) && command.index >= 0 && command.index < state.patrol.defenses.length) toggleMacrophageDefense(command.index);
        break;
      case 'cytokine-toggle':
        if (Number.isInteger(command.index) && command.index >= 0 && command.index < state.patrol.cytokines.length) toggleCytokine(command.index);
        break;
      case 'phage-toggle': togglePhageTherapy(); break;
      case 'infection-view':
        if (typeof command.view === 'string') selectInfectionView(command.view);
        break;
    }
  }
  function applyOnlineRoster(roster) {
    if (!roster || !Number.isInteger(roster.count)) return;
    const patrol = state.patrol;
    const count = Math.max(1, Math.min(3, roster.count));
    if (window.onlinePlay && window.onlinePlay.isHost()) {
      if (count >= 2 && patrol.playerRoles[1] === 'Neutrófilo' && getLiveNeutrophilCount() === 0) spawnNeutrophil();
      if (count >= 3 && patrol.playerRoles[2] === 'Plasmócito' && patrol.plasmaCells.length === 0) {
        const position = getImmuneCellSpawnPoint(0, .12);
        patrol.plasmaCells.push({ ...position, id: patrol.nextPlasmaId++, phase: 0 });
      } else if (count >= 3 && patrol.playerRoles[2] === 'Lin. B' && patrol.bCells.length === 0) {
        patrol.bCells.push({ ...getImmuneCellSpawnPoint(0, .12), phase: 0 });
      }
      patrol.playerCount = count;
      patrol.activePlayer = 0;
    } else if (window.onlinePlay && window.onlinePlay.isConnected()) {
      patrol.playerCount = count;
      patrol.activePlayer = Math.max(0, window.onlinePlay.getLocalSlot());
    }
    updateSimulationUi();
    if (patrol.active) {
      drawScene();
      drawMinimap();
    }
    const members = Array.isArray(roster.members) ? roster.members : [];
    document.getElementById('online-roster').textContent = members
      .map(member => `J${member.slot + 1} ${patrol.playerRoles[member.slot]}${member.isHost ? ' · anfitrião' : ''}`)
      .join('  ·  ');
  }
  let onlineSessionActive = false;
  function renderOnlineStatus(detail) {
      const status = document.getElementById('online-connection-status');
      const summary = document.getElementById('online-summary');
      const connectedControls = document.getElementById('online-connected-controls');
      const disconnectedControls = document.getElementById('online-disconnected-controls');
      const connected = window.onlinePlay && window.onlinePlay.isConnected();
      const roomCode = detail && detail.roomCode ? detail.roomCode : window.onlinePlay.getRoomCode();
      const slot = detail && Number.isInteger(detail.slot) ? detail.slot : window.onlinePlay.getLocalSlot();
      const role = state.patrol.playerRoles[slot] || 'aguardando vaga';
      const messages = {
        offline: 'Crie uma sala ou entre com o código enviado por quem está hospedando.',
        connecting: 'Conectando à sala online…',
        'loading-sdk': 'Carregando o serviço de conexão…',
        waiting: 'Conectado. Aguardando a entrada do anfitrião…',
        connected: `Conectado como J${slot + 1} · ${role}.`,
        full: 'A sala está cheia; no máximo três jogadores podem participar.',
        'host-left': 'O anfitrião saiu ou perdeu a conexão. A partida ficará pausada.',
        error: detail && detail.message ? detail.message : 'Não foi possível conectar à sala.'
      };
      const message = messages[detail && detail.state] || messages.offline;
      status.textContent = message;
      summary.textContent = connected
        ? `Sala ${roomCode} · ${slot >= 0 ? `J${slot + 1} ${role}` : 'aguardando vaga'}`
        : 'Jogue com amigos em outros dispositivos.';
      document.querySelector('.coop-hint').textContent = connected
        ? 'Cada dispositivo controla seu papel; a simulação é sincronizada pelo anfitrião.'
        : 'Até 3 pessoas no mesmo dispositivo: toque no jogador para assumir seu papel.';
      connectedControls.hidden = !connected;
      disconnectedControls.hidden = connected;
      document.getElementById('online-play-button').textContent = connected ? `Sala ${roomCode}` : 'Conectar';
      if (connected) {
        onlineSessionActive = true;
      } else if (detail && detail.state === 'offline' && onlineSessionActive) {
        onlineSessionActive = false;
        state.patrol.playerCount = 1;
        state.patrol.activePlayer = 0;
        updateSimulationUi();
      }
    }
    function configureOnlineUi() {
      const dialog = document.getElementById('online-play-dialog');
      const roomInput = document.getElementById('online-room-code');
      const copyInput = document.getElementById('online-room-link');
      const createInviteLink = code => {
        const config = window.ESTUDO_MULTIPLAYER_CONFIG || {};
        const publicUrl = typeof config.publicAppUrl === 'string' ? config.publicAppUrl.trim() : '';
        const invite = new URL(publicUrl || window.location.href);
        invite.search = '';
        invite.hash = '';
        invite.searchParams.set('room', code);
        return invite.href;
      };
      const setError = error => {
        console.error('Não foi possível conectar ao modo cooperativo online:', error);
        renderOnlineStatus({ state: 'error', message: error.message || 'Falha ao conectar.' });
      };
      document.getElementById('online-play-button').addEventListener('click', () => dialog.showModal());
      roomInput.addEventListener('input', () => { roomInput.value = roomInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6); });
      document.getElementById('online-create-room').addEventListener('click', async event => {
        event.currentTarget.disabled = true;
        try {
          const code = await window.onlinePlay.createRoom();
          document.getElementById('online-current-code').textContent = code;
          copyInput.value = createInviteLink(code);
        } catch (error) {
          await window.onlinePlay.leave();
          setError(error);
        } finally {
          event.currentTarget.disabled = false;
        }
      });
      document.getElementById('online-join-room').addEventListener('click', async event => {
        event.currentTarget.disabled = true;
        try {
          const code = await window.onlinePlay.joinRoom(roomInput.value);
          document.getElementById('online-current-code').textContent = code;
          copyInput.value = createInviteLink(code);
        } catch (error) {
          await window.onlinePlay.leave();
          setError(error);
        } finally {
          event.currentTarget.disabled = false;
        }
      });
      document.getElementById('online-copy-link').addEventListener('click', async () => {
        try {
          if (!copyInput.value) throw new Error('O link da sala ainda não está disponível.');
          if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(copyInput.value);
          else {
            copyInput.focus();
            copyInput.select();
            if (!document.execCommand('copy')) throw new Error('O navegador não conseguiu copiar o link.');
          }
          showToast('Link da sala copiado. Envie-o aos seus amigos.');
        } catch (error) {
          setError(error);
          copyInput.focus();
          copyInput.select();
        }
      });
      document.getElementById('online-leave-room').addEventListener('click', async () => {
        await window.onlinePlay.leave();
        dialog.close();
        showToast('Você saiu da sala online.');
      });
      const invitedRoom = new URLSearchParams(window.location.search).get('room');
      if (invitedRoom && /^[A-Za-z0-9]{6}$/.test(invitedRoom)) {
        roomInput.value = invitedRoom.toUpperCase();
        dialog.showModal();
      document.getElementById('online-join-room').click();
    }
    }
  let lastOnlineUiUpdate = 0;
  function applyOnlineSnapshot(snapshot) {
    if (!window.onlinePlay || window.onlinePlay.isHost() || window.onlinePlay.getLocalSlot() < 1
      || !snapshot || typeof snapshot !== 'object' || !snapshot.patrol || typeof snapshot.patrol !== 'object'
      || !Array.isArray(snapshot.pathwayActive) || snapshot.pathwayActive.length !== pathwayLabels.length
      || snapshot.pathwayActive.some(value => typeof value !== 'boolean')) return;
    const source = snapshot.patrol;
    const arrayKeys = ['bacteria', 'phagosomes', 'macrophages', 'granulomas', 'defenseUnits', 'helperT',
      'bCells', 'neutrophils', 'plasmaCells', 'antibodies', 'complement', 'nets', 'deaths', 'spreadSites',
      'cytokines', 'defenses'];
    if (arrayKeys.some(key => !Array.isArray(source[key]) || source[key].length > 1000)
      || typeof source.active !== 'boolean' || typeof source.running !== 'boolean'
      || !Number.isInteger(source.playerCount) || source.playerCount < 1 || source.playerCount > 3) return;
    const wasActive = state.patrol.active;
    const previousView = state.patrol.infectionView;
    const safeState = {};
    Object.keys(state.patrol).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(source, key)) safeState[key] = source[key];
    });
    Object.assign(state.patrol, safeState);
    if (Number.isInteger(state.patrol.worldSeed)) getAlveolarWorld();
    if (!Number.isInteger(state.patrol.infectedAlveoli)) {
      state.patrol.infectedAlveoli = getInfectedAlveolusCount();
    }
    if (!Array.isArray(state.patrol.readyPlayers)) state.patrol.readyPlayers = [false, false, false];
    state.pathwayActive = snapshot.pathwayActive.slice();
    state.patrol.activePlayer = Math.max(0, window.onlinePlay.getLocalSlot());
    if (state.patrol.active && !wasActive) {
      state.level = 3;
      state.topic = 'scene';
      state.camera = { x: 0, y: 0 };
    }
    if ((state.patrol.active && !wasActive) || previousView !== state.patrol.infectionView) {
      renderInfo();
    }
    renderPathwayControls();
    const now = performance.now();
    if (now - lastOnlineUiUpdate > 400) {
      updateSimulationUi();
      lastOnlineUiUpdate = now;
    }
    drawScene();
    drawMinimap();
  }
  function getFocusProgress() {
    const contained = getFocusPhagosome();
    return contained ? contained.progress : state.patrol.complete ? 4 : 0;
  }
  function getInfectionPhase(progress) {
    if (progress < 1) return 'Fagossomo';
    if (progress < 2) return 'Parede';
    if (progress < 3) return 'Citoplasma';
    return 'Fagolisossomo';
  }
  function getInfectionStageNote() {
    const view = state.patrol.infectionView;
    const phagosomeCount = state.patrol.phagosomes.filter(item => item.location !== 'cytosol').length;
    const neutrophilPhagosomes = state.patrol.phagosomes.filter(item =>
      item.cellType === 'neutrophil' && item.location !== 'cytosol').length;
    const neutrophilCytosol = getCytosolicBacilliCount('neutrophil');
    const cytosolicCount = getCytosolicBacilliCount();
    const progress = getFocusProgress();
    const eligible = canClearIntracellular(getFocusPhagosome());
    if (state.patrol.complete) return 'Não restam bacilos neste cenário finito; o resultado é apenas do modelo e não demonstra esterilização pulmonar real.';
    if (view === 'alveolus') {
      return phagosomeCount || cytosolicCount
        ? `${phagosomeCount} bacilo(s) em fagossomos e ${cytosolicCount} no citosol; macrófagos e neutrófilos podem internalizar bacilos, com desfechos didáticos distintos.`
        : 'Patrulhe o alvéolo e aproxime macrófagos ou neutrófilos dos bacilos para fagocitá-los.';
    }
    if (view === 'phagosome') {
      return phagosomeCount
        ? 'O bacilo percorre o compartimento em tráfego vesicular esquemático. Sem controle, pode escapar para o citosol e contribuir para dano celular.'
        : getCytosolicBacilliCount()
          ? 'Neste cenário, os bacilos já escaparam do fagossomo; acompanhe o tráfego no citosol do macrófago.'
        : 'Vista esquemática do bacilo no fagossomo; aproxime um macrófago ou neutrófilo para criar um compartimento no cenário.';
    }
    if (view === 'host-cytosol') {
      const escaped = getCytosolicBacilliCount();
      const damage = Math.max(0, ...state.patrol.macrophages.filter(unit => unit.alive).map(unit => unit.damage || 0));
      if (escaped) return `${escaped} bacilo(s) no citosol do macrófago; dano celular esquemático em ${Math.round(damage * 100)}%. O escape depende do contexto e não implica lise inevitável.`;
      return phagosomeCount
        ? 'Bacilos ainda contidos no modelo; tráfego e escape fagossomal podem ocorrer se a infecção persistir sem controle.'
        : 'Aproxime o macrófago dos bacilos e observe a progressão intracelular. A cena não representa motilidade flagelar.';
    }
    if (view === 'neutrophil-cytosol') {
      const damage = Math.max(0, ...state.patrol.neutrophils.filter(unit => unit.alive !== false).map(unit => unit.damage || 0));
      if (neutrophilCytosol) return `${neutrophilCytosol} bacilo(s) no citosol do neutrófilo; dano esquemático ${Math.round(damage * 100)}%. A ruptura é uma possibilidade do cenário, não um destino obrigatório.`;
      if (neutrophilPhagosomes) return `${neutrophilPhagosomes} bacilo(s) ainda em fagossomos de neutrófilos; o modelo permite eliminação fagolisossomal ou escape para o citosol.`;
      if (state.patrol.neutrophilLysisCount) return 'O neutrófilo sofreu ruptura neste cenário; bacilos foram liberados. Recrute outra célula para continuar a patrulha.';
      return 'Aproxime um neutrófilo dos bacilos no alvéolo para observar sua internalização, o fagossomo e os possíveis desfechos.';
    }
    if (view === 'granuloma') {
      const granuloma = state.patrol.granulomas[0];
      if (!granuloma) return 'Com bacilos presentes, ative TNF, IL-1β ou IL-12 para iniciar a agregação celular esquemática ao redor do foco.';
      const stage = granuloma.maturity < .3 ? 'recrutamento inicial'
        : granuloma.maturity < .72 ? 'organização de macrófagos e linfócitos'
          : 'estrutura organizada no modelo';
      return `Fase: ${stage}. Granulomas podem conter bacilos ou favorecer persistência; esta secção é um esquema, não um desfecho obrigatório.`;
    }
    if (view === 'wall') {
      if (!eligible) return 'LL-37 só forma poros ilustrativos depois de ativar 7/7 módulos e a terapia fágica; não representa um efeito garantido no patógeno real.';
      return progress < 1 ? 'Requisitos ativos; maturação didática do fagossomo antes da etapa de permeabilização.' : 'LL-37 pontua a parede neste modelo hipotético; os poros não representam uma previsão experimental.';
    }
    if (view === 'cytoplasm') {
      if (!eligible) return 'A terapia e as sete vias são necessárias neste cenário para mostrar elementos fágicos no citoplasma. A animação não representa virions livres reais.';
      return progress < 2 ? 'Elementos fágicos aguardam a etapa ilustrativa de permeabilização da parede.' : 'Genomas/elementos fágicos se movem no citoplasma como metáfora visual, não como virions livres.';
    }
    if (!eligible) return 'A etapa de fagolisossomo só começa neste cenário após 7/7 módulos e a terapia fágica conceitual.';
    return progress < 3 ? 'Após parede e citoplasma no modelo, o fagossomo amadurece para a etapa fagolisossomal.' : 'Degradação representada de forma esquemática no fagolisossomo.';
  }
  function renderPathwayControls() {
    const container = document.getElementById('pathway-controls');
    const activeSignal = getActiveSignalLength();
    container.innerHTML = pathwayLabels.map((label, index) => {
      const active = state.pathwayActive[index];
      const status = !active ? 'Inativo' : index < activeSignal ? 'Sinal transmitido' : 'Aguardando sinal anterior';
      return `<button class="pathway-control${active ? ' active' : ''}${active && index >= activeSignal ? ' primed' : ''}" type="button" data-pathway-index="${index}" aria-pressed="${active}" title="${pathwayDescriptions[index]}">
        <span class="pathway-control-name"><i>${String(index + 1).padStart(2, '0')}</i><b>${label}</b></span>
        <span class="pathway-control-status">${status}</span>
      </button>`;
    }).join('');
    document.getElementById('pathway-activation-count').textContent = `${getActivePathwayCount()}/7`;
  }
  function updateSimulationUi() {
    const patrol = state.patrol;
    const extracellular = patrol.initialized ? patrol.bacteria.length : initialBacteriaCount;
    const phagosomeCount = patrol.phagosomes.filter(item => item.location !== 'cytosol').length;
    const neutrophilPhagosomeCount = patrol.phagosomes.filter(item =>
      item.cellType === 'neutrophil' && item.location !== 'cytosol').length;
    const remaining = extracellular + patrol.phagosomes.length;
    const infectedAlveoli = patrol.initialized ? patrol.infectedAlveoli : 1;
    const cytosolicCount = getCytosolicBacilliCount();
    const liveMacrophages = getLiveMacrophageCount();
    const liveNeutrophils = getLiveNeutrophilCount();
    const macrophageDamage = Math.max(0, ...patrol.macrophages.filter(unit => unit.alive).map(unit => unit.damage || 0));
    const neutrophilDamage = Math.max(0, ...patrol.neutrophils.filter(unit => unit.alive !== false).map(unit => unit.damage || 0));
    const neutrophilCytosolicCount = getCytosolicBacilliCount('neutrophil');
    const activeCount = getActivePathwayCount();
    const signalLength = getActiveSignalLength();
    const allMacrophagesLysed = patrol.initialized && patrol.lysisCount > 0 && liveMacrophages === 0;
    const status = patrol.complete ? 'Cenário concluído' : patrol.running ? 'Patrulha em andamento' : patrol.initialized ? 'Patrulha pausada' : 'Pronto para patrulhar';
    document.getElementById('simulation-status').textContent = status;
    document.getElementById('simulation-status-dot').classList.toggle('running', patrol.running);
    document.getElementById('simulation-status-dot').classList.toggle('complete', patrol.complete);
    document.getElementById('simulation-count').textContent = `${patrol.cleared} removidos`;
    document.getElementById('clearance-progress').style.width =
      `${patrol.cleared / Math.max(1, patrol.cleared + remaining) * 100}%`;
    document.getElementById('coop-count').textContent = `${patrol.playerCount}/3 jogadores`;
    renderPlayerControls(document.getElementById('player-controls'), false);
    renderPlayerControls(document.getElementById('hud-player-controls'), true);
    renderCellCommandDeck();
    const cytokineActive = patrol.cytokines.filter(item => item.active).length;
    document.getElementById('cytokine-count').textContent = `${cytokineActive}/5`;
    document.getElementById('cytokine-controls').innerHTML = patrol.cytokines.map((item, index) =>
      `<button type="button" class="cytokine-control${item.active ? ' active' : ''}" data-cytokine-index="${index}" aria-pressed="${item.active}" title="${item.role}">${item.name}</button>`).join('');
    const activeDefenses = patrol.defenses.filter(item => item.active).length;
    document.getElementById('defense-count').textContent = `${activeDefenses}/${patrol.defenses.length}`;
    document.getElementById('arsenal-controls').innerHTML = patrol.defenses.map((item, index) =>
      `<button type="button" class="arsenal-control${item.active ? ' active' : ''}" data-defense-index="${index}" aria-pressed="${item.active}" title="${item.role}">
        <b>${item.short}</b><small>${item.role}</small>
      </button>`).join('');
    const helperCount = patrol.helperT.length;
    document.getElementById('helper-status').textContent = helperCount
      ? `T helper automático: ${helperCount} auxiliar(es) sinalizando linfócitos B`
      : 'T helper: recrutamento automático pela sinalização didática';
    document.getElementById('team-size').textContent = `${liveMacrophages}/${maxMacrophages}`;
    document.getElementById('multiply-button').disabled = !patrol.running || liveMacrophages === 0 || liveMacrophages >= maxMacrophages;
    document.getElementById('restart-infection-button').hidden = !allMacrophagesLysed;
    document.getElementById('neutrophil-count').textContent = `${liveNeutrophils}/${maxNeutrophils}`;
    document.getElementById('plasma-cell-count').textContent = `${patrol.plasmaCells.length}/${maxPlasmaCells}`;
    document.getElementById('recruit-neutrophils-button').disabled = !patrol.initialized || patrol.complete
      || liveNeutrophils >= maxNeutrophils;
    document.getElementById('recruit-plasma-button').disabled = !patrol.initialized || patrol.complete
      || patrol.plasmaCells.length >= maxPlasmaCells;
    const patrolAction = patrol.complete ? 'Reiniciar cenário' : patrol.running ? 'Pausar patrulha' : patrol.initialized ? 'Retomar patrulha' : 'Iniciar patrulha';
    document.getElementById('patrol-button').textContent = patrolAction;
    document.getElementById('patrol-launch-label').textContent = patrolAction === 'Iniciar patrulha' ? 'Iniciar patrulha alveolar' : patrolAction;
    document.getElementById('patrol-launch-icon').textContent = patrol.complete ? '↻' : patrol.running ? 'Ⅱ' : '▶';
    document.getElementById('patrol-bacteria-count').textContent = remaining;
    document.getElementById('patrol-bacteria-label').textContent = remaining === 1 ? 'bacilo no modelo' : 'bacilos no modelo';
    document.getElementById('extracellular-count').textContent = extracellular;
    document.getElementById('phagosome-count').textContent = phagosomeCount;
    document.getElementById('infected-alveoli-count').textContent = infectedAlveoli;
    document.getElementById('intracellular-count').textContent = cytosolicCount;
    document.getElementById('neutrophil-phagosome-count').textContent = neutrophilPhagosomeCount;
    document.getElementById('neutrophil-cytosol-count').textContent = neutrophilCytosolicCount;
    document.getElementById('neutrophil-damage').textContent = `${Math.round(neutrophilDamage * 100)}%`;
    document.getElementById('granuloma-count').textContent = patrol.granulomas.length;
    document.getElementById('net-count').textContent = patrol.nets.length;
    document.getElementById('complement-count').textContent = patrol.complement.length;
    document.getElementById('macrophage-damage').textContent = `${Math.round(macrophageDamage * 100)}%`;
    document.getElementById('lysis-count').textContent = patrol.lysisCount;
    document.getElementById('neutrophil-lysis-count').textContent = patrol.neutrophilLysisCount;
    document.getElementById('patrol-cell-count').textContent = liveMacrophages;
    document.getElementById('patrol-signal-count').textContent = `${signalLength}/7`;
    document.getElementById('world-alveoli-count').textContent = totalAlveoli.toLocaleString('pt-BR');
    const worldPosition = getWorldCameraPosition();
    document.getElementById('world-lung-side').textContent = worldPosition.x < 0 ? 'Pulmão esquerdo' : 'Pulmão direito';
    document.getElementById('patrol-hud').hidden = !patrol.active;
    document.getElementById('sterilization-banner').hidden = !(patrol.complete && patrol.active);
    const controlledRole = patrol.playerRoles ? patrol.playerRoles[patrol.activePlayer] : 'Macrófago';
    document.getElementById('joystick-hint').textContent = patrol.active ? `J${patrol.activePlayer + 1} · ${controlledRole.toUpperCase()}` : 'MOVER CÂMERA';
    document.querySelector('.viewer-stage').classList.toggle('patrol-active', patrol.active);
    const phageButton = document.getElementById('phage-therapy-button');
    phageButton.setAttribute('aria-pressed', String(patrol.phageTherapy));
    phageButton.classList.toggle('active', patrol.phageTherapy);
    phageButton.textContent = patrol.phageTherapy ? 'Desativar' : 'Ativar';
    document.getElementById('phage-therapy-status').textContent = patrol.phageTherapy
      ? `${conceptualPhageCount.toLocaleString('pt-BR')} fagos simbólicos · ativa${canClearIntracellular() ? '' : ` · vias ${signalLength}/7`}`
      : `${conceptualPhageCount.toLocaleString('pt-BR')} fagos simbólicos · inativa`;
    document.querySelectorAll('[data-infection-view]').forEach((button) => {
      const active = button.dataset.infectionView === patrol.infectionView;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const stage = infectionViews.find(item => item.id === patrol.infectionView);
    const showMacrophagePhase = phagosomeCount && patrol.infectionView !== 'neutrophil-cytosol';
    document.getElementById('infection-stage-note').textContent = `${stage ? stage.title : 'Infecção'} · ${getInfectionStageNote()}${showMacrophagePhase ? ` Etapa: ${getInfectionPhase(getFocusProgress())}.` : ''}`;

    let feedback = `Cenário inicial: ${remaining} bacilos esquemáticos. A atividade imune é simplificada para fins de ensino.`;
    if (patrol.complete) feedback = 'Nenhum bacilo restante neste cenário. Isso não comprova esterilização de um pulmão real.';
    else if (patrol.running && neutrophilDamage > 0) feedback = `${activeCount}/7 módulos ligados; dano esquemático do neutrófilo ${Math.round(neutrophilDamage * 100)}%. Bacilos que escapam podem persistir no citosol e, em alguns percursos, acompanhar ruptura celular no modelo.`;
    else if (patrol.running && macrophageDamage > 0) feedback = `${activeCount}/7 módulos ligados; dano celular esquemático ${Math.round(macrophageDamage * 100)}%. Bacilos no citosol podem ser liberados se a célula sofrer ruptura no modelo.`;
    else if (patrol.running) feedback = `${activeCount}/7 módulos ligados; ${infectedAlveoli} alvéolo(s) com bacilos. Novos focos aparecem mais rápido conforme a infecção se espalha; o crescimento do cenário tem limite de ${maxBacteriaCount}.`;
    else if (patrol.initialized) feedback = `Cenário pausado com ${remaining} bacilos: ${phagosomeCount} em fagossomos e ${cytosolicCount} no citosol. Os módulos ativados permanecem selecionados.`;
    document.getElementById('simulation-feedback').textContent = feedback;

    const badge = document.querySelector('.scene-badge');
    badge.innerHTML = patrol.active && patrol.complete
      ? '<span></span> MODELO SEM BACILOS'
      : patrol.active && patrol.infectionView !== 'alveolus'
        ? `<span></span> ${stage ? stage.title.toUpperCase() : 'INFECÇÃO'} · VISUALIZAÇÃO CONCEITUAL`
      : patrol.active
        ? `<span></span> ${patrol.running ? 'PATRULHA EM CURSO' : 'PATRULHA PAUSADA'}`
        : '<span></span> VISUALIZAÇÃO CONCEITUAL';
  }
  function resetPatrol() {
    const roles = Array.isArray(state.patrol.playerRoles)
      ? state.patrol.playerRoles.slice(0, 3) : ['Macrófago', 'Neutrófilo', 'Lin. B'];
    while (roles.length < 3) roles.push(['Macrófago', 'Neutrófilo', 'Lin. B'][roles.length]);
    state.patrol.initialized = true;
    state.patrol.complete = false;
    state.patrol.worldSeed = (Math.random() * 0xFFFFFFFF) >>> 0;
    getAlveolarWorld();
    state.patrol.readyPlayers = [false, false, false];
    state.patrol.nextAntibodyIsotype = 'IgG';
    state.patrol.cleared = 0;
    state.patrol.phagosomes = [];
    state.patrol.defenseUnits = [];
    state.patrol.helperT = [];
    state.patrol.bCells = [];
    state.patrol.neutrophils = [];
    state.patrol.nextNeutrophilId = 1;
    state.patrol.plasmaCells = [];
    state.patrol.nextPlasmaId = 1;
    state.patrol.antibodies = [];
    state.patrol.complement = [];
    state.patrol.nets = [];
    state.patrol.nextNetId = 1;
    state.patrol.deaths = [];
    state.patrol.spreadSites = [];
    state.patrol.granulomas = [];
    state.patrol.spreadTimer = 0;
    state.patrol.infectedAlveoli = 1;
    state.patrol.fociRefreshTimer = 0;
    state.patrol.lysisCount = 0;
    state.patrol.neutrophilLysisCount = 0;
    state.patrol.activePlayer = state.patrol.playerCount > 0 ? state.patrol.activePlayer : 0;
    state.patrol.playerRoles = roles;
    state.patrol.infectionView = 'alveolus';
    const home = getAlveolarWorld().nodes[alveoliPerLung - 1 - Math.floor(alveolarRows / 2) * alveolarColumns];
    state.patrol.bacteria = Array.from({ length: initialBacteriaCount }, (_, index) => {
      const angle = index * 2.399963229728653;
      const radius = .08 + (index % 5) * .035;
      return { x: home.x + Math.cos(angle) * radius, y: home.y + Math.sin(angle) * radius, progress: 0 };
    });
    state.patrol.macrophages = [{ x: home.x, y: home.y, phase: 0, damage: 0, alive: true, founder: true }];
    for (let slot = 1; slot < state.patrol.playerCount; slot++) {
      const role = state.patrol.playerRoles[slot];
      const position = getImmuneCellSpawnPoint(slot, .12);
      if (role === 'Neutrófilo') spawnNeutrophil();
      else if (role === 'Plasmócito') state.patrol.plasmaCells.push({
        ...position, id: state.patrol.nextPlasmaId++, phase: 0
      });
      else if (role === 'Lin. B') state.patrol.bCells.push({ ...position, phase: 0 });
    }
  }
  function startOrPausePatrol() {
    if (state.patrol.running) {
      state.patrol.running = false;
      updateSimulationUi();
      showToast('Patrulha pausada; o cenário e as vias selecionadas foram mantidos.');
      return;
    }
    if (!state.patrol.initialized || state.patrol.complete) resetPatrol();
    const actor = getPlayerEntity(state.patrol.activePlayer);
    if (actor) actor.playerSlot = state.patrol.activePlayer;
    else {
      startPlayerForSlot(state.patrol.activePlayer);
      return;
    }
    state.patrol.active = true;
    state.patrol.running = true;
    state.patrol.readyPlayers[state.patrol.activePlayer] = true;
    state.level = 3;
    state.topic = 'scene';
    state.camera = { x: 0, y: 0 };
    renderInfo();
    showToast('Mapa pulmonar aberto iniciado. Use WASD ou joystick para conduzir a célula escolhida.');
  }
  function restartAfterMacrophageLysis() {
    const liveMacrophages = state.patrol.macrophages.filter(item => item.alive).length;
    if (!state.patrol.lysisCount || liveMacrophages) return;
    resetPatrol();
    state.patrol.active = true;
    state.patrol.running = true;
    state.level = 3;
    state.topic = 'scene';
    state.camera = { x: 0, y: 0 };
    renderInfo();
    showToast('Infecção reiniciada com um novo macrófago alveolar; as vias selecionadas foram mantidas.');
  }
  function expandMacrophageTeam(player) {
    const team = state.patrol.macrophages;
    const liveCount = getLiveMacrophageCount();
    if (!state.patrol.running || liveCount >= maxMacrophages) return;
    const leader = team.find(unit => unit.alive);
    const parent = getPlayerEntity(Number.isInteger(player) ? player : state.patrol.activePlayer) || leader;
    const angle = liveCount * 2.399963229728653;
    const distance = .16 + Math.floor(Math.max(0, liveCount - 1) / 6) * .08;
    const position = parent
      ? { x: parent.x + Math.cos(angle) * distance, y: parent.y + Math.sin(angle) * distance }
      : { x: 0, y: 0 };
    if (!isInsideAlveolarWorld(position.x, position.y)) return;
    const newMacrophage = parent
      ? {
          x: position.x,
          y: position.y,
          phase: angle, damage: 0, alive: true, founder: false, birthProgress: 0, mitosisEffect: 1
        }
      : { x: 0, y: 0, phase: angle, damage: 0, alive: true, founder: true, birthProgress: 0, mitosisEffect: 1 };
    if (parent) parent.mitosisProgress = 0;
    const deadSlot = team.findIndex(unit => !unit.alive);
    if (deadSlot >= 0) team[deadSlot] = newMacrophage;
    else team.push(newMacrophage);
    updateSimulationUi();
    drawScene();
    showToast('Mitose esquemática: uma célula-filha está se separando. A divisão de macrófagos depende do contexto biológico.');
  }
  function togglePathwayModule(index) {
    state.pathwayActive[index] = !state.pathwayActive[index];
    renderPathwayControls();
    updateSimulationUi();
    if (state.patrol.active) {
      drawScene();
      drawMinimap();
    }
    showToast(`${pathwayLabels[index]} ${state.pathwayActive[index] ? 'ativado no modelo' : 'desativado no modelo'}.`);
  }
  function toggleMacrophageDefense(index) {
    const module = state.patrol.defenses[index];
    if (!module) return;
    module.active = !module.active;
    updateSimulationUi();
    drawScene();
    showToast(`${module.name} ${module.active ? 'destacada' : 'desativada'} no modelo conceitual.`);
  }
  function toggleCytokine(index) {
    const cytokine = state.patrol.cytokines[index];
    if (!cytokine) return;
    cytokine.active = !cytokine.active;
    if (cytokine.active) {
      if (cytokine.name === 'IL-12' && state.patrol.bCells.length === 0) {
        state.patrol.bCells.push({ x: -.16, y: .16, phase: 0 });
      }
      if (cytokine.name === 'CXCL8' && getLiveNeutrophilCount() === 0) {
        spawnNeutrophil();
      }
      if (state.patrol.helperT.length === 0) state.patrol.helperT.push({ x: -.18, y: -.12, phase: 0 });
    }
    updateSimulationUi();
    drawScene();
    showToast(`${cytokine.name} ${cytokine.active ? 'ativada' : 'desativada'} no modelo didático.`);
  }
  function togglePhageTherapy() {
    state.patrol.phageTherapy = !state.patrol.phageTherapy;
    updateSimulationUi();
    drawScene();
    showToast(state.patrol.phageTherapy
      ? 'Terapia fágica simbólica ativada no cenário; não representa eficácia terapêutica real.'
      : 'Terapia fágica simbólica desativada.');
  }
  function selectInfectionView(view) {
    if (!infectionViews.some(item => item.id === view)) return;
    state.patrol.active = true;
    state.patrol.infectionView = view;
    state.level = 3;
    state.topic = 'scene';
    state.camera = { x: 0, y: 0 };
    renderInfo();
  }
  function updatePatrol(deltaTime, directionX, directionY) {
    const patrol = state.patrol;
    if (!patrol.running) return false;
    let changed = false;
    let fociChanged = false;
    const movePlayer = (player, x, y) => {
      const magnitude = Math.hypot(x, y);
      if (!magnitude || !patrol.readyPlayers[player]) return false;
      const xStep = x / magnitude * deltaTime * .36;
      const yStep = y / magnitude * deltaTime * .36;
      const constrain = (unit) => {
        const nextX = unit.x + xStep;
        const nextY = unit.y + yStep;
        if (isInsideAlveolarWorld(nextX, nextY)) {
          unit.x = nextX;
          unit.y = nextY;
        }
      };
      const actor = getPlayerEntity(player);
      if (!actor) return false;
      constrain(actor);
      return true;
    };
    if (window.onlinePlay && window.onlinePlay.isHost()) {
      changed = movePlayer(0, directionX, directionY);
      window.onlinePlay.getRemoteInputs().forEach(input => {
        changed = movePlayer(input.slot, input.x, input.y) || changed;
      });
    } else {
      changed = movePlayer(patrol.activePlayer, directionX, directionY);
    }
    if (getLiveMacrophageCount() || getLiveNeutrophilCount() || patrol.helperT.length
      || patrol.bCells.length || patrol.plasmaCells.length) {
      patrol.macrophages.filter(unit => unit.alive).forEach(unit => {
        unit.phase += deltaTime * .35;
        if (typeof unit.mitosisProgress === 'number') {
          unit.mitosisProgress = Math.min(1, unit.mitosisProgress + deltaTime * .42);
          if (unit.mitosisProgress >= 1) delete unit.mitosisProgress;
          changed = true;
        }
        if (typeof unit.birthProgress === 'number') {
          unit.birthProgress = Math.min(1, unit.birthProgress + deltaTime * .42);
          if (unit.birthProgress >= 1) delete unit.birthProgress;
          changed = true;
        }
        if (typeof unit.mitosisEffect === 'number') {
          unit.mitosisEffect = Math.max(0, unit.mitosisEffect - deltaTime * .14);
          if (unit.mitosisEffect === 0) delete unit.mitosisEffect;
          changed = true;
        }
      });
      patrol.neutrophils.filter(unit => unit.alive !== false).forEach(unit => {
        unit.phase += deltaTime * 1.1;
        if (typeof unit.mitosisProgress === 'number') {
          unit.mitosisProgress = Math.min(1, unit.mitosisProgress + deltaTime * .42);
          if (unit.mitosisProgress >= 1) delete unit.mitosisProgress;
          changed = true;
        }
        if (typeof unit.birthProgress === 'number') {
          unit.birthProgress = Math.min(1, unit.birthProgress + deltaTime * .42);
          if (unit.birthProgress >= 1) delete unit.birthProgress;
          changed = true;
        }
      });
      patrol.helperT.forEach(unit => { unit.phase += deltaTime * .8; });
      [...patrol.bCells, ...patrol.plasmaCells].forEach(unit => {
        unit.phase = (unit.phase || 0) + deltaTime * .7;
        if (typeof unit.mitosisProgress === 'number') {
          unit.mitosisProgress = Math.min(1, unit.mitosisProgress + deltaTime * .42);
          if (unit.mitosisProgress >= 1) delete unit.mitosisProgress;
          changed = true;
        }
        if (typeof unit.birthProgress === 'number') {
          unit.birthProgress = Math.min(1, unit.birthProgress + deltaTime * .42);
          if (unit.birthProgress >= 1) delete unit.birthProgress;
          changed = true;
        }
      });
      changed = true;
    }

    patrol.nets.forEach(net => {
      net.life += deltaTime;
      net.phase += deltaTime * .2;
      changed = true;
    });
    const activeNetIds = new Set(patrol.nets.filter(net => net.life < net.duration).map(net => net.id));
    if (activeNetIds.size !== patrol.nets.length) {
      patrol.nets = patrol.nets.filter(net => net.life < net.duration);
      patrol.bacteria.forEach(bacillus => {
        if (bacillus.netId && !activeNetIds.has(bacillus.netId)) delete bacillus.netId;
      });
      changed = true;
      updateSimulationUi();
    }
    let netDeployed = false;
    patrol.neutrophils.filter(unit => unit.alive !== false).forEach(unit => {
      unit.netCooldown = Math.max(0, (unit.netCooldown || 0) - deltaTime);
      if (unit.netCooldown > 0) return;
      if (!deployNETForNeutrophil(unit)) {
        unit.netCooldown = 2;
        return;
      }
      netDeployed = true;
      changed = true;
    });
    if (netDeployed) {
      updateSimulationUi();
      showToast('NET esquemática formada: aprisiona bacilos próximos e reduz sua dispersão; não implica morte bacteriana.');
    }

    patrol.fociRefreshTimer += deltaTime;
    if (patrol.fociRefreshTimer >= 1) {
      patrol.fociRefreshTimer = 0;
      const currentFoci = getInfectedAlveolusCount();
      fociChanged = currentFoci !== patrol.infectedAlveoli;
      patrol.infectedAlveoli = currentFoci;
    }
    patrol.spreadTimer += deltaTime;
    const untrappedBacteria = patrol.bacteria.filter(bacillus => !bacillus.netId);
    const infectedAlveoli = patrol.infectedAlveoli || 1;
    const spreadInterval = Math.max(5, 11 - Math.max(0, infectedAlveoli - 1) * .55);
    if (patrol.spreadTimer > spreadInterval && untrappedBacteria.length > 2
      && patrol.bacteria.length < maxBacteriaCount) {
      patrol.spreadTimer = 0;
      const source = untrappedBacteria[Math.floor(Math.random() * untrappedBacteria.length)];
      const currentAlveolus = nearestAlveolus(source.x, source.y);
      const available = currentAlveolus.neighbors
        .map(id => getAlveolarWorld().nodes[id])
        .filter(node => patrol.bacteria.every(bacillus => Math.hypot(bacillus.x - node.x, bacillus.y - node.y) > .12));
      const target = available.length ? available[Math.floor(Math.random() * available.length)] : currentAlveolus;
      const newX = target.x + (Math.random() - .5) * .06;
      const newY = target.y + (Math.random() - .5) * .06;
      patrol.spreadSites.push({ x: newX, y: newY, age: 0 });
      patrol.bacteria.push({ x: newX, y: newY, progress: 0, spread: true });
      patrol.infectedAlveoli = getInfectedAlveolusCount();
      changed = true;
      updateSimulationUi();
      showToast(`Novo foco didático surgiu em um alvéolo vizinho conectado (${infectedAlveoli + 1} focos).`);
    }

    const cytokineCount = patrol.cytokines.filter(item => item.active).length;
    if (cytokineCount >= 1 && patrol.helperT.length === 0) {
      patrol.helperT.push({ x: -.18, y: -.12, phase: 0 });
      changed = true;
      updateSimulationUi();
    }
    if (cytokineCount >= 1 && patrol.bCells.length === 0 && patrol.playerCount >= 3) {
      patrol.bCells.push({ x: -.16, y: .16, phase: 0 });
      changed = true;
    }
    if (patrol.cytokines.find(item => item.name === 'CXCL8' && item.active)) {
      if (getLiveNeutrophilCount() === 0 && spawnNeutrophil()) {
        changed = true;
        updateSimulationUi();
      }
    }
    if (patrol.cytokines.find(item => item.name === 'IL-12' && item.active)) {
      if (patrol.bCells.length === 0) patrol.bCells.push({ x: -.16, y: .16, phase: 0 });
    }

    const captured = [];
    patrol.bacteria.forEach((bacillus, index) => {
      let cellIndex = patrol.macrophages.findIndex((macrophage) =>
        macrophage.alive         && Math.hypot(macrophage.x - bacillus.x, macrophage.y - bacillus.y) < .15);
      if (cellIndex >= 0) {
        captured.push({ index, cellType: 'macrophage', cellIndex, bacillus });
        return;
      }
      const neutrophil = patrol.neutrophils.find(unit => unit.alive !== false
        && Math.hypot(unit.x - bacillus.x, unit.y - bacillus.y) < .15);
      if (neutrophil) {
        captured.push({ index, cellType: 'neutrophil', cellId: neutrophil.id, bacillus });
      }
    });
    for (let index = captured.length - 1; index >= 0; index--) {
      const item = captured[index];
      patrol.bacteria.splice(item.index, 1);
      patrol.phagosomes.push({
        x: item.bacillus.x, y: item.bacillus.y, cellType: item.cellType, cellIndex: item.cellIndex, cellId: item.cellId,
        progress: 0, phase: Math.random() * Math.PI * 2, escapeProgress: 0, replicationTimer: 0,
        escapeChance: item.cellType === 'neutrophil' ? .42 + Math.random() * .18 : 1,
        location: 'phagosome'
      });
      changed = true;
    }
    if (captured.length) {
      updateSimulationUi();
      const neutrophilCaptures = captured.filter(item => item.cellType === 'neutrophil').length;
      const macrophageCaptures = captured.length - neutrophilCaptures;
      const destinations = [];
      if (macrophageCaptures) destinations.push(`${macrophageCaptures} por macrófago(s)`);
      if (neutrophilCaptures) destinations.push(`${neutrophilCaptures} por neutrófilo(s)`);
      showToast(`${captured.length} bacilo(s) internalizado(s) em fagossomos: ${destinations.join(' e ')}.`);
    }

    patrol.bCells.forEach((bCell) => {
      const nearHelper = patrol.helperT.some(helper => Math.hypot(helper.x - bCell.x, helper.y - bCell.y) < .075);
      if (nearHelper && patrol.plasmaCells.length < maxPlasmaCells) {
        const index = patrol.bCells.indexOf(bCell);
        if (index >= 0) {
          patrol.bCells.splice(index, 1);
          patrol.plasmaCells.push({ x: bCell.x, y: bCell.y, phase: 0 });
          for (let i = 0; i < 5; i++) patrol.antibodies.push({
            x: bCell.x + (i - 2) * .018,
            y: bCell.y + Math.sin(i) * .018,
            phase: i * .7
          });
          changed = true;
          showToast('T helper auxiliou este linfócito B; o linfócito se transformou em plasmócito esquemático.');
        }
      }
    });

    if (patrol.plasmaCells.length) {
      if (patrol.antibodies.length < 20) {
        patrol.plasmaCells.forEach(plasma => {
          if (patrol.antibodies.length >= 20) return;
          patrol.antibodies.push({
            x: plasma.x + (Math.random() - .5) * .06,
            y: plasma.y + (Math.random() - .5) * .06,
              phase: Math.random() * Math.PI * 2, isotype: patrol.nextAntibodyIsotype
          });
            patrol.nextAntibodyIsotype = patrol.nextAntibodyIsotype === 'IgG' ? 'IgA' : 'IgG';
        });
      }
      patrol.antibodies.forEach((antibody) => {
        antibody.phase += deltaTime;
        if (Number.isFinite(antibody.targetX) && Number.isFinite(antibody.targetY)) {
          const dx = antibody.targetX - antibody.x;
          const dy = antibody.targetY - antibody.y;
          const distance = Math.hypot(dx, dy);
          if (distance > .012) {
            const step = Math.min(distance, deltaTime * .12);
            antibody.x += dx / distance * step;
            antibody.y += dy / distance * step;
          } else {
            delete antibody.targetX;
            delete antibody.targetY;
          }
        } else {
          antibody.x += Math.sin(antibody.phase) * deltaTime * .004;
          antibody.y += Math.cos(antibody.phase * .7) * deltaTime * .004;
        }
      });
      if (patrol.antibodies.some(antibody =>
        patrol.bacteria.some(bacillus => Math.hypot(antibody.x - bacillus.x, antibody.y - bacillus.y) < .12))) {
        if (patrol.complement.length < 18) {
          const antibody = patrol.antibodies.find(item =>
            patrol.bacteria.some(bacillus => Math.hypot(item.x - bacillus.x, item.y - bacillus.y) < .12));
          patrol.complement.push({ x: antibody.x, y: antibody.y, phase: Math.random() * Math.PI * 2 });
        }
      }
    }

    patrol.complement.forEach(unit => { unit.phase += deltaTime * 1.5; });

    const oxidativeActive = patrol.defenses.some(module =>
      (module.id === 'ros' || module.id === 'rns') && module.active);
    const extracellularRemoved = [];
    patrol.bacteria.forEach((bacillus, index) => {
      const byMacComplex = patrol.complement.some(unit =>
        Math.hypot(unit.x - bacillus.x, unit.y - bacillus.y) < .052);
      const byMacrophageOxidativeBurst = oxidativeActive && patrol.macrophages.some(unit =>
        unit.alive && Math.hypot(unit.x - bacillus.x, unit.y - bacillus.y) < .05);
      if (byMacComplex || byMacrophageOxidativeBurst) extracellularRemoved.push({
        index,
        bacillus,
        type: byMacComplex ? 'osmotic' : 'oxidative'
      });
    });
    for (let i = extracellularRemoved.length - 1; i >= 0; i--) {
      const item = extracellularRemoved[i];
      patrol.bacteria.splice(item.index, 1);
      patrol.cleared++;
      patrol.deaths.push({
        x: item.bacillus.x,
        y: item.bacillus.y,
        type: item.type,
        life: 0
      });
      changed = true;
    }
    if (extracellularRemoved.length) {
      updateSimulationUi();
      showToast(extracellularRemoved.some(item => item.type === 'osmotic')
        ? 'O complexo lítico esquemático produziu lise osmótica.'
        : 'O estresse oxidativo esquemático produziu lise bacteriana extracelular.');
    }

    patrol.deaths.forEach(death => { death.life += deltaTime * .7; });
    patrol.deaths = patrol.deaths.filter(death => death.life < 1);

    let phaseChanged = false;
    const protectionModules = patrol.defenses.filter(module =>
      module.active && ['ifng', 'acidification', 'lap', 'xenophagy', 'ros', 'rns'].includes(module.id)).length;
    const protection = Math.min(1, protectionModules / 5 * .7 + getActiveSignalLength() / pathwayLabels.length * .3);
    const replicationEvents = [];
    patrol.phagosomes.forEach((phagosome) => {
      phagosome.phase += deltaTime * (phagosome.location === 'cytosol' ? 1.7 : .9);
      if (canClearIntracellular(phagosome)) {
        const priorPhase = getInfectionPhase(phagosome.progress);
        const defenseBoost = patrol.defenses.reduce((total, module) =>
          total + (module.active && ['acidification', 'lap', 'xenophagy', 'ifng'].includes(module.id) ? .035 : 0), 0);
        phagosome.progress = Math.min(4, phagosome.progress + deltaTime * (.22 + defenseBoost));
        if (getInfectionPhase(phagosome.progress) !== priorPhase) {
          changed = true;
          phaseChanged = true;
        }
      } else if (phagosome.cellType === 'neutrophil' && phagosome.location === 'phagosome') {
        phagosome.escapeProgress = Math.min(1, phagosome.escapeProgress + deltaTime * .12);
        if (phagosome.escapeProgress >= 1) {
          if (Math.random() < phagosome.escapeChance) {
            phagosome.location = 'cytosol';
            changed = true;
            phaseChanged = true;
            showToast('Um bacilo escapou do fagossomo do neutrófilo no cenário didático.');
          } else {
            phagosome.progress = 4;
            changed = true;
            phaseChanged = true;
          }
        }
      } else if (phagosome.location === 'phagosome') {
        phagosome.escapeProgress = Math.min(1, phagosome.escapeProgress + deltaTime * (.055 * (1 - protection * .68)));
        if (phagosome.escapeProgress >= 1) {
          phagosome.location = 'cytosol';
          changed = true;
          phaseChanged = true;
          showToast('Um bacilo escapou do fagossomo no modelo; o tráfego citosólico é esquemático.');
        }
      } else {
        const sameCell = patrol.phagosomes.filter(item => phagosome.cellType === 'neutrophil'
          ? item.cellType === 'neutrophil' && item.cellId === phagosome.cellId
          : item.cellType !== 'neutrophil' && item.cellIndex === phagosome.cellIndex);
        phagosome.replicationTimer += deltaTime;
        if (sameCell.length < 4 && phagosome.replicationTimer >= 6) {
          phagosome.replicationTimer = 0;
          replicationEvents.push({
            x: phagosome.x, y: phagosome.y, cellType: phagosome.cellType || 'macrophage',
            cellIndex: phagosome.cellIndex, cellId: phagosome.cellId, progress: 0,
            phase: Math.random() * Math.PI * 2, escapeProgress: 1, replicationTimer: 0,
            escapeChance: phagosome.escapeChance, location: 'cytosol'
          });
        }
      }
      changed = true;
    });
    if (replicationEvents.length) {
      patrol.phagosomes.push(...replicationEvents);
      phaseChanged = true;
    }

    const lysedCells = [];
    patrol.macrophages.forEach((macrophage, index) => {
      if (!macrophage.alive) return;
      const cytosolicLoad = patrol.phagosomes.filter(item => item.cellIndex === index && item.location === 'cytosol').length;
      if (!cytosolicLoad || canClearIntracellular()) return;
      const priorDamage = macrophage.damage || 0;
      macrophage.damage = Math.min(1, (macrophage.damage || 0)
        + deltaTime * (.055 + Math.max(0, cytosolicLoad - 1) * .022) * (1 - protection * .48));
      changed = true;
      if (Math.floor(priorDamage * 100) !== Math.floor(macrophage.damage * 100)) phaseChanged = true;
      if (macrophage.damage >= 1) lysedCells.push({ macrophage, index });
    });
    lysedCells.forEach(({ macrophage, index }) => {
      const released = patrol.phagosomes.filter(item => item.cellIndex === index);
      patrol.phagosomes = patrol.phagosomes.filter(item => item.cellIndex !== index);
      released.forEach((item, releasedIndex) => {
        const angle = releasedIndex * 2.4 + macrophage.phase;
        patrol.bacteria.push({
          x: Math.max(-.29, Math.min(.29, macrophage.x + Math.cos(angle) * .035)),
          y: Math.max(-.29, Math.min(.29, macrophage.y + Math.sin(angle) * .035)),
          progress: 0, released: true
        });
      });
      macrophage.alive = false;
      patrol.lysisCount++;
      patrol.deaths.push({ x: macrophage.x, y: macrophage.y, type: 'macrophage-lysis', life: 0 });
      changed = true;
      phaseChanged = true;
      showToast(`${released.length} bacilo(s) foram liberados após ruptura celular no cenário didático.`);
    });

    const lysedNeutrophils = [];
    patrol.neutrophils.forEach((neutrophil) => {
      if (neutrophil.alive === false) return;
      const cytosolicLoad = patrol.phagosomes.filter(item =>
        item.cellType === 'neutrophil' && item.cellId === neutrophil.id && item.location === 'cytosol').length;
      if (!cytosolicLoad) return;
      const priorDamage = neutrophil.damage || 0;
      neutrophil.damage = Math.min(1, priorDamage
        + deltaTime * (.055 + Math.max(0, cytosolicLoad - 1) * .022));
      changed = true;
      if (Math.floor(priorDamage * 100) !== Math.floor(neutrophil.damage * 100)) phaseChanged = true;
      if (neutrophil.damage >= neutrophil.ruptureThreshold) lysedNeutrophils.push(neutrophil);
    });
    lysedNeutrophils.forEach(neutrophil => {
      const released = patrol.phagosomes.filter(item =>
        item.cellType === 'neutrophil' && item.cellId === neutrophil.id);
      patrol.phagosomes = patrol.phagosomes.filter(item =>
        item.cellType !== 'neutrophil' || item.cellId !== neutrophil.id);
      released.forEach((item, releasedIndex) => {
        const angle = releasedIndex * 2.4 + neutrophil.phase;
        patrol.bacteria.push({
          x: Math.max(-.29, Math.min(.29, neutrophil.x + Math.cos(angle) * .035)),
          y: Math.max(-.29, Math.min(.29, neutrophil.y + Math.sin(angle) * .035)),
          progress: 0, released: true
        });
      });
      neutrophil.alive = false;
      patrol.neutrophilLysisCount++;
      patrol.neutrophils = patrol.neutrophils.filter(unit => unit.id !== neutrophil.id);
      patrol.deaths.push({ x: neutrophil.x, y: neutrophil.y, type: 'neutrophil-lysis', life: 0 });
      changed = true;
      phaseChanged = true;
      showToast(`${released.length} bacilo(s) foram liberados após dano e ruptura do neutrófilo no cenário didático.`);
    });

    const inflammatorySignal = patrol.cytokines.some(item =>
      item.active && ['TNF', 'IL-1β', 'IL-12'].includes(item.name));
    if (inflammatorySignal && (patrol.bacteria.length || patrol.phagosomes.length) && !patrol.granulomas.length) {
      const infectedCell = patrol.macrophages.find((macrophage, index) =>
        macrophage.alive && patrol.phagosomes.some(item => item.cellIndex === index));
      const infectedNeutrophil = patrol.neutrophils.find(neutrophil =>
        patrol.phagosomes.some(item => item.cellType === 'neutrophil' && item.cellId === neutrophil.id));
      const seed = infectedCell || infectedNeutrophil || patrol.bacteria[0] || { x: 0, y: 0 };
      patrol.granulomas.push({ x: seed.x, y: seed.y, maturity: 0, phase: 0 });
      showToast('Sinais inflamatórios iniciaram um agregado celular esquemático ao redor do foco.');
      phaseChanged = true;
    }
    patrol.granulomas.forEach(granuloma => {
      const signalCount = patrol.cytokines.filter(item => item.active).length;
      const priorStage = granuloma.maturity < .3 ? 0 : granuloma.maturity < .72 ? 1 : 2;
      granuloma.maturity = Math.min(1, granuloma.maturity + deltaTime * (.012 + Math.min(signalCount, 3) * .006));
      granuloma.phase += deltaTime * .4;
      const nextStage = granuloma.maturity < .3 ? 0 : granuloma.maturity < .72 ? 1 : 2;
      if (priorStage !== nextStage) phaseChanged = true;
      changed = true;
    });
    if (phaseChanged || fociChanged) updateSimulationUi();
    const removed = patrol.phagosomes.filter(item => item.progress >= 4).length;
    if (removed) {
      patrol.phagosomes.filter(item => item.progress >= 4).forEach(item => {
        patrol.deaths.push({ x: item.x, y: item.y, type: 'phagolysosome', life: 0 });
      });
      patrol.phagosomes = patrol.phagosomes.filter(item => item.progress < 4);
      patrol.cleared += removed;
      changed = true;
      updateSimulationUi();
      showToast(`${removed} bacilo(s) degradado(s) após as etapas intracelulares do modelo.`);
    }
    if (!patrol.bacteria.length && !patrol.phagosomes.length && patrol.initialized) {
      patrol.running = false;
      patrol.complete = true;
      updateSimulationUi();
      showToast('Cenário concluído: não restam bacilos no modelo, sem implicar esterilização real.');
    }
    return changed;
  }

  function renderInfo() {
    const level = levels[state.level];
    const concept = concepts[state.topic];
    document.getElementById('top-level-name').textContent = level.name;
    document.getElementById('crumb-level').textContent = level.name;
    const infectionStage = infectionViews.find(item => item.id === state.patrol.infectionView);
    document.getElementById('scene-title').textContent = state.patrol.active
      ? infectionStage ? infectionStage.title : 'Patrulha alveolar'
      : state.topic === 'scene' ? level.title : concept.title;
    document.getElementById('scene-subtitle').textContent = state.patrol.active
      ? infectionStage ? infectionStage.description : 'Conduza o macrófago pelo espaço aéreo e acompanhe a depuração no modelo.'
      : state.topic === 'scene' ? level.subtitle : concept.description.split('.')[0] + '.';
    document.getElementById('scale-exponent').textContent = level.scale;
    document.getElementById('map-level').textContent = state.level === 0 ? 'Pulmão inteiro' : level.name;
    document.getElementById('hierarchy-count').textContent = `${String(state.level + 1).padStart(2, '0')} / ${levels.length}`;
    document.getElementById('zoom-meter-fill').style.height = `${Math.max(8, (state.level + 1) / levels.length * 100)}%`;
    document.getElementById('info-icon').textContent = state.topic === 'scene' ? '◉' : concept.icon;
    document.getElementById('info-category').textContent = state.topic === 'scene' ? level.category : 'ENCICLOPÉDIA · MÓDULO TEMÁTICO';
    document.getElementById('info-title').textContent = state.topic === 'scene' ? level.name : concept.title;
    document.getElementById('info-description').textContent = state.topic === 'scene' ? levelNotes[state.level] : concept.description;

    const focusTitle = state.topic === 'scene' ? (state.level === 0 ? 'Uma jornada entre escalas' : `Estruturas em ${level.name}`) : concept.focusTitle;
    const focusText = state.topic === 'scene' ? (state.level === 0 ? concepts.scene.focusText : levelNotes[state.level]) : concept.focusText;
    const tags = state.topic === 'scene' ? featureTags[state.level] : concept.tags;
    document.getElementById('focus-card').innerHTML = `<strong>${focusTitle}</strong><span>${focusText}</span><div class="focus-tags">${tags.map(tag => `<span>${tag}</span>`).join('')}</div>`;
    document.getElementById('pathway-steps').innerHTML = pathwayLabels.map((label, index) => `<span class="pathway-step">${label}</span>${index < pathwayLabels.length - 1 ? '<span class="pathway-arrow">›</span>' : ''}`).join('');
    renderPathwayControls();
    updateSimulationUi();
    levelTrack.querySelectorAll('.hierarchy-node').forEach((node, index) => {
      node.classList.toggle('active', index === state.level);
      node.classList.toggle('visited', index < state.level);
      if (index === state.level) node.setAttribute('aria-current', 'step');
      else node.removeAttribute('aria-current');
    });
    const activeRailTopic = state.topic === 'scene' ? 'scene' : state.topic;
    document.querySelectorAll('.rail-link').forEach(link => link.classList.toggle('active', link.dataset.topic === activeRailTopic));
    drawScene();
    drawMinimap();
  }

  function setLevel(value) {
    const remoteGuest = window.onlinePlay && window.onlinePlay.isConnected() && !window.onlinePlay.isHost();
    if (state.patrol.active && !remoteGuest) {
      state.patrol.active = false;
      state.patrol.running = false;
    }
    state.level = Math.max(0, Math.min(levels.length - 1, Math.round(value)));
    renderInfo();
  }
  function setTopic(topic) {
    if (!concepts[topic]) return;
    if (state.patrol.active) {
      state.patrol.active = false;
      state.patrol.running = false;
    }
    state.topic = topic;
    if (topic === 'scene') state.camera = { x: 0, y: 0 };
    renderInfo();
  }
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }
  function createHierarchy() {
    levels.forEach((level, index) => {
      const node = document.createElement('button');
      node.type = 'button';
      node.className = 'hierarchy-node';
      node.title = `Explorar ${level.name}`;
      node.setAttribute('aria-label', `Nível ${index + 1}: ${level.name}`);
      node.innerHTML = `<span class="node-dot"></span><span class="node-label">${level.short}</span>`;
      node.addEventListener('click', () => { setLevel(index); setTopic('scene'); });
      levelTrack.appendChild(node);
    });
  }
  function exportImage(type) {
    const output = document.createElement('canvas');
    output.width = sceneCanvas.width;
    output.height = sceneCanvas.height;
    const out = output.getContext('2d');
    out.fillStyle = '#07131c';
    out.fillRect(0, 0, output.width, output.height);
    out.drawImage(sceneCanvas, 0, 0);
    out.drawImage(overlayCanvas, 0, 0);
    out.fillStyle = 'rgba(8,21,28,.76)';
    out.fillRect(14 * dpr, output.height - 34 * dpr, 290 * dpr, 22 * dpr);
    out.fillStyle = '#c9e6dc';
    out.font = `${10 * dpr}px "Segoe UI", Arial, sans-serif`;
    out.fillText(`Estudo Biomédico · ${levels[state.level].title} · visualização conceitual`, 21 * dpr, output.height - 20 * dpr);
    output.toBlob((blob) => {
      if (!blob) { showToast('Não foi possível gerar a figura neste navegador.'); return; }
      const extension = type === 'image/jpeg' ? 'jpg' : 'png';
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `estudo-biomedico-${levels[state.level].short.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${extension}`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      showToast(`Figura ${extension.toUpperCase()} exportada.`);
    }, type, type === 'image/jpeg' ? .94 : undefined);
  }

  createHierarchy();
  resetParticles();
  resize();
  renderInfo();
  window.addEventListener('resize', resize);
  const movementKeys = new Map([
    ['KeyW', 'up'], ['ArrowUp', 'up'],
    ['KeyA', 'left'], ['ArrowLeft', 'left'],
    ['KeyS', 'down'], ['ArrowDown', 'down'],
    ['KeyD', 'right'], ['ArrowRight', 'right']
  ]);
  function isTypingTarget(target) {
    return target instanceof Element && (target.matches('input, textarea, select')
      || target.isContentEditable);
  }
  document.addEventListener('keydown', (event) => {
    const movement = movementKeys.get(event.code);
    if (movement && !isTypingTarget(event.target)) {
      event.preventDefault();
      state.keys.add(movement);
    } else if (event.key === '+' || event.key === '=') setLevel(state.level + 1);
    else if (event.key === '-' || event.key === '_') setLevel(state.level - 1);
    else if (event.key === 'Escape') document.querySelector('.info-panel').classList.remove('open');
  }, { capture: true });
  document.addEventListener('keyup', (event) => {
    const movement = movementKeys.get(event.code);
    if (movement) state.keys.delete(movement);
  }, { capture: true });
  window.addEventListener('blur', () => state.keys.clear());
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      state.keys.clear();
      state.joy.x = 0;
      state.joy.y = 0;
    }
  });
  document.getElementById('zoom-in').addEventListener('click', () => setLevel(state.level + 1));
  document.getElementById('zoom-out').addEventListener('click', () => setLevel(state.level - 1));
  sceneCanvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    setLevel(state.level + (event.deltaY < 0 ? 1 : -1));
  }, { passive: false });
  document.getElementById('particles-button').addEventListener('click', () => {
    state.particles = !state.particles;
    document.getElementById('particles-label').textContent = state.particles ? 'Partículas ativas' : 'Partículas pausadas';
    document.querySelector('.tool-dot').style.background = state.particles ? 'var(--mint)' : '#76868a';
    showToast(state.particles ? 'Partículas reativadas.' : 'Partículas pausadas.');
  });
  const startOrJoinPatrol = () => {
    if (window.onlinePlay.isConnected() && !window.onlinePlay.isHost()) {
      runOnlineAction({ type: 'cell-start' }, () => startPlayerForSlot(window.onlinePlay.getLocalSlot()));
    } else startOrPausePatrol();
  };
  document.getElementById('patrol-launch-button').addEventListener('click', startOrJoinPatrol);
  document.getElementById('patrol-button').addEventListener('click', startOrJoinPatrol);
  document.getElementById('multiply-button').addEventListener('click', () => {
    const slot = window.onlinePlay.isConnected() ? window.onlinePlay.getLocalSlot() : state.patrol.activePlayer;
    runOnlineAction({ type: 'multiply' }, () => expandMacrophageTeam(slot));
  });
  document.getElementById('recruit-neutrophils-button').addEventListener('click', () => runOnlineAction({ type: 'recruit-neutrophils' }, recruitNeutrophils));
  document.getElementById('recruit-plasma-button').addEventListener('click', () => runOnlineAction({ type: 'recruit-plasma' }, recruitPlasmaCells));
  document.getElementById('restart-infection-button').addEventListener('click', () => runOnlineAction({ type: 'restart-infection' }, restartAfterMacrophageLysis));
  document.getElementById('player-controls').addEventListener('click', handlePlayerControl);
  document.getElementById('hud-player-controls').addEventListener('click', handlePlayerControl);
  document.getElementById('cell-start-button').addEventListener('click', () => {
    const slot = window.onlinePlay.isConnected() ? window.onlinePlay.getLocalSlot() : state.patrol.activePlayer;
    runOnlineAction({ type: 'cell-start' }, () => startPlayerForSlot(slot));
  });
  document.getElementById('cell-mitosis-button').addEventListener('click', () => {
    const slot = window.onlinePlay.isConnected() ? window.onlinePlay.getLocalSlot() : state.patrol.activePlayer;
    runOnlineAction({ type: 'cell-mitosis' }, () => runRoleMitosis(slot));
  });
  document.getElementById('cell-special-button').addEventListener('click', () => {
    const slot = window.onlinePlay.isConnected() ? window.onlinePlay.getLocalSlot() : state.patrol.activePlayer;
    runOnlineAction({ type: 'cell-special' }, () => runCellSpecialAction(slot));
  });
  document.getElementById('cell-role-options').addEventListener('click', event => {
    const button = event.target.closest('[data-cell-role]');
    if (!button) return;
    const slot = window.onlinePlay.isConnected() ? window.onlinePlay.getLocalSlot() : state.patrol.activePlayer;
    const role = button.dataset.cellRole;
    runOnlineAction({ type: 'cell-role', role }, () => setPlayerRole(slot, role));
  });
  window.onlinePlay.setHandlers({
    snapshot: applyOnlineSnapshot,
    command: applyOnlineCommand,
    roster: applyOnlineRoster,
    status: renderOnlineStatus
  });
  configureOnlineUi();
  window.setInterval(() => {
    if (window.onlinePlay.isHost() && state.patrol.active) {
      window.onlinePlay.sendSnapshot({
        patrol: state.patrol,
        pathwayActive: state.pathwayActive
      });
    }
  }, 100);
  document.getElementById('cytokine-controls').addEventListener('click', (event) => {
    const control = event.target.closest('[data-cytokine-index]');
    if (!control) return;
    const index = Number(control.dataset.cytokineIndex);
    runOnlineAction({ type: 'cytokine-toggle', index }, () => toggleCytokine(index));
  });
  document.getElementById('arsenal-controls').addEventListener('click', (event) => {
    const control = event.target.closest('[data-defense-index]');
    if (control) {
      const index = Number(control.dataset.defenseIndex);
      runOnlineAction({ type: 'defense-toggle', index }, () => toggleMacrophageDefense(index));
    }
  });
  document.getElementById('phage-therapy-button').addEventListener('click', () => runOnlineAction({ type: 'phage-toggle' }, togglePhageTherapy));
  document.getElementById('infection-view-tabs').addEventListener('click', (event) => {
    const button = event.target.closest('[data-infection-view]');
    if (button) {
      const view = button.dataset.infectionView;
      runOnlineAction({ type: 'infection-view', view }, () => selectInfectionView(view));
    }
  });
  document.getElementById('pathway-controls').addEventListener('click', (event) => {
    const control = event.target.closest('[data-pathway-index]');
    if (control) {
      const index = Number(control.dataset.pathwayIndex);
      runOnlineAction({ type: 'pathway-toggle', index }, () => togglePathwayModule(index));
    }
  });
  document.getElementById('export-button').addEventListener('click', (event) => {
    event.stopPropagation();
    const menu = document.getElementById('export-menu');
    menu.hidden = !menu.hidden;
    event.currentTarget.setAttribute('aria-expanded', String(!menu.hidden));
  });
  document.querySelectorAll('[data-export]').forEach((button) => {
    button.addEventListener('click', () => {
      exportImage(button.dataset.export);
      document.getElementById('export-menu').hidden = true;
      document.getElementById('export-button').setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.toolbar-actions')) {
      document.getElementById('export-menu').hidden = true;
      document.getElementById('export-button').setAttribute('aria-expanded', 'false');
    }
  });
  document.getElementById('minimap-toggle').addEventListener('click', () => {
    const card = document.querySelector('.minimap-card');
    card.classList.toggle('collapsed');
    document.getElementById('minimap-toggle').textContent = card.classList.contains('collapsed') ? '+' : '−';
  });
  minimap.addEventListener('pointerdown', (event) => {
    const rect = minimap.getBoundingClientRect();
    state.camera.x = (event.clientX - rect.left - rect.width / 2) * 2.3;
    state.camera.y = (event.clientY - rect.top - rect.height / 2) * 2.0;
    drawScene(); drawMinimap();
  });
  document.querySelectorAll('[data-topic]').forEach((button) => {
    button.addEventListener('click', () => {
      setTopic(button.dataset.topic);
      if (window.innerWidth <= 900) document.querySelector('.info-panel').classList.add('open');
    });
  });
  document.getElementById('help-button').addEventListener('click', () => {
    document.querySelector('.info-panel').classList.add('open');
    setTopic('scene');
    showToast('Role para mudar a escala; arraste o joystick ou use WASD para navegar e patrulhar.');
  });
  const installButton = document.getElementById('install-button');
  const installButtonLabel = document.getElementById('install-button-label');
  let installPromptEvent = null;
  const shareDialog = document.getElementById('share-dialog');
  const shareUrlInput = document.getElementById('share-url');
  const installHelpDialog = document.getElementById('install-help-dialog');
  const androidDevice = /Android/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  installButtonLabel.textContent = androidDevice ? 'Instalar app' : 'Instalar no PC';
  if (window.isSecureContext && !isStandalone) installButton.hidden = false;
  function showInstallInstructions() {
    const instructions = androidDevice
      ? 'No Chrome ou Samsung Internet, abra o menu ⋮ e escolha “Instalar aplicativo” ou “Adicionar à tela inicial”. O simulador precisa estar publicado em HTTPS.'
      : 'No Chrome ou Edge, use o ícone de instalação na barra de endereços ou abra o menu do navegador e escolha “Instalar Estudo Biomédico”. O site precisa estar publicado em HTTPS ou aberto em localhost.';
    document.getElementById('install-help-text').textContent = instructions;
    installHelpDialog.showModal();
  }
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPromptEvent = event;
    installButton.hidden = false;
  });
  installButton.addEventListener('click', async () => {
    if (!installPromptEvent) {
      showInstallInstructions();
      return;
    }
    installButton.disabled = true;
    try {
      await installPromptEvent.prompt();
      const choice = await installPromptEvent.userChoice;
      if (choice.outcome === 'accepted') showToast('Aplicativo instalado. Você pode abri-lo pelo menu Iniciar.');
      if (choice.outcome === 'accepted') installButton.hidden = true;
      installPromptEvent = null;
    } catch (error) {
      console.error('Não foi possível iniciar a instalação do aplicativo:', error);
      showToast('Não foi possível abrir a instalação. Tente pelo menu do navegador.');
    } finally {
      installButton.disabled = false;
    }
  });
  document.getElementById('install-help-close').addEventListener('click', () => installHelpDialog.close());
  window.addEventListener('appinstalled', () => {
    installButton.hidden = true;
    installPromptEvent = null;
    showToast('Estudo Biomédico instalado neste computador.');
  });
  document.getElementById('share-button').addEventListener('click', async () => {
    const url = new URL('./', window.location.href).href;
    shareUrlInput.value = url;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'Estudo Biomédico',
          text: 'Abra este simulador no Samsung Android e escolha “Instalar aplicativo” ou “Adicionar à tela inicial” no menu do navegador.',
          url
        });
        return;
      } catch (error) {
        if (error && error.name === 'AbortError') return;
        console.error('Não foi possível abrir o compartilhamento do dispositivo:', error);
      }
    }
    shareDialog.showModal();
  });
  document.getElementById('copy-share-url').addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrlInput.value);
      } else {
        shareUrlInput.focus();
        shareUrlInput.select();
        if (!document.execCommand('copy')) throw new Error('O navegador não conseguiu copiar o link.');
      }
      showToast('Link copiado. Envie-o ao celular Samsung e abra no Chrome ou Samsung Internet.');
    } catch (error) {
      console.error('Não foi possível copiar o link do simulador:', error);
      shareUrlInput.focus();
      shareUrlInput.select();
      showToast('Link selecionado. Copie com Ctrl+C e envie ao celular Samsung.');
    }
  });
  if ('serviceWorker' in navigator && window.isSecureContext && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js', { scope: './' })
        .catch(error => console.error('Falha ao registrar o suporte offline do aplicativo:', error));
    });
  }
  document.getElementById('shortcuts-button').addEventListener('click', () => showToast('WASD/joystick: navegar ou patrulhar · ative as vias em qualquer ordem · escolha PNG/JPEG para exportar.'));
  document.getElementById('info-close').addEventListener('click', () => document.querySelector('.info-panel').classList.remove('open'));

  const joystick = document.getElementById('joystick');
  const knob = document.getElementById('joystick-knob');
  let activePointer = null;
  function updateJoystick(event) {
    const rect = joystick.getBoundingClientRect();
    const radius = rect.width * .31;
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const length = Math.hypot(dx, dy) || 1;
    const factor = Math.min(1, radius / length);
    const x = dx * factor;
    const y = dy * factor;
    knob.style.left = `calc(50% + ${x}px)`;
    knob.style.top = `calc(50% + ${y}px)`;
    state.joy.x = x / radius;
    state.joy.y = y / radius;
  }
  joystick.addEventListener('pointerdown', (event) => {
    if (activePointer !== null) return;
    event.preventDefault();
    activePointer = event.pointerId;
    joystick.classList.add('active');
    updateJoystick(event);
  });
  window.addEventListener('pointermove', (event) => {
    if (event.pointerId === activePointer) updateJoystick(event);
  }, { passive: false });
  function releaseJoystick(event) {
    if (event.pointerId !== activePointer) return;
    activePointer = null;
    state.joy.x = 0; state.joy.y = 0;
    knob.style.left = '50%'; knob.style.top = '50%';
    joystick.classList.remove('active');
  }
  window.addEventListener('pointerup', releaseJoystick);
  window.addEventListener('pointercancel', releaseJoystick);

  let previousFrameTime = 0;
  function animate(time) {
    const deltaTime = previousFrameTime ? Math.min(.05, (time - previousFrameTime) / 1000) : .016;
    previousFrameTime = time;
    if (!state.paused) {
      let x = state.joy.x, y = state.joy.y;
      if (state.keys.has('left')) x -= 1;
      if (state.keys.has('right')) x += 1;
      if (state.keys.has('up')) y -= 1;
      if (state.keys.has('down')) y += 1;
      const inputMagnitude = Math.hypot(x, y);
      if (inputMagnitude > 1) {
        x /= inputMagnitude;
        y /= inputMagnitude;
      }
      const ease = 1 - Math.exp(-deltaTime * 12);
      state.navVelocity.x += (x - state.navVelocity.x) * ease;
      state.navVelocity.y += (y - state.navVelocity.y) * ease;
      if (Math.hypot(state.navVelocity.x, state.navVelocity.y) < .008 && !x && !y) {
        state.navVelocity.x = 0;
        state.navVelocity.y = 0;
      }
      if (state.patrol.active) {
        const remoteGuest = window.onlinePlay && window.onlinePlay.isConnected() && !window.onlinePlay.isHost();
        if (remoteGuest && state.patrol.running) {
          window.onlinePlay.sendInput(state.navVelocity.x, state.navVelocity.y);
        } else if (updatePatrol(deltaTime, state.navVelocity.x, state.navVelocity.y)) {
          drawScene();
          drawMinimap();
        }
      } else if (state.navVelocity.x || state.navVelocity.y) {
        state.camera.x += state.navVelocity.x * deltaTime * 93;
        state.camera.y += state.navVelocity.y * deltaTime * 93;
        state.camera.x = Math.max(-180, Math.min(180, state.camera.x));
        state.camera.y = Math.max(-100, Math.min(100, state.camera.y));
        drawScene(); drawMinimap();
      }
      renderOverlay(time);
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();
