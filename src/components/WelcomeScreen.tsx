'use client';

import { useFeedbackStore } from '@/store/feedbackStore';

export default function WelcomeScreen() {
  const setStep = useFeedbackStore((state) => state.setStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-secondary-100 to-secondary-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center border-t-4 border-primary-600">
        {/* Header */}
        <div className="mb-8">
          <div className="text-6xl mb-4">📋</div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
            Help Us Improve Our Open Day Experience
          </h1>
        </div>

        {/* Message */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          Your feedback is valuable and will help us serve you and your child better. 
          This survey takes just 5-10 minutes and helps us create an even better experience for your family.
        </p>

        {/* School Branding */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 mb-8 border-2 border-primary-300">
          <h2 className="text-2xl font-bold text-primary-700">
            🎓 ASTUTE SCHOOLS Open Day
          </h2>
          <p className="text-gray-600 mt-2">Thank you for visiting us today!</p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => setStep(2)}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          ➡️ Start Survey
        </button>

        {/* Assurance Text */}
        <p className="text-sm text-gray-500 mt-6">
          ✓ Your responses are secure and confidential
        </p>
      </div>
    </div>
  );
}
