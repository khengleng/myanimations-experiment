import Sprite from '../models/sprite';

export interface BaseOptions {
  delay: number;
  duration: number;
  easing: string;
}

export interface KeyframeProvider {
  keyframes: Keyframe[];
}

export default abstract class Motion<T extends BaseOptions = BaseOptions>
  implements KeyframeProvider {
  constructor(readonly sprite: Sprite, readonly opts: Partial<T> = {}) {}
  abstract get keyframes(): Keyframe[];
  abstract applyBehavior(time?: number): void;
}
