import * as o from "obsidian";
import { getCoreQuickSwitcherClass } from "./get-core-quick-switcher";

type Config<S> = {
  getSuggestions(query: string): S[];
  renderSuggestion(suggestion: S, el: HTMLElement): void;
  onChooseSuggestion(suggestion: S, evt: MouseEvent | KeyboardEvent): void;
};

export const createQuickSwitcher = <S>(
  { app }: o.Plugin,
  config: Config<S>,
  open = true,
) => {
  // modal needs to be created dynamically (same as system switcher)
  // as system options are evaluated in the modal constructor
  const SystemSwitcherModal = getCoreQuickSwitcherClass(app);

  const CustomQuickSwitcher = class extends SystemSwitcherModal {
    getSuggestions = config.getSuggestions;
    onChooseSuggestion = config.onChooseSuggestion;
    renderSuggestion = config.renderSuggestion;
  };

  const modal = new CustomQuickSwitcher(app, {});
  if (open) modal.open();
};
