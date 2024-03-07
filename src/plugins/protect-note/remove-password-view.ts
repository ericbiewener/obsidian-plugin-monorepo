import * as o from "obsidian";
import { removeElsWithClassName } from "../../utils/dom/remove-els-with-class-name";
import { getActiveView } from "../../utils/obsidian/workspace/get-active-view";
import { DOM_CLEANUP_CLASSNAME } from "./constants";
import style from "./style.module.css";

export const removePasswordView = (app: o.App) => {
  removeElsWithClassName(DOM_CLEANUP_CLASSNAME);
  getActiveView(app).containerEl.classList.remove(style.hidden);
};
