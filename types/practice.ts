export type Feedback = {
  overall: number;
  clarity: number;
  relevance: number;
  specificity: number;
  message: string;
  improvement: string;
};

export type QuestionResult = {
  question: string;
  response: string;
  feedback: Feedback;
};

export type Scenario = {
  title: string;
  role: string;
  questions: string[];
};