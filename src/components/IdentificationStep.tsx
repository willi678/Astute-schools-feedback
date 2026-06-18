'use client';

import { useState } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import StepHeader from './StepHeader';
import StepNavigation from './StepNavigation';

export default function IdentificationStep() {
  const { formData, updateFormData, setStep } = useFeedbackStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.isAnonymous && !formData.name?.trim()) {
      newErrors.name = 'Name is required if not submitting anonymously';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep(3);
  };

  const handleAnonymousChange = (value: boolean) => {
    updateFormData({ isAnonymous: value });
    if (value) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.name;
        return newErrors;
      });
    }
  };

  return (
    <div className="space-y-6">
      <StepHeader step={2} title="Who Are You?" />

      <div className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-lg font-semibold text-primary-700 mb-2">
            Email Address <span className="text-error">*</span>
          </label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => {
              updateFormData({ email: e.target.value });
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            placeholder="your.email@example.com"
            className="w-full px-4 py-3 text-lg border-2 border-secondary-300 rounded-lg focus:outline-none focus:border-secondary-600 focus:ring-2 focus:ring-secondary-200 bg-secondary-50 transition-colors"
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">❌ {errors.email}</p>
          )}
        </div>

        {/* Anonymous Checkbox */}
        <label className="flex items-center space-x-3 cursor-pointer p-4 hover:bg-secondary-50 rounded-lg transition border border-secondary-200">
          <input
            type="checkbox"
            checked={formData.isAnonymous || false}
            onChange={(e) => handleAnonymousChange(e.target.checked)}
            className="w-6 h-6 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
          />
          <span className="text-lg text-gray-700 font-medium">
            🔒 Submit anonymously
          </span>
        </label>

        {/* Name (conditional) */}
        {!formData.isAnonymous && (
          <div>
            <label className="block text-lg font-semibold text-primary-700 mb-2">
              Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => {
                updateFormData({ name: e.target.value });
                setErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="Your full name"
              className="w-full px-4 py-3 text-lg border-2 border-secondary-300 rounded-lg focus:outline-none focus:border-secondary-600 focus:ring-2 focus:ring-secondary-200 bg-secondary-50 transition-colors"
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">❌ {errors.name}</p>
            )}
          </div>
        )}
      </div>

      <StepNavigation onNext={handleNext} onPrev={() => setStep(1)} />
    </div>
  );
}
