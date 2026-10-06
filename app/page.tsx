"use client";

import { useState } from "react";
import ScenarioSelector from "./components/ScenarioSelector";

type Feedback = {
  overall: number;
  clarity: number;
  relevance: number;
  specificity: number;
  message: string;
  improvement: string;
};

type QuestionResult = {
  question: string;
  response: string;
  feedback: Feedback;
};

type Scenario = {
  title: string;
  role: string;
  questions: string[];
};

const scenarios: Record<string, Scenario> = {
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

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [response, setResponse] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const [error, setError] = useState("");

  const [results, setResults] = useState<QuestionResult[]>([]);

  const [showReport, setShowReport] = useState(false);

  const scenario = selectedScenario
    ? scenarios[selectedScenario]
    : null;

  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setCurrentQuestion(0);
    setResponse("");
    setFeedback(null);
    setError("");
    setResults([]);
    setShowReport(false);
  };

  const handleBackToScenarios = () => {
    setSelectedScenario(null);
    setCurrentQuestion(0);
    setResponse("");
    setFeedback(null);
    setError("");
    setResults([]);
    setShowReport(false);
  };

  const handleSubmit = () => {
    if (!scenario) return;

    const wordCount =
      response.trim() === ""
        ? 0
        : response.trim().split(/\s+/).length;

    if (wordCount < 8) {
      setError(
        "Please write a little more before submitting your response."
      );
      return;
    }

    setError("");
    setFeedback(null);
    setIsLoading(true);

    setTimeout(() => {
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

      const generatedFeedback: Feedback = {
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

      setFeedback(generatedFeedback);

      setResults((previousResults) => [
        ...previousResults,
        {
          question: scenario.questions[currentQuestion],
          response,
          feedback: generatedFeedback,
        },
      ]);

      setIsLoading(false);
    }, 1200);
  };

  const handleContinue = () => {
    if (currentQuestion < 2) {
      setCurrentQuestion((previous) => previous + 1);
      setResponse("");
      setFeedback(null);
      setError("");
    } else {
      setShowReport(true);
    }
  };

  const handlePracticeAgain = () => {
    setCurrentQuestion(0);
    setResponse("");
    setFeedback(null);
    setError("");
    setResults([]);
    setShowReport(false);
  };

  const averageScore = (
    key: "overall" | "clarity" | "relevance" | "specificity"
  ) => {
    if (results.length === 0) return 0;

    const total = results.reduce(
      (sum, result) => sum + result.feedback[key],
      0
    );

    return Math.round(total / results.length);
  };

  if (selectedScenario && scenario) {
    if (showReport) {
      return (
        <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
          <div className="mx-auto max-w-4xl">
            <button
              onClick={handleBackToScenarios}
              className="mb-10 text-sm text-slate-400 transition hover:text-white"
            >
              ← Back to scenarios
            </button>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Session complete
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Your performance report
            </h1>

            <p className="mt-3 text-slate-400">
              {scenario.title} · 3 questions completed
            </p>

            <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    Overall performance
                  </p>

                  <p className="mt-2 text-6xl font-bold">
                    {averageScore("overall")}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    out of 100
                  </p>
                </div>

                <div className="grid flex-1 gap-3 sm:max-w-xl sm:grid-cols-3">
                  <div className="rounded-xl bg-slate-950 p-5">
                    <p className="text-sm text-slate-400">
                      Clarity
                    </p>

                    <p className="mt-2 text-2xl font-semibold">
                      {averageScore("clarity")}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-5">
                    <p className="text-sm text-slate-400">
                      Relevance
                    </p>

                    <p className="mt-2 text-2xl font-semibold">
                      {averageScore("relevance")}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-5">
                    <p className="text-sm text-slate-400">
                      Specificity
                    </p>

                    <p className="mt-2 text-2xl font-semibold">
                      {averageScore("specificity")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-slate-800 pt-8">
                <h2 className="text-xl font-semibold">
                  Session summary
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                  You communicated your ideas clearly across the
                  session. Your next opportunity is to make your
                  answers more memorable by using concrete examples,
                  measurable outcomes, and concise conclusions.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-semibold">
                  Question breakdown
                </h2>

                <div className="mt-5 space-y-3">
                  {results.map((result, index) => (
                    <div
                      key={result.question}
                      className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-5"
                    >
                      <div className="pr-6">
                        <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">
                          Question {index + 1}
                        </p>

                        <p className="mt-2 text-sm text-slate-300">
                          {result.question}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold">
                          {result.feedback.overall}
                        </p>

                        <p className="text-xs text-slate-500">
                          score
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handlePracticeAgain}
                  className="rounded-xl bg-indigo-500 px-6 py-3 font-semibold transition hover:bg-indigo-400"
                >
                  Practice again
                </button>

                <button
                  onClick={handleBackToScenarios}
                  className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
                >
                  Choose another scenario
                </button>
              </div>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={handleBackToScenarios}
            className="mb-10 text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to scenarios
          </button>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Practice session
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            {scenario.title}
          </h1>

          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Question {currentQuestion + 1} of 3
              </p>

              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                {scenario.role}
              </span>
            </div>

            <div className="mt-5 flex gap-2">
              {[0, 1, 2].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 flex-1 rounded-full ${
                    step <= currentQuestion
                      ? "bg-indigo-500"
                      : "bg-slate-700"
                  }`}
                />
              ))}
            </div>

            <h2 className="mt-8 text-2xl font-semibold leading-relaxed">
              {scenario.questions[currentQuestion]}
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              Aim for a clear, focused response. A strong answer is
              usually around 60–120 words.
            </p>

            <textarea
              rows={7}
              value={response}
              onChange={(event) => {
                setResponse(event.target.value);

                if (error) {
                  setError("");
                }
              }}
              disabled={Boolean(feedback) || isLoading}
              placeholder="Type your response here..."
              className="mt-8 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
            />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                {response.trim() === ""
                  ? 0
                  : response.trim().split(/\s+/).length}{" "}
                words
              </span>

              {!feedback && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading
                    ? "Analyzing..."
                    : "Submit response →"}
                </button>
              )}
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-5">
                <p className="font-medium text-white">
                  Analyzing your response...
                </p>

                <div className="mt-4 space-y-2 text-sm text-slate-400">
                  <p>• Checking clarity</p>
                  <p>• Evaluating relevance</p>
                  <p>• Looking for concrete examples</p>
                </div>
              </div>
            )}

            {feedback && !isLoading && (
              <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-400">
                      Feedback
                    </p>

                    <h3 className="mt-1 text-xl font-semibold">
                      Nice work.
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold">
                      {feedback.overall}
                    </p>

                    <p className="text-xs text-slate-500">
                      Overall
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-slate-900 p-4">
                    <p className="text-sm text-slate-400">
                      Clarity
                    </p>

                    <p className="mt-1 text-2xl font-semibold">
                      {feedback.clarity}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-4">
                    <p className="text-sm text-slate-400">
                      Relevance
                    </p>

                    <p className="mt-1 text-2xl font-semibold">
                      {feedback.relevance}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-4">
                    <p className="text-sm text-slate-400">
                      Specificity
                    </p>

                    <p className="mt-1 text-2xl font-semibold">
                      {feedback.specificity}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-sm font-semibold">
                      What worked
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {feedback.message}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Improve
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {feedback.improvement}
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex justify-end">
                  <button
                    onClick={handleContinue}
                    className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
                  >
                    {currentQuestion === 2
                      ? "View performance report →"
                      : "Continue →"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <section className="flex min-h-[70vh] flex-col justify-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-400">
            PracticeRoom
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
            Practice the conversations that matter.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Build confidence through short, focused practice
            sessions with actionable feedback after every response.
          </p>

          <a
            href="#scenarios"
            className="mt-10 w-fit rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Choose a scenario
          </a>
        </section>

        <div id="scenarios">
          <ScenarioSelector onSelect={handleSelectScenario} />
        </div>
      </div>
    </main>
  );
}
