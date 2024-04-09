export const onKey =
	(keyMap: Record<string, (e: KeyboardEvent) => unknown>) =>
	(e: KeyboardEvent) => {
		const cb = keyMap[e.key];
		if (cb) cb(e);
	};
