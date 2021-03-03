import Service from '@ember/service';

import { scheduleOnce } from '@ember/runloop';
import SpriteModifier from '../modifiers/sprite';
import AnimationContext from '../components/animation-context';

export default class AnimationsService extends Service {
  contexts: Set<AnimationContext> = new Set();

  possiblyFarMatchingSpriteModifiers: Set<SpriteModifier> = new Set();

  registerContext(context: AnimationContext): void {
    this.contexts.add(context);
    scheduleOnce('afterRender', this, 'handleFarMatching');
  }

  unregisterContext(context: AnimationContext): void {
    context.registered.forEach((s) =>
      this.possiblyFarMatchingSpriteModifiers.add(s)
    );
    this.contexts.delete(context);
  }

  notifyRemovedSpriteModifier(spriteModifier: SpriteModifier): void {
    this.possiblyFarMatchingSpriteModifiers.add(spriteModifier);
    scheduleOnce('afterRender', this, 'handleFarMatching');
  }

  handleFarMatching(): void {
    console.log('AnimationsService#handleFarMatching()');
    this.contexts.forEach((context) =>
      context.handleFarMatching(this.possiblyFarMatchingSpriteModifiers)
    );

    this.possiblyFarMatchingSpriteModifiers.clear();
  }
}

declare module '@ember/service' {
  interface Registry {
    animations: AnimationsService;
  }
}