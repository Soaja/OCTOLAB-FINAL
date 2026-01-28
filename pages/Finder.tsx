import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_QUESTIONS } from '../constants';
import { Button } from '../components/Button';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { PageView } from '../types';

interface FinderProps {
  onComplete: () => void;
}

export const Finder: React.FC<FinderProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = QUIZ_QUESTIONS[step];
  const isFinished = step >= QUIZ_QUESTIONS.length;

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
    setTimeout(() => {
        setStep(step + 1);
    }, 250);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  return (
    <div className="min-h-screen pt-20 bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="w-full bg-neutral-100 h-1.5 rounded-full mb-12 overflow-hidden">
          <motion.div 
            className="h-full bg-neutral-900"
            initial={{ width: 0 }}
            animate={{ width: `${((step) / QUIZ_QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-neutral-900 text-center leading-tight">
                {currentQuestion.question}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className="group relative flex items-center p-6 text-left border border-neutral-200 rounded-2xl hover:border-neutral-900 hover:shadow-lg transition-all duration-200 bg-white"
                  >
                    <span className="text-lg font-medium text-neutral-700 group-hover:text-neutral-900">
                      {opt.label}
                    </span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={20} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-neutral-900">Research Profile Complete</h2>
              <p className="text-neutral-500 max-w-md mx-auto">
                Based on your inputs, we've identified 3 compounds that match your research criteria perfectly.
              </p>
              
              <div className="flex justify-center gap-4">
                 <Button onClick={onComplete} size="lg">View Recommendations</Button>
                 <Button onClick={reset} variant="ghost"><RotateCcw size={18} className="mr-2"/> Restart</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
