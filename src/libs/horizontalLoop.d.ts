import gsap from "gsap";

type ItemsType = string | Element[] | NodeListOf<Element>;

interface HorizontalLoopOptions {
  repeat?: number;
  paused?: boolean;
  center?: boolean;
  speed?: number;
  snap?: number | false;
  paddingRight?: number;
  reversed?: boolean;
}

declare function horizontalLoop(
  items: ItemsType,
  config?: HorizontalLoopOptions
): gsap.Timeline & {
  next(vars?: gsap.TweenVars): gsap.core.Tween;
  previous(vars?: gsap.TweenVars): gsap.core.Tween;
  toIndex(index: number, vars?: gsap.TweenVars): gsap.core.Tween;
  current(): number;
};

export default horizontalLoop;
