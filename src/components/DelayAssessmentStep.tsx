'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import StepHeader from './StepHeader';
import StepNavigation from './StepNavigation';
import { useState } from 'react';

const DELAY_CAUSES = [
  { value: 'staff_unavailable', label: '👥 Staff unavailable' },
  { value: 'long_queue', label: '⏳ Long queue' },
  { value: 'poor_organization', label: '📋 Poor organization' },
  { value: 'locate_teacher', label: '🔍 Could not locate assigned teacher' },
  { value: 'other', label: '💭 Other (please specify)' },
];

export default function DelayAssessmentStep() {
  const { formData, updateFormData, setStep } = useFeedbackStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCauseChange = (cause: string, checked: boolean) => {
    const currentCauses = formData.delayCause || [];
    const newCauses = checked
      ? [...currentCauses, cause]
      : currentCauses.filter((c) => c !== cause);

    updateFormData({ delayCause: newCauses });
    setErrors((prev) => ({ ...prev, delayCause: '' }));
  };

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.delayCause || formData.delayCause.length === 0) {
      newErrors.delayCause = 'Please select at least one cause';
    }

    if (
      formData.delayCause?.includes('other') &&
      !formData.delayOtherSpecify?.trim()
    ) {
      newErrors.delayOtherSpecify = 'Please specify the cause';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep(5);
  };

  const showOtherInput = formData.delayCause?.includes('other');

  return (
    <div className="space-y-6">
      <StepHeader step={4} title="What Caused The Delay?" />

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p className="text-gray-700">
          ⚠️ We appreciate your patience. Your feedback helps us improve our processes.
        </p>
      </div>

      <div className="space-y-4">
        {DELAY_CAUSES.map((cause) => (
          <div key={cause.value}>
            <label className="flex items-center space-x-3 p-4 border-2 border-secondary-200 rounded-lg hover:border-secondary-500 hover:bg-secondary-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={formData.delayCause?.includes(cause.value) || false}
                onChange={(e) => handleCauseChange(cause.value, e.target.checked)}
                className="w-5 h-5 text-primary-600 rounded"
              />
              <span className="text-lg text-gray-700">{cause.label}</span>
            </label>

            {cause.value === 'other' && showOtherInput && (
              <div className="mt-2 ml-8">
                <input
                  type="text"
                  value={formData.delayOtherSpecify || ''}
                  onChange={(e) => {
                    updateFormData({ delayOtherSpecify: e.target.value });
                    setErrors((prev) => ({ ...prev, delayOtherSpecify: '' }));
                  }}
                  placeholder="Please specify..."
                  className="w-full px-4 py-2 border-2 border-secondary-300 rounded-lg focus:outline-none focus:border-secondary-600 focus:ring-2 focus:ring-secondary-200 bg-secondary-50 transition-colors"
                />
                {errors.delayOtherSpecify && (
                  <p className="text-error text-sm mt-1">
                    ❌ {errors.delayOtherSpecify}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        {errors.delayCause && (
          <p className="text-error text-sm bg-red-50 p-3 rounded">❌ {errors.delayCause}</p>
        )}
      </div>

      <StepNavigation onNext={handleNext} onPrev={() => setStep(3)} />
    </div>
  );
}
