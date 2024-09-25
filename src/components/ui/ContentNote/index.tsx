import Calendar from "@/assets/Calendar";
import FolderDisable from "@/assets/FolderDisable";
import type { FoldersDocType, NotesDocType } from "@/config/rxdb";
import { Content, Portal, Root, Trigger } from "@radix-ui/react-dropdown-menu";
import dayjs from "dayjs";
import { Archive, CircleEllipsis, Star, Trash } from "lucide-react";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRxCollection, useRxData } from "rxdb-hooks";
import type { Descendant } from "slate";
import Wysywg from "../Wysywg";

const ContentNote = () => {
	const navigate = useNavigate();
	const { noteId } = useParams();
	const notesCollection = useRxCollection<NotesDocType>("notes");

	const { result: note, isFetching: isFetchingNote } = useRxData<NotesDocType>(
		"notes",
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

	const handleDeleteNote = useCallback(async () => {
		try {
			const tempFolderId = note[0]?.folder_id;
			const query = notesCollection?.findOne({
				selector: {
					note_id: noteId,
				},
			});
			await query?.remove();
			navigate(`/${tempFolderId}`);
		} catch (err) {
			import.meta.env.DEV && console.error("Error when delete note", err);
		}
	}, [navigate, note, noteId, notesCollection]);

	if (isFetchingNote || isFetchingFolder) return null;

	return (
		<aside className="p-[50px] h-dvh overflow-y-auto | scroll-small">
			<div className="grid grid-cols-1 gap-7">
				<div className="flex items-center justify-between">
					<h2 className="font-semibold text-3xl">{note[0]?.title}</h2>
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
								className="w-52 bg-[#333333] p-4 grid grid-cols-1 auto-rows-min gap-5 rounded-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
							>
								<button type="button" className="flex items-center gap-4">
									<Star className="w-5 h-5" />
									<span>Add to favorites</span>
								</button>
								<button type="button" className="flex items-center gap-4">
									<Archive className="w-5 h-5" />
									<span>Archived</span>
								</button>
								<div className="w-full h-[1px] bg-tertiary-100/5" />
								<button
									type="button"
									onClick={handleDeleteNote}
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
						<p className="font-semibold text-sm text-tertiary-100/60">Folder</p>
						<p className="font-semibold text-sm underline">{folder[0]?.name}</p>
					</div>
				</div>
				<Wysywg content={note[0]?.content as unknown as Descendant[]} />
			</div>
		</aside>
	);
};

export default ContentNote;
