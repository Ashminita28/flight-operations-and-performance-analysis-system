import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import AppRoutes from "./AppRoutes";

// Initializes authentication state on app load
export default function AuthInitialize() {
	const { isFetched, initializeAuth } = useAuthStore();

	useEffect(() => {
		if (!isFetched) {
			initializeAuth();
		}
	}, [isFetched, initializeAuth]);

	if (!isFetched) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="mb-4">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-950"></div>
					</div>
					<p className="text-muted-foreground">Loading...</p>
				</div>
			</div>
		);
	}

	return <AppRoutes />;
}
