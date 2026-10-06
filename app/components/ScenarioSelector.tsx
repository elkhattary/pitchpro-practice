"use client";

type Scenario = {
  id: string;
  title: string;
  description: string;
  meta: string;
  icon: string;
};

const scenarios: Scenario[] = [
  {
    id: "job-interview",
    title: "Job Interview",
    description:
      "Practice answering common interview questions with clarity and confidence.",
    meta: "3 questions · ~5 min",
    icon: "💼",
  },
  {
    id: "startup-pitch",
    title: "Startup Pitch",
    description:
      "Sharpen your elevator pitch and explain your idea in a compelling way.",
    meta: "3 questions · ~5 min",
    icon: "🚀",
  },
  {
    id: "sales-conversation",
    title: "Sales Conversation",
    description:
      "Practice handling introductions, objections, and value-based conversations.",
    meta: "3 questions · ~5 min",
    icon: "💬",
  },
];

type ScenarioSelectorProps = {
  onSelect: (scenarioId: string) => void;
};

export default function ScenarioSelector({
  onSelect,
}: ScenarioSelectorProps) {
  return (
    <section className="mt-20">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
          Choose your practice
        </p>

        <h2 className="mt-3 text-3xl font-bold text-white">
          Select a scenario
        </h2>

        <p className="mt-3 max-w-2xl text-slate-400">
          Each session contains three focused questions and feedback after every
          response.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onSelect(scenario.id)}
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left transition hover:-translate-y-1 hover:border-indigo-500 hover:bg-slate-900/80"
          >
            <div className="text-3xl">{scenario.icon}</div>

            <h3 className="mt-6 text-xl font-semibold text-white">
              {scenario.title}
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              {scenario.description}
            </p>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-sm text-slate-500">{scenario.meta}</span>

              <span className="font-medium text-indigo-400 transition group-hover:translate-x-1">
                Start →
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
