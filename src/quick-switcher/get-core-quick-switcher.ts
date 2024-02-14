import * as o from "obsidian";

// https://github.com/darlal/obsidian-switcher-plus/blob/a8d9229f70d7f69760dad946b8fe2540022bf429/src/utils/utils.ts#L117-L120
export const getCoreQuickSwitcherClass = (app: o.App) => {
  const plugin = app.internalPlugins.getPluginById("switcher");
  return (plugin.instance as o.QuickSwitcherPluginInstance).QuickSwitcherModal;
};
