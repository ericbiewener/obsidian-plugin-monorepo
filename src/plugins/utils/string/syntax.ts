export const isUnorderedList = (line: string) => /^(\s*)-( .*)/.test(line);

export const isNumberedList = (line: string) =>
	/^(\s*)[0-9]+\.( .*)/.test(line);

export const isCheckBoxList = (line: string) =>
	/^(\s*)- \[[ x]\]( .*)/.test(line);

export const isList = (line: string) =>
	isUnorderedList(line) || isNumberedList(line) || isCheckBoxList(line);
