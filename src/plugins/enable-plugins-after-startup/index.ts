import * as o from "obsidian";

const DO_NOT_ENABLE = ["lock-screen", "jump", "templater"];

export default class EnablePluginsAfterStartupPlugin extends o.Plugin {
  onload() {
    console.info(`::`, `enable-plugins-after-startup plugin init`);

    const { plugins } = this.app;
    const pluginsToSkip = [...DO_NOT_ENABLE, ...Object.keys(plugins.plugins)];
    const pluginsToEnable = Object.keys(plugins.manifests).filter(
      (id) => !pluginsToSkip.includes(id),
    );
    pluginsToEnable.map((id) => plugins.enablePlugin(id));
  }
}
