'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import StepHeader from './StepHeader';
import StepNavigation from './StepNavigation';
import { useState } from 'react';

const WAITING_TIME_OPTIONS = [
  { value: 'no_wait', label: '✓ No waiting' },
  { value: 'less_5', label: '⏱️ Less than 5 minutes' },
  { value: '5_10', label: '⏱️ 5–10 minutes' },
  { value: '10_20', label: '⏱️ 10–20 minutes' },
  { value: 'more_20', label: '⏱️ More than 20 minutes' },
];

export default function VisitInformationStep() {
  const { formData, updateFormData, setStep } = useFeedbackStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.arrivalTime) {
      newErrors.arrivalTime = 'Please select an arrival time';
    }

    if (!formData.waitingTime) {
      newErrors.waitingTime = 'Please select waiting time';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If waiting time > 5 minutes, go to delay assessment
    if (['5_10', '10_20', 'more_20'].includes(formData.waitingTime as string)) {
      setStep(4);
    } else {
      // Skip delay assessment, go to teacher evaluation
      setStep(5);
    }
  };

  return (
    <div className="space-y-6">
      <StepHeader step={3} title="Visit Information" />

      <div className="space-y-5">
        {/* Arrival Time */}
        <div>
          <label className="block text-lg font-semibold text-primary-700 mb-3">
            What time did you arrive at the school? <span className="text-error">*</span>
          </label>
          <input
            type="time"
            value={formData.arrivalTime || ''}
            onChange={(e) => {
              updateFormData({ arrivalTime: e.target.value });
              setErrors((prev) => ({ ...prev, arrivalTime: '' }));
            }}
            className="w-full px-4 py-3 text-lg border-2 border-secondary-300 rounded-lg focus:outline-none focus:border-secondary-600 focus:ring-2 focus:ring-secondary-200 bg-secondary-50 transition-colors"
          />
          {errors.arrivalTime && (
            <p className="text-error text-sm mt-1">❌ {errors.arrivalTime}</p>
          )}
        </div>

        {/* Waiting Time */}
        <div>
          <label className="block text-lg font-semibold text-primary-700 mb-3">
            How long did you wait before being attended to? <span className="text-error">*</span>
          </label>
          <div className="space-y-2">
            {WAITING_TIME_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-3 p-4 border-2 border-secondary-200 rounded-lg hover:border-secondary-500 hover:bg-secondary-50 cursor-pointer transition"
              >
                <input
                  type="radio"
                  name="waitingTime"
                  value={option.value}
                  checked={formData.waitingTime === option.value}
                  onChange={(e) => {
                    updateFormData({ waitingTime: e.target.value as any });
                    setErrors((prev) => ({ ...prev, waitingTime: '' }));
                  }}
                  className="w-5 h-5 text-primary-600 accent-primary-600"
                />
                <span className="text-lg text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.waitingTime && (
            <p className="text-error text-sm mt-2">❌ {errors.waitingTime}</p>
          )}
        </div>
      </div>

      <StepNavigation onNext={handleNext} onPrev={() => setStep(2)} />
    </div>
  );
}
