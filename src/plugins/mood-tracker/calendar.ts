import { moodColor } from "./mood-color";
import type { Entry } from "./parse-entries";
import style from "./style/style.module.css";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const formatDate = (year: number, month: number, day: number) => {
	const m = String(month + 1).padStart(2, "0");
	const d = String(day).padStart(2, "0");
	return `${year}-${m}-${d}`;
};

export const renderCalendar = (
	container: HTMLElement,
	year: number,
	month: number,
	entries: Record<string, Entry>,
	onPrev: () => void,
	onNext: () => void,
	onDayClick: (date: string) => void,
) => {
	container.empty();

	const wrapper = container.createEl("div", { cls: style.wrapper });

	const header = wrapper.createEl("div", { cls: style.header });
	header
		.createEl("button", { text: "◀", cls: style.navBtn })
		.addEventListener("click", onPrev);
	header.createEl("span", {
		text: `${MONTHS[month]} ${year}`,
		cls: style.monthLabel,
	});
	header
		.createEl("button", { text: "▶", cls: style.navBtn })
		.addEventListener("click", onNext);

	const grid = wrapper.createEl("div", { cls: style.grid });

	for (const day of DAYS_OF_WEEK) {
		grid.createEl("div", { text: day, cls: style.dayHeader });
	}

	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const today = new Date();

	for (let i = 0; i < firstDay; i++) {
		grid.createEl("div", { cls: `${style.dayCell} ${style.dayEmpty}` });
	}

	for (let day = 1; day <= daysInMonth; day++) {
		const date = formatDate(year, month, day);
		const entry = entries[date];
		const isToday =
			today.getFullYear() === year &&
			today.getMonth() === month &&
			today.getDate() === day;

		const cell = grid.createEl("div", {
			cls: isToday ? `${style.dayCell} ${style.dayToday}` : style.dayCell,
		});

		cell.createEl("span", { text: String(day), cls: style.dayNumber });

		if (entry) {
			const scoreEl = cell.createEl("span", {
				text: String(entry.mood),
				cls: style.moodScore,
			});
			scoreEl.style.backgroundColor = moodColor(entry.mood);
		}

		cell.addEventListener("click", () => onDayClick(date));
	}
};
