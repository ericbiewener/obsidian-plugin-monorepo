import * as o from "obsidian";
import { goToFileLocation } from "../../utils/obsidian/go-to-file-location";
import { HeadingSuggestion } from "./types";

export const goToHeadingSuggestion = (
  app: o.App,
  { file, heading }: HeadingSuggestion,
) => goToFileLocation(app, file, heading.position.start);
