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

	interface App {
		internalPlugins: InternalPlugins;
	}

	export interface MarkdownView {
		titleEl: HTMLElement;
		titleParentEl: HTMLElement;
		titleContainerEl: HTMLElement;
	}
}
