/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Stethoscope, Sparkles } from 'lucide-react';
import { AppStep } from './types';
import InspectionDashboard from './components/InspectionDashboard';
import CutenessScanner from './components/CutenessScanner';
import LoveQuiz from './components/LoveQuiz';
import EmergencyAlert from './components/EmergencyAlert';
import HeartGame from './components/HeartGame';
import FinalDiagnosis from './components/FinalDiagnosis';

export default function App() {
  const [step, setStep] = useState<AppStep>('LANDING');

  // Human-readable labels for the inspection pipeline steps
  const stepsTimeline = [
    { key: 'LANDING', label: 'Report' },
    { key: 'SCANNING', label: 'Biometrics' },
    { key: 'QUIZ', label: 'Analysis' },
    { key: 'ALERT', label: 'Emergency' },
    { key: 'GAME', label: 'Recharge' },
    { key: 'FINAL', label: 'Rx Certificate' }
  ];

  const currentStepIndex = stepsTimeline.findIndex(s => s.key === step);

  return (
    <div 
      className="min-h-screen bg-linear-to-tr from-rose-50/50 via-neutral-50 to-pink-50/60 flex flex-col justify-between py-8 px-4 font-sans text-gray-800"
      id="app-root-container"
    >
      {/* App Header Bar */}
      <header className="w-full max-w-2xl mx-auto mb-6 text-center space-y-3" id="app-header">
        <div className="inline-flex items-center gap-2" id="app-logo-block">
          <div className="p-1.5 rounded-full bg-rose-500 text-white animate-heartbeat shadow-xs">
            <Stethoscope className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-sm tracking-widest text-slate-500 uppercase flex items-center gap-1">
            EHTISHAM CHECK-UP
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </span>
        </div>

        {/* Visual pipeline progress breadcrumb indicators */}
        <div className="flex justify-between items-center max-w-md mx-auto pt-2 px-4" id="steps-breadcrumb">
          {stepsTimeline.map((item, idx) => (
            <React.Fragment key={item.key}>
              {/* Step indicator node */}
              <div className="flex flex-col items-center gap-1 relative" id={`breadcrumb-step-${idx}`}>
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border transition-all duration-300 ${
                    idx <= currentStepIndex 
                      ? 'bg-rose-500 border-rose-500 text-white shadow-xs scale-110' 
                      : 'bg-white border-gray-200 text-gray-400'
                  }`}
                >
                  {idx + 1}
                </div>
                <span 
                  className={`text-[9px] font-bold tracking-wider uppercase transition-colors ${
                    idx <= currentStepIndex ? 'text-rose-500' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </div>
              
              {/* Connector wire */}
              {idx < stepsTimeline.length - 1 && (
                <div className="flex-1 h-[2px] mx-1 bg-gray-200 relative -top-3" id={`breadcrumb-wire-${idx}`}>
                  <div 
                    className="absolute inset-0 bg-rose-400 transition-all duration-500"
                    style={{ width: idx < currentStepIndex ? '100%' : '0%' }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Main Active Step Stage */}
      <main className="flex-1 flex items-center justify-center py-4" id="app-main-stage">
        <div className="w-full animate-fade-in" key={step} id="active-step-view-wrapper">
          {step === 'LANDING' && (
            <InspectionDashboard onStartScan={() => setStep('SCANNING')} />
          )}
          {step === 'SCANNING' && (
            <CutenessScanner onScanComplete={() => setStep('QUIZ')} />
          )}
          {step === 'QUIZ' && (
            <LoveQuiz onQuizAnswer={() => setStep('ALERT')} />
          )}
          {step === 'ALERT' && (
            <EmergencyAlert onProceed={() => setStep('GAME')} />
          )}
          {step === 'GAME' && (
            <HeartGame onGameComplete={() => setStep('FINAL')} />
          )}
          {step === 'FINAL' && (
            <FinalDiagnosis onRestart={() => setStep('LANDING')} />
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full max-w-2xl mx-auto mt-8 text-center space-y-1 text-[11px] text-gray-400 font-semibold" id="app-footer">
        <p className="flex items-center justify-center gap-1 text-slate-500/80">
          Crafted with 💖 by <span className="text-rose-500 font-bold">Abdul Rehman</span> for Ehtisham Cutie
        </p>
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
          Official Inspection License #143 • Verified Secure Telemetry
        </p>
      </footer>
    </div>
  );
}
