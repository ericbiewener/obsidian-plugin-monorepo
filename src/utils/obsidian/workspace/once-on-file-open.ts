import * as o from "obsidian";

export const onceOnFileOpen = (
	app: o.App,
	cb: (file: o.TFile | null) => void,
) => {
	const wrappedCb = (file: o.TFile | null) => {
		app.workspace.off("file-open", wrappedCb);
		cb(file);
	};
	app.workspace.on("file-open", wrappedCb);
};

export const waitForFileOpenToFireOnce = (app: o.App) =>
	new Promise<void>((res) => onceOnFileOpen(app, () => res()));
