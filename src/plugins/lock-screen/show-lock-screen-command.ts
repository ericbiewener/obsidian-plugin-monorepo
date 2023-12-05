import { showLockScreen } from "./show-lock-screen";
import { addCommand } from "../../add-command";

export const addShowLockScreenCommand = addCommand(
  "Lock screen",
  showLockScreen,
);
