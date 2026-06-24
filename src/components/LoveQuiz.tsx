/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Heart, HelpCircle, ArrowRight } from 'lucide-react';
import { audio } from './AudioEngine';

interface QuizProps {
  onQuizAnswer: () => void;
}

export default function LoveQuiz({ onQuizAnswer }: QuizProps) {
  const [noClicks, setNoClicks] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const funnyNoLabels = [
    "No",
    "Wait, error! 🚫",
    "Not allowed! 😂",
    "Try again 😜",
    "Nice try!",
    "Click Yes! ❤️",
    "Invalid action! 🙅‍♂️",
    "No is disabled 🔒",
    "Abdul Rehman says No 🥺",
    "Physics error! 🌌"
  ];

  const handleRunaway = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    audio.play('click');
    
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const btnWidth = 120;
    const btnHeight = 44;
    
    // Calculate random position within boundaries of container (leaving some padding)
    const maxX = containerRect.width - btnWidth - 20;
    const maxY = containerRect.height - btnHeight - 20;
    
    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));
    
    setNoPosition({ x: randomX, y: randomY });
    setIsMoved(true);
    setNoClicks(prev => prev + 1);
  };

  const handleLoveAnswer = () => {
    audio.play('success');
    onQuizAnswer();
  };

  const currentNoLabel = funnyNoLabels[noClicks % funnyNoLabels.length];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6" id="love-quiz">
      <div 
        ref={containerRef}
        className="bg-white rounded-3xl border border-rose-100 shadow-xl overflow-hidden p-8 text-center relative min-h-[450px] flex flex-col justify-between"
        id="quiz-container"
      >
        {/* Header Question */}
        <div className="space-y-4 pt-4" id="quiz-header">
          <div className="inline-flex p-3 rounded-full bg-pink-100 text-pink-500 animate-pulse">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight" id="quiz-question">
            Did you miss me today?
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Honesty is required by the Chief inspection directives. Choose wisely, Ehtisham! ❤️
          </p>
        </div>

        {/* Buttons Section (Interactive & Floating) */}
        <div className="my-8 relative flex-1 flex flex-col justify-center items-center gap-4" id="quiz-buttons-area">
          {/* Positive Buttons container */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md z-10" id="positive-buttons-container">
            <button
              onClick={handleLoveAnswer}
              className="cursor-pointer flex-1 bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold py-3 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              id="btn-yes-1"
            >
              <Heart className="w-5 h-5 fill-white" />
              ❤️ Yes
            </button>

            <button
              onClick={handleLoveAnswer}
              className="cursor-pointer flex-1 bg-linear-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-extrabold py-3 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              id="btn-yes-2"
            >
              <Heart className="w-5 h-5 fill-white animate-bounce" />
              💖 Of Course
            </button>

            <button
              onClick={handleLoveAnswer}
              className="cursor-pointer flex-1 bg-linear-to-r from-rose-400 to-red-400 hover:from-rose-500 hover:to-red-500 text-white font-extrabold py-3 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              id="btn-yes-3"
            >
              <Heart className="w-5 h-5 fill-white animate-pulse" />
              🥺 Very Much
            </button>
          </div>

          {/* Evasive RUNAWAY NO Button */}
          <button
            onMouseEnter={handleRunaway}
            onTouchStart={handleRunaway}
            onClick={handleRunaway}
            style={
              isMoved
                ? {
                    position: 'absolute',
                    left: `${noPosition.x}px`,
                    top: `${noPosition.y}px`,
                    transition: 'left 0.15s ease-out, top 0.15s ease-out',
                    zIndex: 20,
                  }
                : {
                    position: 'relative',
                    marginTop: '1.5rem',
                    zIndex: 20,
                  }
            }
            className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 font-bold py-2.5 px-6 rounded-xl border border-slate-200 transition-colors shadow-xs"
            id="btn-no-evasive"
          >
            {currentNoLabel}
          </button>
        </div>

        {/* Footnote */}
        <div className="text-xs text-slate-400 pt-4 border-t border-rose-50" id="quiz-footer">
          {noClicks > 0 && (
            <p className="text-rose-500 font-medium animate-pulse">
              🏃‍♂️ No button clicked/evaded {noClicks} times. Give up, Ehtisham! No is not an option! 😂
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
