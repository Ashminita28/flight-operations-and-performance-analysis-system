import { LoginContainer } from "@/containers/login-container";
import { Plane } from "lucide-react";

export default function Login() {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
			<div className="w-full max-w-sm flex flex-col gap-6">
				{/* Logo */}
				<a
					href="/"
					className="flex items-center justify-center gap-2"
					aria-label="Go to homepage"
				>
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-950">
						<Plane className="size-5 text-white" />
					</div>
					<span className="text-xl font-semibold text-gray-900">Fligo</span>
				</a>

				<LoginContainer />
			</div>
		</div>
	);
}
