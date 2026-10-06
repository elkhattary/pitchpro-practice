"use client";

import { useState } from "react";
import ScenarioSelector from "./components/ScenarioSelector";
import PracticeSession from "./components/PracticeSession";
import PerformanceReport from "./components/PerformanceReport";
import { scenarios } from "../data/scenarios";
import type { QuestionResult } from "../types/practice";

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [showReport, setShowReport] = useState(false);

  const scenario = selectedScenario
    ? scenarios[selectedScenario]
    : null;

  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setResults([]);
    setShowReport(false);
  };

  const handleBackToScenarios = () => {
    setSelectedScenario(null);
    setResults([]);
    setShowReport(false);
  };

  const handleComplete = (sessionResults: QuestionResult[]) => {
    setResults(sessionResults);
    setShowReport(true);
  };

  const handlePracticeAgain = () => {
    setResults([]);
    setShowReport(false);
  };

  if (selectedScenario && scenario && showReport) {
    return (
      <PerformanceReport
        scenario={scenario}
        results={results}
        onPracticeAgain={handlePracticeAgain}
        onChooseScenario={handleBackToScenarios}
      />
    );
  }

  if (selectedScenario && scenario) {
    return (
      <PracticeSession
        scenario={scenario}
        onBack={handleBackToScenarios}
        onComplete={handleComplete}
      />
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
          <ScenarioSelector onSelect={handleSelectScenario} />
        </div>
      </div>
    </main>
  );
}