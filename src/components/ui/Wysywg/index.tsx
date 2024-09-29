import type { NotesDocType } from "@/config/rxdb";
import { cn } from "@/utils";
import isHotkey from "is-hotkey";
import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useRxCollection } from "rxdb-hooks";
import { type Descendant, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import {
	Editable,
	ReactEditor,
	type RenderElementProps,
	type RenderLeafProps,
	Slate,
	useFocused,
	useSelected,
	useSlateStatic,
	withReact,
} from "slate-react";
import { useDebounceCallback } from "usehooks-ts";
import CustomEditor from "./Editor";
import { withImages, withInlines } from "./Plugins";
import {
	// AddImageButton,
	AddLinkButton,
	MarkButton,
	TypographySelect,
} from "./Toolbar";
import type {
	CustomElement,
	ImageElement as ImageElementType,
	LinkElement,
} from "./slate";

const HOTKEYS = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
	"mod+`": "code",
} as const;

interface WysywgProps {
	content: Descendant[];
}

const ImageElement = ({
	attributes,
	children,
	element,
}: RenderElementProps) => {
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);

	const focused = useFocused();
	const selected = useSelected();

	const imageElement = element as ImageElementType;
	return (
		<div {...attributes}>
			{children}
			<div contentEditable={false} className="relative">
				<img
					alt={imageElement.url as string}
					src={imageElement.url as string}
					className={cn("inline-block max-w-full max-h-[20em] peer")}
				/>
				<button
					type="button"
					onClick={() => {
						Transforms.removeNodes(editor, { at: path });
					}}
					className={cn(
						"absolute top-[.5em] left-[.5em] hidden peer-hover:inline hover:inline",
						selected || (focused && "inline"),
					)}
				>
					<Trash2 className="w-5 h-5 text-red-500" />
				</button>
			</div>
		</div>
	);
};

const Wysywg = ({ content }: WysywgProps) => {
	const [key, setKey] = useState<number>(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const editor = useMemo(
		() => withImages(withInlines(withReact(withHistory(createEditor())))),
		[key],
	);

	const { noteId } = useParams();
	const notesCollection = useRxCollection<NotesDocType>("notes");

	const renderElement = useCallback((props: RenderElementProps) => {
		switch ((props.element as CustomElement).type) {
			case "heading-one":
				return <h1 {...props.attributes}>{props.children}</h1>;
			case "heading-two":
				return <h2 {...props.attributes}>{props.children}</h2>;
			case "heading-three":
				return <h3 {...props.attributes}>{props.children}</h3>;
			case "heading-four":
				return <h4 {...props.attributes}>{props.children}</h4>;
			case "heading-five":
				return <h5 {...props.attributes}>{props.children}</h5>;
			case "heading-six":
				return <h6 {...props.attributes}>{props.children}</h6>;
			case "link":
				return (
					<a {...props.attributes} href={(props.element as LinkElement).url}>
						{props.children}
					</a>
				);
			case "image":
				return <ImageElement {...props} />;
			default:
				return <p {...props.attributes}>{props.children}</p>;
		}
	}, []);

	const renderLeaf = useCallback(
		({ attributes, children, leaf }: RenderLeafProps) => {
			if (leaf.bold) {
				children = <strong>{children}</strong>;
			}

			if (leaf.code) {
				children = <code>{children}</code>;
			}

			if (leaf.italic) {
				children = <em>{children}</em>;
			}

			if (leaf.underline) {
				children = <u>{children}</u>;
			}

			return <span {...attributes}>{children}</span>;
		},
		[],
	);

	const handleUpdateData = useDebounceCallback(async (e: Descendant[]) => {
		const query = notesCollection?.findOne({
			selector: {
				note_id: noteId,
			},
		});
		await query?.incrementalPatch({
			content: e as unknown as undefined,
		});
	}, 500);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setKey((key) => key + 1);
	}, [noteId]);

	return (
		<Slate
			editor={editor}
			onChange={handleUpdateData}
			initialValue={content}
			key={key}
		>
			<div className="flex items-center gap-7 py-3 border-t border-b border-tertiary-100/10">
				<TypographySelect />
				<div className="flex items-center gap-4">
					<MarkButton format="bold" />
					<MarkButton format="underline" />
					<MarkButton format="italic" />
				</div>
				<div className="flex items-center gap-4">
					<AddLinkButton />
					{/* <AddImageButton /> */}
				</div>
			</div>
			<Editable
				spellCheck
				className="outline-none h-full prose max-w-full prose-headings:text-tertiary-100 text-tertiary-100 prose-a:text-blue-600 prose-code:text-tertiary-100 prose-strong:text-tertiary-100 prose-p:mt-0 prose-img:mt-0 prose-headings:mt-0 prose-p:mb-2 prose-img:mb-2"
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				onKeyDown={(event) => {
					for (const hotkey in HOTKEYS) {
						if (isHotkey(hotkey, event)) {
							event.preventDefault();
							const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
							CustomEditor.toogleMark(editor, mark);
						}
					}
				}}
			/>
		</Slate>
	);
};

export default Wysywg;
