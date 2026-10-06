export type CompanyAttempt = {
  id: string;
  attemptNumber: number;
  status: string;
  startedAt: string;
  submittedAt: string | null;
  expiresAt: string;
  score: number | null;

  assessment: {
    id: string;
    title: string;
    passingScore: number;
  };

  candidate: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;

    candidateProfile: {
      phone: string | null;
      location: string | null;
      skills: string[];
    } | null;
  };
};

export type CompanyAttemptsResponse = {
  success: boolean;
  message: string;
  data: CompanyAttempt[];
};
