import * as o from "obsidian";
import { isDefined } from "../../../../utils/is-defined";

export const getAllFilesMetadata = (app: o.App) =>
	app.vault
		.getMarkdownFiles()
		.map((f) => {
			const metadata = app.metadataCache.getFileCache(f);
			if (!metadata) return null;
			return { file: f, metadata };
		})
		.filter(isDefined);

export type FileMetadata = ReturnType<typeof getAllFilesMetadata>[number];
