"use client";

import { useState } from "react";
import ScenarioSelector from "./components/ScenarioSelector";

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
   const [response, setResponse] = useState("");
   const [isLoading, setIsLoading] = useState(false);

  const [feedback, setFeedback] = useState<null | {
    overall: number;
    clarity: number;
    relevance: number;
    specificity: number;
    message: string;
    improvement: string;
  }>(null);

  const [error, setError] = useState("");
  const handleSubmit = () => {
  const wordCount =
    response.trim() === "" ? 0 : response.trim().split(/\s+/).length;

  if (wordCount < 8) {
    setError("Please write a little more before submitting your response.");
    return;
  }

  setError("");
  setFeedback(null);
  setIsLoading(true);

  setTimeout(() => {
    const hasExample =
      response.toLowerCase().includes("project") ||
      response.toLowerCase().includes("built") ||
      response.toLowerCase().includes("developed");

    const clarity = Math.min(95, 70 + Math.min(wordCount, 25));
    const relevance = hasExample ? 86 : 76;
    const specificity = hasExample ? 84 : 68;

    const overall = Math.round(
      (clarity + relevance + specificity) / 3
    );

    setFeedback({
      overall,
      clarity,
      relevance,
      specificity,
      message:
        "Strong start. Your response is clear and connects your background to the role.",
      improvement: hasExample
        ? "Make the example even stronger by mentioning the result or impact of your work."
        : "Add one concrete project or achievement to make your answer more memorable.",
    });

    setIsLoading(false);
  }, 1200);
};
  if (selectedScenario) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => setSelectedScenario(null)}
            className="mb-10 text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to scenarios
          </button>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Practice session
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            {selectedScenario === "job-interview" && "Job Interview"}

            {selectedScenario === "startup-pitch" && "Startup Pitch"}

            {selectedScenario === "sales-conversation" &&
              "Sales Conversation"}
          </h1>

          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">
  <div className="flex items-center justify-between">
    <p className="text-sm text-slate-400">Question 1 of 3</p>

    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
      Interviewer
    </span>
  </div>

  <div className="mt-5 flex gap-2">
    <div className="h-1.5 flex-1 rounded-full bg-indigo-500" />
    <div className="h-1.5 flex-1 rounded-full bg-slate-700" />
    <div className="h-1.5 flex-1 rounded-full bg-slate-700" />
  </div>

  <h2 className="mt-8 text-2xl font-semibold leading-relaxed">
    Tell me about yourself and why you're interested in this role.
  </h2>

  <p className="mt-3 text-sm text-slate-400">
    Aim for a clear, focused response. A strong answer is usually around 60–120
    words.
  </p>

 <textarea
  rows={7}
  value={response}
  onChange={(event) => setResponse(event.target.value)}
  placeholder="Type your response here..."
  className="mt-8 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
/>

  <div className="mt-4 flex items-center justify-between">
    <span className="text-sm text-slate-500">
  {response.trim() === ""
    ? 0
    : response.trim().split(/\s+/).length}{" "}
  words
 </span>

    <button
  type="button"
  onClick={handleSubmit}
  disabled={isLoading}
  className="rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
>
  {isLoading ? "Analyzing..." : "Submit response →"}
    </button>
  </div>{error && (
  <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
    {error}
  </div>
)}

{isLoading && (
  <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-5">
    <p className="font-medium text-white">Analyzing your response...</p>

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
        <p className="text-sm font-medium text-indigo-400">Feedback</p>
        <h3 className="mt-1 text-xl font-semibold text-white">
          Nice start.
        </h3>
      </div>

      <div className="text-right">
        <p className="text-3xl font-bold text-white">
          {feedback.overall}
        </p>
        <p className="text-xs text-slate-500">Overall</p>
      </div>
    </div>

    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl bg-slate-900 p-4">
        <p className="text-sm text-slate-400">Clarity</p>
        <p className="mt-1 text-2xl font-semibold">
          {feedback.clarity}
        </p>
      </div>

      <div className="rounded-xl bg-slate-900 p-4">
        <p className="text-sm text-slate-400">Relevance</p>
        <p className="mt-1 text-2xl font-semibold">
          {feedback.relevance}
        </p>
      </div>

      <div className="rounded-xl bg-slate-900 p-4">
        <p className="text-sm text-slate-400">Specificity</p>
        <p className="mt-1 text-2xl font-semibold">
          {feedback.specificity}
        </p>
      </div>
    </div>

    <div className="mt-6 space-y-4">
      <div>
        <p className="text-sm font-semibold text-white">What worked</p>
        <p className="mt-1 text-sm leading-6 text-slate-400">
          {feedback.message}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-white">Improve</p>
        <p className="mt-1 text-sm leading-6 text-slate-400">
          {feedback.improvement}
        </p>
      </div>
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
            Build confidence through short, focused practice sessions with
            actionable feedback after every response.
          </p>

          <a
            href="#scenarios"
            className="mt-10 w-fit rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Choose a scenario
          </a>
        </section>

        <div id="scenarios">
          <ScenarioSelector onSelect={setSelectedScenario} />
        </div>
      </div>
    </main>
  );
}
