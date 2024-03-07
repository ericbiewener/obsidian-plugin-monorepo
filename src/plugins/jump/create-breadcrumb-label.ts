import { HIEARCHY_SEPARATOR } from "./constants";
import { CreateLabel } from "./get-all-suggestions";

export const createBreadcrumbLabel: CreateLabel = (file, hierarchy) =>
	[file.basename, ...hierarchy.map((h) => h.heading)].join(HIEARCHY_SEPARATOR);
