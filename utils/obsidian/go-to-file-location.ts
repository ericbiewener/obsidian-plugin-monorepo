import * as o from "obsidian";
type Pos = { line: number; col: number };

export const goToFileLocation = (
  app: o.App,
  file: o.TFile,
  start: Pos,
  end?: Pos,
) => {
  const eState = {
    active: true,
    focus: true,
    line: start.line,
  };

  const leaf = app.workspace.getLeaf(false);
  leaf.openFile(file, { active: true, eState });
};
