/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppStep =
  | 'LANDING'
  | 'SCANNING'
  | 'QUIZ'
  | 'ALERT'
  | 'GAME'
  | 'FINAL';

export interface DailyReport {
  smiled: string; // 'smiled_bright' | 'blushed' | 'giggled' | 'waiting' | ''
  ate: 'unknown' | 'nourished' | 'skipped';
  waterCups: number;
  sleepHours: string; // 'under_5' | '6_7' | '8_plus' | 'thinking_of_you' | ''
  missedStatus: 'likely' | 'absolute';
  appliedMoisturizer: string; // 'applied_smooth' | 'desert_dry' | 'abdul_rehman_will_apply' | 'not_yet' | ''
  eyeCasualties: string; // 'zero' | 'few_innocent' | 'overwhelming' | 'only_abdul_rehman' | ''
  dailyQuestionAnswer: string;
  dailyQuestionText: string;
  missingYouText: string;
}

export interface InspectionItem {
  id: string;
  label: string;
  status: 'checking' | 'verified' | 'unknown' | 'suspicious' | 'confirmed';
  value: string;
  icon: string;
  color: string;
}

export interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  opacity: number;
  color: string;
  emoji: string;
}
