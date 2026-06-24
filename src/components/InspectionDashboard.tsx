/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Heart, 
  Smile, 
  Utensils, 
  Droplet, 
  Activity, 
  Sparkles, 
  Calendar, 
  User, 
  ShieldAlert,
  GlassWater,
  PartyPopper
} from 'lucide-react';
import { audio } from './AudioEngine';

interface DashboardProps {
  onStartScan: () => void;
}

export default function InspectionDashboard({ onStartScan }: DashboardProps) {
  // Report states
  const [smiled, setSmiled] = useState<'checking' | 'verified'>('checking');
  const [smileProgress, setSmileProgress] = useState(false);
  const [ate, setAte] = useState<'unknown' | 'nourished' | 'skipped'>('unknown');
  const [showAteWarning, setShowAteWarning] = useState(false);
  const [waterCups, setWaterCups] = useState(1); // Suspicious
  const [missedStatus, setMissedStatus] = useState<'likely' | 'absolute'>('likely');

  const handleSmileScan = () => {
    audio.play('click');
    setSmileProgress(true);
    setTimeout(() => {
      setSmiled('verified');
      setSmileProgress(false);
      audio.play('success');
    }, 2000);
  };

  const handleEatStatus = (status: 'nourished' | 'skipped') => {
    audio.play('click');
    setAte(status);
    if (status === 'skipped') {
      setShowAteWarning(true);
    } else {
      setShowAteWarning(false);
    }
  };

  const handleDrinkWater = () => {
    audio.play('pop');
    setWaterCups(prev => Math.min(prev + 1, 5));
  };

  const handleMissedMe = () => {
    audio.play('success');
    setMissedStatus('absolute');
  };

  const handleInitiateScan = () => {
    audio.play('click');
    onStartScan();
  };

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6" id="inspection-dashboard">
      {/* Decorative Top Badge */}
      <div className="flex justify-center" id="dashboard-badge-container">
        <div 
          className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider animate-pulse shadow-sm"
          id="system-status-badge"
        >
          <Activity className="w-3.5 h-3.5" />
          SYSTEM STATUS: ONLINE &amp; CRAVING YOU
        </div>
      </div>

      {/* Main Welcoming Card */}
      <div className="bg-white rounded-3xl border border-rose-100 shadow-xl overflow-hidden" id="dashboard-main-card">
        {/* Card Header (Cute Medical Style) */}
        <div className="bg-linear-to-r from-rose-500 via-pink-500 to-rose-400 p-8 text-white text-center relative" id="dashboard-header">
          {/* Subtle Heart sparkles background */}
          <div className="absolute top-4 right-4 animate-bounce">
            <Heart className="w-6 h-6 text-white/40 fill-white/20" />
          </div>
          <div className="absolute bottom-4 left-4 animate-pulse">
            <Sparkles className="w-6 h-6 text-white/30" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight font-sans drop-shadow-xs" id="dashboard-title">
            👨‍⚕️ Ehtisham Daily Check-Up Center
          </h1>
          <p className="mt-2 text-rose-100/90 text-sm font-medium" id="dashboard-subtitle">
            Official Cuteness, Health &amp; Happiness Monitoring System
          </p>

          {/* Patient Details Sub-bar */}
          <div className="mt-6 grid grid-cols-2 gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-3.5 text-xs text-left" id="patient-meta-grid">
            <div className="flex items-center gap-2 border-r border-white/20 pr-2" id="patient-meta-name-box">
              <User className="w-4.5 h-4.5 text-rose-200" />
              <div>
                <p className="text-white/60 font-medium">PATIENT NAME</p>
                <p className="font-semibold text-white">Ehtisham Cutie ❤️</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pl-2" id="patient-meta-date-box">
              <Calendar className="w-4.5 h-4.5 text-rose-200" />
              <div>
                <p className="text-white/60 font-medium">DATE OF INSPECTION</p>
                <p className="font-semibold text-white">{todayStr}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Report Panel */}
        <div className="p-8 space-y-6" id="dashboard-body">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b border-rose-50 pb-3" id="todays-report-heading">
            📋 Today's Initial Report
          </h2>

          <div className="space-y-4" id="report-items-container">
            {/* 1. SMILED TODAY */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-slate-50/80" id="report-item-smiled">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${smiled === 'verified' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'} transition-colors`}>
                  <Smile className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Metric</p>
                  <p className="text-sm font-bold text-gray-700">Smiled Today?</p>
                </div>
              </div>
              <div>
                {smileProgress ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 animate-pulse bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                    Scanning Face...
                  </div>
                ) : smiled === 'verified' ? (
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                    ✅ Verified Beautiful!
                  </div>
                ) : (
                  <button 
                    onClick={handleSmileScan}
                    className="cursor-pointer text-xs font-bold text-rose-500 bg-rose-50 border border-rose-100 hover:bg-rose-100 hover:text-rose-600 px-3 py-1.5 rounded-full transition-all hover:scale-105"
                  >
                    🔍 Verify Smile
                  </button>
                )}
              </div>
            </div>

            {/* 2. ATE PROPERLY */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-slate-50/80" id="report-item-ate">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${ate === 'nourished' ? 'bg-emerald-100 text-emerald-600' : ate === 'skipped' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nutrition</p>
                  <p className="text-sm font-bold text-gray-700">Ate Properly?</p>
                </div>
              </div>
              <div className="flex gap-2">
                {ate === 'unknown' ? (
                  <>
                    <button 
                      onClick={() => handleEatStatus('nourished')}
                      className="cursor-pointer text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      Yes 🍔
                    </button>
                    <button 
                      onClick={() => handleEatStatus('skipped')}
                      className="cursor-pointer text-xs font-bold text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      No 🥺
                    </button>
                  </>
                ) : ate === 'nourished' ? (
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                    ✅ Nourished &amp; Fed!
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                    ❌ Skipped Meals!
                  </div>
                )}
              </div>
            </div>

            {/* Eating warning popup modal inside list */}
            {showAteWarning && (
              <div className="p-4 rounded-2xl bg-red-50 border-2 border-dashed border-red-200 text-red-700 text-xs space-y-2 animate-bounce" id="eating-warning">
                <div className="flex items-center gap-2 font-bold text-red-800">
                  <ShieldAlert className="w-4 h-4" />
                  CRITICAL NUTRITION ALERT
                </div>
                <p>
                  Chief Inspector <strong>Abdul Rehman</strong> commands you to eat something yummy immediately! Cuteness reserves cannot operate on an empty stomach. Go grab a snack! ❤️🍔🍕
                </p>
                <button 
                  onClick={() => handleEatStatus('nourished')}
                  className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 rounded-md transition-colors"
                >
                  Okay, I'll eat right now!
                </button>
              </div>
            )}

            {/* 3. DRANK WATER */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-slate-50/80" id="report-item-water">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${waterCups >= 4 ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-500'}`}>
                  <Droplet className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Hydration</p>
                  <p className="text-sm font-bold text-gray-700">Drank Water?</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Visual Cup indicator */}
                <div className="flex gap-1" id="water-cups-bar">
                  {[1, 2, 3, 4, 5].map((idx) => (
                    <GlassWater 
                      key={idx}
                      className={`w-5 h-5 transition-all ${
                        idx <= waterCups 
                          ? 'text-sky-500 fill-sky-200 scale-110' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                {waterCups >= 4 ? (
                  <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    Hydrated ✅
                  </div>
                ) : (
                  <button 
                    onClick={handleDrinkWater}
                    className="cursor-pointer text-xs font-bold text-sky-600 bg-sky-50 border border-sky-100 hover:bg-sky-100 px-3 py-1 rounded-lg transition-all"
                  >
                    + Drink Cup 💧
                  </button>
                )}
              </div>
            </div>

            {/* 4. MISSED ME */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-slate-50/80" id="report-item-missed">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-pink-100 text-pink-500">
                  <Heart className="w-5 h-5 fill-pink-500 animate-heartbeat" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Emotional Telemetry</p>
                  <p className="text-sm font-bold text-gray-700">Missed Me?</p>
                </div>
              </div>
              <div>
                {missedStatus === 'likely' ? (
                  <button 
                    onClick={handleMissedMe}
                    className="cursor-pointer text-xs font-bold text-pink-600 bg-pink-50 border border-pink-100 hover:bg-pink-100 px-3 py-1.5 rounded-full transition-all animate-pulse"
                  >
                    Highly Likely ❤️ (Confirm)
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-black text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 animate-bounce">
                    <PartyPopper className="w-3.5 h-3.5" />
                    1000% CONFIRMED! 😍
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Trigger Box */}
          <div className="pt-6 text-center border-t border-rose-50" id="scan-trigger-box">
            <p className="text-xs text-gray-400 mb-4">
              All biometric indicators loaded. Press below to initiate deep-inspection scanning.
            </p>
            <button 
              onClick={handleInitiateScan}
              className="cursor-pointer w-full bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-lg py-4 px-8 rounded-2xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
              id="start-scan-button"
            >
              <Activity className="w-5.5 h-5.5 animate-pulse text-white group-hover:rotate-12 transition-transform" />
              Start Ehtisham Scan 🔍
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
