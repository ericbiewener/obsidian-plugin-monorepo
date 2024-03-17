import { addCommand } from "../../add-command";
import { showLockScreen } from "./show-lock-screen";

export const addShowLockScreenCommand = addCommand(
	"Lock screen",
	showLockScreen,
);
