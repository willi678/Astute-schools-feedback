'use client';

interface StepNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  isLastStep?: boolean;
}

export default function StepNavigation({
  onNext,
  onPrev,
  isLastStep,
}: StepNavigationProps) {
  return (
    <div className="flex gap-4 mt-8">
      {/* Previous Button */}
      <button
        onClick={onPrev}
        className="flex-1 group relative bg-white border-2 border-primary-400 hover:border-primary-600 text-primary-700 font-bold py-3 px-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 hover:bg-primary-50"
        title="Go back to previous step to make changes"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
        Previous
      </button>

      {/* Next/Submit Button */}
      <button
        onClick={onNext}
        className={`flex-1 group font-bold py-3 px-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-white flex items-center justify-center gap-2 shadow-lg ${
          isLastStep
            ? 'bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800'
            : 'bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600'
        }`}
      >
        {isLastStep ? (
          <>
            ✔ Submit Response
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </>
        ) : (
          <>
            Next
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </>
        )}
      </button>
    </div>
  );
}
