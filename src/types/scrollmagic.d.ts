import { gsap } from 'gsap';

declare module 'scrollmagic' {
  interface Scene {
    setTween(tween: gsap.core.Tween | gsap.core.Timeline): this;
  }
}
