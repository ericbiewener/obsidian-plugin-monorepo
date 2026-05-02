import { spawn } from "child_process";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import fse from "fs-extra";
import { defineConfig } from "vite";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const isProd = process.env.NODE_ENV === "production";

const TCM_EXE = path.join(__dirname, "node_modules/.bin/tcm");

const paths = {
	pluginSrc: path.join(__dirname, "src/plugins"),
	vaults: {
		personal: path.join(os.homedir(), "Sync/Personal Notes"),
		work: path.join(
			os.homedir(),
			"Library/CloudStorage/OneDrive-WalmartInc/Notes",
		),
	},
};

const plugins = [
	"grab-bag",
	"better-command-palette",
	"better-file-switcher",
	"go-to-header",
	"mood-tracker",
	"protect-note",
	"restore-selection-and-scroll-position",
	"insert-text-modal",
	"customize-mobile-navbar",
	"utils",
] as const;

type Plugin = (typeof plugins)[number];

const MANIFEST_FILE = "manifest.json";
const allVaults = [paths.vaults.personal, paths.vaults.work];

const pluginToVault: Record<Plugin, string[]> = {
	"grab-bag": allVaults,
	"better-command-palette": allVaults,
	"better-file-switcher": allVaults,
	"go-to-header": allVaults,
	"mood-tracker": [paths.vaults.personal],
	"protect-note": [paths.vaults.personal],
	"restore-selection-and-scroll-position": allVaults,
	"insert-text-modal": allVaults,
	"customize-mobile-navbar": allVaults,
	utils: allVaults,
};

export default defineConfig(({ mode }) => {
	const plugin = mode as Plugin;
	const src = path.join(paths.pluginSrc, plugin);
	const dist = path.join(__dirname, "dist", plugin);

	return {
		plugins: [
			cssInjectedByJs(),
			{
				name: "obsidian-pre-build",
				buildStart() {
					spawn(TCM_EXE, ["src"]);
				},
			},
			{
				name: "obsidian-post-build",
				async closeBundle() {
					await fse.copyFile(
						path.join(src, MANIFEST_FILE),
						path.join(dist, MANIFEST_FILE),
					);

					const vaultPaths = pluginToVault[plugin];
					for (const dir of vaultPaths) {
						await fse.copy(dist, path.join(dir, ".obsidian/plugins", plugin));
					}

					console.info(
						chalk.green(`\n✅ Copied plugin ${chalk.cyan(plugin)} to vaults.`),
					);
					console.info(vaultPaths.join("\n"));
				},
			},
		],
		build: {
			lib: {
				entry: path.join(src, "index.ts"),
				formats: ["cjs"],
				fileName: () => "main.js",
			},
			outDir: dist,
			emptyOutDir: true,
			sourcemap: !isProd,
			minify: isProd,
			rollupOptions: {
				external: ["obsidian", "electron"],
			},
		},
	};
});
