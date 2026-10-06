export type SubmitAnswerPayload =
  | {
      questionId: string;
      type: "MCQ";
      answer: {
        optionId: string;
      };
    }
  | {
      questionId: string;
      type: "WRITTEN";
      answer: {
        text: string;
      };
    }
  | {
      questionId: string;
      type: "CODING";
      answer: {
        code: string;
      };
    };
