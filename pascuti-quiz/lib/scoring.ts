import { FichaTecnica, QuizAnswer, ScoreResult } from './types';
import { PASCUTI_CONSTANTS } from './constants';

export function calculateScore(answer: QuizAnswer, ficha: FichaTecnica): ScoreResult {
  const calcDiffScore = (ans: number, f: number) => Math.max(0, 100 - (Math.abs(ans - f) / 10) * 100);

  let saborScore = calcDiffScore(answer.sabor.intensidade, ficha.sabor.intensidade);
  const correctDescritores = answer.sabor.descritores.filter(d => ficha.sabor.descritores.includes(d)).length;
  // Bônus de +2 por descritor correto (cap em 100)
  saborScore = Math.min(100, saborScore + (correctDescritores * 2));

  const docuraScore = calcDiffScore(answer.docura.intensidade, ficha.docura.intensidade);
  const acidezScore = calcDiffScore(answer.acidez.intensidade, ficha.acidez.intensidade);
  const retrogostoScore = calcDiffScore(answer.retrogosto.intensidade, ficha.retrogosto.intensidade);
  const corpoScore = calcDiffScore(answer.sensacaoNaBoca.intensidade, ficha.sensacaoNaBoca.intensidade);

  // Pesos: Sabor 25%, Doçura 25%, Acidez 20%, Retrogosto 15%, Corpo 15%
  const scoreGeral = Math.round(
    (saborScore * 0.25) +
    (docuraScore * 0.25) +
    (acidezScore * 0.20) +
    (retrogostoScore * 0.15) +
    (corpoScore * 0.15)
  );

  const classObj = PASCUTI_CONSTANTS.CLASSIFICACOES.find((c) => scoreGeral >= c.min && scoreGeral <= c.max);
  const finalClassObj = classObj || PASCUTI_CONSTANTS.CLASSIFICACOES[0];

  return {
    scoreGeral,
    classificacao: {
      nome: finalClassObj.nome,
      feedback: finalClassObj.feedback,
    },
    scores: {
      sabor: saborScore,
      docura: docuraScore,
      acidez: acidezScore,
      retrogosto: retrogostoScore,
      corpo: corpoScore,
    }
  };
}
