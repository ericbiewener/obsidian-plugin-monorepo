import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { filter } from "fuzzy";
import {
  getAllSuggestions,
  getSuggestionsForFilename,
} from "./get-all-suggestions";
import { HeadingSuggestion } from "./types";
import { goToFileLocation } from "../../../utils/obsidian/go-to-file-location";
import { HIEARCHY_SEPARATOR } from "./constants";

declare module "obsidian" {
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

  export type QuickSwitcherPluginInstance = PluginInstance & {
    options: QuickSwitcherOptions;
    QuickSwitcherModal: typeof SystemSwitcher;
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

  export class SystemSwitcher extends SuggestModal<Suggestion> {
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

// https://github.com/darlal/obsidian-switcher-plus/blob/a8d9229f70d7f69760dad946b8fe2540022bf429/src/utils/utils.ts#L117-L120
const getSystemSwitcherInstance = (app: o.App) => {
  const plugin = app.internalPlugins.getPluginById("switcher");
  return plugin.instance as o.QuickSwitcherPluginInstance;
};

const OMNI_FILENAME = "_omni_.md";
const OMNI_PREFIX = `_omni_${HIEARCHY_SEPARATOR}`;

const jump = (omniOnly: boolean) => (plugin: o.Plugin) => {
  const { app } = plugin;
  // modal needs to be created dynamically (same as system switcher)
  // as system options are evaluated in the modal constructor
  const SystemSwitcherModal = getSystemSwitcherInstance(app).QuickSwitcherModal;
  const suggestions = omniOnly
    ? getSuggestionsForFilename(app, OMNI_FILENAME)
    : getAllSuggestions(app);
  console.info(`:: suggestions`, suggestions);

  const JumpModal = class extends SystemSwitcherModal {
    getSuggestions(input: string) {
      return filter(input, suggestions, { extract: (s) => s.label }).map(
        (r) => r.original,
      );
    }

    // fuzzaldrin-plus version
    // getSuggestions(input: string) {
    //   const result = filter(suggestions, input, { key: "label"})
    //   console.info(`:: result`, result)
    //   return result
    // }

    onChooseSuggestion(suggestion: HeadingSuggestion) {
      const { start, end } = suggestion.heading.position;
      goToFileLocation(app, suggestion.file, start, end);
    }

    renderSuggestion({ label }: HeadingSuggestion, parentEl: HTMLElement) {
      parentEl.innerHTML = label.startsWith(OMNI_PREFIX)
        ? label.slice(OMNI_PREFIX.length)
        : label;
    }
  };

  const modal = new JumpModal(app, {});
  modal.open();
};

export const addJumpToOmniHeadingCmd = addCommand(
  "Headings in Omni File",
  jump(true),
);
export const addJumpToHeadingCmd = addCommand(
  "Headings in all files",
  jump(false),
);
