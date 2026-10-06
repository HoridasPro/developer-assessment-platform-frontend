export type EvaluateAnswerPayload = {
  questionId: string;
  marks: number;
  type: "WRITTEN" | "CODING";
};

export type EvaluateAnswersPayload = {
  answers: EvaluateAnswerPayload[];
};
