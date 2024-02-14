import * as o from "obsidian";

export const initSettings = async <S extends Record<string, unknown>>(
  plugin: o.Plugin & { settings: S },
) => {
  Object.assign(plugin.settings, await plugin.loadData());
};
