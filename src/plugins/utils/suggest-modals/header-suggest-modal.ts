import { filter } from "fuzzy";
import * as o from "obsidian";
import {
	FileHeader,
	getHeadersForAllFiles,
} from "../obsidian/metadata/get-headers-for-all-files";
import { removeFileExt } from "../string/remove-file-ext";
import style from "./style/header-suggest-modal.module.css";

type Opts<P extends o.Plugin> = {
	onChooseSuggestion: (FileHeader: FileHeader) => void;
};

class HeaderSuggestModal<
	P extends o.Plugin,
> extends o.SuggestModal<FileHeader> {
	opts: Opts<P>;
	fileHeaders: FileHeader[];

	constructor(plugin: P, opts: Opts<P>) {
		const { app } = plugin;
		super(app);
		this.opts = opts;
		this.fileHeaders = getHeadersForAllFiles(app);
	}

	getSuggestions(input: string) {
		if (!input) return this.fileHeaders;

		// We want to filter on the filename as well as the header, but we want
		// header matches to to rank higher in the resutls. To accomplish this, we
		// filter twice, once with the filename included and once without it. We
		// then put the results that didn't require the filename to match first.

		const withFile = filter(input, this.fileHeaders, {
			extract: ({ file, heading }) =>
				`${heading.heading} ${removeFileExt(file.path)}`,
		}).map((r) => r.original);

		const noFile = filter(input, this.fileHeaders, {
			extract: (f) => f.heading.heading,
		}).map((r) => r.original);

		noFile.push(...withFile.filter((r) => !noFile.includes(r)));
		return noFile;
	}

	renderSuggestion({ file, heading }: FileHeader, el: HTMLElement) {
		const filename = removeFileExt(file.path).replace(/\//g, " / ");
		el.innerHTML = [
			`<div class="${style.suggestionItem}">`,
			`<div>${heading.heading}</div>`,
			`<div class="${style.textMuted}">${filename}</div>`,
			`</div>`,
		].join("");
	}

	onChooseSuggestion(fileHeader: FileHeader) {
		this.opts.onChooseSuggestion(fileHeader);
	}
}

export const openHeaderSuggestModal = <P extends o.Plugin>(
	plugin: P,
	opts: Opts<P>,
) => {
	const modal = new HeaderSuggestModal(plugin, opts);
	modal.open();
	return modal;
};
