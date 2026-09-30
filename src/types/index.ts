export type ScreenStep =
  | 'welcome'
  | 'intro'
  | 'game1' // Catch the Hearts
  | 'game2' // Sister Memory
  | 'game3' // Sister Quiz
  | 'game4' // Love Meter
  | 'unlock' // Dramatic Award Reveal
  | 'certificate'; // Final Award Card & Download

export type SisterLevel =
  | 'Rookie Sister 🌱'
  | 'Heart Catcher ❤️'
  | 'Memory Master 🧠'
  | 'Quiz Queen 👑'
  | 'Love Champion 💖'
  | 'LEGENDARY SISTER 🏆';

export interface SisterGameState {
  currentScreen: ScreenStep;
  sisterName: string;
  game1Completed: boolean;
  game2Completed: boolean;
  game3Completed: boolean;
  game4Completed: boolean;
  sisterLevel: SisterLevel;
}
