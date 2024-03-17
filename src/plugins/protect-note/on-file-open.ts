import * as o from "obsidian";
import { removeElsWithClassName } from "../../utils/dom/remove-els-with-class-name";
import { getActiveView } from "../../utils/obsidian/workspace/get-active-view";
import { DOM_CLEANUP_CLASSNAME } from "./constants";
import ProtectNotePlugin from "./index";
import style from "./style.module.css";

const SHOW_PASSWORD_TIMEOUT_MS = 60_000;
let shouldShowLockScreen = true;
let shouldShowLockScreenTimeout: NodeJS.Timeout;

const resetTimeout = () => {
	if (shouldShowLockScreen) return;
	if (shouldShowLockScreenTimeout) clearTimeout(shouldShowLockScreenTimeout);
	shouldShowLockScreenTimeout = setTimeout(() => {
		shouldShowLockScreen = true;
	}, SHOW_PASSWORD_TIMEOUT_MS);
};

const removePasswordView = (app: o.App) => {
	removeElsWithClassName(DOM_CLEANUP_CLASSNAME);
	getActiveView(app)?.containerEl.classList.remove(style.hidden);
	shouldShowLockScreen = false;
};

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
		if (password !== input.value) return;
		removePasswordView(app);
		resetTimeout();
	});
};

export const onFileOpen = ({ app }: ProtectNotePlugin) => {
	app.workspace.on("file-open", (file) => {
		const metadata = app.metadataCache.getFileCache(file);
		const pw = metadata.frontmatter?.protected;
		if (pw && shouldShowLockScreen) {
			showPasswordPrompt(app, pw);
		} else {
			removePasswordView(app);
		}
	});
};

export const initDomListeners = () => {
	const events = [
		"keydown",
		"keyup",
		"scroll",
		"mousemove",
		"mousedown",
		"mouseup",
		"touchstart",
		"touchend",
		"wheel",
	];

	for (const e of events) {
		document.addEventListener(e, resetTimeout);
	}
};
