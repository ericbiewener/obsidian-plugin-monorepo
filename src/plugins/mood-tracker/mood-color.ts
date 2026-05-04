const colors = [
	"#8B0000",
	"#E00000",
	"#CC5500",
	"#F28C00",
	"#F2B600",
	"#FFD700",
	"#C8D600",
	"#4CAF00",
	"#1F7A1F",
	"#006400",
];

export const moodColor = (mood: number) => {
	return colors[mood - 1] || "#cccccc"; // default to grey if mood is out of range
};
