import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { OMNI_FILENAME } from "./constants";
import { CreateLabel, getSuggestionsForFilename } from "./get-all-suggestions";
import { goToHeadingSuggestion } from "./go-to-heading-suggestion";
import styles from "./styles.module.css";
import { HeadingSuggestion } from "./types";

type Jump = {
	headingSuggestion?: HeadingSuggestion;
};

declare global {
	interface Element {
		__jump__: Jump;
	}
	interface EventTarget {
		__jump__: Jump;
	}
}

const createLabel: CreateLabel = (file, hierarchy, heading) => heading.heading;

const createModal = (app: o.App) => {
	const modal = new o.Modal(app);
	modal.modalEl.addClass(styles.modal);
	return modal;
};

const createInputEl = () => {
	const el = document.createElement("input");
	el.addClass(styles.input);
	el.autofocus = true;
	return el;
};

const createOutlineEl = (onClick: (e: MouseEvent) => void) => {
	const el = document.createElement("div");
	el.addClass(styles.outline);
	el.addEventListener("click", onClick);
	return el;
};

const indent = (levels = 1) => {
	const indentations = Array(Math.max(levels, 0)).fill(
		"&nbsp;&nbsp;&nbsp;&nbsp;",
	);
	indentations.unshift("");
	return indentations.join(`<div class=${styles.levelIndicator}></div>`);
};

const createOutlineItemEl = (headingSuggestion: HeadingSuggestion) => {
	const { hierarchy, heading } = headingSuggestion;
	const el = document.createElement("div");
	el.__jump__ = { headingSuggestion };

	// we use hierarchy.length rather than heading.level because we don't want to
	// indent more than a single level, but a heading structure of h1 > h3 would
	// indent two levels.
	const indentLevel = hierarchy.length - 2;
	el.innerHTML = `${indent(indentLevel)}<div class="${
		styles.outlineItemContent
	}">${heading.heading}</div>`;

	el.addClass(styles.outlineItem);
	if (heading.level === 1) {
		el.addClass(styles.h1);
	}
	return el;
};

const jumpToOutline = ({ app }: o.Plugin) => {
	const modal = createModal(app);

	const headings = getSuggestionsForFilename(app, OMNI_FILENAME, createLabel);

	const onClick = ({ target }: MouseEvent) => {
		const el = (target as HTMLElement).closest(`.${styles.outlineItem}`);
		goToHeadingSuggestion(app, el.__jump__.headingSuggestion);
		modal.close();
	};

	const outlineEl = createOutlineEl(onClick);
	modal.contentEl.append(createInputEl(), outlineEl);

	for (const heading of headings) {
		outlineEl.append(createOutlineItemEl(heading));
	}

	modal.open();
};
export const addJumpToOutlineCmd = addCommand("Jump to outline", jumpToOutline);
