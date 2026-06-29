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
  PartyPopper,
  HelpCircle,
  Eye,
  Moon
} from 'lucide-react';
import { audio } from './AudioEngine';
import { DailyReport } from '../types';

interface DashboardProps {
  report: DailyReport;
  setReport: React.Dispatch<React.SetStateAction<DailyReport>>;
  dailyQuestion: {
    question: string;
    options: { key: string; label: string }[];
  };
  onStartScan: () => void;
}

export default function InspectionDashboard({ 
  report, 
  setReport, 
  dailyQuestion, 
  onStartScan 
}: DashboardProps) {
  const [showAteWarning, setShowAteWarning] = useState(false);

  const handleSmileSelect = (status: string) => {
    audio.play('click');
    setReport(prev => ({ ...prev, smiled: status }));
  };

  const handleEatStatus = (status: 'nourished' | 'skipped') => {
    audio.play('click');
    setReport(prev => ({ ...prev, ate: status }));
    if (status === 'skipped') {
      setShowAteWarning(true);
    } else {
      setShowAteWarning(false);
    }
  };

  const handleDrinkWater = () => {
    audio.play('pop');
    setReport(prev => ({ ...prev, waterCups: Math.min(prev.waterCups + 1, 10) }));
  };

  const handleWaterClick = (count: number) => {
    audio.play('pop');
    setReport(prev => ({ ...prev, waterCups: count }));
  };

  const handleMissedMe = () => {
    audio.play('success');
    setReport(prev => ({ ...prev, missedStatus: 'absolute' }));
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
            <div className="flex flex-col p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 transition-all hover:bg-slate-50/80" id="report-item-smiled">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600">
                    <Smile className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Mood Metric</p>
                    <p className="text-sm font-bold text-gray-700">Did you smile today? 😊</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2" id="smile-options">
                {[
                  { key: 'smiled_bright', label: 'Yes, a big bright smile! 😁' },
                  { key: 'blushed', label: 'Blushed thinking of you 🥰' },
                  { key: 'giggled', label: 'A little sweet giggle 🤭' },
                  { key: 'waiting', label: 'No, waiting for your texts 🥺' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSmileSelect(opt.key)}
                    className={`cursor-pointer text-left text-[11px] font-bold p-2.5 rounded-xl border transition-all ${
                      report.smiled === opt.key
                        ? 'bg-amber-500 border-amber-500 text-white shadow-xs scale-[1.02]'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. SLEEP HOURS CHECK */}
            <div className="flex flex-col p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 transition-all hover:bg-slate-50/80" id="report-item-sleep">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-600">
                    <Moon className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Rest Telemetry</p>
                    <p className="text-sm font-bold text-gray-700">How many hours did you sleep today? 😴</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2" id="sleep-options">
                {[
                  { key: 'under_5', label: 'Under 5 hours 🥱' },
                  { key: '6_7', label: '6-7 hours (Decent) 😴' },
                  { key: '8_plus', label: '8+ hours (Healthy) ✨' },
                  { key: 'thinking_of_you', label: 'Thinking of you instead 🦉' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      audio.play('pop');
                      setReport(prev => ({ ...prev, sleepHours: opt.key }));
                    }}
                    className={`cursor-pointer text-left text-[11px] font-bold p-2.5 rounded-xl border transition-all ${
                      report.sleepHours === opt.key
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs scale-[1.02]'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. ATE PROPERLY */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-slate-50/80" id="report-item-ate">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${report.ate === 'nourished' ? 'bg-emerald-100 text-emerald-600' : report.ate === 'skipped' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nutrition</p>
                  <p className="text-sm font-bold text-gray-700">Ate Properly?</p>
                </div>
              </div>
              <div className="flex gap-2">
                {report.ate === 'unknown' ? (
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
                ) : report.ate === 'nourished' ? (
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

            {/* 4. DRANK WATER (Goal: 8 cups) */}
            <div className="flex flex-col p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 transition-all hover:bg-slate-50/80" id="report-item-water">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${report.waterCups >= 8 ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-500'}`}>
                    <Droplet className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Hydration (Goal: 8 Glasses 💧)</p>
                    <p className="text-sm font-bold text-gray-700">Water tracker: {report.waterCups}/10 Glasses</p>
                  </div>
                </div>
                <div className="text-xs font-bold text-sky-600">
                  {report.waterCups >= 8 ? 'Fully Hydrated! 💦' : 'Needs more water! 💧'}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                {/* Visual Glass indicator for 10 cups */}
                <div className="flex gap-1.5" id="water-cups-bar">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleWaterClick(idx)}
                      className="cursor-pointer transition-transform hover:scale-125 focus:outline-hidden"
                      title={`${idx} Glasses`}
                    >
                      <GlassWater 
                        className={`w-5.5 h-5.5 transition-all ${
                          idx <= report.waterCups 
                            ? 'text-sky-500 fill-sky-200 scale-110' 
                            : 'text-gray-300 hover:text-sky-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button 
                  onClick={handleDrinkWater}
                  disabled={report.waterCups >= 10}
                  className={`cursor-pointer text-xs font-extrabold px-3 py-2 rounded-xl border transition-all ${
                    report.waterCups >= 10
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                      : 'bg-sky-50 border-sky-100 text-sky-600 hover:bg-sky-100'
                  }`}
                >
                  {report.waterCups >= 10 ? 'Fully Hydrated! 🎉' : '+ Drink 1 Glass 💧'}
                </button>
              </div>
            </div>

            {/* 5. MISSED ME */}
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
                {report.missedStatus === 'likely' ? (
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

            {/* 6. MOISTURIZER CHECK */}
            <div className="flex flex-col p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 transition-all hover:bg-slate-50/80" id="report-item-moisturizer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${report.appliedMoisturizer === 'applied_smooth' ? 'bg-emerald-100 text-emerald-600' : 'bg-pink-100 text-pink-500'}`}>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dermatology</p>
                    <p className="text-sm font-bold text-gray-700">Applied Moisturizer today?</p>
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-400">
                  {report.appliedMoisturizer === 'applied_smooth' ? '✨ Silky Smooth' : '🌵 Dry / Pending'}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2" id="moisturizer-options">
                {[
                  { key: 'applied_smooth', label: 'Yes, silky baby skin! ✨' },
                  { key: 'desert_dry', label: 'Desert dry today 🌵' },
                  { key: 'abdul_rehman_will_apply', label: 'Abdul Rehman apply it! 🥰' },
                  { key: 'not_yet', label: 'No, I forgot 🥺' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      audio.play('pop');
                      setReport(prev => ({ ...prev, appliedMoisturizer: opt.key }));
                    }}
                    className={`cursor-pointer text-left text-[11px] font-bold p-2.5 rounded-xl border transition-all ${
                      report.appliedMoisturizer === opt.key
                        ? 'bg-rose-500 border-rose-500 text-white shadow-xs scale-[1.02]'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 7. KILLER EYES TELEMETRY */}
            <div className="flex flex-col p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 transition-all hover:bg-slate-50/80" id="report-item-killer-eyes">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-100 text-purple-600">
                    <Eye className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Lethal Biometrics</p>
                    <p className="text-sm font-bold text-gray-700">Casualties from killer eyes? 👀</p>
                  </div>
                </div>
                <div className="text-xs font-bold text-purple-600 animate-pulse">
                  {report.eyeCasualties === 'only_abdul_rehman' ? '🎯 Critical Hit!' : '⚠️ Restricted'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2" id="killer-eyes-options">
                {[
                  { key: 'zero', label: '0, kept them closed 🙈' },
                  { key: 'few_innocent', label: '1-10 innocent people 💀' },
                  { key: 'overwhelming', label: 'Entire army of fans 💅' },
                  { key: 'only_abdul_rehman', label: 'Only Abdul Rehman ❤️💀' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      audio.play('pop');
                      setReport(prev => ({ ...prev, eyeCasualties: opt.key }));
                    }}
                    className={`cursor-pointer text-left text-[11px] font-bold p-2.5 rounded-xl border transition-all ${
                      report.eyeCasualties === opt.key
                        ? 'bg-purple-600 border-purple-600 text-white shadow-xs scale-[1.02]'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 8. SINGLE RANDOM DAILY BONUS QUESTION */}
            <div className="p-5 rounded-3xl bg-amber-50/40 border-2 border-dashed border-amber-200/80 space-y-3" id="report-item-daily-question">
              <div className="space-y-3" id="daily-q-wrapper">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-600 animate-bounce">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Daily Random Bonus Question</p>
                    <p className="text-sm font-extrabold text-gray-800">{dailyQuestion.question}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-1" id="daily-question-choices">
                  {dailyQuestion.options.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        audio.play('click');
                        setReport(prev => ({ ...prev, dailyQuestionAnswer: opt.label }));
                      }}
                      className={`cursor-pointer w-full text-left text-xs font-bold p-3 rounded-xl border transition-all ${
                        report.dailyQuestionAnswer === opt.label
                          ? 'bg-linear-to-r from-amber-500 to-rose-500 border-amber-500 text-white shadow-md translate-x-1 font-extrabold'
                          : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
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
