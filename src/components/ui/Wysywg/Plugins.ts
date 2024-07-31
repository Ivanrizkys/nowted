import isUrl from "is-url";
import type { Editor } from "slate";
import CustomEditor from "./Editor";

export const withInlines = (editor: Editor) => {
	const { insertData, insertText, isInline, isElementReadOnly, isSelectable } =
		editor;

	editor.isInline = (element) =>
		["link", "button", "badge"].includes(element.type) || isInline(element);

	editor.isElementReadOnly = (element) =>
		element.type === "badge" || isElementReadOnly(element);

	editor.isSelectable = (element) =>
		element.type !== "badge" && isSelectable(element);

	editor.insertText = (text) => {
		if (text && isUrl(text)) {
			CustomEditor.wrapLink(editor, text);
		} else {
			insertText(text);
		}
	};

	editor.insertData = (data) => {
		const text = data.getData("text/plain");

		if (text && isUrl(text)) {
			CustomEditor.wrapLink(editor, text);
		} else {
			insertData(data);
		}
	};

	return editor;
};

export const withImages = (editor: Editor) => {
	const { insertData, isVoid } = editor;

	editor.isVoid = (element) => {
		return element.type === "image" ? true : isVoid(element);
	};

	editor.insertData = (data) => {
		const text = data.getData("text/plain");
		const { files } = data;

		if (files && files.length > 0) {
			for (const file of files) {
				const reader = new FileReader();
				const [mime] = file.type.split("/");

				if (mime === "image") {
					reader.addEventListener("load", () => {
						const url = reader.result;
						CustomEditor.insertImage(editor, url);
					});

					reader.readAsDataURL(file);
				}
			}
		} else if (CustomEditor.isImageUrl(text)) {
			CustomEditor.insertImage(editor, text);
		} else {
			insertData(data);
		}
	};

	return editor;
};
