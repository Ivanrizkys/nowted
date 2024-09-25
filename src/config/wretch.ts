import wretch from "wretch";

const API = wretch(import.meta.env.VITE_BASE_ENDPOINT_URL)
	.headers({ accept: "application/json" })
	.catcher(404, (err) => import.meta.env.DEV && console.error("NOT FOUND", err))
	.catcher(
		500,
		(err) => import.meta.env.DEV && console.error("INTERNAL SERVER ERROR", err),
	);

export default API;
