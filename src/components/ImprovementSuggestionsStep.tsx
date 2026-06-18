'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import StepHeader from './StepHeader';
import StepNavigation from './StepNavigation';

export default function ImprovementSuggestionsStep() {
  const { formData, updateFormData, setStep } = useFeedbackStore();

  const handleNext = () => {
    setStep(7);
  };

  return (
    <div className="space-y-6">
      <StepHeader step={6} title="Improvement Suggestions" />

      <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 border-l-4 border-secondary-500 p-4 rounded">
        <p className="text-gray-700">
          💡 Your suggestions help us provide better support to teachers and students.
        </p>
      </div>

      <div>
        <label className="block text-lg font-semibold text-primary-700 mb-2">
          What could the teacher improve?
        </label>
        <textarea
          value={formData.teacherImprovement || ''}
          onChange={(e) => updateFormData({ teacherImprovement: e.target.value })}
          placeholder="Share constructive feedback on areas for improvement..."
          rows={5}
          className="w-full px-4 py-3 border-2 border-secondary-300 rounded-lg focus:outline-none focus:border-secondary-600 focus:ring-2 focus:ring-secondary-200 text-lg bg-secondary-50 transition-colors resize-none"
        />
      </div>

      <StepNavigation onNext={handleNext} onPrev={() => setStep(5)} />
    </div>
  );
}
