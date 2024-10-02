import App from "@/App";
import ContentNote from "@/components/ui/ContentNote";
import EmptyFolder from "@/components/ui/EmptyFolder";
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
				element: <EmptyFolder />,
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
			{
				path: "mobile/:folderId",
				element: <NoteList />,
			},
			{
				path: "mobile/:folderId/:noteId",
				element: <ContentNote />,
			},
		],
	},
]);

export default router;
