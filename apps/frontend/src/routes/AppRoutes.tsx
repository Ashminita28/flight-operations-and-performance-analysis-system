import AnalystDashboard from "@/pages/analyst/AnalystDashboard";
import HomePage from "@/pages/common/HomePage";
import Login from "@/pages/common/Login";
import Register from "@/pages/common/Register";
import ManagerDashboard from "@/pages/manager/ManagerDashboard";
import OperationDashboard from "@/pages/operation-staffs/OperationDashboard";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Profile from "@/pages/common/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProfileDashboard from "@/pages/common/ProfileDashboard";
import ForgotPassword from "@/pages/common/ForgotPassword";
import ResetPassword from "@/pages/common/ResetPassword";

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
					element={
						<ProtectedRoute>
							<Login />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
				<Route
					path="/forget-password"
					element={<ForgotPassword />}
				/>
				<Route
					path="/reset-password"
					element={<ResetPassword />}
				/>
				<Route
					path="/main-dashboard"
					element={<ProfileDashboard />}
				/>
				<Route
					path="/admin"
					element={
						<ProtectedRoute>
							<AdminDashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/analyst"
					element={
						<ProtectedRoute allowedRoles={["Analyst"]}>
							<AnalystDashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/manager"
					element={
						<ProtectedRoute allowedRoles={["Manager"]}>
							<ManagerDashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/operations"
					element={
						<ProtectedRoute allowedRoles={["Operations"]}>
							<OperationDashboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
