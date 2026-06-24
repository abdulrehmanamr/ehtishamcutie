/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Award, 
  Send, 
  Heart, 
  Gift, 
  RotateCcw, 
  Copy, 
  Sparkles,
  ClipboardCheck
} from 'lucide-react';
import { audio } from './AudioEngine';

interface FinalProps {
  onRestart: () => void;
}

export default function FinalDiagnosis({ onRestart }: FinalProps) {
  const [copied, setCopied] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);

  const messageText = `Hey Abdul Rehman! 😊 My Ehtisham Daily Check-Up is complete! I am officially loved, missed, and required to send one smile. Here is my smile: 😁❤️ and I'm ready to claim my virtual hug! 🤗`;

  const encodedMessage = encodeURIComponent(messageText);
  // Prefilled WhatsApp URL
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;

  const handleCopyToClipboard = () => {
    audio.play('click');
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

        {/* Official Prescription Certificate Frame */}
        <div 
          className="my-8 border-4 border-double border-rose-200 bg-rose-50/25 p-6 rounded-2xl relative text-left space-y-6 shadow-inner" 
          id="prescription-frame"
        >
          {/* Official Seal Watermark */}
          <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none">
            <Award className="w-24 h-24 text-rose-500 fill-rose-300" />
          </div>

          <div className="flex justify-between items-center border-b border-rose-100 pb-3" id="prescription-header">
            <div>
              <p className="text-[10px] font-black text-rose-500 uppercase">RX TREATMENT PLAN</p>
              <h3 className="text-lg font-extrabold text-gray-800">Ehtisham Cuteness Care</h3>
            </div>
            <span className="text-[10px] text-gray-400 font-bold font-mono">No. 143-LOVE</span>
          </div>

          {/* Diagnosis Block */}
          <div className="space-y-1" id="rx-diagnosis">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">DIAGNOSIS</h4>
            <p className="text-gray-700 font-medium leading-relaxed" id="diagnosis-text">
              You are officially <strong className="text-rose-600 font-extrabold underline decoration-rose-300">loved</strong>,{' '}
              <strong className="text-pink-600 font-extrabold underline decoration-pink-300">missed</strong>, and{' '}
              <strong className="text-gray-900 font-black">required to send one smile immediately</strong>.
            </p>
          </div>

          {/* Penalty Block */}
          <div className="space-y-1.5 border-t border-rose-100 pt-4" id="rx-penalty">
            <h4 className="text-xs font-black text-red-500 uppercase tracking-wider flex items-center gap-1">
              🚨 PENALTY FOR IGNORING
            </h4>
            <div className="bg-red-50/60 border border-red-100 rounded-xl p-3 text-red-800 text-xs font-bold leading-relaxed space-y-1">
              <p className="flex items-center gap-1.5">
                <span>🤗</span> 1 virtual hug (Non-negotiable)
              </p>
              <p className="flex items-center gap-1.5">
                <span>❤️</span> 3 extra messages today
              </p>
            </div>
          </div>
        </div>

        {/* Primary CTA (Send Smile to Abdul Rehman) */}
        <div className="space-y-4" id="action-buttons-box">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audio.play('success')}
            className="cursor-pointer w-full bg-linear-to-r from-emerald-500 via-rose-500 to-pink-500 hover:opacity-95 text-white font-extrabold text-lg py-4 px-8 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            id="btn-send-smile"
          >
            <Send className="w-5.5 h-5.5 text-white animate-pulse" />
            Send Smile To Abdul Rehman 😆
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
                  Smile Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  Copy Smile Text 📋
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
