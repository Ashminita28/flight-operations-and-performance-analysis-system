import HomePage from "@/pages/common/HomePage";
import Login from "@/pages/common/Login";
import Register from "@/pages/common/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
