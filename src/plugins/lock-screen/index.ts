import * as o from "obsidian";
import { domService } from "../../dom-service";
import { initPluginData } from "../../init-plugin-data";
import { addSettingsTab } from "./settings/add-settings-tab";
import { showLockScreen } from "./show-lock-screen";
import { addShowLockScreenCommand } from "./show-lock-screen-command";
import { showLockScreenWhenBackgrounded } from "./show-lock-screen-event-listeners";

export default class LockScreenPlugin extends o.Plugin {
  data = {
    settings: {
      password: "",
      timeoutWindowBlur: 30000,
      timeoutInteraction: 30000,
    },
  };

  async onload() {
    await initPluginData(this);
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
