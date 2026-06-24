/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Flame, Trophy, Play, Award } from 'lucide-react';
import { FloatingHeart } from '../types';
import { audio } from './AudioEngine';

interface GameProps {
  onGameComplete: () => void;
}

interface FloatIndicator {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

export default function HeartGame({ onGameComplete }: GameProps) {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [indicators, setIndicators] = useState<FloatIndicator[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVictory, setShowVictory] = useState(false);
  
  const nextHeartId = useRef(0);
  const nextIndicatorId = useRef(0);
  const arenaRef = useRef<HTMLDivElement>(null);

  // Heart spawning logic
  const spawnHeart = (isGolden = false, isSuper = false, isHug = false) => {
    if (!arenaRef.current || !isPlaying || showVictory) return;
    const arenaRect = arenaRef.current.getBoundingClientRect();
    
    const id = nextHeartId.current++;
    const x = Math.floor(Math.random() * (arenaRect.width - 50)) + 10;
    const y = arenaRect.height; // start at bottom
    
    let size = 28;
    let speedY = Math.random() * 2 + 1.5;
    let speedX = (Math.random() - 0.5) * 1;
    let color = 'text-rose-500 fill-rose-400';
    let emoji = '❤️';
    let value = 1;

    if (isHug) {
      size = 46;
      speedY = Math.random() * 1 + 1;
      color = 'text-purple-500 fill-purple-300';
      emoji = '🤗';
      value = 20;
    } else if (isGolden) {
      size = 38;
      speedY = Math.random() * 1.5 + 2;
      color = 'text-amber-500 fill-amber-300';
      emoji = '💛';
      value = 10;
    } else if (isSuper) {
      size = 34;
      speedY = Math.random() * 2 + 2;
      color = 'text-pink-500 fill-pink-300';
      emoji = '💖';
      value = 5;
    }

    const newHeart: FloatingHeart = {
      id,
      x,
      y,
      size,
      speedY,
      speedX,
      rotation: Math.random() * 30 - 15,
      opacity: 1,
      color,
      emoji
    };

    setHearts(prev => [...prev, newHeart]);
  };

  // Trigger Heart Shower Booster
  const triggerHeartShower = () => {
    audio.play('click');
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const rand = Math.random();
        if (rand > 0.9) spawnHeart(false, false, true); // Hug heart
        else if (rand > 0.7) spawnHeart(true, false, false); // Gold heart
        else if (rand > 0.4) spawnHeart(false, true, false); // Pink heart
        else spawnHeart(); // Standard
      }, i * 120);
    }
  };

  // Periodically spawn random hearts automatically
  useEffect(() => {
    if (!isPlaying || showVictory) return;
    
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.85) {
        spawnHeart(true); // Golden
      } else if (rand > 0.6) {
        spawnHeart(false, true); // Sparkly pink
      } else {
        spawnHeart(); // Standard red
      }
    }, 700);

    return () => clearInterval(interval);
  }, [isPlaying, showVictory]);

  // Main physics loop (frame animation)
  useEffect(() => {
    if (!isPlaying || showVictory) return;

    let animFrameId: number;
    const updatePhysics = () => {
      setHearts(prev => {
        return prev
          .map(h => ({
            ...h,
            y: h.y - h.speedY,
            x: h.x + h.speedX,
            rotation: h.rotation + 0.5
          }))
          .filter(h => h.y > -60); // clean up offscreen
      });
      animFrameId = requestAnimationFrame(updatePhysics);
    };

    animFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrameId);
  }, [isPlaying, showVictory]);

  // Handle heart catch
  const handleCatch = (heart: FloatingHeart) => {
    if (showVictory) return;
    audio.play('pop');

    let value = 1;
    let textColor = 'text-rose-500';

    if (heart.emoji === '🤗') {
      value = 20;
      textColor = 'text-purple-600';
    } else if (heart.emoji === '💛') {
      value = 10;
      textColor = 'text-amber-600';
    } else if (heart.emoji === '💖') {
      value = 5;
      textColor = 'text-pink-600';
    }

    setScore(prev => {
      const nextScore = Math.min(prev + value, 143);
      if (nextScore >= 143) {
        setShowVictory(true);
        setIsPlaying(false);
        audio.play('success');
      }
      return nextScore;
    });

    // Add float indicator
    const indId = nextIndicatorId.current++;
    const newIndicator: FloatIndicator = {
      id: indId,
      x: heart.x,
      y: heart.y,
      text: `+${value} ${heart.emoji}`,
      color: textColor
    };
    setIndicators(prev => [...prev, newIndicator]);

    // Cleanup indicator after 1 second
    setTimeout(() => {
      setIndicators(prev => prev.filter(i => i.id !== indId));
    }, 1000);

    // Remove heart from board
    setHearts(prev => prev.filter(h => h.id !== heart.id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6" id="heart-game-section">
      <div className="bg-white rounded-3xl border border-rose-100 shadow-xl overflow-hidden p-6 flex flex-col" id="game-card">
        
        {/* Game Stats Header */}
        <div className="flex justify-between items-center bg-rose-50/50 p-4 rounded-2xl border border-rose-100 mb-4" id="game-stats-header">
          <div className="flex items-center gap-2" id="score-block">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hearts Caught</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-rose-600 font-mono">{score}</span>
                <span className="text-gray-400 font-bold text-xs">/ 143</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={triggerHeartShower}
              className="cursor-pointer bg-linear-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
              id="btn-shower"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-spin" />
              Heart Shower! 🌧️
            </button>
          </div>
        </div>

        {/* Progress Bar Towards 143 */}
        <div className="mb-4" id="score-meter-bar">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500 mb-1">
            <span>Cuteness Battery Charge</span>
            <span className="text-rose-500 font-black">{Math.floor((score / 143) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden border border-slate-200/50 relative">
            <div 
              style={{ width: `${(score / 143) * 100}%` }}
              className="bg-linear-to-r from-rose-500 via-pink-500 to-amber-400 h-full rounded-full transition-all duration-300"
            ></div>
          </div>
        </div>

        {/* Game Arena Board */}
        <div 
          ref={arenaRef}
          className="relative h-[360px] bg-linear-to-b from-rose-50/20 to-pink-50/20 border-2 border-dashed border-rose-200/60 rounded-2xl overflow-hidden cursor-crosshair select-none"
          id="game-arena-board"
        >
          {hearts.map((h) => (
            <button
              key={h.id}
              onClick={() => handleCatch(h)}
              onTouchStart={() => handleCatch(h)}
              style={{
                position: 'absolute',
                left: `${h.x}px`,
                top: `${h.y}px`,
                transform: `rotate(${h.rotation}deg)`,
                fontSize: `${h.size}px`,
                lineHeight: 1,
                cursor: 'pointer',
              }}
              className="transition-opacity duration-150 active:scale-75 select-none focus:outline-hidden"
            >
              {h.emoji}
            </button>
          ))}

          {/* Floating score text indicators */}
          {indicators.map((ind) => (
            <div
              key={ind.id}
              style={{
                position: 'absolute',
                left: `${ind.x}px`,
                top: `${ind.y}px`,
                transform: 'translate(-50%, -100%)',
              }}
              className={`font-black font-mono text-sm select-none pointer-events-none animate-float-up ${ind.color}`}
            >
              {ind.text}
            </div>
          ))}

          {/* Arena Background Instruct/Watermark */}
          {hearts.length === 0 && score === 0 && (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-slate-400 p-6 space-y-2 pointer-events-none">
              <Play className="w-10 h-10 text-rose-300 animate-pulse" />
              <p className="font-bold text-sm">Tap floating hearts to catch them!</p>
              <p className="text-xs">Catch larger/colored hearts for bonus points!</p>
            </div>
          )}
        </div>

        {/* Victory Popup */}
        {showVictory && (
          <div className="mt-6 bg-rose-50 border-2 border-dashed border-rose-300 rounded-2xl p-6 text-center space-y-4 animate-fade-in" id="victory-block">
            <div className="inline-flex p-3 rounded-full bg-rose-200 text-rose-600 animate-bounce">
              <Trophy className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-rose-700 tracking-tight">Congratulations! 🎉</h3>
              <p className="text-sm font-bold text-gray-700">
                You collected exactly <span className="text-rose-600 font-extrabold text-lg">143</span> hearts!
              </p>
              <div className="bg-white border border-rose-200 text-rose-600 font-black text-lg py-3 px-6 rounded-xl inline-block shadow-xs animate-pulse">
                143 = I Love You ❤️
              </div>
            </div>

            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Your cuteness battery is 100% full. You have successfully unlocked the ultimate diagnostic report!
            </p>

            <button
              onClick={() => {
                audio.play('success');
                onGameComplete();
              }}
              className="cursor-pointer bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-lg py-3 px-8 rounded-xl shadow-md transition-all hover:scale-105 inline-flex items-center gap-2"
              id="btn-claim-report"
            >
              <Award className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
              Claim My Diagnosis ✅
            </button>
          </div>
        )}

        {/* Footnote instruction helper */}
        {!showVictory && (
          <p className="text-center text-[11px] text-gray-400 mt-4">
            Pro Tip: Click the <strong className="text-amber-500">Heart Shower</strong> button to flood the screen for rapid captures! 🌧️💖
          </p>
        )}

      </div>
    </div>
  );
}
