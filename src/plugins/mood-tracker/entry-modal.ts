import * as o from "obsidian";
import type { Entry } from "./parse-entries";

export class EntryModal extends o.Modal {
	constructor(
		app: o.App,
		private date: string,
		private existing: Entry | undefined,
		private onSave: (entry: Entry) => void,
	) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.createEl("h2", { text: this.date });

		const moodRow = contentEl.createEl("div");
		moodRow.style.marginBottom = "12px";
		moodRow.createEl("label", { text: "Mood (1–10)" });
		moodRow.style.display = "flex";
		moodRow.style.flexDirection = "column";
		moodRow.style.gap = "4px";
		const moodInput = moodRow.createEl("input");
		moodInput.type = "number";
		moodInput.min = "1";
		moodInput.max = "10";
		moodInput.value = this.existing ? String(this.existing.mood) : "";
		moodInput.style.width = "80px";

		const notesRow = contentEl.createEl("div");
		notesRow.style.marginBottom = "16px";
		notesRow.style.display = "flex";
		notesRow.style.flexDirection = "column";
		notesRow.style.gap = "4px";
		notesRow.createEl("label", { text: "Notes" });
		const notesInput = notesRow.createEl("textarea");
		notesInput.value = this.existing?.notes ?? "";
		notesInput.rows = 4;
		notesInput.style.width = "100%";
		notesInput.style.resize = "vertical";

		const saveBtn = contentEl.createEl("button", { text: "Save" });
		saveBtn.style.marginTop = "4px";
		saveBtn.addEventListener("click", () => {
			const mood = parseInt(moodInput.value, 10);
			if (Number.isNaN(mood) || mood < 1 || mood > 10) {
				moodInput.style.borderColor = "var(--color-red)";
				moodInput.focus();
				return;
			}
			this.onSave({ mood, notes: notesInput.value.trim() });
			this.close();
		});

		moodInput.focus();
	}

	onClose() {
		this.contentEl.empty();
	}
}
