import * as o from "obsidian";

export const createIcon = (
	iconName: string,
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
