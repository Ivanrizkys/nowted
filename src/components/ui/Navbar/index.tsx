import AddFolder from "@/assets/AddFolder";
import { cn } from "@/utils";
import { FileText, Pen, Plus } from "lucide-react";
import type { ReactNode } from "react";

export interface NavGroupItemsProps {
	title: string;
	withAddAction?: boolean;
	addIconTitle?: string;
	children: ReactNode;
}

export interface NavNoteItemProps {
	title: string;
	active?: boolean;
}

export interface NavItemProps {
	title: string;
	icon: ReactNode;
	iconActive?: ReactNode;
	active?: boolean;
}

export interface NavContentProps {
	children: ReactNode;
}

const NavHeader = () => {
	return (
		<div className="flex gap-2 items-start text-tertiary-100 px-5">
			<h1 className="text-2xl font-kaushan-script">Nowted</h1>
			<Pen className="w-[15px] h-[15px]" />
		</div>
	);
};

const NavAddNote = () => {
	return (
		<div className="px-5">
			<button
				type="button"
				className="p-2 bg-tertiary-100/[.03] hover:bg-tertiary-100/10 duration-300 transition-colors rounded flex items-center justify-center gap-2 font-semibold text-tertiary-100 w-full"
			>
				<Plus className="w-5 h-5" />
				<span>New Note</span>
			</button>
		</div>
	);
};

const NavGroupItems = ({
	title,
	withAddAction,
	addIconTitle,
	children,
}: NavGroupItemsProps) => {
	return (
		<div>
			<div className="flex items-center justify-between px-5">
				<h2 className="text-tertiary-100/60 text-sm font-semibold">{title}</h2>
				{withAddAction && (
					<button type="button">
						<AddFolder title={addIconTitle} />
					</button>
				)}
			</div>
			<div className="mt-2 grid grid-cols-1 gap-1">{children}</div>
		</div>
	);
};

const NavNoteItem = ({ title, active }: NavNoteItemProps) => {
	return (
		<button
			type="button"
			data-active={active ? "true" : "false"}
			className={cn(
				"py-[10px] px-5 flex items-center gap-4 transition-colors duration bg-primary-200 data-[active=true]:bg-secondary-100 data-[active=false]:hover:bg-tertiary-100/[.03] text-tertiary-100/60 data-[active=true]:text-tertiary-100",
			)}
		>
			<FileText className="w-5 h-5" />
			<h3 className="font-semibold">{title}</h3>
		</button>
	);
};

const NavItem = ({ title, icon, active, iconActive }: NavItemProps) => {
	return (
		<button
			type="button"
			data-active={active ? "true" : "false"}
			className={cn(
				"py-[10px] px-5 flex items-center gap-4 transition-colors duration bg-primary-200 data-[active=true]:bg-tertiary-100/[.03] hover:bg-tertiary-100/[.03] text-tertiary-100/60 data-[active=true]:text-tertiary-100",
			)}
		>
			{active ? <>{iconActive ? iconActive : icon}</> : icon}
			<h3 className="font-semibold">{title}</h3>
		</button>
	);
};

const NavContent = ({ children }: NavContentProps) => {
	return (
		<div className="grid grid-cols-1 auto-rows-min gap-7 w-full h-[calc(100dvh_-_192px)] overflow-y-auto | scroll-small">
			{children}
		</div>
	);
};

export {
	NavHeader,
	NavAddNote,
	NavGroupItems,
	NavNoteItem,
	NavItem,
	NavContent,
};
