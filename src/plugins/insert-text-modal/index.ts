import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { getUtils } from "../../utils/obsidian/get-plugin";
import style from "./style/style.module.css";

const openInsertTextModal = async ({ app }: InsertTextModalPlugin) => {
	const utils = getUtils(app);
	const editor = utils.getEditor(app);
	const modal = new o.Modal(app);
	modal.titleEl.appendChild(utils.createIcon("close", modal.close));
	modal.titleEl.style.display = "flex";

	const textarea = modal.contentEl.createEl("textarea", {
		cls: style.textarea,
		attr: { rows: 10 },
	});
	const button = modal.contentEl.createEl("button", {
		text: "Insert",
		cls: `mod-cta ${style.btn}`,
	});
	button.onclick = () => {
		console.info(`:: textarea.innerHTML`, textarea.innerHTML, textarea.value);
		editor.replaceSelection(textarea.value);
		modal.close();
	};
	modal.open();
};

const addInsertTextModalCommand = addCommand<InsertTextModalPlugin>(
	"Open Command Palette",
	openInsertTextModal,
	{ icon: "atom" },
);

export default class InsertTextModalPlugin extends o.Plugin {
	async onload() {
		console.info(":: insert-text-modal plugin init");
		addInsertTextModalCommand(this);
	}
}
