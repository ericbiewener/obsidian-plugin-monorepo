import * as o from "obsidian";
import baseStyle from "../../styles/base.module.css";
import { createFile } from "../../utils/obsidian/vault/create-file";
import { createIcon } from "../utils/ui/create-icon";
import style from "./style/style.module.css";

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
	const el = createIcon("file-plus-2", () =>
		createFileFromInput(plugin, modal),
	);
	el.classList.add(baseStyle.iconButton, style.inputIconButton);
	modal.inputEl.insertAdjacentElement("afterend", el);
};
