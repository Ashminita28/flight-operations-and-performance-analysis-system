"use client";

import { Suspense, lazy, memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/layouts/dashboard-layout";
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const EventsDashboard = lazy(() => import("@/pages/EventsDashboard"));
const PerformanceDashboard = lazy(() => import("@/pages/PerformanceDashboard"));
const HomePage = lazy(() => import("@/pages/common/HomePage"));
const Login = lazy(() => import("@/pages/common/Login"));
const ForgotPassword = lazy(() => import("@/pages/common/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/common/ResetPassword"));

const UserManagement = lazy(() => import("@/pages/admin/UserMangement"));
const Profile = lazy(() => import("@/pages/common/Profile"));

const MainDashboard = lazy(() => import("@/pages/MainDashboard"));
const AircraftForm = lazy(() => import("@/pages/operations/AircraftRegister"));
const FlightDashboard = lazy(() => import("@/pages/FlightDashboard"));
const FlightDetail = lazy(() =>
	import("@/pages/FlightDetail").then(m => ({
		default: m.FlightDetail,
	})),
);

/*FALLBACK*/

const PageFallback = memo(function PageFallback() {
	return (
		<div
			className="flex flex-col gap-4 items-center justify-center min-h-screen bg-background p-8"
			role="status"
			aria-live="polite"
			aria-label="Loading page"
		>
			<Skeleton className="h-8 w-56 rounded" />
			<Skeleton className="h-4 w-40 rounded" />
			<span className="sr-only">Loading…</span>
		</div>
	);
});

/*ROUTES*/

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Suspense fallback={<PageFallback />}>
				<Routes>
					{/* PUBLIC */}
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

					<Route element={<DashboardLayout />}>
						<Route
							path="/register"
							element={
								<ProtectedRoute allowedRoles={["Admin"]}>
									<UserManagement />
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

						<Route
							path="/events"
							element={
								<ProtectedRoute allowedRoles={["Admin", "Manager"]}>
									<EventsDashboard />
								</ProtectedRoute>
							}
						/>

						<Route
							path="/performances"
							element={
								<ProtectedRoute allowedRoles={["Admin", "Manager", "Analyst"]}>
									<PerformanceDashboard />
								</ProtectedRoute>
							}
						/>
					</Route>
					<Route
						path="/unauthorized"
						element={<Unauthorized />}
					/>

					<Route
						path="*"
						element={<NotFound />}
					/>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
