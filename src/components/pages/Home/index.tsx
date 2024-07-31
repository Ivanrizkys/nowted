import CardNotes, { type CardNotesData } from "@/components/ui/CardNotes";
import ContentNote from "@/components/ui/ContentNote";
import {
	NavAddNote,
	NavContent,
	NavGroupItems,
	NavHeader,
	NavItem,
	NavNoteItem,
} from "@/components/ui/Navbar";
import Notes from "@/dummy/notes";
import { Archive, Folder, FolderOpen, Star, Trash } from "lucide-react";
import { type ElementRef, useRef, useState } from "react";
import DraggableList from "react-draggable-list";

const Home = () => {
	const [notes, setNotes] = useState<ReadonlyArray<CardNotesData>>(Notes);

	const listNotesRef = useRef<ElementRef<"div">>(null);

	const onListChange = (newList: ReadonlyArray<CardNotesData>) => {
		setNotes(newList);
	};

	return (
		<main className="grid grid-cols-[300px_350px_1fr]">
			<nav className="grid grid-cols-1 auto-rows-min gap-7 py-7">
				<NavHeader />
				<NavAddNote />
				<NavContent>
					<NavGroupItems title="Recents">
						<NavNoteItem active title="Reflection on the Month of June" />
						<NavNoteItem title="Project proposal" />
						<NavNoteItem title="Travel itinerary" />
					</NavGroupItems>
					<NavGroupItems title="Folders">
						<NavItem
							icon={<Folder className="w-5 h-5" />}
							iconActive={<FolderOpen className="w-5 h-5" />}
							title="Personal"
							active
						/>
						<NavItem
							icon={<Folder className="w-5 h-5" />}
							iconActive={<FolderOpen className="w-5 h-5" />}
							title="Work"
						/>
						<NavItem
							icon={<Folder className="w-5 h-5" />}
							iconActive={<FolderOpen className="w-5 h-5" />}
							title="Travel"
						/>
						<NavItem
							icon={<Folder className="w-5 h-5" />}
							iconActive={<FolderOpen className="w-5 h-5" />}
							title="Events"
						/>
						<NavItem
							icon={<Folder className="w-5 h-5" />}
							iconActive={<FolderOpen className="w-5 h-5" />}
							title="Finances"
						/>
					</NavGroupItems>
					<NavGroupItems title="More">
						<NavItem icon={<Star className="w-5 h-5" />} title="Favorites" />
						<NavItem icon={<Trash className="w-5 h-5" />} title="Trash" />
						<NavItem
							icon={<Archive className="w-5 h-5" />}
							iconActive={<FolderOpen className="w-5 h-5" />}
							title="Archived Notes"
						/>
					</NavGroupItems>
				</NavContent>
			</nav>
			<aside className="bg-primary-100 min-h-dvh py-[30px]">
				<h2 className="text-xl font-semibold px-5">Personal</h2>
				<div
					ref={listNotesRef}
					className="grid grid-cols-1 gap-5 mt-7 pl-5 pr-[15px] h-[calc(100dvh_-_116px)] overflow-y-auto touch-pan-y | scroll-small"
				>
					<DraggableList<CardNotesData, void, CardNotes>
						itemKey={"id"}
						template={CardNotes}
						list={notes}
						onMoveEnd={(newList) => onListChange(newList)}
						container={() => listNotesRef.current}
					/>
				</div>
			</aside>
			<aside className="p-[50px]">
				<ContentNote
					title={"Reflection on the Month of June"}
					date={"21/06/2022"}
					folder={"Personal"}
					content={"test dulu"}
				/>
			</aside>
		</main>
	);
};

export default Home;
