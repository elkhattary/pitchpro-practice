import type { QuestionResult, Scenario } from "../../types/practice";

type PerformanceReportProps = {
  scenario: Scenario;
  results: QuestionResult[];
  onPracticeAgain: () => void;
  onChooseScenario: () => void;
};

export default function PerformanceReport({
  scenario,
  results,
  onPracticeAgain,
  onChooseScenario,
}: PerformanceReportProps) {
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

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={onChooseScenario}
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
              You communicated your ideas clearly across the session.
              Your next opportunity is to make your answers more memorable
              by using concrete examples, measurable outcomes, and concise
              conclusions.
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
              onClick={onPracticeAgain}
              className="rounded-xl bg-indigo-500 px-6 py-3 font-semibold transition hover:bg-indigo-400"
            >
              Practice again
            </button>

            <button
              onClick={onChooseScenario}
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
