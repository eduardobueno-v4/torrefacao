"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function Quiz() {
  const router = useRouter();
  const setQuizAnswer = useQuizStore((state) => state.setQuizAnswer);

  const [etapaAtual, setEtapaAtual] = useState(0);

  const [sabor, setSabor] = useState({ intensidade: 5, descritores: [] as string[] });
  const [docura, setDocura] = useState({ intensidade: 5 });
  const [acidez, setAcidez] = useState({ intensidade: 5, tipo: '' });
  const [retrogosto, setRetrogosto] = useState({ intensidade: 5, qualidade: '' });
  const [sensacaoNaBoca, setSensacaoNaBoca] = useState({ intensidade: 5, textura: '' });

  const descritoresSabor = ['Chocolate', 'Caramelo', 'Frutas Vermelhas', 'Cítrico', 'Nozes', 'Cereal', 'Floral', 'Especiarias', 'Torrado', 'Outro'];
  const tiposAcidez = ['Cítrica/viva', 'Frutada/suave', 'Avinagrada', 'Não identifiquei'];
  const qualidadesRetrogosto = ['Agradável', 'Neutro', 'Desagradável'];
  const texturasBoca = ['Aveludado/sedoso', 'Áspero/granuloso', 'Amanteigado', 'Seco/adstringente', 'Leve/aquoso'];

  const perguntas = [
    { p: 'Sabor', titulo: 'Como você descreveria o sabor geral desse café?', minL: 'Muito fraco', maxL: 'Muito intenso' },
    { p: 'Doçura', titulo: 'Quão doce você sentiu esse café — sem açúcar?', minL: 'Nenhuma', maxL: 'Bem doce' },
    { p: 'Acidez', titulo: 'Sentiu alguma acidez nesse café?', minL: 'Nenhuma', maxL: 'Muito ácido' },
    { p: 'Retrogosto', titulo: 'Depois de engolir, o sabor permaneceu na boca?', minL: 'Some rápido', maxL: 'Persistente' },
    { p: 'Sensação na Boca', titulo: 'Como você sentiu o café na boca?', minL: 'Leve/Aquoso', maxL: 'Denso' }
  ];

  const handleNext = () => {
    if (etapaAtual < 4) {
      setEtapaAtual(etapaAtual + 1);
    } else {
      setQuizAnswer({ sabor, docura, acidez, retrogosto, sensacaoNaBoca });
      router.push('/resultado');
    }
  };

  const handleDescritorToggle = (d: string) => {
    if (sabor.descritores.includes(d)) {
      setSabor({ ...sabor, descritores: sabor.descritores.filter(x => x !== d) });
    } else {
      if (sabor.descritores.length < 3) {
        setSabor({ ...sabor, descritores: [...sabor.descritores, d] });
      }
    }
  };

  return (
    <div className="min-h-screen bg-pascuti-offWhite text-pascuti-black flex flex-col px-6 py-10 relative">
      <div className="max-w-md mx-auto w-full flex-grow flex flex-col">
        <p className="text-gray-500 uppercase tracking-widest text-xs mb-4">Pergunta {etapaAtual + 1} / 5</p>

        <h1 className="font-playfair text-3xl text-pascuti-navyBlue font-bold mb-4">
          {perguntas[etapaAtual].p}
        </h1>
        
        <p className="text-lg font-medium text-gray-800 mb-8">{perguntas[etapaAtual].titulo}</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={etapaAtual}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col"
          >
            <div className="mb-10 w-full py-4">
              <input 
                type="range" min="0" max="10" step="1" 
                className="w-full accent-pascuti-orangeDiamond h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                value={
                  etapaAtual === 0 ? sabor.intensidade : 
                  etapaAtual === 1 ? docura.intensidade : 
                  etapaAtual === 2 ? acidez.intensidade : 
                  etapaAtual === 3 ? retrogosto.intensidade : 
                  sensacaoNaBoca.intensidade
                }
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  if (etapaAtual === 0) setSabor({...sabor, intensidade: v});
                  if (etapaAtual === 1) setDocura({...docura, intensidade: v});
                  if (etapaAtual === 2) setAcidez({...acidez, intensidade: v});
                  if (etapaAtual === 3) setRetrogosto({...retrogosto, intensidade: v});
                  if (etapaAtual === 4) setSensacaoNaBoca({...sensacaoNaBoca, intensidade: v});
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-3 px-1">
                <span>{perguntas[etapaAtual].minL}</span>
                <span>{perguntas[etapaAtual].maxL}</span>
              </div>
            </div>

            {etapaAtual === 0 && (
              <div>
                <p className="text-sm font-medium mb-3">Selecione até 3 características que você sentiu:</p>
                <div className="flex flex-wrap gap-2">
                  {descritoresSabor.map(d => (
                    <button 
                      key={d} 
                      onClick={() => handleDescritorToggle(d)}
                      className={`px-4 py-2 border rounded-full text-sm font-medium transition ${
                        sabor.descritores.includes(d) 
                          ? 'border-pascuti-orangeDiamond bg-orange-50 text-pascuti-orangeDiamond' 
                          : 'border-gray-300 text-gray-600 bg-white'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {etapaAtual === 2 && (
              <div>
                <p className="text-sm font-medium mb-3">Como era essa acidez?</p>
                <div className="flex flex-wrap gap-2">
                  {tiposAcidez.map(d => (
                    <button key={d} onClick={() => setAcidez({...acidez, tipo: d})}
                      className={`w-full text-left px-4 py-3 border rounded-lg text-sm font-medium transition ${
                        acidez.tipo === d ? 'border-pascuti-orangeDiamond bg-orange-50 text-pascuti-orangeDiamond' : 'border-gray-300 bg-white'
                      }`}
                    >{d}</button>
                  ))}
                </div>
              </div>
            )}

            {etapaAtual === 3 && (
              <div className="space-y-2">
                {qualidadesRetrogosto.map(d => (
                  <button key={d} onClick={() => setRetrogosto({...retrogosto, qualidade: d})}
                    className={`w-full text-left px-4 py-3 border rounded-lg text-sm font-medium transition ${
                      retrogosto.qualidade === d ? 'border-pascuti-orangeDiamond bg-orange-50 text-pascuti-orangeDiamond' : 'border-gray-300 bg-white'
                    }`}
                  >{d}</button>
                ))}
              </div>
            )}

            {etapaAtual === 4 && (
              <div className="space-y-2">
                {texturasBoca.map(d => (
                  <button key={d} onClick={() => setSensacaoNaBoca({...sensacaoNaBoca, textura: d})}
                    className={`w-full text-left px-4 py-3 border rounded-lg text-sm font-medium transition ${
                      sensacaoNaBoca.textura === d ? 'border-pascuti-orangeDiamond bg-orange-50 text-pascuti-orangeDiamond' : 'border-gray-300 bg-white'
                    }`}
                  >{d}</button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 space-y-4">
          <button 
            onClick={handleNext}
            className="w-full bg-pascuti-orangeDiamond hover:bg-orange-600 text-white font-medium text-lg py-4 rounded-full transition shadow-lg"
          >
            {etapaAtual < 4 ? 'Próxima' : 'Ver meu Resultado'}
          </button>
          
          <button 
            onClick={() => etapaAtual > 0 && setEtapaAtual(etapaAtual - 1)}
            className={`w-full py-4 text-pascuti-black bg-transparent font-medium ${etapaAtual === 0 ? 'opacity-0 pointer-events-none' : ''}`}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
