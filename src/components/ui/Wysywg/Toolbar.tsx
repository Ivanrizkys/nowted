import ArrowDown from "@/assets/ArrowDown";
import Bold from "@/assets/Bold";
import Image from "@/assets/Image";
import Italic from "@/assets/Italic";
import Link from "@/assets/Link";
import Underline from "@/assets/Underline";
import API from "@/config/wretch";
import type { DefaultMeta, Response } from "@/dtos";
import type { ImageUploadRes } from "@/dtos/note";
import * as Select from "@radix-ui/react-select";
import { ImagePlus, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSlate } from "slate-react";
import FormDataAddon from "wretch/addons/formData";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../Dialog";
import { Input } from "../Input";
import CustomEditor from "./Editor";
import type { CustomElement, FormattedText } from "./slate";

interface MarkButtonProps {
	format: keyof Omit<FormattedText, "text">;
}

interface BlockButtonProps {
	format: CustomElement["type"];
}

const MarkButton = ({ format }: MarkButtonProps) => {
	const editor = useSlate();
	return (
		<button
			type="button"
			data-active={CustomEditor.isMarkActive(editor, format) ? "true" : "false"}
			onClick={(e) => {
				e.preventDefault();
				CustomEditor.toogleMark(editor, format);
			}}
			className="p-[1px] rounded-sm data-[active=true]:bg-tertiary-100 data-[active=true]:text-primary-100 text-tertiary-100 transition-colors duration-300"
		>
			{format === "bold" && <Bold />}
			{format === "italic" && <Italic />}
			{format === "underline" && <Underline />}
		</button>
	);
};

const BlockButton = ({ format }: BlockButtonProps) => {
	const editor = useSlate();
	return (
		<button
			type="button"
			data-active={
				CustomEditor.isBlockActive(editor, format) ? "true" : "false"
			}
			onClick={(e) => {
				e.preventDefault();
				CustomEditor.toogleBlock(editor, format);
			}}
			className="p-[1px] rounded-sm data-[active=true]:bg-tertiary-100 data-[active=true]:text-primary-100 text-tertiary-100 transition-colors duration-300"
		>
			Heading One
		</button>
	);
};

export const TypographySelect = () => {
	const editor = useSlate();

	return (
		<Select.Root
			onValueChange={(value) => {
				CustomEditor.toogleBlock(editor, value as CustomElement["type"]);
			}}
		>
			<Select.Trigger asChild>
				<button type="button" className="flex items-center gap-7 outline-none">
					Select Format
					<ArrowDown />
				</button>
			</Select.Trigger>
			<Select.Portal>
				<Select.Content
					position="popper"
					side="bottom"
					className="w-radix-select-width shadow-md bg-primary-100 mt-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
				>
					<Select.Viewport>
						<Select.Item
							data-active={
								CustomEditor.isBlockActive(editor, "heading-one")
									? "true"
									: "false"
							}
							className="outline-none border-none cursor-pointer hover:bg-tertiary-100/10 data-[active=true]:bg-tertiary-100/10 transition-colors duration-200 px-2 py-1"
							value="heading-one"
						>
							<Select.ItemText>Heading 1</Select.ItemText>
						</Select.Item>
						<Select.Item
							data-active={
								CustomEditor.isBlockActive(editor, "heading-two")
									? "true"
									: "false"
							}
							className="outline-none border-none cursor-pointer hover:bg-tertiary-100/10 data-[active=true]:bg-tertiary-100/10 transition-colors duration-200 px-2 py-1"
							value="heading-two"
						>
							<Select.ItemText>Heading 2</Select.ItemText>
						</Select.Item>
						<Select.Item
							data-active={
								CustomEditor.isBlockActive(editor, "heading-three")
									? "true"
									: "false"
							}
							className="outline-none border-none cursor-pointer hover:bg-tertiary-100/10 data-[active=true]:bg-tertiary-100/10 transition-colors duration-200 px-2 py-1"
							value="heading-three"
						>
							<Select.ItemText>Heading 3</Select.ItemText>
						</Select.Item>
						<Select.Item
							data-active={
								CustomEditor.isBlockActive(editor, "heading-four")
									? "true"
									: "false"
							}
							className="outline-none border-none cursor-pointer hover:bg-tertiary-100/10 data-[active=true]:bg-tertiary-100/10 transition-colors duration-200 px-2 py-1"
							value="heading-four"
						>
							<Select.ItemText>Heading 4</Select.ItemText>
						</Select.Item>
						<Select.Item
							data-active={
								CustomEditor.isBlockActive(editor, "heading-five")
									? "true"
									: "false"
							}
							className="outline-none border-none cursor-pointer hover:bg-tertiary-100/10 data-[active=true]:bg-tertiary-100/10 transition-colors duration-200 px-2 py-1"
							value="heading-five"
						>
							<Select.ItemText>Heading 5</Select.ItemText>
						</Select.Item>
						<Select.Item
							data-active={
								CustomEditor.isBlockActive(editor, "heading-six")
									? "true"
									: "false"
							}
							className="outline-none border-none cursor-pointer hover:bg-tertiary-100/10 data-[active=true]:bg-tertiary-100/10 transition-colors duration-200 px-2 py-1"
							value="heading-six"
						>
							<Select.ItemText>Heading 6</Select.ItemText>
						</Select.Item>
						<Select.Item
							data-active={
								CustomEditor.isBlockActive(editor, "paragraph")
									? "true"
									: "false"
							}
							className="outline-none border-none cursor-pointer hover:bg-tertiary-100/10 data-[active=true]:bg-tertiary-100/10 transition-colors duration-200 px-2 py-1"
							value="paragraph"
						>
							<Select.ItemText>Paragraph</Select.ItemText>
						</Select.Item>
					</Select.Viewport>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
};

const AddLinkButton = () => {
	const editor = useSlate();
	const [url, setUrl] = useState("");
	const [openModal, setOpenModal] = useState(false);

	const onOpenChange = useCallback((open: boolean) => {
		if (!open) setUrl("");
		setOpenModal(open);
	}, []);

	return (
		<Dialog open={openModal} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<button
					onClick={() => setOpenModal(true)}
					type="button"
					data-active={CustomEditor.isLinkActive(editor) ? "true" : "false"}
					className="p-[1px] rounded-sm data-[active=true]:bg-tertiary-100 data-[active=true]:text-primary-100 text-tertiary-100 transition-colors duration-300 outline-none"
				>
					<Link title="Insert Link" />
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Insert Link</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (!url) return;
						CustomEditor.insertLink(editor, url);
						setOpenModal(false);
					}}
				>
					<Input
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						name="link"
						placeholder="Insert your link here .."
						className="w-full"
					/>
					<button
						type="submit"
						className="mt-4 ml-auto block rounded-md font-semibold py-1 px-3 hover:bg-tertiary-100 hover:text-primary-200 duration-300 transition-colors"
					>
						Insert
					</button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export const AddImageButton = () => {
	const editor = useSlate();
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const onOpenChange = useCallback((open: boolean) => {
		// if (!open) setUrl("");
		setOpenModal(open);
		if (!open) {
			setUrl("");
			setLoading(false);
		}
	}, []);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setLoading(true);
		const body = {
			image: acceptedFiles[0],
		};
		API.addon(FormDataAddon)
			.formData(body)
			.url("/note/image-upload")
			.post()
			.json((res: Response<ImageUploadRes, DefaultMeta>) => {
				setUrl(res.data.image_url);
				setLoading(false);
			})
			.catch((err) => {
				import.meta.env.DEV && console.error("error when uploading image", err);
				setLoading(false);
			});
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			"image/png": [".png"],
			"image/webp": [".webp"],
			"image/jpeg": [".jpeg", ".jpg"],
		},
		multiple: false,
	});

	return (
		<Dialog open={openModal} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<button
					type="button"
					onMouseDown={(event) => {
						event.preventDefault();
						// const url = window.prompt("Enter the URL of the image:");
						// if (url && !CustomEditor.isImageUrl(url)) {
						// 	alert("URL is not an image");
						// 	return;
						// }
						// url && CustomEditor.insertImage(editor, url);
						setOpenModal(true);
					}}
					className="p-[1px] rounded-sm data-[active=true]:bg-tertiary-100 data-[active=true]:text-primary-100 text-tertiary-100 transition-colors duration-300 outline-none"
				>
					<Image title="Insert Image" />
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Insert Image</DialogTitle>
				</DialogHeader>
				{!url ? (
					<div
						{...getRootProps()}
						className="w-full h-40 border border-dashed border-tertiary-100 rounded-md flex items-center justify-center"
					>
						{!loading ? (
							<>
								<input {...getInputProps()} className="outline-none" />
								<ImagePlus className="w-9 h-9 text-tertiary-100/50" />
							</>
						) : (
							<div className="text-tertiary-100/50">
								<Loader2 className="w-9 h-9 animate-spin block mx-auto" />
								<p className="text-sm text-center">Uploading ...</p>
							</div>
						)}
					</div>
				) : (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							CustomEditor.insertImage(editor, url);
							setOpenModal(false);
						}}
					>
						<Input
							value={url}
							disabled
							name="link"
							placeholder="Insert your link here .."
							className="w-full"
						/>
						<button
							className="mt-4 block ml-auto rounded-md font-semibold py-1 px-3 hover:bg-tertiary-100 hover:text-primary-200 duration-300 transition-colors"
							type="submit"
						>
							Insert
						</button>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
};

export { MarkButton, BlockButton, AddLinkButton };
