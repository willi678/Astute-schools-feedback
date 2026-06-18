'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import StepHeader from './StepHeader';
import StepNavigation from './StepNavigation';
import { useState } from 'react';

export default function OverallExperienceStep() {
  const { formData, updateFormData, setStep } = useFeedbackStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    if (formData.overallRating === 0) {
      setErrors({ overallRating: 'Please provide a rating' });
      return;
    }
    setStep(9);
  };

  const rating = formData.overallRating || 0;

  return (
    <div className="space-y-6">
      <StepHeader step={8} title="Overall Experience" />

      <div className="bg-gradient-to-r from-secondary-50 via-accent-50 to-secondary-100 rounded-lg p-6 border-2 border-accent-200">
        <label className="block text-xl font-semibold text-primary-800 mb-6 text-center">
          Rate your overall experience today
        </label>

        {/* Star Rating Display */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <button
              key={star}
              onClick={() => {
                updateFormData({ overallRating: star });
                setErrors((prev) => ({ ...prev, overallRating: '' }));
              }}
              className={`transition-all transform hover:scale-120 ${
                star <= rating
                  ? 'text-4xl text-yellow-400 drop-shadow-lg'
                  : 'text-3xl text-gray-300 hover:text-yellow-300'
              }`}
              type="button"
            >
              ⭐
            </button>
          ))}
        </div>

        {/* Rating Value Display */}
        {rating > 0 && (
          <div className="text-center mb-4">
            <p className="text-4xl font-bold text-primary-700">{rating} / 10</p>
            <p className="text-gray-600 mt-2 text-lg">
              {rating <= 3
                ? '😞 Needs Improvement'
                : rating <= 6
                ? '😐 Average'
                : rating <= 8
                ? '😊 Good'
                : '🎉 Excellent'}
            </p>
          </div>
        )}

        {errors.overallRating && (
          <p className="text-error text-sm text-center mt-4">❌ {errors.overallRating}</p>
        )}
      </div>

      <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 border-l-4 border-secondary-500 p-4 rounded">
        <p className="text-gray-700">
          💭 Your honest feedback helps us understand how we're doing and where we can improve.
        </p>
      </div>

      <StepNavigation onNext={handleNext} onPrev={() => setStep(7)} />
    </div>
  );
}
