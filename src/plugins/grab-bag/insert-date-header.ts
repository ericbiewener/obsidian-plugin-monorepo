import formatDate from "date-fns/format";
import * as o from "obsidian";
import { getEditor } from "../../../utils/obsidian/editor/get-editor";
import { getActiveFileMetadata } from "../../../utils/obsidian/metadata/get-active-file-metadata";
import { addCommand } from "../../add-command";

const getTimeHeaderStr = () =>
  `### ${formatDate(new Date(), "h:mm a")}\n\n\n\n`;

const setAndScrollToCursor = (editor: o.Editor, line: number) => {
  editor.setCursor({ line, ch: 0 });
  editor.scrollTo(0, line - 1);
};

const insertDateAndTimeHeader = (app: o.App, dateStr: string) => {
  const editor = getEditor(app);
  editor.replaceRange(`# ${dateStr}\n\n${getTimeHeaderStr()}`, {
    line: 0,
    ch: 0,
  });
  setAndScrollToCursor(editor, 4);
};

const insertTimeHeader = (app: o.App, dateHeader: o.HeadingCache) => {
  const editor = getEditor(app);
  const line = dateHeader.position.start.line + 2;
  editor.replaceRange(getTimeHeaderStr(), { line, ch: 0 });
  setAndScrollToCursor(editor, line + 2);
};

const insertDateHeader = async ({ app }: o.Plugin) => {
  const dateStr = formatDate(new Date(), "MMM d, yyyy");
  const headings = getActiveFileMetadata(app).headings || [];
  const dateHeader = headings.find((h) => h.level === 1);
  if (dateHeader?.heading !== dateStr) {
    insertDateAndTimeHeader(app, dateStr);
  } else {
    insertTimeHeader(app, dateHeader);
  }
};

export const addInsertDateHeaderCmd = addCommand(
  "Insert Date Header",
  insertDateHeader,
);
