export const PASCUTI_CONSTANTS = {
  COLORS: {
    black: '#1A1A1A',
    orangeDiamond: '#D4712A',
    navyBlue: '#1B2A4A',
    offWhite: '#F5F5F0',
    oliveGreen: '#5A7247',
  },
  PLACEHOLDER_FICHA_TECNICA: {
    sabor: { intensidade: 7, descritores: ["Chocolate", "Caramelo", "Nozes"] },
    docura: { intensidade: 8 },
    acidez: { intensidade: 5, tipo: "Frutada/suave" },
    retrogosto: { intensidade: 7, qualidade: "Agradável" },
    sensacaoNaBoca: { intensidade: 6, textura: "Aveludado/sedoso" },
  },
  DICAS_SAMUEL: {
    sabor: "O sabor é a impressão geral do café. Feche os olhos, dê um gole e deixe o café passear pela boca antes de engolir. Que lembranças vêm à mente?",
    docura: "Um bom café especial tem doçura natural, sem precisar de açúcar. Tente perceber essa nota suave, quase como um caramelo ou mel de fundo.",
    acidez: "A acidez no café não é defeito, é vibração! Ela dá vida à bebida. Sinta nas laterais da língua, como quando mordemos uma fruta fresca.",
    retrogosto: "O retrogosto é a memória que o café deixa. Depois de engolir, o sabor permanece na boca ou some rápido? É uma sensação agradável?",
    sensacaoNaBoca: "Preste atenção na textura do café. É leve como água de coco ou encorpado e denso, quase cremoso como leite?",
  },
  CLASSIFICACOES: [
    { min: 0, max: 30, nome: "Paladar Iniciante", feedback: "Você está começando sua jornada no mundo dos cafés especiais. Continue provando e prestando atenção aos detalhes!" },
    { min: 31, max: 60, nome: "Paladar Atento", feedback: "Ótimo! Você já consegue perceber as principais nuances e tem um paladar sensível para cafés de qualidade." },
    { min: 61, max: 85, nome: "Paladar Apurado", feedback: "Impressionante! Sua percepção é muito próxima da nossa ficha técnica. Você já aprecia cafés especiais como um conhecedor." },
    { min: 86, max: 100, nome: "Paladar de Especialista", feedback: "Extraordinário! Seu paladar está alinhado com o do nosso mestre torrador. Você praticamente poderia trabalhar com a gente!" },
  ]
};
