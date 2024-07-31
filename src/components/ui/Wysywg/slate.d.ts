import type { BaseEditor } from "slate";
import type { HistoryEditor } from "slate-history";
import type { ReactEditor } from "slate-react";

export type ParagraphElement = { type: "paragraph"; children: CustomText[] };

export type LinkElement = {
	type: "link";
	url: string;
	children: CustomText[];
};

export type ImageElement = {
	type: "image";
	url: string | ArrayBuffer | null;
	children: CustomText[];
};

export type ButtonElement = {
	type: "button";
	children: CustomText[];
};

export type BadgeElement = {
	type: "badge";
	children: CustomText[];
};

export type HeadingElement = {
	type:
		| "heading-one"
		| "heading-two"
		| "heading-three"
		| "heading-four"
		| "heading-five"
		| "heading-six";
	children: CustomText[];
};

export type CustomElement =
	| ParagraphElement
	| HeadingElement
	| LinkElement
	| ButtonElement
	| BadgeElement
	| ImageElement;

export type FormattedText = {
	text: string;
	bold?: true;
	italic?: true;
	underline?: true;
	code?: true;
};

export type CustomText = FormattedText;

declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor & HistoryEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
