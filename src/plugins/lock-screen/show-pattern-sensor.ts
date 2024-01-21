import * as o from "obsidian";
import { HideLockScreen } from "./show-lock-screen";

export const showPatternSensor = (
  plugin: o.Plugin,
  container: HTMLElement,
  hideLockScreen: HideLockScreen,
) => {
  const leftSensor = container.createEl("div");
  Object.assign(leftSensor.style, {
    position: "fixed",
    bottom: 0,
    left: 0,
    height: "250px",
    width: "50%",
    // background: "red",
  });

  const rightSensor = container.createEl("div");
  Object.assign(rightSensor.style, {
    position: "fixed",
    bottom: 0,
    right: 0,
    height: "250px",
    width: "50%",
    // background: "green",
  });

  let leftClicks = 0;
  let rightClicks = 0;

  const resetClicks = () => {
    leftClicks = 0;
    rightClicks = 0;
  };

  container.addEventListener("click", resetClicks);

  leftSensor.addEventListener("click", (e) => {
    e.stopPropagation();
    if (leftClicks === 0 || (leftClicks === 1 && rightClicks === 1)) {
      leftClicks++;
    } else {
      resetClicks();
    }
  });

  rightSensor.addEventListener("click", (e) => {
    e.stopPropagation();
    if (leftClicks === 1) {
      rightClicks++;
    } else if (leftClicks === 2) {
      hideLockScreen(plugin, container);
    } else {
      resetClicks();
    }
  });
};
