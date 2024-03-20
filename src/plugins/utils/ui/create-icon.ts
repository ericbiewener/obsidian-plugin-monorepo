import * as o from "obsidian";
import { IconName } from "./__generated__/icon-names";

export const createIcon = (
	iconName: IconName,
	onClick?: (e: MouseEvent) => void,
) => {
	const el = document.createElement("div");
	o.setIcon(el, iconName);
	if (onClick) {
		el.classList.add("clickable-icon");
		el.addEventListener("click", onClick);
	}
	return el;
};
