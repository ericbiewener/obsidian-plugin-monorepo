import { filter } from "fuzzy";
import * as o from "obsidian";
import { getUtils } from "../../../utils/obsidian/get-plugin";
import { IconName } from "../ui/__generated__/icon-names";

type Opts = {
	onChooseSuggestion: (icon: IconName) => void;
};

class IconSuggestModal<P extends o.Plugin> extends o.SuggestModal<IconName> {
	opts: Opts;
	iconNames: IconName[];

	constructor(plugin: P, opts: Opts) {
		const { app } = plugin;
		super(app);
		this.opts = opts;
		this.iconNames = getUtils(app).iconNames as unknown as IconName[];
	}

	getSuggestions(input: string) {
		return input
			? filter<IconName>(input, this.iconNames).map((r) => r.original)
			: this.iconNames;
	}

	async onChooseSuggestion(icon: IconName) {
		this.opts.onChooseSuggestion(icon);
	}

	renderSuggestion(iconName: IconName, el: HTMLElement) {
		o.setIcon(el, iconName);
	}

	onNoSuggestion() {
		super.onNoSuggestion();
	}
}

export const openIconSuggestModal = <P extends o.Plugin>(
	plugin: P,
	opts: Opts,
) => {
	const modal = new IconSuggestModal(plugin, opts);
	modal.open();
	return modal;
};
