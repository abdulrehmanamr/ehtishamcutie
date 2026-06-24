/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Activity, 
  AlertOctagon, 
  BedDouble, 
  Smile, 
  ShieldAlert,
  BrainCircuit,
  ArrowRight
} from 'lucide-react';
import { audio } from './AudioEngine';

interface ScannerProps {
  onScanComplete: () => void;
}

export default function CutenessScanner({ onScanComplete }: ScannerProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'scanning' | 'results'>('scanning');
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const logDatabase = [
    "[SYSTEM] Initiating full Ehtisham Cuteness Diagnostic...",
    "[SENSOR] Calibrating cheeks elasticity index...",
    "[SENSOR] Scanning smile radiant output: 5,000,000 lumens detected!",
    "[WARNING] Max handsome density exceeded standard safety protocol! 🚨",
    "[ANALYZING] Checking sleep schedules... 🥱 Needs cuddles immediately.",
    "[HEART] Synchronizing telemetry with Abdul Rehman's heartbeat tracker...",
    "[INFO] Deep-analysis scan complete. Overwhelming sweetness detected."
  ];

  // Increment progress bar and print logs
  useEffect(() => {
    if (stage !== 'scanning') return;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 3;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setStage('results');
          audio.play('success');
        }, 800);
      }
      setProgress(currentProgress);
      
      // Periodically trigger pop audio
      if (currentProgress % 15 === 0) {
        audio.play('pop');
      }
    }, 120);

    return () => clearInterval(interval);
  }, [stage]);

  // Handle printing logs relative to progress
  useEffect(() => {
    if (stage !== 'scanning') return;
    
    const logIndex = Math.floor((progress / 100) * logDatabase.length);
    const visibleLogs = logDatabase.slice(0, Math.min(logIndex + 1, logDatabase.length));
    setLogs(visibleLogs);

    // Scroll to bottom
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [progress, stage]);

  // Generate ASCII progress bar
  const getProgressBarString = () => {
    const totalBars = 20;
    const filledBars = Math.floor((progress / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return '█'.repeat(filledBars) + '░'.repeat(emptyBars);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6" id="cuteness-scanner">
      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-rose-100 shadow-xl overflow-hidden p-8" id="scanner-card">
        {stage === 'scanning' ? (
          <div className="space-y-8" id="scanning-phase">
            {/* Hologram Scanner Visualizer */}
            <div className="flex flex-col items-center justify-center space-y-4" id="hologram-visualizer">
              <div className="relative w-40 h-40 flex items-center justify-center" id="radar-circle-outer">
                {/* Scanning green/pink pulse rings */}
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-rose-400/30 animate-spin" style={{ animationDuration: '12s' }}></div>
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-pink-400/50 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}></div>
                <div className="absolute inset-6 rounded-full bg-rose-50 flex items-center justify-center" id="radar-center-pulse">
                  <Heart className="w-16 h-16 text-rose-500 fill-rose-100 animate-pulse" />
                </div>
                {/* Scanning line sweep */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.8)] animate-pulse origin-center h-full"></div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-extrabold text-gray-800 animate-pulse">Scanning Cuteness...</h3>
                <p className="text-xs text-rose-500 font-bold uppercase tracking-wider mt-1">Telemetry Sensor #143 Active</p>
              </div>
            </div>

            {/* Custom Terminal / Log Box */}
            <div className="bg-neutral-900 rounded-2xl p-5 font-mono text-xs text-rose-400/90 shadow-inner border border-neutral-800 space-y-3" id="scanning-terminal">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-neutral-500">
                <span>⚡ EHTISHAM_DIAGNOSTIC_v1.0.3</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              </div>
              
              {/* ASCII Progress Bar */}
              <div className="space-y-1" id="ascii-loader">
                <div className="text-white font-bold flex justify-between">
                  <span>PROGRESS:</span>
                  <span className="text-rose-400 font-extrabold">{progress}%</span>
                </div>
                <div className="text-rose-300 tracking-wider text-sm select-none break-all font-mono">
                  [{getProgressBarString()}]
                </div>
              </div>

              {/* Console Logs */}
              <div 
                ref={logContainerRef}
                className="h-28 overflow-y-auto space-y-1 border-t border-neutral-800/50 pt-2 text-left scrollbar-thin scrollbar-thumb-neutral-800"
                id="terminal-logs"
              >
                {logs.map((log, index) => (
                  <div key={index} className="transition-all duration-300">
                    <span className="text-rose-500/50 mr-1">&gt;</span> {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Results Stage */
          <div className="space-y-8 animate-fade-in text-center" id="results-phase">
            <div className="space-y-2">
              <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-600 animate-bounce mb-2">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-gray-800 font-sans tracking-tight">Diagnosis Results Found!</h3>
              <p className="text-sm text-gray-500 font-medium">Critical bio-data synced from Ehtisham's cute biometric profile</p>
            </div>

            {/* Visual Meters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left" id="results-meters-grid">
              
              {/* Cuteness Level */}
              <div className="bg-rose-50/50 border border-rose-100 p-5 rounded-2xl space-y-3 shadow-xs" id="meter-cuteness">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                    <Smile className="w-4.5 h-4.5 text-rose-500" />
                    Cuteness Level
                  </span>
                  <span className="text-rose-600 font-black text-lg animate-pulse">9999%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-rose-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-linear-to-r from-rose-500 to-pink-500 h-full rounded-full w-full animate-pulse"></div>
                </div>
                <p className="text-[11px] text-rose-700 font-semibold italic">🚨 Critical levels: Extremely dangerous to hearts nearby.</p>
              </div>

              {/* Handsome Level */}
              <div className="bg-amber-50/40 border border-amber-100 p-5 rounded-2xl space-y-3 shadow-xs" id="meter-handsome">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                    <ShieldAlert className="w-4.5 h-4.5 text-amber-500 animate-bounce" />
                    Handsome Level
                  </span>
                  <span className="text-amber-600 font-black text-lg">DANGEROUS ⚠️</span>
                </div>
                <div className="w-full bg-amber-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-linear-to-r from-amber-500 to-orange-500 h-full rounded-full w-full"></div>
                </div>
                <p className="text-[11px] text-amber-700 font-semibold italic">Requires immediate inspection and safety warnings.</p>
              </div>

              {/* Sleep Level */}
              <div className="bg-blue-50/40 border border-blue-100 p-5 rounded-2xl space-y-3 shadow-xs" id="meter-sleep">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                    <BedDouble className="w-4.5 h-4.5 text-blue-500" />
                    Sleep Level
                  </span>
                  <span className="text-blue-600 font-bold text-sm">Needs Improvement</span>
                </div>
                <div className="w-full bg-blue-100 h-3 rounded-full overflow-hidden relative">
                  {/* Low bar (40%) */}
                  <div className="bg-linear-to-r from-blue-400 to-indigo-500 h-full rounded-full w-[40%]"></div>
                </div>
                <p className="text-[11px] text-blue-700 font-semibold italic">🥱 Prescribing cozy blankets and virtual warm hugs.</p>
              </div>

              {/* Missing You Level */}
              <div className="bg-pink-50/50 border border-pink-100 p-5 rounded-2xl space-y-3 shadow-xs" id="meter-missing">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                    <Heart className="w-4.5 h-4.5 text-pink-500 fill-pink-500 animate-pulse" />
                    Missing You Level
                  </span>
                  <span className="text-pink-600 font-black text-lg">100% 💖</span>
                </div>
                <div className="w-full bg-pink-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-linear-to-r from-pink-500 to-rose-500 h-full rounded-full w-full"></div>
                </div>
                <p className="text-[11px] text-pink-700 font-semibold italic">Synchronized fully with Abdul Rehman's tracker!</p>
              </div>

            </div>

            {/* Action to proceed */}
            <div className="pt-6 border-t border-rose-50" id="results-action-container">
              <button 
                onClick={() => {
                  audio.play('click');
                  onScanComplete();
                }}
                className="cursor-pointer w-full bg-linear-to-r from-indigo-500 via-rose-500 to-pink-500 text-white font-extrabold text-lg py-4 px-8 rounded-2xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                id="next-quiz-button"
              >
                <BrainCircuit className="w-5.5 h-5.5 animate-pulse" />
                Analyze Emotional State 🧠
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
