"use client";
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Playfair_Display } from "next/font/google";
import { useQuizStore } from '@/lib/store';

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const assignVariant = useQuizStore((state) => state.assignVariant);

  useEffect(() => {
    // Garantir que um grupo A/B foi selecionado logo ao entrar no painel
    assignVariant();
  }, [assignVariant]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pascuti-black to-gray-900 text-pascuti-offWhite flex flex-col justify-center items-center px-6 py-12 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto w-full flex flex-col items-center"
      >
        <div className="mb-12">
          <h1 className={`${playfair.className} text-4xl font-bold tracking-widest text-white mb-2`}>
            PASCUTI
          </h1>
          <p className="text-sm tracking-[0.3em] font-light text-pascuti-offWhite/80 uppercase">
            Torrefação Artesanal · Cerrado Mineiro
          </p>
        </div>

        <h2 className={`${playfair.className} text-3xl font-bold text-white mb-6 leading-tight`}>
          Descubra o que o seu paladar consegue sentir
        </h2>
        
        <p className="text-pascuti-offWhite/90 mb-10 font-light text-lg">
          O mestre torrador Samuel vai guiar sua degustação. Depois, teste o que aprendeu e concorra a cafés especiais do Cerrado Mineiro.
        </p>

        <button 
          onClick={() => router.push('/cadastro')}
          className="w-full bg-pascuti-orangeDiamond hover:bg-orange-600 text-white py-4 px-8 rounded-full font-medium text-lg transition-colors mb-4 shadow-lg"
        >
          Começar a Experiência
        </button>

        <p className="text-xs text-pascuti-offWhite/60 flex items-center gap-2">
          <span>Tempo estimado: 8 minutos</span>
        </p>

        <div className="mt-16 w-4 h-4 rounded-sm rotate-45 bg-pascuti-orangeDiamond opacity-80" />
      </motion.div>
    </div>
  );
}
