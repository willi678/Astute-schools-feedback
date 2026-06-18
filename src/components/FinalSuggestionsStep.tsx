'use client';

import { useFeedbackStore } from '@/store/feedbackStore';
import StepHeader from './StepHeader';
import StepNavigation from './StepNavigation';
import { useState, useRef, useEffect } from 'react';

export default function FinalSuggestionsStep() {
  const { formData, updateFormData, setStep } = useFeedbackStore();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerInterval.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [isRecording]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], 'voicenote.webm', {
          type: 'audio/webm',
        });
        updateFormData({ voiceNote: audioFile });
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (err) {
      console.error('Failed to access microphone:', err);
      alert('Please allow microphone access to record a voice note.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const handleNext = () => {
    setStep(10);
  };

  return (
    <div className="space-y-6">
      <StepHeader step={9} title="Final Suggestions" />

      <div className="space-y-6">
        {/* Text Suggestions */}
        <div>
          <label className="block text-lg font-semibold text-primary-700 mb-2">
            📝 Do you have any suggestions that can improve future Open Days?
          </label>
          <textarea
            value={formData.suggestions || ''}
            onChange={(e) => updateFormData({ suggestions: e.target.value })}
            placeholder="Share any ideas or suggestions for improvement..."
            rows={5}
            className="w-full px-4 py-3 border-2 border-secondary-300 rounded-lg focus:outline-none focus:border-secondary-600 focus:ring-2 focus:ring-secondary-200 text-lg bg-secondary-50 transition-colors resize-none"
          />
        </div>

        {/* Voice Note Recording */}
        <div className="border-2 border-dashed border-secondary-400 rounded-lg p-6 bg-gradient-to-r from-secondary-50 to-accent-50">
          <label className="block text-lg font-semibold text-primary-700 mb-4">
            🎤 Record a Voice Note (Optional)
          </label>

          {!isRecording ? (
            <button
              onClick={handleStartRecording}
              className="w-full bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
              type="button"
            >
              🎙️ Start Recording
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 bg-white rounded-lg p-3">
                <span className="animate-pulse text-lg">🔴 Recording...</span>
                <span className="text-primary-700 font-mono font-bold text-lg">{recordingTime}s</span>
              </div>
              <button
                onClick={handleStopRecording}
                className="w-full bg-gradient-to-r from-error to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                type="button"
              >
                ⏹️ Stop Recording
              </button>
            </div>
          )}

          {formData.voiceNote && (
            <div className="mt-4 p-3 bg-accent-100 border-2 border-accent-400 rounded-lg">
              <p className="text-accent-800 font-semibold">✓ Voice note recorded</p>
              <p className="text-gray-700 text-sm mt-1">
                {formData.voiceNote.name} ({(formData.voiceNote.size / 1024).toFixed(2)} KB)
              </p>
            </div>
          )}
        </div>
      </div>

      <StepNavigation onNext={handleNext} onPrev={() => setStep(8)} />
    </div>
  );
}
