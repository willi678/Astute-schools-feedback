'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import StepHeader from './StepHeader';
import StepNavigation from './StepNavigation';
import { useState } from 'react';

const RATING_CATEGORIES = [
  { key: 'friendliness', label: '😊 Friendliness' },
  { key: 'professionalism', label: '👔 Professionalism' },
  { key: 'communication', label: '💬 Communication' },
  { key: 'childProgress', label: '📊 Knowledge of your child\'s progress' },
  { key: 'questionWilling', label: '🙋 Willingness to answer questions' },
];

export default function TeacherEvaluationStep() {
  const { formData, updateFormData, setStep } = useFeedbackStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRatingChange = (key: string, rating: number) => {
    updateFormData({
      teacherRatings: {
        ...formData.teacherRatings,
        [key]: rating,
      },
    });
    setErrors((prev) => ({ ...prev, ratings: '' }));
  };

  const handleNext = () => {
    const ratings = formData.teacherRatings || {};
    const allRated = RATING_CATEGORIES.every((cat) => ratings[cat.key as keyof typeof ratings] > 0);

    if (!allRated) {
      setErrors({ ratings: 'Please rate all categories' });
      return;
    }

    setStep(6);
  };

  const renderStars = (category: string) => {
    const rating = formData.teacherRatings?.[category as keyof typeof formData.teacherRatings] || 0;

    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingChange(category, star)}
            className={`text-3xl transition-all transform hover:scale-110 ${
              star <= rating ? 'text-yellow-400 drop-shadow-lg' : 'text-gray-300 hover:text-yellow-200'
            }`}
            type="button"
          >
            ⭐
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <StepHeader step={5} title="Teacher Evaluation" />

      <div className="space-y-6">
        {RATING_CATEGORIES.map((category) => (
          <div key={category.key} className="border-2 border-secondary-200 rounded-lg p-4 hover:border-secondary-400 transition bg-gradient-to-r from-secondary-50 to-white">
            <label className="block text-lg font-semibold text-primary-700 mb-3">
              {category.label}
            </label>
            {renderStars(category.key)}
          </div>
        ))}

        {errors.ratings && (
          <p className="text-error text-sm bg-red-50 p-3 rounded">❌ {errors.ratings}</p>
        )}
      </div>

      {/* Additional Comments */}
      <div>
        <label className="block text-lg font-semibold text-primary-700 mb-2">
          Additional Comments (Optional)
        </label>
        <textarea
          value={formData.teacherComments || ''}
          onChange={(e) => updateFormData({ teacherComments: e.target.value })}
          placeholder="Share any additional thoughts about your interaction with the teacher..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-secondary-300 rounded-lg focus:outline-none focus:border-secondary-600 focus:ring-2 focus:ring-secondary-200 text-lg bg-secondary-50 transition-colors resize-none"
        />
      </div>

      <StepNavigation onNext={handleNext} onPrev={() => setStep(4)} />
    </div>
  );
}
