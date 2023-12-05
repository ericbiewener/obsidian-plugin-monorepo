import formatDate from "date-fns/format";
import * as o from "obsidian";
import { addCommand } from "../../add-command";

const insertTimeHeader = async ({ app }: o.Plugin, line = 0) => {
  const time = formatDate(new Date(), "h:mm a");

  const editor = app.workspace.getActiveViewOfType(o.MarkdownView)?.editor;

  editor.replaceRange(`##### ${time}\n\n\n\n`, { line, ch: 0 });
  editor.setCursor({ line: line + 1, ch: 0 });
  editor.scrollTo(0, line);
};

export const addInsertTimeHeaderCmd = addCommand(
  "Insert Time Header",
  insertTimeHeader,
);
