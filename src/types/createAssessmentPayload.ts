export type TCreateAssessmentPayload = {
  title: string;
  description: string;
  duration: number;
  passingScore: number;
  maxAttempts: number;
  price: number;
  startAt: string;
  endAt: string;
};
