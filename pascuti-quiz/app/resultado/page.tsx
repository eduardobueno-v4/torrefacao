"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/store';
import { calculateScore } from '@/lib/scoring';
import { PASCUTI_CONSTANTS } from '@/lib/constants';
import { QuizAnswer, ScoreResult } from '@/lib/types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function Resultado() {
  const router = useRouter();
  const { quizAnswer, lead } = useQuizStore();
  const [result, setResult] = useState<{res: ScoreResult, ficha: typeof PASCUTI_CONSTANTS.PLACEHOLDER_FICHA_TECNICA} | null>(null);

  useEffect(() => {
    if (!quizAnswer.sabor || !lead.nome) {
      router.push('/');
      return;
    }

    let currentFicha = PASCUTI_CONSTANTS.PLACEHOLDER_FICHA_TECNICA;
    const localFicha = localStorage.getItem('pascuti_ficha_tecnica');
    if (localFicha) {
      try { currentFicha = JSON.parse(localFicha); } catch {}
    }

    const res = calculateScore(quizAnswer as QuizAnswer, currentFicha);
    setResult({ res, ficha: currentFicha });
  }, [quizAnswer, lead, router]);

  if (!result) return <div className="min-h-screen bg-pascuti-offWhite flex items-center justify-center">Calculando...</div>;

  const chartData = [
    { subject: 'Sabor', A: quizAnswer.sabor?.intensidade ?? 0, B: result.ficha.sabor.intensidade, fullMark: 10 },
    { subject: 'Doçura', A: quizAnswer.docura?.intensidade ?? 0, B: result.ficha.docura.intensidade, fullMark: 10 },
    { subject: 'Acidez', A: quizAnswer.acidez?.intensidade ?? 0, B: result.ficha.acidez.intensidade, fullMark: 10 },
    { subject: 'Corpo', A: quizAnswer.sensacaoNaBoca?.intensidade ?? 0, B: result.ficha.sensacaoNaBoca.intensidade, fullMark: 10 },
    { subject: 'Retrogosto', A: quizAnswer.retrogosto?.intensidade ?? 0, B: result.ficha.retrogosto.intensidade, fullMark: 10 },
  ];

  return (
    <div className="min-h-screen bg-pascuti-offWhite text-pascuti-black px-6 py-10 pb-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <p className="font-playfair text-2xl font-bold mb-1 tracking-widest text-pascuti-navyBlue">PASCUTI</p>
          <div className="w-2 h-2 mx-auto rotate-45 bg-pascuti-orangeDiamond mb-6"></div>
          <h2 className="text-4xl font-bold font-playfair text-pascuti-black mb-2">Seu Perfil</h2>
        </div>

        <motion.div 
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <p className="text-gray-500 uppercase text-xs font-semibold tracking-widest mb-2">Score Geral</p>
          <h1 className="text-6xl font-bold text-pascuti-orangeDiamond font-playfair mb-2">{result.res.scoreGeral}</h1>
          <p className="text-2xl font-playfair text-pascuti-navyBlue">{result.res.classificacao.nome}</p>
          <p className="text-sm text-gray-600 text-center mt-4 px-2 line-clamp-3">{result.res.classificacao.feedback}</p>
        </motion.div>

        <motion.div 
          className="bg-pascuti-navyBlue rounded-3xl p-6 shadow-sm mb-8 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-center mb-6 font-playfair text-xl tracking-wider">O mapa do seu paladar</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#ffffff30" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#F5F5F0', fontSize: 12 }} />
                <Radar name="Sua percepção" dataKey="A" stroke="#D4712A" fill="#D4712A" fillOpacity={0.6} />
                <Radar name="Samuel (Mestre)" dataKey="B" stroke="#F5F5F0" fill="transparent" strokeDasharray="3 3" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-6 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pascuti-orangeDiamond opacity-60 rounded-full"></div>
              <span>Sua percepção</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0 border-b-2 border-dashed border-white"></div>
              <span>Samuel Pascuti</span>
            </div>
          </div>
        </motion.div>
        
        <button 
          onClick={() => router.push('/sorteio')}
          className="w-full bg-pascuti-orangeDiamond hover:bg-orange-600 text-white font-medium text-lg py-4 rounded-full transition shadow-lg"
        >
          Finalizar e Ver meu Sorteio
        </button>
      </div>
    </div>
  );
}
