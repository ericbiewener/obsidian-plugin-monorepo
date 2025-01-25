import MacrosPlugin from ".";
import { addCommand } from "../../add-command";

const addJournalEntry = async ({ app }: MacrosPlugin) => {
	await app.workspace.openLinkText("Journal.md", "", false);
	await app.commands.executeCommandById("grab-bag:insert-date-heading");
};

export const addJournalEntryCmd = addCommand(
	"Add Journal Entry",
	addJournalEntry,
);
