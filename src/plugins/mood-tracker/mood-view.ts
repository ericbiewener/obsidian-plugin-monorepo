import * as o from "obsidian";
import { renderCalendar } from "./calendar";
import { EntryModal } from "./entry-modal";
import type MoodTrackerPlugin from "./index";
import { type Entry, parseEntries, upsertEntry } from "./parse-entries";

export const MOOD_VIEW_TYPE = "mood-tracker";

export class MoodView extends o.ItemView {
	private file: o.TFile | null = null;
	private year: number;
	private month: number;

	constructor(
		leaf: o.WorkspaceLeaf,
		private plugin: MoodTrackerPlugin,
	) {
		super(leaf);
		const now = new Date();
		this.year = now.getFullYear();
		this.month = now.getMonth();
	}

	getViewType() {
		return MOOD_VIEW_TYPE;
	}
	getDisplayText() {
		return "Mood Tracker";
	}
	getIcon() {
		return "calendar-days";
	}

	async onOpen() {
		this.addAction("pencil", "Edit as markdown", () => {
			if (!this.file) return;
			this.plugin.markdownPinnedFiles.add(this.file.path);
			this.leaf.setViewState({
				type: "markdown",
				state: { file: this.file.path },
			});
		});
	}

	async setState(state: unknown, result: o.ViewStateResult) {
		if (isFileState(state)) {
			const file = this.app.vault.getAbstractFileByPath(state.file);
			if (file instanceof o.TFile) {
				this.file = file;
				await this.renderView();
			}
		}
		await super.setState(state, result);
	}

	getState() {
		return this.file ? { file: this.file.path } : {};
	}

	private async renderView() {
		if (!this.file) return;
		const content = await this.app.vault.read(this.file);
		const entries = parseEntries(content);
		renderCalendar(
			this.contentEl,
			this.year,
			this.month,
			entries,
			() => this.shiftMonth(-1),
			() => this.shiftMonth(1),
			(date) => this.openEntryModal(date, entries[date]),
		);
	}

	private shiftMonth(delta: number) {
		this.month += delta;
		if (this.month < 0) {
			this.month = 11;
			this.year--;
		} else if (this.month > 11) {
			this.month = 0;
			this.year++;
		}
		this.renderView();
	}

	private openEntryModal(date: string, existing: Entry | undefined) {
		new EntryModal(this.app, date, existing, async (entry) => {
			if (!this.file) return;
			const content = await this.app.vault.read(this.file);
			await this.app.vault.modify(this.file, upsertEntry(content, date, entry));
			await this.renderView();
		}).open();
	}
}

const isFileState = (s: unknown): s is { file: string } =>
	typeof s === "object" &&
	s !== null &&
	"file" in s &&
	typeof (s as { file: unknown }).file === "string";
