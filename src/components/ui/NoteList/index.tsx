import CardNotes, {
	type CardNotesCommonProps,
	type CardNotesData,
} from "@/components/ui/CardNotes";
import type { FoldersDocType, NotesDocType } from "@/config/rxdb";
import { type ElementRef, useEffect, useRef, useState } from "react";
import DraggableList from "react-draggable-list";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useRxCollection, useRxData } from "rxdb-hooks";
import { useScreen } from "usehooks-ts";
import EmptyNote from "../EmptyNote";
import NavbarMobile from "../NavbarMobile";

const NoteList = () => {
	const [notes, setNotes] = useState<ReadonlyArray<CardNotesData>>([]);

	const screen = useScreen();
	const listNotesRef = useRef<ElementRef<"div">>(null);

	const navigate = useNavigate();
	const { folderId, noteId } = useParams();
	const notesCollection = useRxCollection<NotesDocType>("notes");

	const { result: folder } = useRxData<FoldersDocType>(
		"folders",
		(collection) =>
			collection.findOne({
				selector: {
					folder_id: folderId,
				},
			}),
	);

	const { result: notesData, isFetching } = useRxData<NotesDocType>(
		folderId
			? folderId === "trash"
				? "trash"
				: folderId === "archived-notes"
					? "archived"
					: "notes"
			: "",
		(collection) =>
			collection.find({
				selector:
					folderId === "trash" || folderId === "archived-notes"
						? undefined
						: folderId === "favorites"
							? {
									isFavorite: true,
								}
							: {
									folder_id: folderId,
								},
				sort: [{ updated_at: "desc" }],
			}),
	);

	const onListChange = (newList: ReadonlyArray<CardNotesData>) => {
		setNotes(newList);
	};

	useEffect(() => {
		if (!isFetching) {
			setNotes(notesData);
		}
	}, [notesData, isFetching]);

	if (isFetching) return null;

	return (
		<>
			{notesData?.length === 0 ? (
				<aside className="w-full min-h-dvh col-span-2 bg-primary-100">
					<EmptyNote />
				</aside>
			) : (
				<>
					<aside className="bg-primary-100 min-h-dvh py-[30px]">
						<div className="block min-[850px]:hidden px-5 mb-5">
							<NavbarMobile />
						</div>
						<h2 className="text-xl font-semibold px-5">
							{folderId
								? folderId === "favorites"
									? "Favorites"
									: folderId === "trash"
										? "Trash"
										: folderId === "archived-notes"
											? "Archived"
											: folder[0]?.name
								: ""}
						</h2>
						<div
							ref={listNotesRef}
							className="grid grid-cols-1 gap-5 mt-7 pl-5 pr-[15px] h-[calc(100dvh_-_116px)] overflow-y-auto touch-pan-y | scroll-small"
						>
							<DraggableList<CardNotesData, CardNotesCommonProps, CardNotes>
								itemKey={"note_id"}
								template={CardNotes}
								list={notes}
								onMoveEnd={(newList) => onListChange(newList)}
								container={() => listNotesRef.current}
								commonProps={{
									pathFolderId: folderId as string,
									pathNoteId: noteId as string,
									notesCollection: notesCollection,
									navigate: navigate,
									screenWidth: screen.width,
								}}
							/>
						</div>
					</aside>
					{screen.width > 850 && <Outlet />}
				</>
			)}
		</>
	);
};

export default NoteList;
