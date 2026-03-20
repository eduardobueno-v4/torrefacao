import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Lead, QuizAnswer } from './types';

export type ABVariant = 'A' | 'B';

interface QuizStore {
  lead: Partial<Lead>;
  quizAnswer: Partial<QuizAnswer>;
  variant: ABVariant | null;
  setLead: (lead: Partial<Lead>) => void;
  setQuizAnswer: (answer: Partial<QuizAnswer>) => void;
  assignVariant: () => void;
  forceVariant: (v: ABVariant) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      lead: {},
      quizAnswer: {},
      variant: null,
      assignVariant: () => {
        if (!get().variant) {
          const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
          set({ variant: randomVariant });
        }
      },
      forceVariant: (v: ABVariant) => set({ variant: v }),
      setLead: (lead) => set((state) => ({ lead: { ...state.lead, ...lead } })),
      setQuizAnswer: (answer) => set((state) => ({ quizAnswer: { ...state.quizAnswer, ...answer } })),
      reset: () => set((state) => ({ lead: {}, quizAnswer: {}, variant: state.variant })), // keep variant on reset
    }),
    {
      name: 'pascuti-ab-test-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
