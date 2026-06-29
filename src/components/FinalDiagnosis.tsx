/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle, 
  Award, 
  Send, 
  Heart, 
  Gift, 
  RotateCcw, 
  Copy, 
  Sparkles,
  ClipboardCheck,
  FileText
} from 'lucide-react';
import { audio } from './AudioEngine';
import { DailyReport } from '../types';

interface FinalProps {
  report: DailyReport;
  onRestart: () => void;
}

export default function FinalDiagnosis({ report, onRestart }: FinalProps) {
  const [copied, setCopied] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);

  // Smile mapping
  const smileLabels: Record<string, string> = {
    smiled_bright: 'Fully smiling! 😁',
    blushed: 'Blushed! 🥰',
    giggled: 'Giggled! 🤭',
    waiting: 'Waiting for texts! 🥺'
  };
  const smilesText = smileLabels[report.smiled] || report.smiled;

  // Sleep mapping
  const sleepLabels: Record<string, string> = {
    under_5: 'Under 5 hours 🥱',
    '6_7': '6-7 hours (Decent) 😴',
    '8_plus': '8+ hours (Healthy) ✨',
    thinking_of_you: 'Thinking of you! 🦉',
    not_checked: 'Not checked'
  };
  const sleepText = sleepLabels[report.sleepHours] || report.sleepHours;

  const foodText = report.ate === 'nourished' ? 'Fed & Full! 🍔' : report.ate === 'skipped' ? 'Skipped! 🥺 (Eat now!)' : 'Unknown 🤨';
  const waterText = `${report.waterCups}/8 Glasses 💧`;
  const missedText = report.missedStatus === 'absolute' ? '1000% CONFIRMED! 😍' : 'Highly Likely ❤️';
  
  // Moisturizer mapping
  const moisturizerLabels: Record<string, string> = {
    applied_smooth: 'Silky baby skin! ✨',
    desert_dry: 'Desert dry today 🌵',
    abdul_rehman_will_apply: 'Abdul Rehman will apply! 🥰',
    not_yet: 'No, forgot 🥺'
  };
  const moisturizerText = moisturizerLabels[report.appliedMoisturizer] || 'Not checked';

  // Killer eyes mapping
  const eyeLabels: Record<string, string> = {
    zero: '0, kept closed 🙈',
    few_innocent: '1-10 innocent people 💀',
    overwhelming: 'Entire army of fans 💅',
    only_abdul_rehman: 'Only Abdul Rehman (Died of cuteness) ❤️💀'
  };
  const eyesText = eyeLabels[report.eyeCasualties] || 'Not checked';

  const reportString = `📊 DAILY CHECK-UP STATUS 📊
----------------------------------
👨‍⚕️ Subject: Ehtisham Cutie ❤️
📅 Date: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}

✨ Smiled: ${smilesText}
😴 Sleep: ${sleepText}
🍔 Food: ${foodText}
💧 Water: ${waterText}
🥰 Missed Me: ${missedText}
🧼 Moisturizer: ${moisturizerText}
👀 Killer Eyes: ${eyesText}

❓ Daily Question: "${report.dailyQuestionText}"
👉 Answer: ${report.dailyQuestionAnswer || "No answer selected"}

----------------------------------
Love from Abdul Rehman 👨‍⚕️❤️`;

  const encodedMessage = encodeURIComponent(reportString);
  // Prefilled WhatsApp URL
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;

  const handleCopyToClipboard = () => {
    audio.play('click');
    navigator.clipboard.writeText(reportString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleCoupon = () => {
    audio.play('success');
    setShowCoupon(prev => !prev);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6" id="final-diagnosis-section">
      <div 
        className="bg-white rounded-3xl border border-rose-100 shadow-xl overflow-hidden p-8 text-center relative"
        id="diagnosis-card"
      >
        {/* Confetti / Sparkle background effects */}
        <div className="absolute top-6 left-6 animate-spin text-pink-300" style={{ animationDuration: '6s' }}>
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute top-6 right-6 animate-pulse text-amber-300">
          <Heart className="w-6 h-6 fill-amber-300" />
        </div>

        {/* Check-Up Complete Status */}
        <div className="space-y-3" id="final-status-header">
          <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-600 animate-bounce mb-2">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight" id="final-complete-message">
            Daily Check-Up Complete ✅
          </h2>
          <p className="text-xs text-emerald-600 font-extrabold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
            Health &amp; Love Status: PERFECT!
          </p>
        </div>

        {/* Diagnostic Report Preview */}
        <div className="mt-6 text-left" id="report-preview-block">
          <div className="flex items-center gap-2 mb-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
            <FileText className="w-4 h-4 text-rose-500" />
            <span>Generated Compact Inspection Report:</span>
          </div>
          <div className="bg-slate-900 text-slate-100 font-mono text-[11px] p-5 rounded-2xl overflow-x-auto border border-slate-800 shadow-inner whitespace-pre-wrap leading-relaxed select-text" id="raw-report-preview">
            {reportString}
          </div>
        </div>

        {/* Primary CTA (Send Smile to Abdul Rehman) */}
        <div className="space-y-4" id="action-buttons-box">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audio.play('success')}
            className="cursor-pointer w-full bg-linear-to-r from-emerald-500 via-rose-500 to-pink-500 hover:opacity-95 text-white font-extrabold text-base py-4 px-8 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            id="btn-send-smile"
          >
            <Send className="w-5.5 h-5.5 text-white animate-pulse" />
            Send Daily Report on WhatsApp 🚀
          </a>

          {/* Supplementary Copier / Share Controls */}
          <div className="flex gap-2 justify-center" id="secondary-controls">
            <button
              onClick={handleCopyToClipboard}
              className="cursor-pointer flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 transition-colors"
              id="btn-copy"
            >
              {copied ? (
                <>
                  <ClipboardCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Report Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  Copy Report to Clipboard 📋
                </>
              )}
            </button>

            <button
              onClick={toggleCoupon}
              className="cursor-pointer flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs px-4 py-2.5 rounded-xl border border-rose-200 transition-colors"
              id="btn-coupon"
            >
              <Gift className="w-3.5 h-3.5 text-rose-500 fill-rose-200" />
              Claim Love Coupon 🎁
            </button>
          </div>
        </div>

        {/* Love Coupon Overlay / Modal Card */}
        {showCoupon && (
          <div className="mt-6 bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-5 text-center space-y-3 animate-fade-in" id="coupon-widget">
            <p className="text-xs font-black text-amber-700 uppercase tracking-widest flex justify-center items-center gap-1">
              🎉 EXCLUSIVE LOVE COUPON
            </p>
            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-xs text-left" id="coupon-ticket">
              <p className="text-xs text-gray-400 font-bold uppercase">REDEEMABLE FROM ABDUL REHMAN</p>
              <h4 className="text-base font-extrabold text-amber-800 mt-1">1x Giant Warm Cuddle Pass</h4>
              <p className="text-xs text-gray-500 mt-1">Valid forever. Present this certificate to claim your virtual or physical hugs and endless messages! ❤️</p>
            </div>
            <button
              onClick={toggleCoupon}
              className="cursor-pointer text-xs font-black text-amber-800 hover:underline"
            >
              Close Coupon
            </button>
          </div>
        )}

        {/* Restart/Recalibrate Tool */}
        <div className="pt-6 mt-8 border-t border-rose-50 text-center" id="diagnostic-recalibrator">
          <button
            onClick={() => {
              audio.play('click');
              onRestart();
            }}
            className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-500 font-bold transition-colors"
            id="btn-recalibrate"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Recalibrate Inspection System
          </button>
        </div>

      </div>
    </div>
  );
}
