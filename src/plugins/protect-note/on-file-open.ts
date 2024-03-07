import * as o from "obsidian";
import { getActiveView } from "../../utils/obsidian/workspace/get-active-view";
import { DOM_CLEANUP_CLASSNAME } from "./constants";
import ProtectNotePlugin from "./index";
import { removePasswordView } from "./remove-password-view";
import style from "./style.module.css";

const showPasswordPrompt = (app: o.App, password: string) => {
	const view = getActiveView(app).containerEl;
	view.classList.add(style.hidden);

	const input = document.createElement("input");
	input.type = "password";
	input.className = `${style.password} ${DOM_CLEANUP_CLASSNAME}`;
	input.placeholder = "Password";
	view.insertAdjacentElement("afterend", input);
	input.focus();

	input.addEventListener("input", () => {
		if (password === input.value) removePasswordView(app);
	});
};

export const onFileOpen = ({ app }: ProtectNotePlugin) => {
	app.workspace.on("file-open", (file) => {
		const metadata = app.metadataCache.getFileCache(file);
		const pw = metadata.frontmatter?.protected;
		if (pw) {
			showPasswordPrompt(app, pw);
		} else {
			removePasswordView(app);
		}
	});
};
