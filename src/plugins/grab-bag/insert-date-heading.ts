import formatDate from "date-fns/format";
import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { getUtils } from "../../utils/obsidian/get-plugin";

const TIME_HEADER = "###";

const getTimeHeaderStr = () =>
	`${TIME_HEADER} ${formatDate(new Date(), "h:mm a")}\n\n\n\n`;

const setAndScrollToCursor = (editor: o.Editor, line: number) => {
	editor.setCursor({ line, ch: 0 });
	editor.scrollTo(0, line - 1);
};

const insertDateAndTimeHeader = (app: o.App, dateStr: string) => {
	const utils = getUtils(app);
	const editor = utils.getEditor(app);
	editor.replaceRange(`# ${dateStr}\n\n${getTimeHeaderStr()}`, {
		line: utils.getFirstLine(editor),
		ch: 0,
	});
	setAndScrollToCursor(editor, 4);
};

const insertTimeHeader = (
	app: o.App,
	headings: o.HeadingCache[],
	dateHeading: o.HeadingCache,
) => {
	const editor = getUtils(app).getEditor(app);
	const dateHeadingIdx = headings.indexOf(dateHeading);
	const nextHeading = headings[dateHeadingIdx + 1];
	const line =
		nextHeading?.level === TIME_HEADER.length
			? nextHeading.position.start.line
			: dateHeading.position.start.line + 2;
	editor.replaceRange(getTimeHeaderStr(), { line, ch: 0 });
	setAndScrollToCursor(editor, line + 2);
};

const insertDateHeading = async ({ app }: o.Plugin) => {
	const dateStr = formatDate(new Date(), "MMM d, yyyy");
	const headings = getUtils(app).getActiveFileMetadata(app)?.headings || [];
	const dateHeading = headings.find((h) => h.level === 1);
	if (dateHeading?.heading !== dateStr) {
		insertDateAndTimeHeader(app, dateStr);
	} else {
		insertTimeHeader(app, headings, dateHeading);
	}
	getUtils(app).getEditor(app).focus();
};

export const addInsertDateHeadingCmd = addCommand(
	"Insert Date Heading",
	insertDateHeading,
);
