import {
	NavAddNote,
	NavAddNoteItem,
	NavContent,
	// NavGoogleLogin,
	NavGroupItems,
	NavHeader,
	NavItem,
	NavNoteItem,
} from "@/components/ui/Navbar";
import type { FoldersDocType, NotesDocType } from "@/config/rxdb";
import { cn } from "@/utils";
import {
	Archive,
	Folder,
	FolderOpen,
	Sparkles,
	Star,
	Trash,
	Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRxData } from "rxdb-hooks";

const Home = () => {
	const [addNoteMode, setAddNoteMode] = useState<boolean>(false);
	const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

	const navigate = useNavigate();
	const location = useLocation();
	const { folderId, noteId } = useParams();

	const { result: folders, isFetching: isFetchingFolders } =
		useRxData<FoldersDocType>("folders", (collection) =>
			collection.find({
				sort: [{ name: "asc" }],
			}),
		);

	const { result: notes, isFetching: isFetchingNotes } =
		useRxData<NotesDocType>("notes", (collection) =>
			collection.find({
				sort: [{ updated_at: "desc" }],
			}),
		);

	useEffect(() => {
		if (
			isFirstTime &&
			location.pathname === "/" &&
			folders &&
			folders.length > 0
		) {
			navigate(`/${folders[0].folder_id}`);
			setIsFirstTime(false);
		}
	}, [folders, isFirstTime, navigate, location]);

	return (
		<main className={cn("grid grid-cols-[300px_350px_1fr]")}>
			<nav className="grid grid-cols-1 auto-rows-min gap-7 py-7">
				<NavHeader />
				<NavAddNote setAddNoteMode={setAddNoteMode} />
				{/* <NavGoogleLogin /> */}
				<NavContent>
					<NavGroupItems title="Recents">
						{addNoteMode && <NavAddNoteItem setAddNoteMode={setAddNoteMode} />}
						{!isFetchingNotes &&
							notes.length > 0 &&
							notes
								.slice(0, 2)
								.map((note) => (
									<NavNoteItem
										key={note?.note_id}
										title={note?.title}
										folderId={note?.folder_id}
										noteId={note?.note_id}
										active={noteId === note?.note_id}
									/>
								))}
					</NavGroupItems>
					<NavGroupItems title="Folders" withAddAction>
						{!isFetchingFolders &&
							folders.length > 0 &&
							folders.map((folder) => (
								<NavItem
									id={folder.folder_id}
									key={folder.folder_id}
									icon={<Folder className="w-5 h-5" />}
									iconActive={<FolderOpen className="w-5 h-5" />}
									title={folder.name}
									active={folderId === folder.folder_id}
								/>
							))}
					</NavGroupItems>
					<NavGroupItems title="More">
						<NavItem
							id="favorites"
							active={folderId === "favorites"}
							icon={<Star className="w-5 h-5" />}
							iconActive={<Sparkles className="w-5 h-5" />}
							title="Favorites"
						/>
						<NavItem
							id="trash"
							active={folderId === "trash"}
							icon={<Trash className="w-5 h-5" />}
							iconActive={<Trash2 className="w-5 h-5" />}
							title="Trash"
						/>
						<NavItem
							id="archived-notes"
							active={folderId === "archived-notes"}
							icon={<Archive className="w-5 h-5" />}
							title="Archived Notes"
						/>
					</NavGroupItems>
				</NavContent>
			</nav>
			<Outlet />
		</main>
	);
};

export default Home;
