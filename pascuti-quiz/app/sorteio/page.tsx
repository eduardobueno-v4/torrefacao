"use client";
import { useQuizStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Sorteio() {
  const router = useRouter();
  const lead = useQuizStore((state) => state.lead);

  const shareHandler = async () => {
    // navigator.share would be placed here
    alert("Função de compartilhamento ativada!");
  };

  const whatsappText = `Olá! Fiz o quiz sensorial na feira e quero saber mais sobre os cafés Pascuti.`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pascuti-offWhite to-[#f0efe6] text-pascuti-black px-6 py-12 flex flex-col justify-center relative overflow-hidden">
      
      {/* Decorative BG Diamonds */}
      <div className="absolute top-10 left-10 w-32 h-32 rotate-45 bg-pascuti-orangeDiamond opacity-5 rounded-3xl"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 rotate-45 bg-pascuti-navyBlue opacity-5 rounded-full"></div>

      <div className="max-w-md mx-auto w-full flex flex-col items-center text-center z-10">
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </motion.div>

        <h1 className="text-3xl font-playfair font-bold text-pascuti-navyBlue mb-4">Parabéns, {lead.nome || 'Visitante'}!</h1>
        <p className="text-gray-600 text-lg mb-10">
          Você já está participando do sorteio de cafés especiais Pascuti. Avisaremos o vencedor no final do evento!
        </p>

        <div className="w-full bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 mb-8 py-8 transform transition-transform hover:-translate-y-1">
          <p className="font-playfair font-bold text-xl text-pascuti-navyBlue mb-2">Desafio Concluído</p>
          <p className="text-gray-500 mb-6 font-light">Seu paladar não mente. Você domina os atributos sensoriais.</p>
          <button 
            onClick={shareHandler}
            className="w-full bg-pascuti-navyBlue text-white font-medium py-3 rounded-full transition hover:bg-opacity-90 shadow-md"
          >
            Compartilhar meu Resultado
          </button>
        </div>

        <div className="w-full mt-auto">
          <div className="bg-pascuti-orangeDiamond/10 rounded-2xl p-6 border border-pascuti-orangeDiamond/20">
            <p className="font-playfair font-bold text-lg text-pascuti-orangeDiamond mb-1">Quer esse café com você?</p>
            <p className="text-sm text-gray-700 mb-4">Leve o padrão do Cerrado Mineiro para a sua empresa ou dia-a-dia.</p>
            <a 
              href={`https://wa.me/5511999999999?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full block bg-pascuti-orangeDiamond hover:bg-orange-600 text-white font-medium py-3 rounded-full shadow transition"
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
