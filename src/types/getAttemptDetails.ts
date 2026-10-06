export type AttemptAnswerOption = {
  id: string;
  text: string;
  isCorrect?: boolean;
};

export type AttemptAnswerQuestion = {
  id: string;
  title: string;
  description: string;
  type: "MCQ" | "WRITTEN" | "CODING";
  category: string;
  difficulty: string;
  marks: number;
  options: AttemptAnswerOption[];
};

export type AttemptAnswer = {
  id: string;
  questionId: string;
  question: AttemptAnswerQuestion;
  selectedOptionId: string | null;
  selectedOption: {
    id: string;
    text: string;
  } | null;
  writtenAnswer: string | null;
  codeAnswer: string | null;
};

export type AttemptDetails = {
  id: string;

  assessment: {
    id: string;
    title: string;
    description: string;
    passingScore: number;
    duration: number;
  };

  candidate: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
    candidateProfile: {
      bio: string | null;
      phone: string | null;
      location: string | null;
      skills: string[];
      experience: number | null;
      education: string | null;
      resumeUrl: string | null;
      portfolioUrl: string | null;
      githubUrl: string | null;
      linkedinUrl: string | null;
    } | null;
  };

  attemptNumber: number;
  status: string;
  startedAt: string;
  submittedAt: string | null;
  expiresAt: string;
  score: number | null;

  answers: AttemptAnswer[];
};

export type AttemptDetailsResponse = {
  success: boolean;
  message: string;
  data: AttemptDetails;
};
