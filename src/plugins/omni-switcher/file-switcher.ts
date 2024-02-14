import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { CLICK_VERB } from "../../contants";
import { ICON_NEW_FILE } from "../../icons";
import baseStyle from "../../styles/base.module.css";
import { createFile } from "../../utils/obsidian/vault/create-file";
import OmniSwitcherPlugin from "./index";
import style from "./style.module.css";

// const getDepth = (file: o.TFile) => {
//   let count = 0;
//   let parent = file.parent;
//   while (parent) {
//     count++;
//     parent = file.parent;
//   }
//   return count;
// };

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

const createFileFromInput = async (
  { app }: OmniSwitcherPlugin,
  modal: o.FuzzySuggestModal<unknown>,
) => {
  const basename = modal.inputEl.value.trim();
  if (basename) {
    await createFile(app, `${basename}.md`);
    modal.close();
  }
};

const createNewFileIcon = (
  plugin: OmniSwitcherPlugin,
  createFileCb: () => unknown,
) => {
  const el = document.createElement("div");
  el.innerHTML = ICON_NEW_FILE;
  el.className = `${baseStyle.iconButton} ${style.inputIconButton}`;
  el.addEventListener("click", createFileCb);

  return el;
};

const fileSwitcher = (plugin: OmniSwitcherPlugin) => {
  class FileFuzzySuggestModal extends o.FuzzySuggestModal<o.TFile> {
    getItems() {
      return plugin.app.vault.getMarkdownFiles();
    }

    getItemText(item: o.TFile) {
      return item.path;
    }

    async onChooseItem(item: o.TFile) {
      await plugin.app.workspace.openLinkText(item.path, "", false);
    }

    renderSuggestion(item: o.FuzzyMatch<o.TFile>, el: HTMLElement) {
      el.innerHTML = item.item.path.split("/").join("<strong> / </strong>");
    }

    onNoSuggestion() {
      super.onNoSuggestion();
      const el = this.resultContainerEl.querySelector(".suggestion-empty");
      el.innerHTML = `No notes found. ${CLICK_VERB} here to create a new one.`;
      el.classList.add(style.noResultsMsg, baseStyle.hoverable);
      el.addEventListener("click", createFileCb);
    }
  }

  const modal = new FileFuzzySuggestModal(plugin.app);
  const createFileCb = () => createFileFromInput(plugin, modal);

  modal.inputEl.insertAdjacentElement(
    "afterend",
    createNewFileIcon(plugin, createFileCb),
  );

  modal.open();
};

export const addFileSwitcherCmd = addCommand(
  "Open Omni File Switcher",
  fileSwitcher,
);
