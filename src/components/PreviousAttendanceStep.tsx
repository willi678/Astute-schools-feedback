'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import StepHeader from './StepHeader';
import StepNavigation from './StepNavigation';
import { useState } from 'react';

const ATTENDANCE_OPTIONS = [
  { value: '2_3', label: '2–3 times' },
  { value: '4_6', label: '4–6 times' },
  { value: 'more_6', label: 'More than 6 times' },
];

export default function PreviousAttendanceStep() {
  const { formData, updateFormData, setStep } = useFeedbackStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (formData.firstOpenDay === undefined) {
      newErrors.firstOpenDay = 'Please select an option';
    }

    if (
      !formData.firstOpenDay &&
      !formData.previousAttendances
    ) {
      newErrors.previousAttendances = 'Please select how many times you attended';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep(8);
  };

  const handleFirstOpenDayChange = (value: boolean) => {
    updateFormData({ firstOpenDay: value });
    setErrors((prev) => ({ ...prev, firstOpenDay: '', previousAttendances: '' }));
  };

  return (
    <div className="space-y-6">
      <StepHeader step={7} title="Previous Attendance" />

      <div className="space-y-5">
        {/* First Time Question */}
        <div>
          <label className="block text-lg font-semibold text-primary-700 mb-3">
            Is this your first Open Day at our school? <span className="text-error">*</span>
          </label>
          <div className="space-y-2">
            {[true, false].map((value) => (
              <label
                key={String(value)}
                className="flex items-center space-x-3 p-4 border-2 border-secondary-200 rounded-lg hover:border-secondary-500 hover:bg-secondary-50 cursor-pointer transition"
              >
                <input
                  type="radio"
                  name="firstOpenDay"
                  checked={formData.firstOpenDay === value}
                  onChange={() => handleFirstOpenDayChange(value)}
                  className="w-5 h-5 text-primary-600 accent-primary-600"
                />
                <span className="text-lg text-gray-700">
                  {value ? '✓ Yes, first time' : '✗ No, I\'ve been before'}
                </span>
              </label>
            ))}
          </div>
          {errors.firstOpenDay && (
            <p className="text-error text-sm mt-2">❌ {errors.firstOpenDay}</p>
          )}
        </div>

        {/* Previous Attendances (conditional) */}
        {formData.firstOpenDay === false && (
          <div>
            <label className="block text-lg font-semibold text-primary-700 mb-3">
              How many Open Days have you attended? <span className="text-error">*</span>
            </label>
            <div className="space-y-2">
              {ATTENDANCE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 p-4 border-2 border-secondary-200 rounded-lg hover:border-secondary-500 hover:bg-secondary-50 cursor-pointer transition"
                >
                  <input
                    type="radio"
                    name="previousAttendances"
                    value={option.value}
                    checked={formData.previousAttendances === option.value}
                    onChange={(e) => {
                      updateFormData({ previousAttendances: e.target.value as any });
                      setErrors((prev) => ({ ...prev, previousAttendances: '' }));
                    }}
                    className="w-5 h-5 text-primary-600 accent-primary-600"
                  />
                  <span className="text-lg text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.previousAttendances && (
              <p className="text-error text-sm mt-2">❌ {errors.previousAttendances}</p>
            )}
          </div>
        )}
      </div>

      <StepNavigation onNext={handleNext} onPrev={() => setStep(6)} />
    </div>
  );
}
