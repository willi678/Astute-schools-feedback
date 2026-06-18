'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import { useEffect } from 'react';

export default function ThankYouPage() {
  const { resetForm } = useFeedbackStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNewResponse = () => {
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 via-secondary-50 to-accent-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center border-t-4 border-accent-500">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="text-7xl mb-4 inline-block animate-bounce">🎉</div>
        </div>

        {/* Thank You Message */}
        <h1 className="text-4xl font-bold text-primary-800 mb-4">
          Thank You!
        </h1>

        {/* Description */}
        <div className="bg-gradient-to-r from-accent-50 to-accent-100 rounded-lg p-6 mb-8 border-2 border-accent-400">
          <p className="text-xl text-gray-700 leading-relaxed">
            Thank you for trusting us with your child's education. 
            Your feedback helps us improve and provide a better experience 
            for every family.
          </p>
        </div>

        {/* Confirmation Details */}
        <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-lg p-6 mb-8 border-2 border-secondary-300">
          <p className="text-gray-600 mb-2">Your response has been recorded</p>
          <p className="text-2xl font-bold text-accent-600">✓ Response Submitted Successfully</p>
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-r from-secondary-50 to-primary-50 border-l-4 border-primary-600 p-4 rounded mb-8">
          <p className="text-gray-700">
            💡 We value your insights and will use them to enhance our Open Day 
            experience. Thank you for being part of our school community!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleNewResponse}
            className="w-full bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            type="button"
          >
            ➡️ Submit Another Response
          </button>
          <a
            href="/"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-center"
          >
            ← Return to Home
          </a>
        </div>

        {/* Footer Note */}
        <p className="text-gray-500 text-sm mt-6">
          Keep this reference in case you need to follow up
        </p>
      </div>
    </div>
  );
}
