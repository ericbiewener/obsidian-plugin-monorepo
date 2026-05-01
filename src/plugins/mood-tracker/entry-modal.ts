import * as o from "obsidian";
import type { Entry } from "./parse-entries";

const moodColor = (mood: number) => {
	const hue = ((mood - 1) / 9) * 120;
	return `hsl(${hue}, 75%, 35%)`;
};

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
		const heading = contentEl.createEl("h2", { text: this.date });
		heading.style.marginTop = "0";

		let selectedMood: number | undefined = this.existing?.mood;

		const moodRow = contentEl.createEl("div");
		moodRow.style.marginBottom = "12px";
		moodRow.style.display = "flex";
		moodRow.style.flexDirection = "column";
		moodRow.style.gap = "8px";
		moodRow.createEl("label", { text: "Mood" });

		const swatchRow = moodRow.createEl("div");
		swatchRow.style.display = "flex";
		swatchRow.style.flexWrap = "wrap";
		swatchRow.style.gap = "6px";

		const swatches: HTMLElement[] = [];
		for (let i = 1; i <= 10; i++) {
			const swatch = swatchRow.createEl("div");
			swatch.style.width = "32px";
			swatch.style.height = "32px";
			swatch.style.borderRadius = "50%";
			swatch.style.backgroundColor = moodColor(i);
			swatch.style.cursor = "pointer";
			swatch.style.display = "flex";
			swatch.style.alignItems = "center";
			swatch.style.justifyContent = "center";
			swatch.style.color = "#fff";
			swatch.style.fontSize = "11px";
			swatch.style.fontWeight = "700";
			swatch.style.transition = "transform 0.1s";
			swatch.style.flexShrink = "0";
			swatch.setText(String(i));
			swatches.push(swatch);
		}

		const selectMood = (mood: number) => {
			selectedMood = mood;
			swatchRow.style.outline = "none";
			swatches.forEach((s, idx) => {
				const active = idx + 1 === mood;
				s.style.outline = active ? "2px solid var(--text-normal)" : "none";
				s.style.outlineOffset = "2px";
				s.style.transform = active ? "scale(1.2)" : "scale(1)";
			});
		};

		swatches.forEach((s, idx) =>
			s.addEventListener("click", () => selectMood(idx + 1)),
		);

		if (selectedMood !== undefined) selectMood(selectedMood);

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
			if (selectedMood === undefined) {
				swatchRow.style.outline = "2px solid var(--color-red)";
				swatchRow.style.outlineOffset = "4px";
				swatchRow.style.borderRadius = "4px";
				return;
			}
			this.onSave({ mood: selectedMood, notes: notesInput.value.trim() });
			this.close();
		});
	}

	onClose() {
		this.contentEl.empty();
	}
}
