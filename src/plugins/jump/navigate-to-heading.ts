import { filter } from "fuzzy";
import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { getCoreQuickSwitcherClass } from "../../quick-switcher/get-core-quick-switcher";
import { OMNI_FILENAME } from "./constants";
import { createBreadcrumbLabel } from "./create-breadcrumb-label";
import {
  getAllSuggestions,
  getSuggestionsForFilename,
} from "./get-all-suggestions";
import { goToHeadingSuggestion } from "./go-to-heading-suggestion";
import { renderHeadingSuggestion } from "./render-heading-suggestion";
import { HeadingSuggestion } from "./types";

const navigate =
  (omniOnly: boolean) =>
  ({ app }: o.Plugin) => {
    // modal needs to be created dynamically (same as system switcher)
    // as system options are evaluated in the modal constructor
    const SystemSwitcherModal = getCoreQuickSwitcherClass(app);
    const allSuggestions = omniOnly
      ? getSuggestionsForFilename(app, OMNI_FILENAME, createBreadcrumbLabel)
      : getAllSuggestions(app, createBreadcrumbLabel);

    const firstHeaderSuggestions = allSuggestions.filter(
      (s) => s.heading.level === 1,
    );

    let suggestions = firstHeaderSuggestions;

    const JumpModal = class extends SystemSwitcherModal {
      getSuggestions(input: string) {
        return input
          ? filter(input, suggestions, {
              extract: (s) => s.label,
            }).map((r) => r.original)
          : suggestions;
      }

      async onChooseSuggestion(suggestion: HeadingSuggestion) {
        if (suggestions === firstHeaderSuggestions) {
          suggestions = allSuggestions.filter((s) =>
            s.hierarchy.includes(suggestion.heading),
          );
          modal.open();
        } else {
          await goToHeadingSuggestion(app, suggestion);
        }
      }

      renderSuggestion = renderHeadingSuggestion;
    };

    const modal = new JumpModal(app, {});
    modal.open();
  };

export const addNavigateToOmniHeadingCmd = addCommand(
  "Navigate Headings in Omni File",
  navigate(true),
);
export const addNavigateToHeadingCmd = addCommand(
  "Navigate Headings in all files",
  navigate(false),
);
