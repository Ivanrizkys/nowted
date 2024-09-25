import { History } from "lucide-react";

const RestoreNote = () => {
	return (
		<div className="h-full flex flex-col items-center justify-center gap-4 text-center p-12">
			<History className="w-[53px] h-[66px]" />
			<h2 className="font-semibold text-3xl">
				Restore “Reflection on the Month of June”
			</h2>
			<p className="w-full max-w-[460px] text-tertiary-100/60">
				Don't want to lose this note? It's not too late! Just click the
				'Restore' button and it will be added back to your list. It's that
				simple.
			</p>
			<button
				type="button"
				className="bg-secondary-100 hover:opacity-70 transition-opacity duration-300 rounded-md py-2 px-7"
			>
				Restore
			</button>
		</div>
	);
};

export default RestoreNote;
