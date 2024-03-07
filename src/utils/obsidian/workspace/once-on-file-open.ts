import * as o from "obsidian";

export const onceOnFileOpen = (
	app: o.App,
	cb: (file: o.TFile | null) => void,
) => {
	const wrappedCb = (file: o.TFile) => {
		app.workspace.off("file-open", wrappedCb);
		cb(file);
	};
	app.workspace.on("file-open", wrappedCb);
};
