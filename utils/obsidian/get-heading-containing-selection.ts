import * as o from "obsidian";
import { getEditor } from "./editor/get-editor";
import { getActiveFileMetadata } from "./metadata/get-active-file-metadata";

export const getHeadingContainingSelection = (
  app: o.App,
): o.HeadingCache | undefined => {
  const headings = getActiveFileMetadata(app).headings || [];
  const editor = getEditor(app);
  const sel = editor.getCursor("from").line;

  let candidate: o.HeadingCache;

  for (const heading of headings || []) {
    if (heading.level !== 1) continue;
    if (heading.position.start.line <= sel) {
      candidate = heading;
    } else {
      break;
    }
  }

  return candidate;
};
