import { addCommand } from "../../add-command";
import { getUtils } from "../../utils/obsidian/get-plugin";
import GoToHeaderPlugin from "./index";

export const openHeaderSuggestModal = (plugin: GoToHeaderPlugin) => {
	const { app } = plugin;
	const utils = getUtils(app);

	utils.openHeaderSuggestModal(plugin, {
		onChooseSuggestion: ({ file, heading }) => {
			utils.goToFileLocation(app, file, heading.position.end);
		},
	});
};

export const addOpenHeaderSuggestModalCmd = addCommand<GoToHeaderPlugin>(
	"Go to Header",
	openHeaderSuggestModal,
	{ icon: "target" },
);
