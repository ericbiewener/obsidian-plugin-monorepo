import * as o from "obsidian";
import { MarkdownLeaf } from "../../types/obsidian";
import { getUtils } from "../../utils/obsidian/get-plugin";
import { waitForUtilsPluginInit } from "../../utils/obsidian/wait-for-utils-plugin-init";
import ProtectNotePlugin from "./index";
import style from "./style/style.module.css";

let shouldShowPasswordPrompt = true;

const setVisibility = (containerEl: HTMLElement, visible = true) => {
	const { classList } = containerEl.querySelector(".view-content")!;
	if (visible) {
		classList.remove(style.hidden);
	} else {
		classList.add(style.hidden);
	}
};

const getPasswordInput = (containerEl: HTMLElement) =>
	containerEl.querySelector(`.${style.password}`) as
		| HTMLInputElement
		| undefined;

const removePasswordPromptForView = (view: o.View) => {
	const input = getPasswordInput(view.containerEl);
	if (!input) return;
	input.remove();
	setVisibility(view.containerEl);
};

const removePasswordPrompts = ({ app }: ProtectNotePlugin) => {
	for (const leaf of getUtils(app).getMarkdownLeaves(app)) {
		removePasswordPromptForView(leaf.view);
	}
};

const showPasswordPromptForLeaf = (
	plugin: ProtectNotePlugin,
	leaf: MarkdownLeaf,
	password: string,
	shouldFocus = false,
) => {
	const { containerEl } = leaf.view;
	const isShowingPrompt = !!getPasswordInput(leaf.view.containerEl);
	if (isShowingPrompt) return;

	setVisibility(containerEl, false);

	const input = containerEl.createEl("input");
	input.type = "password";
	input.className = style.password;
	input.placeholder = "Password";
	if (shouldFocus) input.focus();

	input.addEventListener("input", () => {
		if (password !== input.value) return;
		removePasswordPrompts(plugin);
		setVisibility(containerEl, true);
		shouldShowPasswordPrompt = false;
		input.remove();
		leaf.view.editor.focus();
	});
};

const getTitleIconClassName = (iconName: string) => `__titleIcon--${iconName}`;

const addIconToViewTitle = (
	{ titleContainerEl }: o.MarkdownView,
	iconName: string,
) => {
	const className = getTitleIconClassName(iconName);
	if (titleContainerEl.querySelector(`.${className}`)) return;

	const icon = document.createElement("div");
	icon.classList.add(className);
	o.setIcon(icon, iconName);
	titleContainerEl.prepend(icon);
};

const removeIconFromViewTitle = (
	{ titleContainerEl }: o.MarkdownView,
	iconName: string,
) => {
	const className = getTitleIconClassName(iconName);
	titleContainerEl.querySelector(`.${className}`)?.remove();
};

const maybeShowPasswordPromptForLeaf = (
	plugin: ProtectNotePlugin,
	leaf: MarkdownLeaf,
	shouldFocus = false,
) => {
	const metadata = plugin.app.metadataCache.getFileCache(leaf.view.file);
	const pw = metadata?.frontmatter?.protected;
	if (pw) {
		addIconToViewTitle(leaf.view, "lock");
		if (shouldShowPasswordPrompt) {
			showPasswordPromptForLeaf(plugin, leaf, pw, shouldFocus);
		}
	} else {
		removeIconFromViewTitle(leaf.view, "lock");
		removePasswordPromptForView(leaf.view);
		leaf.view.editor.focus();
	}
};

export const onActiveLeafChange = async (plugin: ProtectNotePlugin) => {
	const { app } = plugin;
	let needsToCheckOtherLeaves = true;

	const utils = await waitForUtilsPluginInit(app);

	utils.onActiveMarkdownLeafChange(app, (leaf) => {
		if (!needsToCheckOtherLeaves) {
			maybeShowPasswordPromptForLeaf(plugin, leaf, true);
		} else {
			// The app was just open, need to check all open leaves
			needsToCheckOtherLeaves = false;
			for (const leaf of utils.getMarkdownLeaves(app)) {
				maybeShowPasswordPromptForLeaf(plugin, leaf, true);
			}
		}
	});
};

export const onUserInactive = async (plugin: ProtectNotePlugin) => {
	const { app } = plugin;
	const utils = await waitForUtilsPluginInit(app);
	utils.onUserInactive(() => {
		shouldShowPasswordPrompt = true;
		for (const leaf of utils.getMarkdownLeaves(app)) {
			maybeShowPasswordPromptForLeaf(plugin, leaf);
		}
	});
};
