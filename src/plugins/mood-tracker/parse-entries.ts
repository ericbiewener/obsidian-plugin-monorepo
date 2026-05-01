export type Entry = { mood: number; notes: string };

const DATE_HEADING = /^## (\d{4}-\d{2}-\d{2})$/m;
const MOOD_LINE = /^- Mood: (\d+)$/m;
const SECTION_SPLIT = /(?=^## \d{4}-\d{2}-\d{2}$)/m;

export const parseEntries = (content: string): Record<string, Entry> => {
	const entries: Record<string, Entry> = {};

	for (const chunk of content.split(SECTION_SPLIT)) {
		const dateMatch = chunk.match(DATE_HEADING);
		if (!dateMatch) continue;

		const moodMatch = chunk.match(MOOD_LINE);
		if (!moodMatch) continue;

		const date = dateMatch[1];
		const moodStr = moodMatch[1];
		const moodLine = moodMatch[0];
		if (!date || !moodStr || !moodLine) continue;

		const mood = parseInt(moodStr, 10);
		const afterMood = chunk
			.slice(chunk.indexOf(moodLine) + moodLine.length)
			.trim();

		entries[date] = { mood, notes: afterMood };
	}

	return entries;
};

export const upsertEntry = (
	content: string,
	date: string,
	entry: Entry,
): string => {
	const notes = entry.notes.trim();
	const newSection = `## ${date}\n\n- Mood: ${entry.mood}${
		notes ? `\n\n${notes}` : ""
	}`;

	const chunks = content.split(SECTION_SPLIT);
	const hasExisting = chunks.some((c) => c.match(DATE_HEADING)?.[1] === date);

	if (hasExisting) {
		return chunks
			.map((c) => {
				if (c.match(DATE_HEADING)?.[1] !== date) return c;
				const leading = c.match(/^\n*/)?.[0] ?? "";
				return `${leading}${newSection}\n\n`;
			})
			.join("");
	}

	return `${content.trimEnd()}\n\n${newSection}`;
};
