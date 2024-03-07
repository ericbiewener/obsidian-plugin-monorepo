import * as o from "obsidian";

export const getFilesByModifiedDate = ({ vault }: o.App) =>
	vault.getMarkdownFiles().sort((a, b) => b.stat.mtime - a.stat.mtime);
