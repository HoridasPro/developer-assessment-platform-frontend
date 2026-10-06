// export type TAttemptQuestionOption = {
//   id: string;
//   text: string;
// };

// export type TAttemptQuestion = {
//   id: string;
//   title: string;
//   description: string;
//   type: string;
//   category: string;
//   Difficulty: string;
//   marks: number;
//   options: TAttemptQuestionOption[];
// };
export type TAttemptOption = {
  id: string;
  text: string;
};

export type TAttemptQuestion = {
  id: string;
  title: string;
  description: string;
  type: "MCQ" | "WRITTEN" | "CODING";
  category: string;
  Difficulty: string;
  marks: number;
  options: TAttemptOption[];
};

export type TAttemptData = {
  attemptId: string;
  assessmentId: string;
  attemptNumber: number;
  status: string;
  startedAt: string;
  expiresAt: string;
  questions: TAttemptQuestion[];
};
