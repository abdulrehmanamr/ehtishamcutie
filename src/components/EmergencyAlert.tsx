/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldAlert, RefreshCw, Heart, Sparkles, Gamepad2 } from 'lucide-react';
import { audio } from './AudioEngine';

interface AlertProps {
  missingYouText?: string;
  onProceed: () => void;
}

export default function EmergencyAlert({ missingYouText, onProceed }: AlertProps) {
  const [phase, setPhase] = useState<'intro' | 'investigating1' | 'investigating2' | 'reveal'>('intro');

  useEffect(() => {
    // Stage transition timers
    audio.play('alarm');

    const timer1 = setTimeout(() => {
      setPhase('investigating1');
      audio.play('pop');
    }, 1800);

    const timer2 = setTimeout(() => {
      setPhase('investigating2');
      audio.play('pop');
    }, 3600);

    const timer3 = setTimeout(() => {
      setPhase('reveal');
      audio.play('success');
    }, 5400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6" id="emergency-alert">
      {/* Dynamic Background Warning Flashing wrapper */}
      <div 
        className={`rounded-3xl p-8 border text-center shadow-xl transition-all duration-700 ${
          phase !== 'reveal' 
            ? 'bg-red-50/90 border-red-200 shadow-red-100/50 animate-pulse' 
            : 'bg-rose-50/70 border-rose-100 shadow-rose-100/50'
        }`}
        id="alert-box-container"
      >
        {phase !== 'reveal' ? (
          /* Warning/Investigating phase */
          <div className="space-y-8 py-8" id="investigating-phase">
            <div className="inline-flex p-4 rounded-full bg-red-100 text-red-600 animate-bounce" id="siren-icon-container">
              <ShieldAlert className="w-12 h-12" />
            </div>

            <div className="space-y-3" id="alert-text-block">
              <h2 className="text-3xl font-black text-red-700 tracking-wider uppercase animate-pulse">
                🚨 ATTENTION 🚨
              </h2>
              <p className="text-gray-500 font-semibold text-sm">Our system has detected an emergency anomaly:</p>
              <div className="bg-red-100/60 border border-red-200 text-red-800 font-extrabold text-lg py-3 px-6 rounded-2xl max-w-md mx-auto shadow-xs">
                "Someone is missing Ehtisham."
              </div>
            </div>

            {/* Investigating Loading Indicator */}
            <div className="space-y-4" id="investigation-meter">
              <div className="flex justify-center items-center gap-2 text-sm font-bold text-red-600" id="status-line">
                <RefreshCw className="w-4 h-4 animate-spin" />
                {phase === 'intro' && "Initiating Global Investigator..."}
                {phase === 'investigating1' && "Investigating Cuteness Coordinates..."}
                {phase === 'investigating2' && "Scanning Romantic Telemetry Database..."}
              </div>

              {/* Progress visual steps */}
              <div className="flex justify-center items-center gap-3" id="visual-steps-bar">
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${phase !== 'intro' ? 'bg-red-600 scale-125 shadow-xs' : 'bg-red-200'}`}></div>
                <div className="w-8 h-0.5 bg-red-200"></div>
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${phase === 'investigating2' || phase === 'reveal' ? 'bg-red-600 scale-125 shadow-xs' : 'bg-red-200'}`}></div>
                <div className="w-8 h-0.5 bg-red-200"></div>
                <div className={`w-3 h-3 rounded-full transition-all duration-300 bg-red-200`}></div>
              </div>
            </div>
          </div>
        ) : (
          /* Reveal Phase */
          <div className="space-y-8 py-4 animate-fade-in text-center" id="reveal-phase">
            <div className="relative inline-block" id="reveal-heart-container">
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 animate-bounce text-pink-500 text-2xl">❤️</div>
              <div className="absolute -bottom-4 -left-4 animate-pulse text-rose-500 text-xl">✨</div>
              
              <div className="inline-flex p-5 rounded-full bg-rose-100 text-rose-600 animate-pulse">
                <Heart className="w-16 h-16 fill-rose-500 text-rose-600" />
              </div>
            </div>

            <div className="space-y-3" id="reveal-header">
              <h3 className="text-sm font-extrabold text-rose-500 uppercase tracking-widest">
                Investigation Complete ✅
              </h3>
              <h2 className="text-4xl font-black text-gray-800 tracking-tight" id="reveal-statement">
                Result: It was me. 😭❤️
              </h2>
            </div>

            {/* Letter Frame */}
            <div className="bg-white border border-rose-100 p-6 rounded-2xl max-w-md mx-auto shadow-md relative" id="reveal-letter-card">
              <div className="absolute -top-3 left-6 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                CHIEF INSPECTOR NOTES
              </div>
              <p className="text-sm text-gray-600 leading-relaxed text-left" id="letter-content">
                <strong>Dearest Ehtisham:</strong> <br />
                {missingYouText || `My heart literally triggered this emergency broadcast alert because you've been away from my messages for too long! 🥺 I miss you so much and hope this cute little check-up center makes you smile immediately.`}
              </p>
              <div className="mt-4 flex items-center justify-between text-[11px] text-rose-500 font-bold border-t border-rose-50 pt-3" id="letter-footer">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Missing You Level: Infinite
                </span>
                <span>— Abdul Rehman ❤️</span>
              </div>
            </div>

            {/* Button to proceed to game */}
            <div className="pt-4" id="alert-action-box">
              <button 
                onClick={() => {
                  audio.play('click');
                  onProceed();
                }}
                className="cursor-pointer bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-lg py-4 px-8 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mx-auto"
                id="btn-start-game"
              >
                <Gamepad2 className="w-5.5 h-5.5 animate-bounce" />
                Play Heart Catcher Game 🎮
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
