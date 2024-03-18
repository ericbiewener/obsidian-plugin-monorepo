import OmniSwitcherPlugin from ".";

export const getFilesByLastOpened = ({ data, app }: OmniSwitcherPlugin) => {
	const fileToIdx: Record<string, number> = {};

	for (let i = 0; i < data.fileHistory.length; i++) {
		fileToIdx[data.fileHistory[i]!] = i;
	}

	return app.vault.getMarkdownFiles().sort((a, b) => {
		const aIdx = fileToIdx[a.path];
		const bIdx = fileToIdx[b.path];

		if (aIdx != null) {
			return bIdx == null ? -1 : aIdx - bIdx;
		}

		return bIdx == null ? a.path.localeCompare(b.path) : 1;
	});
};
