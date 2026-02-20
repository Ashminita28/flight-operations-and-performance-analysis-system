import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/auth-store";

const App: React.FC = () => {
	const fetchUser = useAuthStore(s => s.fetchUser);

	useEffect(() => {
		fetchUser();
	}, []);
	return (
		<>
			<AppRoutes />
		</>
	);
};

export default App;
