import { OMNI_PREFIX } from "./constants";
import { HeadingSuggestion } from "./types";

export const renderHeadingSuggestion = (
  { label }: HeadingSuggestion,
  parentEl: HTMLElement,
) => {
  parentEl.innerHTML = label.startsWith(OMNI_PREFIX)
    ? label.slice(OMNI_PREFIX.length)
    : label;
};
