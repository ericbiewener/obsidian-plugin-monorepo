import { showLockScreen } from "./show-lock-screen";
import o from "obsidian";

export const addShowLockScreenCommand = (plugin: o.Plugin) => {
	plugin.addCommand({
		id: "lock-screen",
		name: "Lock screen",
		callback: () => showLockScreen(plugin),
	});
};
