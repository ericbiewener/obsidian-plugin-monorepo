import * as o from "obsidian";

export const INTERACTION_DOM_EVENTS = o.Platform.isDesktopApp
	? ["keydown", "scroll", "mousemove", "mousedown", "wheel"]
	: ["touchstart", "touchend"];

export const USER_INACTIVE_MS = 60_000;
