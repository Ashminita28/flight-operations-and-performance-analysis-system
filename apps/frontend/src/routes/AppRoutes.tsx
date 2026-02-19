import AnalystDashboard from "@/pages/analyst/AnalystDashboard";
import HomePage from "@/pages/common/HomePage";
import Login from "@/pages/common/Login";
import Register from "@/pages/common/Register";
import ManagerDashboard from "@/pages/manager/ManagerDashboard";
import OperationDashboard from "@/pages/operation-staffs/OperationDashboard";
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
				<Route
					path="/analyst"
					element={<AnalystDashboard />}
				/>
				<Route
					path="/manager"
					element={<ManagerDashboard />}
				/>
				<Route
					path="/operations"
					element={<OperationDashboard />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
