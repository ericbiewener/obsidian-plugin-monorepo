const colors = [
	"#8C1C1C", // 1 dark red
	"#B83030", // 2 red
	"#C86828", // 3 orange
	"#D4AE78", // 4 beige orange
	"#CCBEA0", // 5 beige
	"#A2C28A", // 6 beige green
	"#4A9E54", // 7 green
	"#1E6E34", // 8 dark green
	"#1A98B4", // 9 cyan
];

export const moodColor = (mood: number) => {
	return colors[mood - 1] || "#cccccc"; // default to grey if mood is out of range
};
