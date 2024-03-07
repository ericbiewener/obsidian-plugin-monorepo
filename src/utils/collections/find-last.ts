// Array.prototype.findLastIndex exists is Node v18
export const findLastIndex = <V>(arr: V[], cb: (v: V) => unknown) => {
	for (let i = arr.length - 1; i >= 0; i--) {
		const v = arr[i]!;
		if (cb(v)) {
			return i;
		}
	}

	return -1;
};

// Array.prototype.findLast exists is Node v18
export const findLast = <V>(arr: V[], cb: (v: V) => unknown) => {
	const idx = findLastIndex(arr, cb);
	return idx > -1 ? arr[idx] : undefined;
};
