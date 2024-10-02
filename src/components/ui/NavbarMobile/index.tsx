import type { FoldersDocType, NotesDocType } from "@/config/rxdb";
import {
	Close,
	Content,
	Overlay,
	Portal,
	Root,
	Trigger,
} from "@radix-ui/react-dialog";
import {
	Archive,
	Folder,
	FolderOpen,
	Menu,
	Sparkles,
	Star,
	Trash,
	Trash2,
	X,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRxData } from "rxdb-hooks";
import {
	NavAddNote,
	NavAddNoteItem,
	NavContent,
	NavGroupItems,
	NavHeader,
	NavItem,
	NavNoteItem,
} from "../Navbar";

const NavbarMobile = () => {
	const [addNoteMode, setAddNoteMode] = useState<boolean>(false);

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

	return (
		<Root>
			<Trigger asChild>
				<button type="button">
					<Menu className="w-8 h-8" />
				</button>
			</Trigger>
			<Portal>
				<Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
				<Content className="fixed z-50 gap-4 bg-primary-200 py-7 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm">
					<Close className="rounded-sm opacity-70  disabled:pointer-events-none block ml-auto text-tertiary-100 mr-5">
						<X className="w-8 h-8" />
						<span className="sr-only">Close</span>
					</Close>
					<div className="grid grid-cols-1 auto-rows-min gap-7">
						<NavHeader />
						<NavAddNote setAddNoteMode={setAddNoteMode} />
						{/* <NavGoogleLogin /> */}
						<NavContent>
							<NavGroupItems title="Recents">
								{addNoteMode && (
									<NavAddNoteItem setAddNoteMode={setAddNoteMode} />
								)}
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
					</div>
				</Content>
			</Portal>
		</Root>
	);
};

export default NavbarMobile;
