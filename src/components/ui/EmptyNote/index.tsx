import { animated, useSpring } from "@react-spring/web";
import { FileText } from "lucide-react";

const EmptyNote = () => {
	const motion = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
	});

	return (
		<animated.div
			style={{ ...motion }}
			className="h-full flex flex-col items-center justify-center gap-4 text-center p-12"
		>
			<FileText className="w-[53px] h-[66px]" />
			<h2 className="font-semibold text-3xl">Select a note to view</h2>
			<p className="w-full max-w-[460px] text-tertiary-100/60">
				Choose a note from the list on the left to view its contents, or create
				a new note to add to your collection.
			</p>
		</animated.div>
	);
};

export default EmptyNote;
