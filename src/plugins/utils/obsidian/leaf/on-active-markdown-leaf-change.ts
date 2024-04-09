import * as o from "obsidian";
import { MarkdownLeaf } from "../../../../types/obsidian";
import { isMarkdownLeaf } from "../../type-guards/is-markdown-leaf";

export const onActiveMarkdownLeafChange = (
	app: o.App,
	cb: (leaf: MarkdownLeaf) => void,
) => {
	app.workspace.on("active-leaf-change", (leaf) => {
		if (leaf && isMarkdownLeaf(leaf)) cb(leaf);
	});
};
