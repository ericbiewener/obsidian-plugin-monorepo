import { EditorView } from "@codemirror/view";
import * as o from "obsidian";
import { MarkdownLeaf } from "../src/types/obsidian";

declare module "obsidian" {
	interface App {
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

	type PluginInstance = {
		id: string;
	};

	type InstalledPlugin = {
		enabled: boolean;
		instance: PluginInstance;
	};

	type InternalPlugins = {
		plugins: Record<string, InstalledPlugin>;
		getPluginById(id: string): InstalledPlugin;
		getEnabledPluginById(id: string): PluginInstance;
	};

	interface App {
		internalPlugins: InternalPlugins;
	}

	interface MarkdownView {
		titleEl: HTMLElement;
		titleParentEl: HTMLElement;
		titleContainerEl: HTMLElement;
	}

	interface Editor {
		cm: EditorView;
	}

	interface Workspace {
		on(
			name: "file-opened",
			callback: (leaf: MarkdownLeaf) => any,
			ctx?: any,
		): EventRef;
		on(
			name: "leaf-created",
			callback: (leaf: MarkdownLeaf) => any,
			ctx?: any,
		): EventRef;
	}
}
