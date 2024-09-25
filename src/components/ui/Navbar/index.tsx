import AddFolder from "@/assets/AddFolder";
import GoogleFill from "@/assets/GoogleFill";
import type { FoldersDocType, NotesDocType } from "@/config/rxdb";
import { cn } from "@/utils";
import { useGoogleLogin } from "@react-oauth/google";
import { FileText, Folder, Pen, Plus } from "lucide-react";
import {
	type ElementRef,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import { useRxCollection } from "rxdb-hooks";
import { ulid } from "ulid";
import { useOnClickOutside } from "usehooks-ts";

export interface NavAddNoteProps {
	setAddNoteMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavGroupItemsProps {
	title: string;
	withAddAction?: boolean;
	addIconTitle?: string;
	children: ReactNode;
}

export interface NavNoteItemProps {
	folderId: string;
	noteId: string;
	title: string;
	active?: boolean;
}

export interface NavAddNoteItemProps {
	setAddNoteMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavItemProps {
	id: string;
	title: string;
	icon: ReactNode;
	iconActive?: ReactNode;
	active?: boolean;
}

export interface NavContentProps {
	children: ReactNode;
}

const NavHeader = () => {
	return (
		<div className="flex gap-2 items-start text-tertiary-100 px-5">
			<h1 className="text-2xl font-kaushan-script">Nowted</h1>
			<Pen className="w-[15px] h-[15px]" />
		</div>
	);
};

const NavAddNote = ({ setAddNoteMode }: NavAddNoteProps) => {
	return (
		<div className="px-5">
			<button
				onClick={() => setAddNoteMode(true)}
				type="button"
				className="p-2 bg-tertiary-100/[.03] hover:bg-tertiary-100/10 duration-300 transition-colors rounded flex items-center justify-center gap-2 font-semibold text-tertiary-100 w-full"
			>
				<Plus className="w-5 h-5" />
				<span>New Note</span>
			</button>
		</div>
	);
};

const NavGoogleLogin = () => {
	const googleLogin = useGoogleLogin({
		// onSuccess: async ({ code }) => {
		// 	console.log("codenya adalah", code);
		// },
		flow: "auth-code",
	});

	return (
		<div className="px-5">
			<button
				type="button"
				onClick={() => googleLogin()}
				className="p-2 bg-tertiary-100/[.03] hover:bg-tertiary-100/10 duration-300 transition-colors rounded flex items-center justify-center gap-2 font-semibold text-tertiary-100 w-full"
			>
				<GoogleFill />
				<span>Sign In With Google</span>
			</button>
		</div>
	);
};

const NavGroupItems = ({
	title,
	withAddAction,
	addIconTitle,
	children,
}: NavGroupItemsProps) => {
	const [addMode, setAddMode] = useState<boolean>(false);
	const [folderName, setFolderName] = useState<string>("");

	const inputAddRef = useRef<ElementRef<"input">>(null);
	const elementAddNoteRef = useRef<ElementRef<"div">>(null);

	const foldersCollection = useRxCollection<FoldersDocType>("folders");

	useOnClickOutside(elementAddNoteRef, () => {
		setFolderName("");
		setAddMode(false);
	});

	const handleKeydown = useCallback(
		async (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Escape") {
				setFolderName("");
				setAddMode(false);
				return;
			}
			if (e.key === "Enter") {
				const now = new Date();
				try {
					await foldersCollection?.insert({
						folder_id: ulid(),
						name: folderName,
						created_at: now.toISOString(),
						updated_at: now.toISOString(),
					});
					setFolderName("");
					setAddMode(false);
				} catch (err) {
					import.meta.env.DEV &&
						console.error("error when inserting a new folder", err);
				}
			}
		},
		[folderName, foldersCollection],
	);

	return (
		<div>
			<div className="flex items-center justify-between px-5">
				<h2 className="text-tertiary-100/60 text-sm font-semibold">{title}</h2>
				{withAddAction && (
					<button
						type="button"
						onClick={() => {
							setAddMode(true);
							setTimeout(() => {
								inputAddRef.current?.focus();
							}, 10);
						}}
					>
						<AddFolder title={addIconTitle} />
					</button>
				)}
			</div>
			<div className="mt-2 grid grid-cols-1 gap-1">
				{addMode && (
					<div
						ref={elementAddNoteRef}
						className={cn(
							"py-[10px] px-5 flex items-center gap-4 transition-colors duration bg-primary-200 text-tertiary-100",
						)}
					>
						<Folder className="w-5 h-5" />
						<input
							ref={inputAddRef}
							value={folderName}
							onKeyDown={handleKeydown}
							onChange={(e) => setFolderName(e.target.value)}
							type="text"
							className="font-semibold outline-none bg-none w-full bg-primary-200"
						/>
					</div>
				)}
				{children}
			</div>
		</div>
	);
};

const NavNoteItem = ({ title, active, folderId, noteId }: NavNoteItemProps) => {
	return (
		<Link
			to={`${folderId}/${noteId}`}
			data-active={active ? "true" : "false"}
			className={cn(
				"py-[10px] px-5 flex items-center gap-4 transition-colors duration bg-primary-200 data-[active=true]:bg-secondary-100 data-[active=false]:hover:bg-tertiary-100/[.03] text-tertiary-100/60 data-[active=true]:text-tertiary-100",
			)}
		>
			<FileText className="w-5 h-5" />
			<h3 className="font-semibold">{title}</h3>
		</Link>
	);
};

const NavAddNoteItem = ({ setAddNoteMode }: NavAddNoteItemProps) => {
	const [noteName, setNoteName] = useState<string>("");
	const inputRef = useRef<ElementRef<"input">>(null);

	const { folderId } = useParams();

	const notesCollection = useRxCollection<NotesDocType>("notes");

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useOnClickOutside(inputRef, () => {
		setNoteName("");
		setAddNoteMode(false);
	});

	const handleKeydown = useCallback(
		async (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Escape") {
				setNoteName("");
				setAddNoteMode(false);
				return;
			}
			if (e.key === "Enter") {
				try {
					if (folderId) {
						const now = new Date();
						await notesCollection?.insert({
							note_id: ulid(),
							folder_id: folderId,
							title: noteName,
							created_at: now.toISOString(),
							updated_at: now.toISOString(),
						});
					}
					setNoteName("");
					setAddNoteMode(false);
				} catch (err) {
					import.meta.env.DEV &&
						console.error("error when inserting a new note", err);
				}
			}
		},
		[setAddNoteMode, folderId, notesCollection, noteName],
	);

	return (
		<button
			type="button"
			className={cn(
				"py-[10px] px-5 flex items-center gap-4 bg-primary-200 text-tertiary-100",
			)}
		>
			<FileText className="w-5 h-5" />
			<input
				type="text"
				value={noteName}
				ref={inputRef}
				onKeyDown={handleKeydown}
				onChange={(e) => setNoteName(e.target.value)}
				className="font-semibold outline-none bg-none w-full bg-primary-200"
			/>
		</button>
	);
};

const NavItem = ({ id, title, icon, active, iconActive }: NavItemProps) => {
	return (
		<Link
			to={`/${id}`}
			data-active={active ? "true" : "false"}
			className={cn(
				"py-[10px] px-5 flex items-center gap-4 transition-colors duration bg-primary-200 data-[active=true]:bg-tertiary-100/[.03] hover:bg-tertiary-100/[.03] text-tertiary-100/60 data-[active=true]:text-tertiary-100",
			)}
		>
			{active ? <>{iconActive ? iconActive : icon}</> : icon}
			<h3 className="font-semibold">{title}</h3>
		</Link>
	);
};

const NavContent = ({ children }: NavContentProps) => {
	return (
		<div className="grid grid-cols-1 auto-rows-min gap-7 w-full h-[calc(100dvh_-_192px)] overflow-y-auto | scroll-small">
			{children}
		</div>
	);
};

export {
	NavHeader,
	NavAddNote,
	NavGroupItems,
	NavNoteItem,
	NavAddNoteItem,
	NavItem,
	NavContent,
	NavGoogleLogin,
};
