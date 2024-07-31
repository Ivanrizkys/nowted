import Calendar from "@/assets/Calendar";
import FolderDisable from "@/assets/FolderDisable";
import { Content, Portal, Root, Trigger } from "@radix-ui/react-dropdown-menu";
import { Archive, CircleEllipsis, Star, Trash } from "lucide-react";
import Wysywg from "../Wysywg";

interface ContentNoteProps {
	title: string;
	date: string;
	folder: string;
	content: string;
}

const ContentNote = ({ title, date, folder }: ContentNoteProps) => {
	return (
		<div className="grid grid-cols-1 gap-7">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold text-3xl">{title}</h2>
				<Root>
					<Trigger asChild>
						<button type="button" className="text-tertiary-100/60">
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
							<button type="button" className="flex items-center gap-4">
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
					<p className="font-semibold text-sm underline">{date}</p>
				</div>
				<div className="w-full h-[1px] bg-tertiary-100/10" />
				<div className="grid grid-cols-[max-content_14%_1fr] items-center auto-cols-min gap-5">
					<FolderDisable variant="sm" />
					<p className="font-semibold text-sm text-tertiary-100/60">Folder</p>
					<p className="font-semibold text-sm underline">{folder}</p>
				</div>
			</div>
			<Wysywg />
		</div>
	);
};

export default ContentNote;
