import * as o from "obsidian";
import { addSettingsTab } from "./settings/add-settings-tab";
import { initSettings } from "./settings/init-settings";
import { showLockScreen } from "./show-lock-screen";
import { addShowLockScreenCommand } from "./show-lock-screen-command";
import { showLockScreenWhenBackgrounded } from "./show-lock-screen-event-listeners";

export default class LockScreenPlugin extends o.Plugin {
	async onload() {
		await initSettings(this);
		showLockScreen(this);
		addSettingsTab(this);
		addShowLockScreenCommand(this);
		showLockScreenWhenBackgrounded(this);
	}
}
