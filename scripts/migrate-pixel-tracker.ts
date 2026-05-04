import * as fs from "fs";

const RATING_MAP: Record<string, number> = {
	extremely_bad: 1,
	very_bad: 2,
	bad: 3,
	neutral: 5,
	good: 7,
	very_good: 8,
	extremely_good: 10,
};

const toDate = (dateTime: string) =>
	new Intl.DateTimeFormat("en-CA", {
		timeZone: "America/Los_Angeles",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(new Date(dateTime));

type Item = { dateTime: string; rating: string };

const json = JSON.parse(
	fs.readFileSync(
		"/Users/ebiewener/Downloads/pixel-tracker-2026-05-03.json",
		"utf8",
	),
) as { items: Item[] };

const byDate = new Map<string, number>();
for (const item of json.items) {
	const date = toDate(item.dateTime);
	const mood = RATING_MAP[item.rating];
	if (mood === undefined) throw new Error(`Unknown rating: ${item.rating}`);
	byDate.set(date, mood);
}

const sortedDates = [...byDate.keys()].sort();

const sections = sortedDates.map(
	(date) => `## ${date}\n\n- Mood: ${byDate.get(date)}`,
);

const output = `---\nmood-tracker: true\n---\n\n${sections.join("\n\n")}`;

fs.writeFileSync(
	"/Users/ebiewener/Sync/Personal Notes/Mood Tracker.md",
	output,
	"utf8",
);

console.log(
	`Migrated ${byDate.size} entries (${json.items.length} source items)`,
);
