export const moodColor = (mood: number) => {
	const hue = ((mood - 1) / 9) * 120;
	return `hsl(${hue}, 75%, 35%)`;
};
