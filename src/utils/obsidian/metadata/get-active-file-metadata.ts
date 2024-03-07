import * as o from "obsidian";
import { getActiveFile } from "../workspace/get-active-file";

export const getActiveFileMetadata = (app: o.App) =>
	app.metadataCache.getFileCache(getActiveFile(app));
