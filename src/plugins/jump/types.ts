import * as o from "obsidian";

export type HeadingSuggestion = {
  label: string;
  heading: o.HeadingCache;
  file: o.TFile;
  hierarchy: o.HeadingCache[];
};
