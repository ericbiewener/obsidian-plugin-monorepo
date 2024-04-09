import * as o from "obsidian";
import { getPlugin } from "../../utils/obsidian/get-plugin";
import { waitForUtilsPluginInit } from "../../utils/obsidian/wait-for-utils-plugin-init";

const createButton = (icon: string, cb: () => unknown) => {
	const div = document.createElement("div");
	div.addClass("mobile-navbar-action");
	const button = div.createEl("button", { cls: "clickable-icon mod-tappable" });
	button.addEventListener("click", cb);
	o.setIcon(button, icon);
	return div;
};

export default class CustomizeMobileNavbarPlugin extends o.Plugin {
	async onload() {
		const { app } = this;

		const utils = await waitForUtilsPluginInit(app);
		utils.onceOnWorkspaceEvent(app, "layout-change", () => {
			const actions = document.querySelector<HTMLElement>(
				".mobile-navbar-actions",
			);
			if (!actions) return;

			const childrenToRemove = Array.from(actions.children).filter((el) => {
				const label = el.firstElementChild?.getAttribute("aria-label");
				return label !== "Navigate forward" && label !== "Navigate back";
			});

			for (const el of childrenToRemove) {
				el.remove();
			}

			const fileSwitcher = getPlugin(app, "better-file-switcher");
			const cmdPalette = getPlugin(app, "better-command-palette");

			actions.appendChild(
				createButton("terminal", () => cmdPalette.openCmdSuggestModal()),
			);
			actions.appendChild(
				createButton("target", () => fileSwitcher.openFileSuggestModal()),
			);
		});
	}
}
