'use client';

interface StepHeaderProps {
  step: number;
  title: string;
}

export default function StepHeader({ step, title }: StepHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-800">{title}</h2>
        <span className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
          Step {step} / 10
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${(step / 10) * 100}%` }}
        />
      </div>
    </div>
  );
}
