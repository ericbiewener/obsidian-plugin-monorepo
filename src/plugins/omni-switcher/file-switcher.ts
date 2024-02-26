import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { CLICK_VERB } from "../../contants";
import baseStyle from "../../styles/base.module.css";
import { onKey } from "../../utils/dom/on-key";
import {
  addNewFileButtonToModal,
  createFileFromInput,
} from "./create-file-button";
import OmniSwitcherPlugin from "./index";
import style from "./style.module.css";

const fileSwitcher = (plugin: OmniSwitcherPlugin) => {
  class FileFuzzySuggestModal extends o.FuzzySuggestModal<o.TFile> {
    getItems() {
      modal.inputEl.removeEventListener("keyup", createFileOnEnter);
      return plugin.app.vault.getMarkdownFiles();
    }

    getItemText(item: o.TFile) {
      return item.path;
    }

    async onChooseItem(item: o.TFile) {
      await plugin.app.workspace.openLinkText(item.path, "", false);
    }

    renderSuggestion({ item }: o.FuzzyMatch<o.TFile>, el: HTMLElement) {
      el.innerHTML = item.path
        .replace(/\.md$/, "")
        .split("/")
        .join("<strong> / </strong>");
    }

    onNoSuggestion() {
      super.onNoSuggestion();
      const el = this.resultContainerEl.querySelector(".suggestion-empty");
      el.innerHTML = `No notes found. ${CLICK_VERB} here to create a new one.`;
      el.classList.add(style.noResultsMsg, baseStyle.hoverable);
      el.addEventListener("click", createFileCb);
      modal.inputEl.addEventListener("keyup", createFileOnEnter);
    }
  }

  const modal = new FileFuzzySuggestModal(plugin.app);
  const createFileCb = () => createFileFromInput(plugin, modal);
  addNewFileButtonToModal(plugin, modal);
  const createFileOnEnter = onKey({ Enter: createFileCb });

  modal.open();
};

export const addFileSwitcherCmd = addCommand(
  "Open Omni File Switcher",
  fileSwitcher,
);
