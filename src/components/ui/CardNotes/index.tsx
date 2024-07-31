import { cn } from "@/utils";
import { Ellipsis } from "lucide-react";
import { Component } from "react";
import type { TemplateProps } from "react-draggable-list";

export interface CardNotesData {
	id: number;
	title: string;
	date: string;
	headline: string;
}

export interface CardNotesProps extends TemplateProps<CardNotesData, void> {
	className?: string;
}

class CardNotes extends Component<CardNotesProps> {
	render() {
		const { className, dragHandleProps, item } = this.props;

		return (
			<article
				className={cn(
					"grid grid-cols-1 gap-2 rounded-sm transition-colors duration-300 p-5 relative group max-h-full backdrop-blur-md transform-gpu",
					item.title === "i"
						? "bg-white/10"
						: "bg-white/[.03] hover:bg-white/10",
					className,
				)}
			>
				<h3 className="text-lg font-semibold text-tertiary-100">
					{item.title}
				</h3>
				<div className="flex items-center gap-2 text-base">
					<p className="text-tertiary-100/40 text-nowrap">{item.date}</p>
					<p className="text-tertiary-100/60 line-clamp-1">{item.headline}</p>
				</div>
				<button
					{...dragHandleProps}
					type="button"
					className="text-tertiary-100 absolute top-2 right-5 opacity-0 group-hover:opacity-100 duration-500 transition-opacity"
				>
					<Ellipsis xlinkTitle="Drag" />
				</button>
			</article>
		);
	}
}

export default CardNotes;
