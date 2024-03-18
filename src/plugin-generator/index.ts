import path from "path";
import { capitalCase, kebabCase, pascalCase } from "case-anything";
import fse from "fs-extra";
import globby from "globby";
import yargs from "yargs";

const { name: inputName, desc } = yargs
	.alias("h", "help")
	.version(false)
	.options({ name: { type: "string", required: true } })
	.options({ desc: { type: "string", required: true } })
	.parseSync();

const name = {
	kebab: kebabCase(inputName),
	pascal: pascalCase(inputName),
	capital: capitalCase(inputName),
};

const templateDir = path.join(__dirname, "template");
const dest = path.join(__dirname, "../plugins", name.kebab);

const applyTemplate = async (file: string) => {
	let txt = await fse.readFile(file, "utf-8");

	for (const [k, v] of Object.entries(name)) {
		txt = txt.replace(new RegExp(`__name-${k}__`, "g"), v);
	}

	txt = txt.replace(/__desc__/g, desc);
	await Promise.all([fse.writeFile(file.slice(0, -4), txt), fse.unlink(file)]);
};

const main = async () => {
	fse.copySync(templateDir, dest);
	const files = await globby("**/*", { cwd: dest, absolute: true });
	await Promise.all(files.map(applyTemplate));
};

main();
