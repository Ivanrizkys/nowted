import Home from "@/components/pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider as RxDbProvider } from "rxdb-hooks";
import { useCreateRxDatabase } from "./config/rxdb";

function App() {
	return (
		<RxDbProvider db={useCreateRxDatabase()}>
			<GoogleOAuthProvider
				clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
			>
				<Home />
			</GoogleOAuthProvider>
		</RxDbProvider>
	);
}

export default App;
