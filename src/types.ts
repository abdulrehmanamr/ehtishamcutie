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
