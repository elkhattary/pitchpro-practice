import type { Feedback } from "../types/practice";

export function generateFeedback(
  response: string,
  question: string
): Feedback {
  const trimmedResponse = response.trim();

  const wordCount =
    trimmedResponse === ""
      ? 0
      : trimmedResponse.split(/\s+/).length;

  const text = trimmedResponse.toLowerCase();
  const questionText = question.toLowerCase();

  const hasExample =
    text.includes("project") ||
    text.includes("example") ||
    text.includes("built") ||
    text.includes("developed") ||
    text.includes("created") ||
    text.includes("worked") ||
    text.includes("experience");

  const hasOutcome =
    /\d/.test(response) ||
    text.includes("result") ||
    text.includes("improved") ||
    text.includes("increased") ||
    text.includes("reduced") ||
    text.includes("impact");

  const hasProblemLanguage =
    text.includes("problem") ||
    text.includes("challenge") ||
    text.includes("need") ||
    text.includes("pain");

  const hasAudienceLanguage =
    text.includes("student") ||
    text.includes("customer") ||
    text.includes("user") ||
    text.includes("professional") ||
    text.includes("team");

  const hasDifferentiationLanguage =
    text.includes("different") ||
    text.includes("instead") ||
    text.includes("unlike") ||
    text.includes("simple") ||
    text.includes("faster") ||
    text.includes("better");

  const hasValueLanguage =
    text.includes("value") ||
    text.includes("benefit") ||
    text.includes("useful") ||
    text.includes("help") ||
    text.includes("improve");

  const hasObjectionHandling =
    text.includes("understand") ||
    text.includes("concern") ||
    text.includes("trial") ||
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("evaluate");

  const hasGrowthLanguage =
    text.includes("grow") ||
    text.includes("expand") ||
    text.includes("market") ||
    text.includes("scale") ||
    text.includes("industry") ||
    text.includes("potential");

  const clarity =
    wordCount >= 35 && wordCount <= 120
      ? 95
      : wordCount >= 20
      ? 88
      : wordCount >= 10
      ? 80
      : 70;

  let relevance = 75;
  let specificity = 70;

  if (
    questionText.includes("technical challenge") ||
    questionText.includes("solved it")
  ) {
    relevance += hasExample ? 10 : 0;
    relevance += hasProblemLanguage ? 5 : 0;

    specificity += hasOutcome ? 15 : 0;
    specificity += hasExample ? 5 : 0;
  }

  if (
    questionText.includes("tell me about yourself") ||
    questionText.includes("why you're interested")
  ) {
    relevance += hasExample ? 7 : 0;
    relevance += text.includes("role") ? 5 : 0;

    specificity += hasExample ? 10 : 0;
    specificity += hasOutcome ? 5 : 0;
  }

  if (questionText.includes("why should we choose you")) {
    relevance += hasExample ? 5 : 0;
    relevance += text.includes("experience") ? 8 : 0;
    relevance += text.includes("learn") ? 4 : 0;

    specificity += hasOutcome ? 10 : 0;
    specificity += hasExample ? 5 : 0;
  }

  if (questionText.includes("what problem does your product solve")) {
    relevance += hasProblemLanguage ? 8 : 0;
    relevance += hasAudienceLanguage ? 8 : 0;

    specificity += hasAudienceLanguage ? 8 : 0;
    specificity += hasOutcome ? 6 : 0;
  }

  if (questionText.includes("what makes your solution different")) {
    relevance += hasDifferentiationLanguage ? 12 : 0;
    relevance += hasValueLanguage ? 5 : 0;

    specificity += hasDifferentiationLanguage ? 10 : 0;
    specificity += hasOutcome ? 6 : 0;
  }

  if (questionText.includes("potential to grow")) {
    relevance += hasGrowthLanguage ? 12 : 0;
    relevance += hasAudienceLanguage ? 4 : 0;

    specificity += hasGrowthLanguage ? 10 : 0;
    specificity += hasOutcome ? 5 : 0;
  }

  if (questionText.includes("short introduction to your product")) {
    relevance += hasValueLanguage ? 10 : 0;
    relevance += hasAudienceLanguage ? 5 : 0;

    specificity += hasOutcome ? 8 : 0;
    specificity += hasValueLanguage ? 5 : 0;
  }

  if (questionText.includes("instead of a competitor")) {
    relevance += hasDifferentiationLanguage ? 12 : 0;
    relevance += hasValueLanguage ? 5 : 0;

    specificity += hasDifferentiationLanguage ? 10 : 0;
    specificity += hasOutcome ? 5 : 0;
  }

  if (questionText.includes("price seems high")) {
    relevance += hasObjectionHandling ? 12 : 0;
    relevance += hasValueLanguage ? 6 : 0;

    specificity += hasObjectionHandling ? 10 : 0;
    specificity += hasOutcome ? 5 : 0;
  }

  relevance = Math.min(95, relevance);
  specificity = Math.min(95, specificity);

  const overall = Math.round(
    (clarity + relevance + specificity) / 3
  );

  let message =
    "Your response communicates the main idea clearly and stays focused on the question.";

  if (relevance >= 88 && specificity >= 85) {
    message =
      "Your response is focused, relevant, and supported with useful detail.";
  } else if (relevance >= 84) {
    message =
      "Your response addresses the question well and gives the listener a clear reason to stay engaged.";
  }

  let improvement =
    "Add one concrete example, result, or outcome to make the response more memorable.";

  if (wordCount < 30) {
    improvement =
      "Develop the answer slightly more with one specific example or supporting detail.";
  } else if (specificity >= 88) {
    improvement =
      "Keep the same level of detail, but tighten the conclusion so the answer ends more strongly.";
  } else if (relevance < 82) {
    improvement =
      "Make the connection to the exact question more explicit and remove anything that does not support your main point.";
  }

  return {
    overall,
    clarity,
    relevance,
    specificity,
    message,
    improvement,
  };
}
