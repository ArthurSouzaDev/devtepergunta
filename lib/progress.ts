export type Progress = {
  /** Pautas concluídas em sequência sem pular */
  streak: number;
  /** Maior sequência já alcançada */
  best: number;
  /** Total de pautas concluídas */
  total: number;
};

export const EMPTY_PROGRESS: Progress = { streak: 0, best: 0, total: 0 };

export function win(p: Progress): Progress {
  const streak = p.streak + 1;
  return {
    streak,
    best: Math.max(p.best, streak),
    total: p.total + 1,
  };
}

export function lose(p: Progress): Progress {
  return { ...p, streak: 0 };
}

/** Mensagem curta de acordo com a sequência atual */
export function streakMessage(streak: number): string {
  if (streak === 0) return "Hora de começar uma sequência.";
  if (streak === 1) return "Primeira vitória. Bora!";
  if (streak < 3) return "Aquecendo...";
  if (streak < 5) return "Pegando ritmo.";
  if (streak < 10) return "Em chamas.";
  return "Imparável.";
}
