import type { Scenario } from "../types/practice";

export const scenarios: Record<string, Scenario> = {
  "job-interview": {
    title: "Job Interview",
    role: "Interviewer",
    questions: [
      "Tell me about yourself and why you're interested in this role.",
      "Tell me about a technical challenge you faced and how you solved it.",
      "Why should we choose you for this software engineering role?",
    ],
  },

  "startup-pitch": {
    title: "Startup Pitch",
    role: "Investor",
    questions: [
      "What problem does your product solve, and who experiences this problem?",
      "What makes your solution different from the alternatives already available?",
      "Why do you believe this idea has the potential to grow?",
    ],
  },

  "sales-conversation": {
    title: "Sales Conversation",
    role: "Prospect",
    questions: [
      "Give me a short introduction to your product and why it might be useful to me.",
      "Why should I choose your solution instead of a competitor?",
      "I'm interested, but the price seems high. How would you respond?",
    ],
  },
};
