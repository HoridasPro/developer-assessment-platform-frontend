export type AddQuestionsPayload = {
  assessmentId: string;

  options: {
    questionId: string;
    order: number;
  }[];
};