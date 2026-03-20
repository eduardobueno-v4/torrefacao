"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/store';

export default function Cadastro() {
  const router = useRouter();
  const setLead = useQuizStore((state) => state.setLead);
  
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    telefone: '',
    empresa: '',
    email: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPhone = (value: string) => {
    const raw = value.replace(/\D/g, '');
    if (raw.length <= 2) return raw;
    if (raw.length <= 7) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === 'telefone') {
      value = formatPhone(value);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.nome.length < 2) newErrors.nome = 'Nome muito curto';
    if (formData.sobrenome.length < 2) newErrors.sobrenome = 'Sobrenome muito curto';
    if (formData.telefone.replace(/\D/g, '').length < 10) newErrors.telefone = 'Telefone inválido';
    if (formData.empresa.length < 2) newErrors.empresa = 'Empresa inválida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLead({
        id: crypto.randomUUID(),
        ...formData,
        completouDegustacao: false,
        completouQuiz: false,
        timestamp: new Date().toISOString()
      });
      router.push('/degustacao');
    }
  };

  return (
    <div className="min-h-screen bg-pascuti-offWhite text-pascuti-black px-6 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <p className="font-playfair text-2xl font-bold mb-1 tracking-widest text-pascuti-navyBlue">PASCUTI</p>
          <div className="w-2 h-2 mx-auto rotate-45 bg-pascuti-orangeDiamond mb-6"></div>
          <h2 className="text-2xl font-bold font-playfair text-pascuti-black">
            Antes de começar, conta pra gente quem você é
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input 
              name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} 
              className={`w-full p-4 border rounded-lg bg-white ${errors.nome ? 'border-red-500' : 'border-gray-300'}`} 
            />
            {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
          </div>

          <div>
            <input 
              name="sobrenome" placeholder="Sobrenome" value={formData.sobrenome} onChange={handleChange} 
              className={`w-full p-4 border rounded-lg bg-white ${errors.sobrenome ? 'border-red-500' : 'border-gray-300'}`} 
            />
            {errors.sobrenome && <p className="text-red-500 text-xs mt-1">{errors.sobrenome}</p>}
          </div>

          <div>
            <input 
              name="telefone" placeholder="Telefone / WhatsApp" value={formData.telefone} onChange={handleChange} 
              className={`w-full p-4 border rounded-lg bg-white ${errors.telefone ? 'border-red-500' : 'border-gray-300'}`} 
            />
            {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
          </div>

          <div>
            <input 
              name="empresa" placeholder="Nome da sua empresa ou 'Pessoa Física'" value={formData.empresa} onChange={handleChange} 
              className={`w-full p-4 border rounded-lg bg-white ${errors.empresa ? 'border-red-500' : 'border-gray-300'}`} 
            />
            {errors.empresa && <p className="text-red-500 text-xs mt-1">{errors.empresa}</p>}
          </div>

          <div>
            <input 
              name="email" placeholder="E-mail (Opcional)" value={formData.email} onChange={handleChange} 
              className="w-full p-4 border rounded-lg bg-white border-gray-300" 
              type="email"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-pascuti-orangeDiamond hover:bg-orange-600 text-white font-medium text-lg py-4 rounded-full mt-4 transition transition-colors shadow-lg"
          >
            Vamos lá!
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-4 leading-tight px-4">
            Seus dados são usados apenas para o sorteio e contato comercial.
          </p>
        </form>
      </div>
    </div>
  );
}
