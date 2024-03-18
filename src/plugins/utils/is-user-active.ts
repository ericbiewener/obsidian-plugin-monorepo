import * as o from "obsidian";
import { INTERACTION_DOM_EVENTS, USER_INACTIVE_MS } from "./constants";

let isUserActive = true;
let isUserActiveTimeout: NodeJS.Timeout;
const userInactiveListeners: (() => void)[] = [];

export const getIsUserActive = () => isUserActive;

const resetTimeout = () => {
	if (isUserActiveTimeout) clearTimeout(isUserActiveTimeout);
	isUserActiveTimeout = setTimeout(() => {
		isUserActive = false;
		for (const cb of userInactiveListeners) cb();
	}, USER_INACTIVE_MS);
};

export const initIsUserActive = (app: o.App) => {
	resetTimeout();
	for (const ev of INTERACTION_DOM_EVENTS) {
		document.addEventListener(ev, resetTimeout);
	}

	if (o.Platform.isDesktop) return;

	// Reset timeout when using voice-to-text
	app.workspace.on("editor-change", resetTimeout);
};

export const onUserInactive = (cb: () => void) => {
	userInactiveListeners.push(cb);
};
