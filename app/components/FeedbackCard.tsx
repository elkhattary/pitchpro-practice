import type { Feedback } from "../../types/practice";

type FeedbackCardProps = {
  feedback: Feedback;
  currentQuestion: number;
  onContinue: () => void;
};

export default function FeedbackCard({
  feedback,
  currentQuestion,
  onContinue,
}: FeedbackCardProps) {
  const feedbackTitle =
    feedback.overall >= 90
      ? "Excellent response."
      : feedback.overall >= 80
      ? "Strong response."
      : feedback.overall >= 70
      ? "Good start."
      : "Keep developing this answer.";

  return (
    <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-400">
            Feedback
          </p>

          <h3 className="mt-1 text-xl font-semibold text-white">
            {feedbackTitle}
          </h3>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-white">
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

          <p className="mt-1 text-2xl font-semibold text-white">
            {feedback.clarity}
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Relevance
          </p>

          <p className="mt-1 text-2xl font-semibold text-white">
            {feedback.relevance}
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Specificity
          </p>

          <p className="mt-1 text-2xl font-semibold text-white">
            {feedback.specificity}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm font-semibold text-white">
            What worked
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-400">
            {feedback.message}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            Improve
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-400">
            {feedback.improvement}
          </p>
        </div>
      </div>

      <div className="mt-7 flex justify-end">
        <button
          onClick={onContinue}
          className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          {currentQuestion === 2
            ? "View performance report →"
            : "Continue →"}
        </button>
      </div>
    </div>
  );
}
