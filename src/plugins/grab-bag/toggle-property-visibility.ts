import GrabBagPlugin from ".";
import { addCommand } from "../../add-command";
import style from "./style.module.css";

const togglePropertyVisibility = () => {
	if (document.body.classList.contains(style.hideProperties)) {
		document.body.classList.remove(style.hideProperties);
	} else {
		document.body.classList.add(style.hideProperties);
	}
};

const addTogglePropertyVisibilityCmd = addCommand(
	"Toggle property visibility",
	togglePropertyVisibility,
);

export const initTogglePropertyVisibility = (plugin: GrabBagPlugin) => {
	console.info(`:: style.hideProperties`, style.hideProperties);
	document.body.classList.add(style.hideProperties);
	addTogglePropertyVisibilityCmd(plugin);
};
