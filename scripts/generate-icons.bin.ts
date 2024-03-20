import path from "path";
import { kebabCase } from "case-anything";
import fse from "fs-extra";
import { icons } from "lucide";
import { ROOT } from "./shared/constants";

const iconNames = Object.keys(icons).map((k) => kebabCase(k));
const code = `
  export const iconNames = ${JSON.stringify(iconNames, null, 2)} as const;

  export type IconName = typeof iconNames[number];
`;

fse.writeFileSync(
	path.join(ROOT, "src/plugins/utils/ui/__generated__/icon-names.ts"),
	code,
);
