import * as o from "obsidian";
import { HeadingSuggestion } from "./types";
import { goToFileLocation } from "../../../utils/obsidian/go-to-file-location";

export const goToHeadingSuggestion = (
  app: o.App,
  { file, heading }: HeadingSuggestion,
) => goToFileLocation(app, file, heading.position.start);
