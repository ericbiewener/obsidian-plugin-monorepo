import o from "obsidian";
import { showLockScreen } from "./show-lock-screen";
import { addShowLockScreenCommand } from "./show-lock-screen-command";
import { showLockScreenWhenBackgrounded } from "./show-lock-screen-event-listeners";
import { domService } from "../../dom-service";
import { initSettings } from "./settings/init-settings";
import { addSettingsTab } from "./settings/add-settings-tab";

export default class LockScreenPlugin extends o.Plugin {
  async onload() {
    await initSettings(this);
    showLockScreen(this);
    addSettingsTab(this);
    addShowLockScreenCommand(this);
    showLockScreenWhenBackgrounded(this);

    this.app.workspace.getActiveViewOfType(o.MarkdownView)?.editor.focus();
  }

  async onunload() {
    domService.cleanUp();
  }
}
