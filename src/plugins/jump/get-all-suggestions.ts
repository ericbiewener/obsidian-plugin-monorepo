import * as o from "obsidian";
import { HeadingSuggestion } from "./types";
import { last } from "../../../utils/collections/last";
import { findLastIndex } from "../../../utils/collections/find-last";
import { getFile } from "../../../utils/obsidian/vault/get-file";

export type CreateLabel = (
  file: o.TFile,
  hierarchy: o.HeadingCache[],
  heading: o.HeadingCache,
) => string;

export const getSuggestionsForFilename = (
  app: o.App,
  filename: string,
  createLabel: CreateLabel,
) => {
  const file = getFile(app, filename);
  return file ? getSuggestionsForFile(app, file, createLabel) : [];
};

export const getSuggestionsForFile = (
  app: o.App,
  file: o.TFile,
  createLabel: CreateLabel,
): HeadingSuggestion[] => {
  const metadata = app.metadataCache.getFileCache(file);
  const hierarchy: o.HeadingCache[] = [];

  return (
    metadata.headings?.map((heading) => {
      const current = last(hierarchy);
      if (!current) {
        hierarchy.push(heading);
      } else {
        const idx = findLastIndex(hierarchy, (h) => h.level < heading.level);
        hierarchy.splice(idx + 1, hierarchy.length, heading);
      }

      return {
        label: createLabel(file, hierarchy, heading),
        heading: heading,
        file,
        hierarchy: [...hierarchy],
      };
    }) || []
  );
};

export const getAllSuggestions = (
  app: o.App,
  createLabel: CreateLabel,
): HeadingSuggestion[] =>
  app.vault
    .getFiles()
    .flatMap((file) => getSuggestionsForFile(app, file, createLabel));
