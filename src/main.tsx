import { RouterProvider } from "react-router-dom";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import router from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root") as Element).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
