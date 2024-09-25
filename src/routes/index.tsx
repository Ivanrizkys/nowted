import App from "@/App";
import ContentNote from "@/components/ui/ContentNote";
import EmptyNote from "@/components/ui/EmptyNote";
import NoteList from "@/components/ui/NoteList";
import { createBrowserRouter } from "react-router-dom";

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <div> </div>,
			},
			{
				path: ":folderId",
				element: <NoteList />,
				children: [
					{
						index: true,
						element: <EmptyNote />,
					},
					{
						path: ":noteId",
						element: <ContentNote />,
					},
				],
			},
		],
	},
]);

export default router;
