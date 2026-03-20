"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore, ABVariant } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function QuizContainer() {
  const [isMounted, setIsMounted] = useState(false);
  const variant = useQuizStore((state) => state.variant);
  const forceVariant = useQuizStore((state) => state.forceVariant);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-pascuti-offWhite"></div>;

  return (
    <>
      {/* Dev Tool: A/B Test Toggle */}
      <div className="fixed top-4 right-4 z-50 bg-white/70 backdrop-blur-md p-1.5 rounded-full shadow-xl shadow-black/5 border border-white/50 flex flex-col sm:flex-row items-center gap-1.5 transition-all w-fit">
        <button onClick={() => forceVariant('A')} className={`px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all ${variant === 'A' ? 'bg-pascuti-navyBlue text-white shadow-md' : 'text-gray-400 hover:text-pascuti-black hover:bg-white/80'}`}>A</button>
        <button onClick={() => forceVariant('B')} className={`px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all ${variant === 'B' ? 'bg-gradient-to-tr from-[#D4712A] to-orange-400 text-white shadow-md' : 'text-gray-400 hover:text-[#D4712A] hover:bg-white/80'}`}>B</button>
      </div>

      {variant === 'B' ? <VariantB /> : <VariantA />}
    </>
  );
}

// ----------------------------------------------------
// VARIANT A (Original Funcional Clássico)
// ----------------------------------------------------
function VariantA() {
  const router = useRouter();
  const setQuizAnswer = useQuizStore((state) => state.setQuizAnswer);

  const [etapaAtual, setEtapaAtual] = useState(0);

  const [sabor, setSabor] = useState({ intensidade: 5, descritores: [] as string[] });
  const [docura, setDocura] = useState({ intensidade: 5 });
  const [acidez, setAcidez] = useState({ intensidade: 5, tipo: '' });
  const [retrogosto, setRetrogosto] = useState({ intensidade: 5, qualidade: '' });
  const [sensacaoNaBoca, setSensacaoNaBoca] = useState({ intensidade: 5, textura: '' });

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
        <div className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded inline-block self-start mb-2 uppercase tracking-wide">Variant A</div>
        <p className="text-gray-500 uppercase tracking-widest text-xs mb-4">Pergunta {etapaAtual + 1} / 5</p>

        <h1 className="font-playfair text-3xl text-pascuti-navyBlue font-bold mb-4">{perguntas[etapaAtual].p}</h1>
        <p className="text-lg font-medium text-gray-800 mb-8">{perguntas[etapaAtual].titulo}</p>

        <AnimatePresence mode="wait">
          <motion.div key={etapaAtual} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex-grow flex flex-col">
            <div className="mb-10 w-full py-4">
              <input 
                type="range" min="0" max="10" step="1" 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                <span>{perguntas[etapaAtual].minL}</span><span>{perguntas[etapaAtual].maxL}</span>
              </div>
            </div>

            {etapaAtual === 0 && (
              <div>
                <p className="text-sm font-medium mb-3">Selecione até 3 características que você sentiu:</p>
                <div className="flex flex-wrap gap-2">
                  {descritoresSabor.map(d => (
                    <button 
                      key={d} onClick={() => handleDescritorToggle(d)}
                      className={`px-4 py-2 border rounded-full text-sm font-medium transition ${
                        sabor.descritores.includes(d) ? 'border-pascuti-orangeDiamond bg-orange-50 text-pascuti-orangeDiamond' : 'border-gray-300 text-gray-600 bg-white'
                      }`}
                    >{d}</button>
                  ))}
                </div>
              </div>
            )}
            
            {etapaAtual === 2 && (
              <div className="space-y-2">
                {tiposAcidez.map(d => (
                  <button key={d} onClick={() => setAcidez({...acidez, tipo: d})}
                    className={`w-full text-left px-4 py-3 border rounded-lg text-sm font-medium transition ${acidez.tipo === d ? 'border-pascuti-orangeDiamond bg-orange-50 text-pascuti-orangeDiamond' : 'border-gray-300 bg-white'}`}
                  >{d}</button>
                ))}
              </div>
            )}

            {etapaAtual === 3 && (
              <div className="space-y-2">
                {qualidadesRetrogosto.map(d => (
                  <button key={d} onClick={() => setRetrogosto({...retrogosto, qualidade: d})}
                    className={`w-full text-left px-4 py-3 border rounded-lg text-sm font-medium transition ${retrogosto.qualidade === d ? 'border-pascuti-orangeDiamond bg-orange-50 text-pascuti-orangeDiamond' : 'border-gray-300 bg-white'}`}
                  >{d}</button>
                ))}
              </div>
            )}

            {etapaAtual === 4 && (
              <div className="space-y-2">
                {texturasBoca.map(d => (
                  <button key={d} onClick={() => setSensacaoNaBoca({...sensacaoNaBoca, textura: d})}
                    className={`w-full text-left px-4 py-3 border rounded-lg text-sm font-medium transition ${sensacaoNaBoca.textura === d ? 'border-pascuti-orangeDiamond bg-orange-50 text-pascuti-orangeDiamond' : 'border-gray-300 bg-white'}`}
                  >{d}</button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 space-y-4">
          <button onClick={handleNext} className="w-full bg-pascuti-orangeDiamond hover:bg-orange-600 text-white font-medium text-lg py-4 rounded-full transition shadow-lg">
            {etapaAtual < 4 ? 'Próxima' : 'Ver meu Resultado'}
          </button>
          
          <button onClick={() => etapaAtual > 0 && setEtapaAtual(etapaAtual - 1)} className={`w-full py-4 text-pascuti-black bg-transparent font-medium ${etapaAtual === 0 ? 'opacity-0 pointer-events-none' : ''}`}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// VARIANT B (STITCH MCP Premium Refresh)
// ----------------------------------------------------
function VariantB() {
  const router = useRouter();
  const setQuizAnswer = useQuizStore((state) => state.setQuizAnswer);

  const [etapaAtual, setEtapaAtual] = useState(0);

  const [sabor, setSabor] = useState({ intensidade: 5, descritores: [] as string[] });
  const [docura, setDocura] = useState({ intensidade: 5 });
  const [acidez, setAcidez] = useState({ intensidade: 5, tipo: '' });
  const [retrogosto, setRetrogosto] = useState({ intensidade: 5, qualidade: '' });
  const [sensacaoNaBoca, setSensacaoNaBoca] = useState({ intensidade: 5, textura: '' });

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
    <div className="min-h-screen bg-[#fafaf5] text-pascuti-black flex flex-col px-6 py-10 relative">
      <div className="max-w-md mx-auto w-full flex-grow flex flex-col">
        {/* Top Progress System - No border, organic */}
        <div className="flex justify-between items-center mb-8">
           <div className="bg-[#D4712A] text-white text-[10px] font-bold px-3 py-1.5 rounded-full inline-block uppercase tracking-wider shadow-sm">Variant B</div>
           <p className="text-[#a4a4a4] font-medium text-sm">Etapa {etapaAtual + 1} de 5</p>
        </div>

        <h1 className="font-playfair text-[2.2rem] leading-tight text-pascuti-navyBlue font-bold mb-8">
          {perguntas[etapaAtual].titulo}
        </h1>

        <AnimatePresence mode="popLayout">
          <motion.div 
            key={etapaAtual} 
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }} 
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }} 
            transition={{ duration: 0.4, ease: "easeOut" }} 
            className="flex-grow flex flex-col"
          >
            {/* Elevated Modern Card without hard borders */}
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(26,28,25,0.06)] flex flex-col gap-6 mb-8">
              <div className="w-full">
                <input 
                  type="range" min="0" max="10" step="1" 
                  className="w-full h-3 bg-[#e3e3de] rounded-full appearance-none cursor-pointer"
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
                <div className="flex justify-between text-xs font-semibold text-[#8a8a8a] mt-4 px-1 uppercase tracking-wide">
                  <span>{perguntas[etapaAtual].minL}</span><span>{perguntas[etapaAtual].maxL}</span>
                </div>
              </div>
            </div>

            <div className="px-2">
              {etapaAtual === 0 && (
                <div>
                  <p className="text-sm font-bold text-[#b4b4b4] uppercase tracking-widest mb-4">Notas Sensoriais (Máx 3)</p>
                  <div className="flex flex-wrap gap-2.5">
                    {descritoresSabor.map(d => (
                      <button 
                        key={d} onClick={() => handleDescritorToggle(d)}
                        className={`px-5 py-3 rounded-full text-[15px] font-semibold transition-all duration-300 ${
                          sabor.descritores.includes(d) 
                            ? 'bg-gradient-to-br from-[#D4712A] to-[#c7611a] text-white shadow-lg shadow-orange-500/20' 
                            : 'bg-white text-[#45464e] shadow-[0_4px_10px_rgba(26,28,25,0.03)] hover:scale-[1.02]'
                        }`}
                      >{d}</button>
                    ))}
                  </div>
                </div>
              )}
              
              {etapaAtual === 2 && (
                <div className="space-y-3">
                  {tiposAcidez.map(d => (
                    <button key={d} onClick={() => setAcidez({...acidez, tipo: d})}
                      className={`w-full text-left px-6 py-4 rounded-[1.2rem] text-base font-semibold transition-all duration-300 ${acidez.tipo === d ? 'bg-gradient-to-br from-[#D4712A] to-[#c7611a] text-white shadow-lg shadow-orange-500/20' : 'bg-white text-[#45464e] shadow-[0_4px_10px_rgba(26,28,25,0.03)] focus:scale-[0.98]'}`}
                    >{d}</button>
                  ))}
                </div>
              )}

              {etapaAtual === 3 && (
                <div className="space-y-3">
                  {qualidadesRetrogosto.map(d => (
                    <button key={d} onClick={() => setRetrogosto({...retrogosto, qualidade: d})}
                      className={`w-full text-left px-6 py-4 rounded-[1.2rem] text-base font-semibold transition-all duration-300 ${retrogosto.qualidade === d ? 'bg-gradient-to-br from-[#D4712A] to-[#c7611a] text-white shadow-lg shadow-orange-500/20' : 'bg-white text-[#45464e] shadow-[0_4px_10px_rgba(26,28,25,0.03)] focus:scale-[0.98]'}`}
                    >{d}</button>
                  ))}
                </div>
              )}

              {etapaAtual === 4 && (
                <div className="space-y-3">
                  {texturasBoca.map(d => (
                    <button key={d} onClick={() => setSensacaoNaBoca({...sensacaoNaBoca, textura: d})}
                      className={`w-full text-left px-6 py-4 rounded-[1.2rem] text-base font-semibold transition-all duration-300 ${sensacaoNaBoca.textura === d ? 'bg-gradient-to-br from-[#D4712A] to-[#c7611a] text-white shadow-lg shadow-orange-500/20' : 'bg-white text-[#45464e] shadow-[0_4px_10px_rgba(26,28,25,0.03)] focus:scale-[0.98]'}`}
                    >{d}</button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto pt-10 pb-4 space-y-4">
          <button 
            onClick={handleNext} 
            className="w-full bg-gradient-to-br from-[#041534] to-[#1b2a4a] hover:opacity-90 text-white font-medium text-lg py-5 rounded-full transition-all shadow-[0_10px_20px_rgba(4,21,52,0.15)] active:scale-95"
          >
            {etapaAtual < 4 ? 'Próxima Etapa' : 'Ver Meu Relatório Mestre'}
          </button>
          
          <button 
            onClick={() => etapaAtual > 0 && setEtapaAtual(etapaAtual - 1)} 
            className={`w-full py-3 text-pascuti-navyBlue underline decoration-2 underline-offset-4 font-bold ${etapaAtual === 0 ? 'opacity-0 pointer-events-none' : 'opacity-60 hover:opacity-100'}`}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
