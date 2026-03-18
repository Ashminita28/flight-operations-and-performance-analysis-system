import React, { Suspense, lazy, memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import ProtectedRoute from "./ProtectedRoute";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { PublicLayout } from "@/layouts/PublicLayout";

const HomePage = lazy(() => import("@/pages/common/HomePage"));
const Login = lazy(() => import("@/pages/common/Login"));
const ForgotPassword = lazy(() => import("@/pages/common/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/common/ResetPassword"));

const UserManagement = lazy(() => import("@/pages/admin/UserMangement"));

const Profile = lazy(() => import("@/pages/common/Profile"));
const MainDashboard = lazy(() => import("@/pages/MainDashboard"));
const AircraftForm = lazy(() => import("@/pages/operations/AircraftRegister"));

const AnalyticsDashboard = lazy(() =>
	import("@/pages/MainDashboard").catch(() => import("@/pages/MainDashboard")),
);

const FlightDashboard = lazy(() => import("@/pages/FlightDashboard"));
const FlightDetail = lazy(() =>
	import("@/pages/FlightDetail").then(m => ({ default: m.FlightDetail })),
);

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

function ProtectedDashboard({
	children,
	allowedRoles,
}: {
	children: React.ReactNode;
	allowedRoles?: string[];
}) {
	return (
		<ProtectedRoute allowedRoles={allowedRoles}>
			<DashboardLayout>{children}</DashboardLayout>
		</ProtectedRoute>
	);
}

function ProtectedPublic({
	children,
	allowedRoles,
}: {
	children: React.ReactNode;
	allowedRoles?: string[];
}) {
	return (
		<ProtectedRoute allowedRoles={allowedRoles}>
			<PublicLayout>{children}</PublicLayout>
		</ProtectedRoute>
	);
}

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Suspense fallback={<PageFallback />}>
				<Routes>
					<Route
						path="/"
						element={
							<PublicLayout showBrand={false}>
								<HomePage />
							</PublicLayout>
						}
					/>
					<Route
						path="/login"
						element={
							<PublicLayout>
								<Login />
							</PublicLayout>
						}
					/>
					<Route
						path="/forget-password"
						element={
							<PublicLayout>
								<ForgotPassword />
							</PublicLayout>
						}
					/>
					<Route
						path="/reset-password"
						element={
							<PublicLayout>
								<ResetPassword />
							</PublicLayout>
						}
					/>
					<Route
						path="/register"
						element={
							<ProtectedPublic allowedRoles={["Admin"]}>
								<UserManagement />
							</ProtectedPublic>
						}
					/>
					<Route
						path="/profile"
						element={
							<ProtectedDashboard>
								<Profile />
							</ProtectedDashboard>
						}
					/>
					<Route
						path="/main-dashboard"
						element={
							<ProtectedDashboard>
								<MainDashboard />
							</ProtectedDashboard>
						}
					/>
					<Route
						path="/aircraft"
						element={
							<ProtectedDashboard allowedRoles={["Admin", "Operations"]}>
								<AircraftForm />
							</ProtectedDashboard>
						}
					/>
					<Route
						path="/analytics"
						element={
							<ProtectedDashboard allowedRoles={["Admin", "Analyst"]}>
								<AnalyticsDashboard />
							</ProtectedDashboard>
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
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
