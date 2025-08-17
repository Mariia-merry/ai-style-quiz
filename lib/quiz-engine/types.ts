export type StyleKey = "minimal" | "bold" | "cozy";
export type QuizOption = {
  id: string;
  label: string;
  image: string;
  scores: Partial<Record<StyleKey, number>>;
};
export type QuizQuestion = {
  id: string;
  title: string;
  type: "single";
  options: QuizOption[];
};
export type QuizData = {
  title: string;
  questions: QuizQuestion[];
}; 