import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { ICON_NEW_FILE } from "../../icons";
import baseStyle from "../../styles/base.module.css";
import OmniSwitcherPlugin from "./index";
import style from "./style.module.css";

const getDepth = (file: o.TFile) => {
  let count = 0;
  let parent = file.parent;
  while (parent) {
    count++;
    parent = file.parent;
  }
  return count;
};

const fileSwitcher = (plugin: OmniSwitcherPlugin) => {
  const inputEl = document.createElement("input");
  const inputWrapper = document.createElement("div");
  inputWrapper.appendChild(inputEl);

  class FileFuzzySuggestModal extends o.FuzzySuggestModal<o.TFile> {
    getItems() {
      return plugin.app.vault.getMarkdownFiles();
      // return plugin.app.vault.getMarkdownFiles().sort((a, b) => {
      //   const depthA = getDepth(a)
      //   const depthB = getDepth(b)

      //   if (depthA === depthB)

      //   if (!a.parent && !b.parent) {
      //     return a.name < b.name ? -1 : 1
      //   }
      //   if (a.parent) {
      //     if (b.parent) {
      //       return a.parent === b.parent ?
      //     }
      //   }
      // })
    }

    getItemText(item: o.TFile) {
      return item.path;
    }

    onChooseItem(item: o.TFile) {
      plugin.app.workspace.openLinkText(item.path, "", false);
    }

    renderSuggestion(item: o.FuzzyMatch<o.TFile>, el: HTMLElement) {
      el.innerHTML = item.item.path.split("/").join("<strong> / </strong>");
    }
  }

  const modal = new FileFuzzySuggestModal(plugin.app);

  const iconEl = document.createElement("div");
  iconEl.innerHTML = ICON_NEW_FILE;
  iconEl.className = `${baseStyle.iconButton} ${style.inputIconButton}`;

  modal.inputEl.insertAdjacentElement("afterend", iconEl);

  modal.open();
};

export const addFileSwitcherCmd = addCommand(
  "Open Omni File Switcher",
  fileSwitcher,
);
