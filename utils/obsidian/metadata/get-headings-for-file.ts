import { getFile } from "../vault/get-file";
import * as o from "obsidian";

export const getHeadingsForFile = (app: o.App, filename: string) => {
  const file = getFile(app, filename);
  return app.metadataCache.getFileCache(file).headings;
};
