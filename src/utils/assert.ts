/**
 * Can't depend on Node built-ins being available in all environments.
 */

type Assert = (value: unknown, message?: string | Error) => asserts value;

export const assert: Assert = (value, message) => {
	if (!value) {
		throw typeof message === "string" ? new Error(message) : message;
	}
};
