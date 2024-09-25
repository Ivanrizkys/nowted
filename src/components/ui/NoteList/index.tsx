import CardNotes, {
	type CardNotesCommonProps,
	type CardNotesData,
} from "@/components/ui/CardNotes";
import type { FoldersDocType, NotesDocType } from "@/config/rxdb";
import { type ElementRef, useEffect, useRef, useState } from "react";
import DraggableList from "react-draggable-list";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useRxCollection, useRxData } from "rxdb-hooks";

const NoteList = () => {
	const [notes, setNotes] = useState<ReadonlyArray<CardNotesData>>([]);

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
		"notes",
		(collection) =>
			collection.find({
				selector: {
					folder_id: folderId,
				},
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

	return (
		<>
			<aside className="bg-primary-100 min-h-dvh py-[30px]">
				<h2 className="text-xl font-semibold px-5">{folder[0]?.name}</h2>
				<div
					ref={listNotesRef}
					className="grid grid-cols-1 gap-5 mt-7 pl-5 pr-[15px] h-[calc(100dvh_-_116px)] overflow-y-auto touch-pan-y | scroll-small"
				>
					{!isFetching && notesData.length > 0 && (
						<DraggableList<CardNotesData, CardNotesCommonProps, CardNotes>
							itemKey={"note_id"}
							template={CardNotes}
							list={notes}
							onMoveEnd={(newList) => onListChange(newList)}
							container={() => listNotesRef.current}
							commonProps={{
								pathNoteId: noteId as string,
								notesCollection: notesCollection,
								navigate: navigate,
							}}
						/>
					)}
				</div>
			</aside>
			<Outlet />
		</>
	);
};

export default NoteList;
