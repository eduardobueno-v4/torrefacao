import { create } from 'zustand';
import { Lead, QuizAnswer } from './types';

interface QuizStore {
  lead: Partial<Lead>;
  quizAnswer: Partial<QuizAnswer>;
  setLead: (lead: Partial<Lead>) => void;
  setQuizAnswer: (answer: Partial<QuizAnswer>) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  lead: {},
  quizAnswer: {},
  setLead: (lead) => set((state) => ({ lead: { ...state.lead, ...lead } })),
  setQuizAnswer: (answer) => set((state) => ({ quizAnswer: { ...state.quizAnswer, ...answer } })),
  reset: () => set({ lead: {}, quizAnswer: {} }),
}));
