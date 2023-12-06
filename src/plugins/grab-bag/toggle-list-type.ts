import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { getEditor } from "../../../utils/obsidian/editor/get-editor";

const leadingWhitespace = /^(\s*)/;
const unorderedListItem = /^(\s*)-( .*)/;
const orderedListItem = /^(\s*)[0-9]+\.( .*)/;

const orderedListItemMatch = /^\s*([0-9]+)\. /;

const makeUnordered = (editor: o.Editor, line: string, lineNo: number) => {
  const newLine = line.replace(orderedListItem, "$1-$2");
  editor.replaceRange(newLine, { line: lineNo, ch: line.length });
};

const getIndentation = (line: string) =>
  line.match(leadingWhitespace)[1]?.length || 0;

const findPrevNum = (
  editor: o.Editor,
  lineNo: number,
  indentation: number,
): number | null => {
  const line = editor.getLine(lineNo);
  const newIndentation = getIndentation(line);

  if (newIndentation < indentation) return null;

  if (newIndentation === indentation) {
    if (unorderedListItem.test(line)) return null;
    const match = line.match(orderedListItemMatch)[1];
    return match ? parseInt(match, 10) : null;
  }

  return findPrevNum(editor, lineNo, indentation);
};

const makeOrdered = (editor: o.Editor, line: string, lineNo: number) => {
  const indentation = line.match(leadingWhitespace)[1]?.length || 0;
  const prevNum = findPrevNum(editor, lineNo - 1, indentation) || 0;
  // const newLine = line.replace(orderedListItem, "$1-$2")
  // editor.replaceRange(newLine, { line: lineNo, ch: line.length})
};

const toggleListType = async ({ app }: o.Plugin, line = 0) => {
  const editor = getEditor(app);
  const startLine = editor.getCursor("from").line;
  const toLine = editor.getCursor("to").line;

  for (let i = startLine; i <= toLine; i++) {
    const line = editor.getLine(i);
    if (unorderedListItem.test(line)) {
      makeOrdered(editor, line, i);
    } else if (orderedListItem.test(line)) {
      makeUnordered(editor, line, i);
    }
  }
};

export const addInsertTimeHeaderCmd = addCommand(
  "Toggle list type",
  toggleListType,
);
