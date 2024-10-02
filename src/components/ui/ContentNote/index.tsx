import Calendar from "@/assets/Calendar";
import FolderDisable from "@/assets/FolderDisable";
import type {
	FoldersDocType,
	NotesDocType,
	OtherNoteDocType,
} from "@/config/rxdb";
import { Content, Portal, Root, Trigger } from "@radix-ui/react-dropdown-menu";
import { animated, useSpring } from "@react-spring/web";
import dayjs from "dayjs";
import {
	Archive,
	ArchiveRestore,
	ArrowLeft,
	CircleEllipsis,
	Star,
	StarOff,
	Trash,
} from "lucide-react";
import { type ElementRef, useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { RxQuery } from "rxdb";
import { useRxCollection, useRxData } from "rxdb-hooks";
import { ulid } from "ulid";
import { useOnClickOutside } from "usehooks-ts";
import RestoreNote from "../RestoreNote";
import Wysywg from "../Wysywg";

const ContentNote = () => {
	const [toogleEditTitle, setToogleEditTitle] = useState<boolean>(false);

	const navigate = useNavigate();
	const { noteId, folderId } = useParams();
	const inputTitleRef = useRef<ElementRef<"input">>(null);
	const notesCollection = useRxCollection<NotesDocType>("notes");
	const trashCollection = useRxCollection<OtherNoteDocType>("trash");
	const archiveCollection = useRxCollection<OtherNoteDocType>("archived");

	const motion = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
	});

	const { result: note, isFetching: isFetchingNote } = useRxData<NotesDocType>(
		folderId
			? folderId === "trash"
				? "trash"
				: folderId === "archived-notes"
					? "archived"
					: "notes"
			: "",
		(collection) =>
			collection.findOne({
				selector: {
					note_id: noteId,
				},
			}),
	);

	const { result: folder, isFetching: isFetchingFolder } =
		useRxData<FoldersDocType>("folders", (collection) =>
			collection.findOne({
				selector: {
					folder_id: note[0]?.folder_id,
				},
			}),
		);

	useOnClickOutside(inputTitleRef, () => {
		setToogleEditTitle(false);
	});

	const handleEditTitle = useCallback(
		async (e: React.KeyboardEvent<HTMLInputElement>) => {
			try {
				if (e.key === "Escape") {
					setToogleEditTitle(false);
					return;
				}
				if (e.key === "Enter") {
					const query = notesCollection?.findOne({
						selector: {
							note_id: noteId,
						},
					});
					await query?.incrementalPatch({
						title: inputTitleRef.current?.value,
					});
					setToogleEditTitle(false);
				}
			} catch (err) {
				import.meta.env.DEV && console.error("Error when edit title", err);
			}
		},
		[notesCollection, noteId],
	);

	const handleFavorite = useCallback(async () => {
		try {
			const query = notesCollection?.findOne({
				selector: {
					note_id: noteId,
				},
			});
			await query?.incrementalPatch({
				isFavorite: !note[0]?.isFavorite,
			});
		} catch (err) {
			import.meta.env.DEV && console.error("Error when add to favorite", err);
		}
	}, [notesCollection, noteId, note]);

	const handleDelete = useCallback(async () => {
		try {
			const tempFolderId = note[0]?.folder_id;
			let query: RxQuery<NotesDocType | OtherNoteDocType> | undefined;
			if (folderId === "archived-notes") {
				query = archiveCollection?.findOne({
					selector: {
						note_id: noteId,
					},
				});
			} else {
				query = notesCollection?.findOne({
					selector: {
						note_id: noteId,
					},
				});
			}
			const deletedNote = await query?.remove();
			await trashCollection?.insert({
				other_note_id: ulid(),
				note_id: deletedNote?.note_id as string,
				folder_id: deletedNote?.folder_id as string,
				title: deletedNote?.title as string,
				content: deletedNote?.content ?? [],
				created_at: deletedNote?.created_at as string,
				updated_at: deletedNote?.updated_at as string,
			});
			navigate(`/${tempFolderId}`);
		} catch (err) {
			import.meta.env.DEV && console.error("Error when delete note", err);
		}
	}, [
		navigate,
		note,
		noteId,
		notesCollection,
		trashCollection,
		folderId,
		archiveCollection,
	]);

	const handleArchive = useCallback(async () => {
		try {
			if (folderId === "archived-notes") {
				const query = archiveCollection?.findOne({
					selector: {
						note_id: noteId,
					},
				});
				const deletedNote = await query?.remove();
				await notesCollection?.insert({
					note_id: deletedNote?.note_id as string,
					folder_id: deletedNote?.folder_id as string,
					title: deletedNote?.title as string,
					content: deletedNote?.content,
					created_at: deletedNote?.created_at as string,
					updated_at: deletedNote?.updated_at as string,
				});
				navigate("/archived-notes");
			} else {
				const tempFolderId = note[0]?.folder_id;
				const query = notesCollection?.findOne({
					selector: {
						note_id: noteId,
					},
				});
				const deletedNote = await query?.remove();
				await archiveCollection?.insert({
					other_note_id: ulid(),
					note_id: deletedNote?.note_id as string,
					folder_id: deletedNote?.folder_id as string,
					title: deletedNote?.title as string,
					content: deletedNote?.content ?? [],
					created_at: deletedNote?.created_at as string,
					updated_at: deletedNote?.updated_at as string,
				});
				navigate(`/${tempFolderId}`);
			}
		} catch (err) {
			import.meta.env.DEV && console.error("Error when archive note", err);
		}
	}, [navigate, note, noteId, notesCollection, archiveCollection, folderId]);

	if (isFetchingNote || isFetchingFolder) return null;

	return (
		<aside className="py-[30px] px-5 min-[850px]:p-[50px] h-dvh overflow-y-auto | scroll-small">
			{folderId === "trash" ? (
				<RestoreNote note={note[0]} />
			) : (
				<animated.div style={{ ...motion }} className="grid grid-cols-1 gap-7">
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="min-[850px]:hidden"
					>
						<ArrowLeft className="w-6 h-6" />
					</button>
					<div className="flex items-center justify-between">
						{toogleEditTitle ? (
							<input
								type="text"
								ref={inputTitleRef}
								onKeyDown={handleEditTitle}
								defaultValue={note[0]?.title}
								className="w-full bg-primary-200 outline-none border-transparent font-semibold text-3xl"
							/>
						) : (
							<h2
								onDoubleClick={() => {
									setToogleEditTitle(true);
									setTimeout(() => {
										inputTitleRef.current?.focus();
									}, 1);
								}}
								className="font-semibold selection:bg-transparent text-3xl"
							>
								{note[0]?.title}
							</h2>
						)}
						<Root>
							<Trigger asChild>
								<button
									type="button"
									className="text-tertiary-100/60 outline-none"
								>
									<CircleEllipsis />
								</button>
							</Trigger>
							<Portal>
								<Content
									sideOffset={12}
									align="end"
									className="w-56 bg-[#333333] p-4 grid grid-cols-1 auto-rows-min gap-5 rounded-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
								>
									<button
										type="button"
										disabled={folderId === "archived-notes"}
										onClick={handleFavorite}
										className="flex items-center disabled:text-tertiary-100/60 gap-4"
									>
										{note[0]?.isFavorite ? (
											<StarOff className="w-5 h-5" />
										) : (
											<Star className="w-5 h-5" />
										)}
										<span className="text-left">
											{note[0]?.isFavorite ? "Remove from" : "Add to"} favorites
										</span>
									</button>
									<button
										type="button"
										onClick={handleArchive}
										className="flex items-center gap-4"
									>
										{folderId === "archived-notes" ? (
											<>
												<ArchiveRestore className="w-5 h-5" />
												<span>Unarchived</span>
											</>
										) : (
											<>
												<Archive className="w-5 h-5" />
												<span>Archived</span>
											</>
										)}
									</button>
									<div className="w-full h-[1px] bg-tertiary-100/5" />
									<button
										type="button"
										onClick={handleDelete}
										className="flex items-center gap-4"
									>
										<Trash className="w-5 h-5" />
										<span>Delete</span>
									</button>
								</Content>
							</Portal>
						</Root>
					</div>
					<div className="grid grid-cols-1 gap-4">
						<div className="grid grid-cols-[max-content_14%_1fr] items-center auto-cols-min gap-5">
							<Calendar />
							<p className="font-semibold text-sm text-tertiary-100/60">Date</p>
							<p className="font-semibold text-sm underline">
								{dayjs(note[0]?.updated_at).format("DD/MM/YYYY")}
							</p>
						</div>
						<div className="w-full h-[1px] bg-tertiary-100/10" />
						<div className="grid grid-cols-[max-content_14%_1fr] items-center auto-cols-min gap-5">
							<FolderDisable variant="sm" />
							<p className="font-semibold text-sm text-tertiary-100/60">
								Folder
							</p>
							<p className="font-semibold text-sm underline">
								{folderId === "favorites"
									? "Favorites"
									: folderId === "trash"
										? "Trash"
										: folderId === "archived-notes"
											? "Archived"
											: folder[0]?.name}
							</p>
						</div>
					</div>
					<Wysywg content={note[0]?.content ?? []} />
				</animated.div>
			)}
		</aside>
	);
};

export default ContentNote;
