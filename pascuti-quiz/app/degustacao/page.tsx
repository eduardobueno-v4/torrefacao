"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PASCUTI_CONSTANTS } from '@/lib/constants';

const etapas = [
  { id: 'sabor', rotulo: 'Sabor', key: 'sabor' },
  { id: 'docura', rotulo: 'Doçura', key: 'docura' },
  { id: 'acidez', rotulo: 'Acidez', key: 'acidez' },
  { id: 'retrogosto', rotulo: 'Retrogosto', key: 'retrogosto' },
  { id: 'sensacaoNaBoca', rotulo: 'Sensação na Boca', key: 'sensacaoNaBoca' },
];

export default function Degustacao() {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (etapaAtual < etapas.length - 1) {
      setEtapaAtual(etapaAtual + 1);
    } else {
      router.push('/quiz');
    }
  };

  const handlePrev = () => {
    if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const { rotulo, key } = etapas[etapaAtual];
  const dica = PASCUTI_CONSTANTS.DICAS_SAMUEL[key as keyof typeof PASCUTI_CONSTANTS.DICAS_SAMUEL];

  return (
    <div className="min-h-screen bg-pascuti-offWhite text-pascuti-black flex flex-col px-6 py-10 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
        <motion.div 
          className="h-full bg-pascuti-orangeDiamond"
          initial={{ width: 0 }}
          animate={{ width: `${((etapaAtual + 1) / (etapas.length + 1)) * 100}%` }}
        />
      </div>

      <div className="max-w-md mx-auto w-full flex-grow flex flex-col mt-4">
        <p className="font-semibold text-gray-500 uppercase tracking-widest text-xs mb-4">Etapa {etapaAtual + 1} / 5</p>

        <h1 className="font-playfair text-4xl text-pascuti-navyBlue font-bold mb-8">
          {rotulo}
        </h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={etapaAtual}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-grow relative overflow-hidden mb-6">
              <div className="absolute top-0 left-0 w-2 h-full bg-pascuti-navyBlue"></div>
              
              <div className="mt-2 mb-8">
                <p className="text-gray-700 text-lg leading-relaxed font-light">
                  &quot;{dica}&quot;
                </p>
              </div>

              <div className="flex items-center gap-2 mt-auto text-pascuti-navyBlue">
                <div className="w-3 h-3 rotate-45 bg-pascuti-orangeDiamond"></div>
                <span className="font-medium text-sm">Samuel Pascuti, mestre torrador</span>
              </div>
            </div>

            {etapaAtual === 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3">Descritores comuns para referência:</p>
                <div className="flex flex-wrap gap-2">
                  {['Chocolate', 'Caramelo', 'Frutas Vermelhas', 'Cítrico', 'Nozes'].map(d => (
                    <span key={d} className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">{d}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <p className="text-pascuti-black font-medium text-lg">
                Agarre sua xícara, dê um gole e preste atenção ao que o Samuel descreveu.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto space-y-4">
          <button 
            onClick={handleNext}
            className="w-full bg-pascuti-orangeDiamond hover:bg-orange-600 text-white font-medium text-lg py-4 rounded-full transition shadow-lg"
          >
            {etapaAtual < etapas.length - 1 ? 'Pronto, senti!' : 'Ir para o Quiz'}
          </button>
          
          <button 
            onClick={handlePrev}
            className={`w-full py-4 text-pascuti-black bg-transparent font-medium ${etapaAtual === 0 ? 'opacity-0 pointer-events-none' : ''}`}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
