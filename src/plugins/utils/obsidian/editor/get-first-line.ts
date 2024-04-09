import * as o from "obsidian";

const PROPERTIES_DELIMITER = "---";

/**
 * File properties are part of the text but we don't want to insert stuff
 * before them.
 */
export const getFirstLine = (editor: o.Editor) => {
	const lines = editor.getValue().split("\n");

	if (lines[0] === PROPERTIES_DELIMITER) {
		for (let i = 1; i < lines.length; i++) {
			if (lines[i] === PROPERTIES_DELIMITER) return i + 1;
		}
	}

	return 0;
};
