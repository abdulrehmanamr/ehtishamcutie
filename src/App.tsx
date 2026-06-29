/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Stethoscope, Sparkles } from 'lucide-react';
import { AppStep, DailyReport } from './types';
import InspectionDashboard from './components/InspectionDashboard';
import CutenessScanner from './components/CutenessScanner';
import LoveQuiz from './components/LoveQuiz';
import EmergencyAlert from './components/EmergencyAlert';
import HeartGame from './components/HeartGame';
import FinalDiagnosis from './components/FinalDiagnosis';

export default function App() {
  const [step, setStep] = useState<AppStep>('LANDING');

  // Daily Questions Pool
  const dailyQuestionsPool = [
    {
      question: "Which pick-up line describes your beauty right now? ✨",
      options: [
        { key: "magician", label: "Are you a magician? Because when I look at you, everyone else disappears! 🎩" },
        { key: "fine_ticket", label: "Are you a parking ticket? Because you've got FINE written all over you! 👮‍♂️" },
        { key: "star", label: "Are you a star? Because you light up my entire universe! 🌌" }
      ]
    },
    {
      question: "If Abdul Rehman hugs you for 10 consecutive minutes, you will: 🤗",
      options: [
        { key: "demand_more", label: "Demand another 10 minutes immediately! 🥰" },
        { key: "strawberry", label: "Blush like a ripe red strawberry 🍓" },
        { key: "never_release", label: "Lock arms and never let go of him ❤️" }
      ]
    },
    {
      question: "What is your official cuteness offense of the day? 🚨",
      options: [
        { key: "illegal_theft", label: "Stealing Abdul Rehman's heartbeat without a permit! 💖" },
        { key: "excessive_handsome", label: "Being illegally handsome right after waking up 🥱" },
        { key: "smile_weapon", label: "Using that gorgeous smile as a weapon of mass distraction 😆" }
      ]
    },
    {
      question: "What is your heart's current status for Abdul Rehman? ❤️",
      options: [
        { key: "infinite_love", label: "Beating entirely for him 💓" },
        { key: "need_attention", label: "Urgently requiring his sweet messages and attention! 🥺" },
        { key: "forever_connected", label: "Locked in a telepathic snuggle loop forever 🔗" }
      ]
    },
    {
      question: "If Abdul Rehman gives you a sweet forehead kiss, you will: 💋",
      options: [
        { key: "melt", label: "Melt completely like warm chocolate 🍫" },
        { key: "demand", label: "Demand another one immediately! 🥰" },
        { key: "hold_closer", label: "Smile and hold him even closer ❤️" }
      ]
    },
    {
      question: "How does your beauty diagnose according to medical science? 🩺",
      options: [
        { key: "contagious", label: "Highly contagious, causing instant heartbeats 💓" },
        { key: "gorgeous", label: "Illegally gorgeous with no known cure! 😍" },
        { key: "prescription", label: "So cute it should be a prescription pill 💊" }
      ]
    },
    {
      question: "What is the official prescription for your beautiful smile today? 💊",
      options: [
        { key: "hugs", label: "100x virtual hugs and snuggles from Abdul Rehman 🤗" },
        { key: "call", label: "A sweet voice call right before sleeping 📞" },
        { key: "pamper", label: "Endless pampering and forehead kisses 💋" }
      ]
    },
    {
      question: "If you don't reply within 5 minutes, Abdul Rehman is allowed to: 👮‍♂️",
      options: [
        { key: "spam", label: "Send 10 love-spam notifications 📲" },
        { key: "cuddles", label: "Initiate emergency cuddles protocol 🤗" },
        { key: "pout", label: "Pout and demand a video call right away! 🥺" }
      ]
    },
    {
      question: "If my temperature is rising right now, it is because: 🤒",
      options: [
        { key: "fever", label: "Your hotness is causing a fever in my heart! ❤️" },
        { key: "sickness", label: "I am diagnosed with extreme love-sickness 🧪" },
        { key: "voice_notes", label: "I need 1000mg of your voice notes immediately! 📞" }
      ]
    },
    {
      question: "According to my stethoscope, your sweet heart is saying: 🩺",
      options: [
        { key: "lub_dub", label: "Lub-dub, I am crazy about Abdul Rehman! 💓" },
        { key: "warning", label: "Beep-beep, warning: illegal levels of missing you! 🚨" },
        { key: "thump", label: "Thump-thump, waiting for a tight snuggle! 🤗" }
      ]
    },
    {
      question: "My diagnostic result says my heart is suffering from: 📈",
      options: [
        { key: "deficiency", label: "Chronic cuddles deficiency 🥺" },
        { key: "theft", label: "Acute heartbeats theft by Ehtisham ❤️" },
        { key: "obsession", label: "Severe obsession with your smile! 🥰" }
      ]
    }
  ];

  const missingYouPhrases = [
    "My heart literally did a backflip and is currently demanding your attention! 🥺",
    "The love radar is exploding because Ehtisham isn't replying! I miss you so much! 😭💖",
    "According to the laws of physics, I am falling for you harder and harder every single second! ❤️",
    "My screen is bright, but my day is completely dark without your sweet messages! Come snuggling! 🥺"
  ];

  const getRandomElements = () => {
    const randomQ = dailyQuestionsPool[Math.floor(Math.random() * dailyQuestionsPool.length)];
    const randomM = missingYouPhrases[Math.floor(Math.random() * missingYouPhrases.length)];
    return { randomQ, randomM };
  };

  const [initData, setInitData] = useState(() => getRandomElements());
  const [report, setReport] = useState<DailyReport>({
    smiled: '',
    ate: 'unknown',
    waterCups: 0,
    sleepHours: '',
    missedStatus: 'likely',
    appliedMoisturizer: '',
    eyeCasualties: '',
    dailyQuestionAnswer: '',
    dailyQuestionText: initData.randomQ.question,
    missingYouText: initData.randomM,
  });

  const handleRestart = () => {
    const freshData = getRandomElements();
    setInitData(freshData);
    setReport({
      smiled: '',
      ate: 'unknown',
      waterCups: 0,
      sleepHours: '',
      missedStatus: 'likely',
      appliedMoisturizer: '',
      eyeCasualties: '',
      dailyQuestionAnswer: '',
      dailyQuestionText: freshData.randomQ.question,
      missingYouText: freshData.randomM,
    });
    setStep('LANDING');
  };

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
            <InspectionDashboard 
              report={report} 
              setReport={setReport}
              dailyQuestion={initData.randomQ}
              onStartScan={() => setStep('SCANNING')} 
            />
          )}
          {step === 'SCANNING' && (
            <CutenessScanner onScanComplete={() => setStep('QUIZ')} />
          )}
          {step === 'QUIZ' && (
            <LoveQuiz onQuizAnswer={() => setStep('ALERT')} />
          )}
          {step === 'ALERT' && (
            <EmergencyAlert 
              missingYouText={report.missingYouText}
              onProceed={() => setStep('GAME')} 
            />
          )}
          {step === 'GAME' && (
            <HeartGame 
              onGameComplete={() => setStep('FINAL')} 
            />
          )}
          {step === 'FINAL' && (
            <FinalDiagnosis 
              report={report}
              onRestart={handleRestart} 
            />
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
