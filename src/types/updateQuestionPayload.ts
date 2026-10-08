export type UpdateQuestionPayload = {
  id: string;
  title: string;
  description: string;
  type: "MCQ" | "CODING" | "WRITTEN";
  category: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  marks: number;
  option?: string;
  options?: {
    text: string;
    isCorrect: boolean;
  }[];
};
