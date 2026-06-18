'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import WelcomeScreen from '@/components/WelcomeScreen';
import IdentificationStep from '@/components/IdentificationStep';
import VisitInformationStep from '@/components/VisitInformationStep';
import DelayAssessmentStep from '@/components/DelayAssessmentStep';
import TeacherEvaluationStep from '@/components/TeacherEvaluationStep';
import ImprovementSuggestionsStep from '@/components/ImprovementSuggestionsStep';
import PreviousAttendanceStep from '@/components/PreviousAttendanceStep';
import OverallExperienceStep from '@/components/OverallExperienceStep';
import FinalSuggestionsStep from '@/components/FinalSuggestionsStep';
import ThankYouPage from '@/components/ThankYouPage';

export default function Home() {
  const currentStep = useFeedbackStore((state) => state.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeScreen />;
      case 2:
        return <IdentificationStep />;
      case 3:
        return <VisitInformationStep />;
      case 4:
        return <DelayAssessmentStep />;
      case 5:
        return <TeacherEvaluationStep />;
      case 6:
        return <ImprovementSuggestionsStep />;
      case 7:
        return <PreviousAttendanceStep />;
      case 8:
        return <OverallExperienceStep />;
      case 9:
        return <FinalSuggestionsStep />;
      case 10:
        return <ThankYouPage />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {currentStep === 1 ? (
          renderStep()
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {renderStep()}
          </div>
        )}
      </div>
    </main>
  );
}
