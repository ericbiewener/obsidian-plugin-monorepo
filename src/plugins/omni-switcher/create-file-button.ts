import * as o from "obsidian";
import { ICON_NEW_FILE } from "../../icons";
import baseStyle from "../../styles/base.module.css";
import { createFile } from "../../utils/obsidian/vault/create-file";
import style from "./style.module.css";

export const createFileFromInput = async (
	{ app }: o.Plugin,
	modal: o.SuggestModal<unknown>,
) => {
	const basename = modal.inputEl.value.trim();
	if (basename) {
		await createFile(app, `${basename}.md`);
		modal.close();
	}
};

export const addNewFileButtonToModal = (
	plugin: o.Plugin,
	modal: o.SuggestModal<unknown>,
) => {
	const el = document.createElement("div");
	el.innerHTML = ICON_NEW_FILE;
	el.className = `${baseStyle.iconButton} ${style.inputIconButton}`;

	el.addEventListener("click", () => createFileFromInput(plugin, modal));
	modal.inputEl.insertAdjacentElement("afterend", el);
};
