export const createEl = <K extends keyof HTMLElementTagNameMap>(
	tagName: K,
	parent: HTMLElement,
	children?: HTMLElement[],
) => {
	const el = document.createElement(tagName);
	parent.appendChild(el);
	if (children) el.append(...children);
	return el;
};
