import HomePage from "@/pages/common/HomePage";
import Login from "@/pages/common/Login";
import Profile from "@/pages/common/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "@/pages/common/ForgotPassword";
import ResetPassword from "@/pages/common/ResetPassword";
import FlightRegistration from "@/pages/operations/FlightRegistration";
import UserMangement from "@/pages/admin/UserMangement";
import FlightDashboard from "@/pages/FlightDashboard";
import MainDashboard from "@/pages/MainDashboard";

import ProtectedRoute from "./ProtectedRoute";
import AircraftForm from "@/pages/operations/AircraftRegister";
import { FlightDetail } from "@/pages/FlightDetail";

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
					path="/forget-password"
					element={<ForgotPassword />}
				/>
				<Route
					path="/reset-password"
					element={<ResetPassword />}
				/>

				<Route
					path="/register"
					element={
						<ProtectedRoute allowedRoles={["Admin"]}>
							<UserMangement />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/aircraft"
					element={
						<ProtectedRoute allowedRoles={["Operations"]}>
							<AircraftForm />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/flight-registration"
					element={
						<ProtectedRoute allowedRoles={["Operations"]}>
							<FlightRegistration />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/flight-dashboard"
					element={
						<ProtectedRoute>
							<FlightDashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/flights/:id"
					element={
						<ProtectedRoute>
							<FlightDetail />
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
					path="/main-dashboard"
					element={
						<ProtectedRoute>
							<MainDashboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
