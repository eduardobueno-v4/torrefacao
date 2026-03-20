"use client";
import { useState, useEffect } from 'react';
import { useQuizStore } from '@/lib/store';
import { PASCUTI_CONSTANTS } from '@/lib/constants';
import { FichaTecnica } from '@/lib/types';
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ficha, setFicha] = useState<FichaTecnica>(PASCUTI_CONSTANTS.PLACEHOLDER_FICHA_TECNICA);
  const [activeTab, setActiveTab] = useState<'ficha' | 'leads' | 'stats'>('stats');

  const storeState = useQuizStore((state) => state); // get all states for simple mock admin
  const mockLeads = storeState.lead?.nome ? [storeState.lead] : [];

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('pascuti_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Load local storage saved ficha if any
    const localFicha = localStorage.getItem('pascuti_ficha_tecnica');
    if (localFicha) setFicha(JSON.parse(localFicha));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'pascuti2026';
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('pascuti_admin_auth', 'true');
    } else {
      setError('Senha incorreta.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('pascuti_admin_auth');
  };

  const saveFicha = () => {
    localStorage.setItem('pascuti_ficha_tecnica', JSON.stringify(ficha));
    alert('Ficha Técnica atualizada! (No momento salva no LocalStorage, antes da integração Sheet)');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-pascuti-offWhite flex items-center justify-center p-6 text-pascuti-black">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-sm w-full">
          <h1 className={`${playfair.className} text-2xl font-bold text-pascuti-navyBlue text-center mb-6`}>Painel do Mestre</h1>
          <input 
            type="password" placeholder="Senha de acesso" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full p-4 border rounded-xl mb-4 bg-gray-50 focus:border-pascuti-orangeDiamond outline-none transition" 
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="w-full bg-pascuti-navyBlue hover:bg-[#0a1a3a] text-white py-4 font-bold rounded-xl transition">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-pascuti-black flex flex-col xl:flex-row">
      {/* Sidebar */}
      <div className="w-full xl:w-64 bg-pascuti-navyBlue text-white p-6 flex flex-col gap-4">
        <h1 className={`${playfair.className} text-xl font-bold tracking-wider mb-6 text-pascuti-orangeDiamond`}>PASCUTI<br/><span className="text-sm text-gray-400 font-sans tracking-normal">Admin Panel</span></h1>
        
        <button onClick={() => setActiveTab('stats')} className={`text-left p-3 rounded-xl transition ${activeTab === 'stats' ? 'bg-white/10 font-bold' : 'hover:bg-white/5 opacity-70'}`}>Estatísticas Gerais</button>
        <button onClick={() => setActiveTab('ficha')} className={`text-left p-3 rounded-xl transition ${activeTab === 'ficha' ? 'bg-white/10 font-bold' : 'hover:bg-white/5 opacity-70'}`}>Ficha Técnica do Lote</button>
        <button onClick={() => setActiveTab('leads')} className={`text-left p-3 rounded-xl transition ${activeTab === 'leads' ? 'bg-white/10 font-bold' : 'hover:bg-white/5 opacity-70'}`}>Base de Leads</button>

        <button onClick={handleLogout} className="mt-auto opacity-50 text-sm hover:underline self-start">Sair</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 max-w-6xl w-full">
        {activeTab === 'stats' && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-2xl font-bold mb-8">Dashboard de Captação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm font-medium">Total Participantes</p>
                <p className="text-3xl font-bold text-pascuti-orangeDiamond mt-2">{mockLeads.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm font-medium">Score Médio</p>
                <p className="text-3xl font-bold text-pascuti-navyBlue mt-2">--</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm font-medium">Taxa Conclusão (Degustação)</p>
                <p className="text-3xl font-bold text-green-600 mt-2">--%</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm font-medium">Classificação Elite</p>
                <p className="text-3xl font-bold text-amber-500 mt-2">--</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ficha' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 max-w-2xl">
            <h2 className="text-2xl font-bold mb-8 text-pascuti-navyBlue">Ajuste dos Parâmetros Sensoriais</h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-8">
               
               <div>
                 <label className="font-bold mb-2 block">Diferença de Sabor Teto (Intensidade)</label>
                 <input type="range" min="0" max="10" value={ficha.sabor.intensidade} onChange={e => setFicha({...ficha, sabor: {...ficha.sabor, intensidade: parseInt(e.target.value)}})} className="w-full accent-pascuti-orangeDiamond" />
                 <p className="text-sm font-bold text-right text-gray-400 mt-2">{ficha.sabor.intensidade}/10</p>
               </div>

               <div>
                 <label className="font-bold mb-2 block">Doçura (Intensidade)</label>
                 <input type="range" min="0" max="10" value={ficha.docura.intensidade} onChange={e => setFicha({...ficha, docura: {...ficha.docura, intensidade: parseInt(e.target.value)}})} className="w-full accent-pascuti-orangeDiamond" />
                 <p className="text-sm font-bold text-right text-gray-400 mt-2">{ficha.docura.intensidade}/10</p>
               </div>

               <div>
                 <label className="font-bold mb-2 block">Acidez (Intensidade)</label>
                 <input type="range" min="0" max="10" value={ficha.acidez.intensidade} onChange={e => setFicha({...ficha, acidez: {...ficha.acidez, intensidade: parseInt(e.target.value)}})} className="w-full accent-pascuti-orangeDiamond" />
                 <p className="text-sm font-bold text-right text-gray-400 mt-2">{ficha.acidez.intensidade}/10</p>
                 
                 <label className="font-xs font-semibold text-gray-400 uppercase mt-4 block">Tipo principal de acidez</label>
                 <select value={ficha.acidez.tipo} onChange={e => setFicha({...ficha, acidez: {...ficha.acidez, tipo: e.target.value}})} className="w-full p-3 border rounded-lg bg-gray-50 mt-1">
                    {['Cítrica/viva', 'Frutada/suave', 'Avinagrada', 'Não identifiquei'].map(v => <option key={v} value={v}>{v}</option>)}
                 </select>
               </div>

               <button onClick={saveFicha} className="mt-4 bg-pascuti-orangeDiamond hover:bg-orange-600 text-white font-bold py-4 rounded-full shadow-lg transition">Atualizar Ficha no Sistema</button>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Leads Captados Recentes</h2>
              <button disabled className="bg-gray-200 text-gray-400 px-4 py-2 rounded-lg font-bold text-sm cursor-not-allowed hidden md:block">Exportar CSV (Em breve)</button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 font-semibold border-b">
                  <tr>
                    <th className="p-4">Nome</th>
                    <th className="p-4">Empresa</th>
                    <th className="p-4">WhatsApp</th>
                    <th className="p-4">Etapa Teste</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeads.map((l, idx) => (
                    <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="p-4 font-medium">{l.nome || 'Visitante'} {l.sobrenome}</td>
                      <td className="p-4 text-gray-600">{l.empresa || '-'}</td>
                      <td className="p-4 text-gray-600">{l.telefone || '-'}</td>
                      <td className="p-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">Teste Local/Aivo</span></td>
                    </tr>
                  ))}
                  {mockLeads.length === 0 && (
                    <tr><td colSpan={4} className="p-8 text-center text-gray-400">Nenhum lead preenchido localmente no Zustand. Abra o quiz e use para ver aqui.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
