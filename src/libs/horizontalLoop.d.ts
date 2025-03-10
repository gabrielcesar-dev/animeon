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
): gsap.Timeline;
export default horizontalLoop;
