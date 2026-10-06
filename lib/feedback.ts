import type { Feedback } from "../types/practice";

export function generateFeedback(response: string): Feedback {
  const wordCount =
    response.trim() === ""
      ? 0
      : response.trim().split(/\s+/).length;

  const lowerResponse = response.toLowerCase();

  const hasExample =
    lowerResponse.includes("project") ||
    lowerResponse.includes("built") ||
    lowerResponse.includes("developed") ||
    lowerResponse.includes("created") ||
    lowerResponse.includes("worked");

  const hasOutcome =
    /\d/.test(response) ||
    lowerResponse.includes("result") ||
    lowerResponse.includes("improved") ||
    lowerResponse.includes("increased") ||
    lowerResponse.includes("reduced");

  const clarity = Math.min(
    95,
    70 + Math.min(wordCount, 25)
  );

  const relevance = hasExample ? 86 : 76;

  const specificity = hasOutcome
    ? 90
    : hasExample
    ? 82
    : 68;

  const overall = Math.round(
    (clarity + relevance + specificity) / 3
  );

  return {
    overall,
    clarity,
    relevance,
    specificity,

    message: hasExample
      ? "Your response is clear and includes a useful example that makes your answer more credible."
      : "Your response communicates the main idea clearly and stays focused on the question.",

    improvement: hasOutcome
      ? "Keep the answer concise and make the connection to the question even more explicit."
      : "Add a concrete result, number, or outcome to make your response more memorable.",
  };
}
