import * as o from "obsidian";
import { HeadingSuggestion } from "./types";
import { last } from "../../../utils/collections/last";
import { findLastIndex } from "../../../utils/collections/find-last";
import { HIEARCHY_SEPARATOR } from "./constants";

const createLabel = (file: o.TFile, hierarchy: o.HeadingCache[]) =>
  [file.basename, ...hierarchy.map((h) => h.heading)].join(HIEARCHY_SEPARATOR);

export const getSuggestionsForFilename = (app: o.App, filename: string) => {
  const file = app.vault.getFiles().find((f) => {
    console.log(f);
    return f.name === filename;
  });
  return file ? getSuggestionsForFile(app, file) : [];
};

export const getSuggestionsForFile = (app: o.App, file: o.TFile) => {
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
        label: createLabel(file, hierarchy),
        heading: heading,
        file,
        hierarchy: [...hierarchy],
      };
    }) || []
  );
};

export const getAllSuggestions = (app: o.App): HeadingSuggestion[] =>
  app.vault.getFiles().flatMap((file) => getSuggestionsForFile(app, file));
