import imageExtensions from "image-extensions";
import isUrl from "is-url";
import { Editor, Element, Range, Transforms } from "slate";
import type {
	CustomElement,
	FormattedText,
	ImageElement,
	LinkElement,
} from "./slate";

const CustomEditor = {
	// * active toogle state
	isMarkActive(editor: Editor, format: keyof Omit<FormattedText, "text">) {
		const marks: Omit<FormattedText, "text"> | null = Editor.marks(editor);
		return marks ? marks[format] === true : false;
	},
	isBlockActive(editor: Editor, format: CustomElement["type"]) {
		const [match] = Editor.nodes(editor, {
			match: (n) => Element.isElement(n) && n.type === format,
		});
		return !!match;
	},
	isLinkActive(editor: Editor) {
		const [link] = Editor.nodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
		});

		return !!link;
	},

	// * toogle handler
	toogleMark(editor: Editor, format: keyof Omit<FormattedText, "text">) {
		const isActive = this.isMarkActive(editor, format);

		if (isActive) {
			Editor.removeMark(editor, format);
		} else {
			Editor.addMark(editor, format, true);
		}
	},
	toogleBlock(editor: Editor, format: CustomElement["type"]) {
		const active = this.isBlockActive(editor, format);

		Transforms.setNodes(
			editor,
			{ type: active ? "paragraph" : format },
			{
				match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
			},
		);
	},

	// * utilities editor
	unWrapLink(editor: Editor) {
		Transforms.unwrapNodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
		});
	},
	wrapLink(editor: Editor, url: string) {
		if (this.isLinkActive(editor)) {
			this.unWrapLink(editor);
		}

		const { selection } = editor;
		const isCollapsed = selection && Range.isCollapsed(selection);
		const link: LinkElement = {
			type: "link",
			url,
			children: isCollapsed ? [{ text: url }] : [],
		};

		if (isCollapsed) {
			Transforms.insertNodes(editor, link);
		} else {
			Transforms.wrapNodes(editor, link, { split: true });
			Transforms.collapse(editor, { edge: "end" });
		}
	},
	insertLink(editor: Editor, url: string) {
		if (editor.selection) {
			this.wrapLink(editor, url);
		}
	},
	insertImage(editor: Editor, url: string | ArrayBuffer | null) {
		const text = { text: "" };
		const image: ImageElement = { type: "image", url, children: [text] };
		Transforms.insertNodes(editor, image);
		Transforms.insertNodes(editor, {
			type: "paragraph",
			children: [{ text: "" }],
		});
	},
	isImageUrl(url: string | ArrayBuffer | null) {
		if (!url) return false;
		if (!isUrl(url as string)) return false;
		const ext = new URL(url as string).pathname.split(".").pop();
		return imageExtensions.includes(ext as string);
	},
};

export default CustomEditor;
