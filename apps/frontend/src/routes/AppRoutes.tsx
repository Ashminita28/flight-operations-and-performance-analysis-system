import HomePage from "@/pages/common/HomePage";
import Login from "@/pages/common/Login";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Profile from "@/pages/common/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileDashboard from "@/pages/common/ProfileDashboard";
import ForgotPassword from "@/pages/common/ForgotPassword";
import ResetPassword from "@/pages/common/ResetPassword";
import OperationDashboard from "@/pages/operations/OperationDashboard";
import { AircraftRegistration } from "@/pages/operations/AircraftRegistration";
import { Crew } from "@/pages/operations/Crew";
import { FlightEvent } from "@/pages/operations/FlightEvent";
import { FlightRegistration } from "@/pages/operations/FlightRegistration";
import { Maintainanace } from "@/pages/operations/Maintainance";

import UserMangement from "@/pages/admin/UserMangement";
import FlightDashboard from "@/pages/FlightDashboard";

import ProtectedRoute from "./ProtectedRoute";

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

				{/* ADMIN ROUTES */}

				<Route
					path="/admin"
					element={
						<ProtectedRoute allowedRoles={["Admin"]}>
							<AdminDashboard />
						</ProtectedRoute>
					}
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
					path="/operations"
					element={
						<ProtectedRoute allowedRoles={["Operations"]}>
							<OperationDashboard />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/aircraft"
					element={
						<ProtectedRoute allowedRoles={["Operations"]}>
							<AircraftRegistration />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/crew"
					element={
						<ProtectedRoute allowedRoles={["Operations"]}>
							<Crew />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/flightevent"
					element={
						<ProtectedRoute allowedRoles={["Operations"]}>
							<FlightEvent />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/flightregistration"
					element={
						<ProtectedRoute allowedRoles={["Operations"]}>
							<FlightRegistration />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/maintainance"
					element={
						<ProtectedRoute allowedRoles={["Operations"]}>
							<Maintainanace />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/flight-dashboard"
					element={
						<ProtectedRoute allowedRoles={["Manager", "Admin"]}>
							<FlightDashboard />
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
							<ProfileDashboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
