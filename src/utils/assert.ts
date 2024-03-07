/**
 * Importing from node's `assert` library results in undefined in the final
 * webpack bundle. Not sure why.
 */

type Assert = (value: unknown, message?: string | Error) => asserts value;

export const assert: Assert = (value, message) => {
	if (!value) {
		throw typeof message === "string" ? new Error(message) : message;
	}
};
