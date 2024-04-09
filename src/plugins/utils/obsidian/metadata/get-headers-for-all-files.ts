import * as o from "obsidian";
import { getAllFilesMetadata } from "./get-all-files-metadata";

export const getHeadersForAllFiles = (app: o.App) =>
	getAllFilesMetadata(app).flatMap(({ file, metadata }) =>
		metadata.headings
			? metadata.headings.map((h) => ({ file, heading: h }))
			: [],
	);

export type FileHeader = ReturnType<typeof getHeadersForAllFiles>[number];
