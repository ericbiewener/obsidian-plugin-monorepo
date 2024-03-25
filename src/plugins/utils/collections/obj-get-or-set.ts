export const objGetOrSet = <O extends {}>(
	obj: O,
	k: keyof O,
	v: O[keyof O],
): O[keyof O] => {
	if (obj[k] === undefined) {
		obj[k] = v;
	}
	return obj[k];
};
