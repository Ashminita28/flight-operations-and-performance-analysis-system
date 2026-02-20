import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";

interface Props {
	children: React.ReactNode;
	allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
	const user = useAuthStore(s => s.user);

	if (!user) return <Navigate to="/login" />;

	if (allowedRoles && !allowedRoles.some(role => user.roles?.includes(role))) {
		return <Navigate to="/" />;
	}

	return children;
}
