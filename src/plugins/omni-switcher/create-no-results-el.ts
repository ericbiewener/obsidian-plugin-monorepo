import * as o from "obsidian";
import baseStyle from "../../styles/base.module.css";
import { NO_NOTES_FOUND } from "./constants";
import style from "./style.module.css";

export const createNoResultsEl = (
	modal: o.SuggestModal<unknown>,
	createFileCb: () => void,
	createFileOnEnter: (e: KeyboardEvent) => void,
) => {
	const el = modal.resultContainerEl.querySelector(".suggestion-empty");
	el.innerHTML = NO_NOTES_FOUND;
	el.classList.add(style.noResultsMsg, baseStyle.hoverable);
	el.addEventListener("click", createFileCb);
	modal.inputEl.addEventListener("keyup", createFileOnEnter);
};
