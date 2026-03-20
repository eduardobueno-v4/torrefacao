export interface Lead {
  id: string;
  nome: string;
  sobrenome: string;
  telefone: string;
  empresa: string;
  email?: string;
  completouDegustacao: boolean;
  completouQuiz: boolean;
  timestamp: string;
}

export interface QuizAnswer {
  sabor: {
    intensidade: number;
    descritores: string[];
  };
  docura: {
    intensidade: number;
  };
  acidez: {
    intensidade: number;
    tipo: string;
  };
  retrogosto: {
    intensidade: number;
    qualidade: string;
  };
  sensacaoNaBoca: {
    intensidade: number;
    textura: string;
  };
}

export interface FichaTecnica {
  sabor: { intensidade: number; descritores: string[] };
  docura: { intensidade: number };
  acidez: { intensidade: number; tipo: string };
  retrogosto: { intensidade: number; qualidade: string };
  sensacaoNaBoca: { intensidade: number; textura: string };
}

export interface ScoreResult {
  scoreGeral: number;
  classificacao: {
    nome: string;
    feedback: string;
  };
  scores: {
    sabor: number;
    docura: number;
    acidez: number;
    retrogosto: number;
    corpo: number;
  };
}
