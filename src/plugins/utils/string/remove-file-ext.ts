export const removeFileExt = (file: string, ext = "md") =>
	file.replace(new RegExp(`\\.${ext}$`), "");
