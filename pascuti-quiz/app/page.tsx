"use client";
import Link from 'next/link';
import { Playfair_Display, Manrope } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export default function LinkTree() {
  return (
    <div className={`min-h-screen bg-[#fafaf5] text-[#041534] flex flex-col items-center ${manrope.className} selection:bg-[#fe9249]`}>
      
      {/* Top Navigation Anchor */}
      <header className="fixed top-0 w-full z-50 bg-[#fafaf5]/80 backdrop-blur-xl flex justify-center items-center px-6 py-4">
        <div className={`${playfair.className} text-2xl font-bold tracking-[0.2em] text-[#041534] uppercase`}>
          PASCUTI
        </div>
      </header>

      <main className="flex-1 w-full max-w-md px-6 pt-32 pb-20 flex flex-col items-center">
        
        {/* Profile Section */}
        <div className="mb-12 text-center flex flex-col items-center">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#994700]/20 p-1">
              <img 
                alt="PASCUTI Branding" 
                className="w-full h-full object-cover rounded-full" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLVaryI2dfTzGYQO-8q_XH78xEtYxej29Ben5Wn2xmRB3BK5uTPStkfqwImdAD4mB1Nri4OmATNFwPy2k10Ucus7_4MsVvBqnZqf6ybf-7EEmzUAdvFy163yADKdEZPaqsKPJjLKdQT4MtzxxLj1b-jd_wkzDAljpybhs_1Q_IiXGAbr5UcmqBxIY4gLz_EEoEukqyARqCBL8fh7lUfMMhh3ZFn00claAJxMsN5op8iKGFD86hJXzUx2Y70PXOjTkpADXF_bhPTVJF"
              />
            </div>
            
            <div className="absolute -bottom-1 -right-1 bg-[#994700] w-6 h-6 rounded-full flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
          </div>
          
          <h1 className={`${playfair.className} text-3xl font-bold tracking-tight text-[#041534] mb-2`}>
            PASCUTI
          </h1>
          <p className="text-sm tracking-[0.15em] text-[#45464e] uppercase font-semibold">
            Links Úteis
          </p>
        </div>

        {/* Links Vertical Stack */}
        <nav className="w-full flex flex-col gap-4">
          
          {/* Link 1: Relatório Antigo */}
          <Link href="/relatorio" className="group relative w-full flex items-center justify-between p-5 bg-gradient-to-br from-[#1B2A4A] to-[#041534] rounded-full shadow-[0_20px_40px_rgba(4,21,52,0.06)] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#fe9249]">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <span className="text-white font-semibold tracking-wide">Relatório Antigo</span>
            </div>
            <span className="material-symbols-outlined text-white/40 group-hover:text-[#fe9249] transition-colors">arrow_forward_ios</span>
          </Link>

          {/* Link 2: Landing Page Antiga */}
          <Link href="/landing" className="group relative w-full flex items-center justify-between p-5 bg-gradient-to-br from-[#1B2A4A] to-[#041534] rounded-full shadow-[0_20px_40px_rgba(4,21,52,0.06)] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#fe9249]">
                <span className="material-symbols-outlined">web</span>
              </div>
              <span className="text-white font-semibold tracking-wide">Landing Page Antiga</span>
            </div>
            <span className="material-symbols-outlined text-white/40 group-hover:text-[#fe9249] transition-colors">arrow_forward_ios</span>
          </Link>

          {/* Link 3: Documento Mestre da Pascuti */}
          <Link href="/documento" className="group relative w-full flex items-center justify-between p-5 bg-gradient-to-br from-[#1B2A4A] to-[#041534] rounded-full shadow-[0_20px_40px_rgba(4,21,52,0.06)] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#fe9249]">
                <span className="material-symbols-outlined">description</span>
              </div>
              <span className="text-white font-semibold tracking-wide">Documento Mestre da Pascuti</span>
            </div>
            <span className="material-symbols-outlined text-white/40 group-hover:text-[#fe9249] transition-colors">arrow_forward_ios</span>
          </Link>

          {/* Link 4: Quiz */}
          <Link href="/inicio" className="group relative w-full flex items-center justify-between p-5 bg-gradient-to-br from-[#1B2A4A] to-[#041534] rounded-full shadow-[0_20px_40px_rgba(4,21,52,0.06)] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#fe9249]">
                <span className="material-symbols-outlined">quiz</span>
              </div>
              <span className="text-white font-semibold tracking-wide">Quiz</span>
            </div>
            <span className="material-symbols-outlined text-white/40 group-hover:text-[#fe9249] transition-colors">arrow_forward_ios</span>
          </Link>

          {/* Link 5: Acesso Administrador */}
          <Link href="/admin" className="group relative w-full flex items-center justify-between p-5 bg-[#e8e8e3] rounded-full transition-all duration-300 hover:bg-[#e3e3de] active:scale-95">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#041534]/5 flex items-center justify-center text-[#041534]">
                <span className="material-symbols-outlined">admin_panel_settings</span>
              </div>
              <span className="text-[#041534] font-semibold tracking-wide">Acesso Administrador</span>
            </div>
            <span className="material-symbols-outlined text-[#041534]/20 group-hover:text-[#994700] transition-colors">lock_open</span>
          </Link>
          
        </nav>

        {/* Social Icons */}
        <div className="mt-16 flex gap-6">
          <a href="#" className="text-[#041534]/40 hover:text-[#994700] transition-colors">
            <span className="material-symbols-outlined text-3xl">local_cafe</span>
          </a>
          <a href="#" className="text-[#041534]/40 hover:text-[#994700] transition-colors">
            <span className="material-symbols-outlined text-3xl">share</span>
          </a>
          <a href="#" className="text-[#041534]/40 hover:text-[#994700] transition-colors">
            <span className="material-symbols-outlined text-3xl">mail</span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#f4f4ef] w-full py-12 mt-auto flex flex-col items-center gap-6">
        <div className="text-sm tracking-wide text-[#041534]/60">
          © 2024 PASCUTI ROASTERS
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-sm tracking-wide text-[#1B2A4A]/60 hover:text-[#994700] transition-colors">Sustentabilidade</a>
          <a href="#" className="text-sm tracking-wide text-[#1B2A4A]/60 hover:text-[#994700] transition-colors">Contato</a>
        </div>
      </footer>
    </div>
  );
}
