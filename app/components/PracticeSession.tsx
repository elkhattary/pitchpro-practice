"use client";

import { useState } from "react";
import type { QuestionResult, Scenario } from "../../types/practice";
import { generateFeedback } from "../../lib/feedback";
import FeedbackCard from "./FeedbackCard";

type PracticeSessionProps = {
  scenario: Scenario;
  onBack: () => void;
  onComplete: (results: QuestionResult[]) => void;
};

export default function PracticeSession({
  scenario,
  onBack,
  onComplete,
}: PracticeSessionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<ReturnType<
    typeof generateFeedback
  > | null>(null);
  const [error, setError] = useState("");
  const [analysisError, setAnalysisError] = useState("");
  const [hasRetried, setHasRetried] = useState(false);
  const [results, setResults] = useState<QuestionResult[]>([]);

  const handleSubmit = () => {
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
    setAnalysisError("");
    setFeedback(null);
    setIsLoading(true);

    setTimeout(() => {
      const shouldFail =
  response.toLowerCase().includes("simulate error") &&
  !hasRetried;

if (shouldFail) {
  setAnalysisError(
    "We couldn't analyze your response. Your answer is safe — please try again."
  );
  setHasRetried(true);
  setIsLoading(false);
  return;
}
      const generatedFeedback = generateFeedback(
  response,
  scenario.questions[currentQuestion]
);

      const nextResult: QuestionResult = {
        question: scenario.questions[currentQuestion],
        response,
        feedback: generatedFeedback,
      };

      setFeedback(generatedFeedback);
      setResults((previous) => [...previous, nextResult]);
      setIsLoading(false);
    }, 1200);
  };

  const handleContinue = () => {
    if (currentQuestion < scenario.questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setResponse("");
      setFeedback(null);
      setError("");
      setAnalysisError("");
      setHasRetried(false);
      return;
    }

    onComplete(results);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={onBack}
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
              Question {currentQuestion + 1} of{" "}
              {scenario.questions.length}
            </p>

            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
              {scenario.role}
            </span>
          </div>

          <div className="mt-5 flex gap-2">
            {scenario.questions.map((_, step) => (
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
          {analysisError && (
  <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
    <p className="font-medium text-amber-200">
      Analysis failed
    </p>

    <p className="mt-2 text-sm leading-6 text-amber-100/80">
      {analysisError}
    </p>

    <button
      type="button"
      onClick={handleSubmit}
      className="mt-4 rounded-lg border border-amber-400/30 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/10"
    >
      Try again
    </button>
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
            <FeedbackCard
              feedback={feedback}
              currentQuestion={currentQuestion}
              onContinue={handleContinue}
            />
          )}
        </div>
      </div>
    </main>
  );
}
