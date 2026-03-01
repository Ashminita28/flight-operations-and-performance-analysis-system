import { LoginForm } from "@/components/login-form";
import flight from "../../assets/flight.jpeg";

export default function Login() {
	return (
		<div
			className="absolute inset-0 bg-cover bg-center"
			style={{ backgroundImage: `url(${flight})` }}
		>
			<div className="absolute inset-0 bg-black/50">
				<div className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
					<div className="flex w-full max-w-sm flex-col gap-6">
						<a
							href="/"
							className="flex items-center gap-2 self-center font-medium"
						>
							Fligo
						</a>
						<LoginForm />
					</div>
				</div>
			</div>

			<div></div>
		</div>
	);
}
