import { filter } from "fuzzy";
import * as o from "obsidian";

type Opts<P extends o.Plugin> = {
	onChooseSuggestion: (file: o.TFile) => void;
	getFiles?: (plugin: P) => o.TFile[];
	onGetSuggestions?: (modal: FileSuggestModal<P>) => void;
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
		this.opts.onGetSuggestions?.(this);
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
	file.path.replace(/\.md$/, "").split("/").join("<strong> / </strong>");

export const openFileSuggestModal = <P extends o.Plugin>(
	plugin: P,
	opts: Opts<P>,
) => {
	const modal = new FileSuggestModal(plugin, opts);
	modal.open();
	return modal;
};
