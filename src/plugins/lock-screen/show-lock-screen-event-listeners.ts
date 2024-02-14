import * as o from "obsidian";
import LockScreenPlugin from "./index";
import { showLockScreen } from "./show-lock-screen";

const showLockScreenOnWindowBlur = (plugin: LockScreenPlugin) => {
  let timeout: number;

  plugin.registerDomEvent(window, "blur", () => {
    timeout = setTimeout(
      showLockScreen,
      plugin.data.settings.timeoutWindowBlur,
    );
  });

  plugin.registerDomEvent(window, "focus", () => {
    if (timeout) clearTimeout(timeout);
  });
};

type HTMLElementEvent = Parameters<LockScreenPlugin["registerDomEvent"]>[1];

const showLockScreenWhenInteractionStops = (plugin: LockScreenPlugin) => {
  const ms = Math.max(plugin.data.settings.timeoutInteraction, 5000);
  let timeout = setTimeout(showLockScreen, ms);

  const resetTimeout = () => {
    clearTimeout(timeout);
    timeout = setTimeout(showLockScreen, ms);
  };

  const documentEvents: HTMLElementEvent[] = [
    "keydown",
    "keyup",
    "scroll",
    "mousemove",
    "mousedown",
    "mouseup",
    "touchstart",
    "touchend",
    "wheel",
  ];

  for (const e of documentEvents) {
    plugin.registerDomEvent(document, e, resetTimeout);
  }
};

export const showLockScreenWhenBackgrounded = (plugin: LockScreenPlugin) => {
  if (o.Platform.isDesktopApp) {
    showLockScreenOnWindowBlur(plugin);
  } else {
    showLockScreenWhenInteractionStops(plugin);
  }
};
