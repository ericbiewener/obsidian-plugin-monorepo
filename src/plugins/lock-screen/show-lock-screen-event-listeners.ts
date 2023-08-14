import o from "obsidian";
import { showLockScreen } from "./show-lock-screen";
import { getSettings } from "./settings/init-settings";

const showLockScreenOnWindowBlur = (plugin: o.Plugin) => {
	let timeout: number;
	const ms = getSettings().timeoutWindowBlur;

	plugin.registerDomEvent(window, "blur", () => {
		timeout = setTimeout(showLockScreen, ms);
	});

	plugin.registerDomEvent(window, "focus", () => {
		if (timeout) clearTimeout(timeout);
	});
};

type HTMLElementEvent = Parameters<o.Plugin["registerDomEvent"]>[1];

const showLockScreenWhenInteractionStops = (plugin: o.Plugin) => {
	const ms = Math.max(getSettings().timeoutInteraction, 5000);
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

export const showLockScreenWhenBackgrounded = (plugin: o.Plugin) => {
	if (o.Platform.isDesktopApp) {
		showLockScreenOnWindowBlur(plugin);
	} else {
		showLockScreenWhenInteractionStops(plugin);
	}
};
