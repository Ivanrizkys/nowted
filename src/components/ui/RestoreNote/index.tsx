import type { NotesDocType, OtherNoteDocType } from "@/config/rxdb";
import { animated, useSpring } from "@react-spring/web";
import { History } from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { RxDocument } from "rxdb";
import { useRxCollection } from "rxdb-hooks";
import { ulid } from "ulid";

interface RestoreNoteProps {
	note: RxDocument<NotesDocType>;
}

const RestoreNote = ({ note }: RestoreNoteProps) => {
	const navigate = useNavigate();
	const notesCollection = useRxCollection<NotesDocType>("notes");
	const trashCollection = useRxCollection<OtherNoteDocType>("trash");

	const motion = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
	});

	const handleRestoreNote = useCallback(async () => {
		try {
			const newNoteId = ulid();
			await notesCollection?.insert({
				note_id: newNoteId,
				folder_id: note?.folder_id,
				title: note?.title,
				content: note?.content,
				created_at: note?.created_at,
				updated_at: note?.updated_at,
			});
			const query = trashCollection?.findOne({
				selector: {
					note_id: note?.note_id,
				},
			});
			await query?.remove();
			navigate(`/${note?.folder_id}/${newNoteId}`);
		} catch (err) {
			import.meta.env.DEV && console.error("Error when restore note", err);
		}
	}, [note, navigate, notesCollection, trashCollection]);

	return (
		<animated.div
			style={{ ...motion }}
			className="h-full flex flex-col items-center justify-center gap-4 text-center p-12"
		>
			<History className="w-[53px] h-[66px]" />
			<h2 className="font-semibold text-3xl">Restore “{note?.title}”</h2>
			<p className="w-full max-w-[460px] text-tertiary-100/60">
				Don't want to lose this note? It's not too late! Just click the
				'Restore' button and it will be added back to your list. It's that
				simple.
			</p>
			<button
				type="button"
				onClick={handleRestoreNote}
				className="bg-secondary-100 hover:opacity-70 transition-opacity duration-300 rounded-md py-2 px-7"
			>
				Restore
			</button>
		</animated.div>
	);
};

export default RestoreNote;
