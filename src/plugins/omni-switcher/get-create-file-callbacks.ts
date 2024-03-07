import * as o from "obsidian";
import OmniSwitcherPlugin from ".";
import { onKey } from "../../utils/dom/on-key";
import { createFileFromInput } from "./create-file-button";

export const getCreateFileCallbacks = (
	plugin: OmniSwitcherPlugin,
	modal: o.SuggestModal<unknown>,
) => {
	const createFileCb = () => createFileFromInput(plugin, modal);
	const createFileOnEnter = onKey({ Enter: createFileCb });
	return { createFileCb, createFileOnEnter };
};
