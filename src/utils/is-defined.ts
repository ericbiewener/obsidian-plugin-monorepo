export const isDefined = <T>(check: T | null | undefined): check is T =>
	check != null;
