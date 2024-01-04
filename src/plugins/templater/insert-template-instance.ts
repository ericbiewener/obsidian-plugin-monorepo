import assert from "assert";
import * as o from "obsidian";
import { getEditor } from "../../../utils/obsidian/editor/get-editor";
import { getHeadingContainingSelection } from "../../../utils/obsidian/get-heading-containing-selection";
import { locToEditorPos } from "../../../utils/obsidian/loc-to-editor-pos";
import { getActiveFileMetadata } from "../../../utils/obsidian/metadata/get-active-file-metadata";
import { sleep } from "../../../utils/sleep";
import { findFirstNonSpecialCharPos } from "../../../utils/string/find-first-non-special-char-pos";
import { addCommand } from "../../add-command";

const insertTemplateInstance = async ({ app }: o.Plugin) => {
  const metadata = getActiveFileMetadata(app);
  const template = metadata.frontmatter?.template;
  assert(template);

  const heading = getHeadingContainingSelection(app);
  const pos = heading?.position || metadata.frontmatterPosition!;
  const editor = getEditor(app);
  editor.replaceRange(`\n\n${template}`, locToEditorPos(pos.end));

  const line = pos.end.line + 2; // 2 new lines
  const ch = findFirstNonSpecialCharPos(template) || 0;

  // Doesn't correctly set selection without first setting cursor to the line
  // in order to show special heading chars, then sleeping 0ms, then setting
  // actual selection
  editor.setCursor(line);
  await sleep();
  editor.setSelection(
    { line, ch },
    { line, ch: template.split("\n")[0].length },
  );
};

export const addInsertTemplateInstanceCmd = addCommand(
  "Insert Template Instance",
  insertTemplateInstance,
);
