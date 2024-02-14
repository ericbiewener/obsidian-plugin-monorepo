import * as o from "obsidian";

export const getFile = (app: o.App, filename: string) =>
  app.vault.getFiles().find((f) => {
    return f.name === filename;
  });
