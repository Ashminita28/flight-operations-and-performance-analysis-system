import AuthInitialize from "./routes/AuthInitialize";
import { Toaster } from "./components/ui/sonner";

const App: React.FC = () => {
	return (
		<>
			<AuthInitialize />
			<Toaster />
		</>
	);
};

export default App;
