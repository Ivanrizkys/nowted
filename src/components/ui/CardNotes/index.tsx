import type { NotesDocType } from "@/config/rxdb";
import { cn } from "@/utils";
import { Portal, Root, Trigger } from "@radix-ui/react-context-menu";
import dayjs from "dayjs";
import { Ellipsis } from "lucide-react";
import { Component } from "react";
import type { TemplateProps } from "react-draggable-list";
import { Link, type NavigateFunction } from "react-router-dom";
import type { RxCollection } from "rxdb";
import { Node } from "slate";
import type { Editor } from "slate";

export interface CardNotesCommonProps {
	pathFolderId: string;
	pathNoteId: string;
	notesCollection: RxCollection<NotesDocType> | null;
	navigate: NavigateFunction;
}

export interface CardNotesData {
	note_id: string;
	folder_id: string;
	title: string;
	created_at: string;
	updated_at: string;
	content?: Editor[];
}

export interface CardNotesProps
	extends TemplateProps<CardNotesData, CardNotesCommonProps> {
	className?: string;
}

class CardNotes extends Component<CardNotesProps> {
	handleDeleteNote = async () => {
		try {
			const tempFolderId = this.props.item.folder_id;
			const query = this.props.commonProps.notesCollection?.findOne({
				selector: {
					note_id: this.props.item.note_id,
				},
			});
			await query?.remove();
			this.props.commonProps.navigate(`/${tempFolderId}`);
		} catch (err) {
			import.meta.env.DEV && console.error("error when delete note", err);
		}
	};

	render() {
		const { className, dragHandleProps, item, commonProps } = this.props;

		return (
			<Root>
				<Trigger asChild>
					<Link
						to={`/${commonProps.pathFolderId === "trash" ? "trash" : commonProps.pathFolderId === "archived-notes" ? "archived-notes" : item?.folder_id}/${item?.note_id}`}
						className={cn(
							"grid grid-cols-1 gap-2 rounded-sm transition-colors duration-300 p-5 relative group max-h-full backdrop-blur-md transform-gpu cursor-default",
							item?.note_id === commonProps?.pathNoteId
								? "bg-white/10"
								: "bg-white/[.03] hover:bg-white/10",
							className,
						)}
					>
						<h3 className="text-lg font-semibold text-tertiary-100">
							{item?.title}
						</h3>
						<div className="flex items-center gap-2 text-base">
							<p className="text-tertiary-100/40 text-nowrap">
								{dayjs(item?.updated_at).format("DD/MM/YYYY")}
							</p>
							{item?.content && (
								<p className="text-tertiary-100/60 line-clamp-1">
									{item?.content?.map((n) => Node.string(n)).join("\n")}
								</p>
							)}
						</div>
						<button
							{...dragHandleProps}
							type="button"
							className="text-tertiary-100 absolute top-2 right-5 opacity-0 group-hover:opacity-100 duration-500 transition-opacity"
						>
							<Ellipsis xlinkTitle="Drag" />
						</button>
					</Link>
				</Trigger>
				<Portal>
					{/* <Content className="w-52 bg-[#333333] p-4 grid grid-cols-1 auto-rows-min gap-5 rounded-md z-10 animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
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
							onClick={this.handleDeleteNote}
							className="flex items-center gap-4"
						>
							<Trash className="w-5 h-5" />
							<span>Delete</span>
						</button>
					</Content> */}
				</Portal>
			</Root>
		);
	}
}

export default CardNotes;
