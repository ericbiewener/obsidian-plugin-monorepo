import { filter } from "fuzzy";
import * as o from "obsidian";
import { removeFileExt } from "../string/remove-file-ext";

type Opts<P extends o.Plugin> = {
	onChooseSuggestion: (file: o.TFile) => void;
	getFiles?: (plugin: P) => o.TFile[];
	onNoSuggestion?: (modal: FileSuggestModal<P>) => void;
};

class FileSuggestModal<P extends o.Plugin> extends o.SuggestModal<o.TFile> {
	opts: Opts<P>;
	files: o.TFile[];

	constructor(plugin: P, opts: Opts<P>) {
		const { app } = plugin;
		super(app);
		this.opts = opts;
		this.files = opts.getFiles?.(plugin) || app.vault.getMarkdownFiles();
	}

	getSuggestions(input: string) {
		return input
			? filter(input, this.files, { extract: (f) => f.path }).map(
					(r) => r.original,
			  )
			: this.files;
	}

	renderSuggestion(file: o.TFile, el: HTMLElement) {
		el.innerHTML = getFileSuggestionHTML(file);
	}

	onNoSuggestion() {
		super.onNoSuggestion();
		this.opts.onNoSuggestion?.(this);
	}

	onChooseSuggestion(file: o.TFile) {
		this.opts.onChooseSuggestion(file);
	}
}

const getFileSuggestionHTML = (file: o.TFile) =>
	removeFileExt(file.path).split("/").join("<strong> / </strong>");

export const openFileSuggestModal = <P extends o.Plugin>(
	plugin: P,
	opts: Opts<P>,
) => {
	const modal = new FileSuggestModal(plugin, opts);
	modal.open();
	return modal;
};
