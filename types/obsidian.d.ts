import * as o from "obsidian";

declare module "obsidian" {
	export interface App {
		commands: {
			commands: Record<string, o.Command>;
			// Not visible when logging `app.commands` to the console
			executeCommandById(id: string): boolean;
		};
		plugins: {
			manifests: o.PluginManifest[];
			plugins: Record<string, o.Plugin>;
			// Not visible when logging `app.plugins` to the console
			enablePlugin(pluginId: string): Promise<void>;
		};
	}

	export type PluginInstance = {
		id: string;
	};

	export type InstalledPlugin = {
		enabled: boolean;
		instance: PluginInstance;
	};

	export type InternalPlugins = {
		plugins: Record<string, InstalledPlugin>;
		getPluginById(id: string): InstalledPlugin;
		getEnabledPluginById(id: string): PluginInstance;
	};

	export type QuickSwitcherOptions = {
		showAllFileTypes?: boolean;
		showAttachments?: boolean;
		showExistingOnly?: boolean;
	};

	export type SystemSwitcherClass = typeof SystemSwitcher;

	export type QuickSwitcherPluginInstance = PluginInstance & {
		options: QuickSwitcherOptions;
		QuickSwitcherModal: SystemSwitcherClass;
	};

	interface App {
		internalPlugins: InternalPlugins;
	}

	type Suggestion = unknown;

	export interface Chooser<T> {
		selectedItem: number;
		suggestions: HTMLDivElement[];
		values: T[];
		setSelectedItem(index: number, evt: MouseEvent | KeyboardEvent): void;
		setSuggestions(suggestions: T[]): void;
		useSelectedItem(evt: KeyboardEvent): void;
	}

	export class SystemSwitcher extends o.SuggestModal<Suggestion> {
		shouldShowAlias: boolean;
		protected isOpen: boolean;
		protected chooser: Chooser<Suggestion>;
		constructor(app: App, opts: QuickSwitcherOptions);
		protected onInput(): void;
		protected updateSuggestions(): void;
		getSuggestions(query: string): Suggestion[];
		renderSuggestion(value: Suggestion, el: HTMLElement): void;
		onChooseSuggestion(item: Suggestion, evt: MouseEvent | KeyboardEvent): void;
	}
}
