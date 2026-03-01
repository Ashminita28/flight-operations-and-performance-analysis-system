import { SignupForm } from "@/components/signup-form";
import flight from "../../assets/flight.jpeg";

const UserMangement: React.FC = () => {
	return (
		<div
			className="min-h-screen bg-cover bg-center relative overflow-scroll"
			style={{ backgroundImage: `url(${flight})` }}
		>
			<div className="relative inset-0 bg-black/50">
				<div className="relative flex min-h-screen items-center justify-center p-6">
					<div className="w-full max-w-md space-y-6 text-white">
						<a
							href="/"
							className="flex justify-center text-xl font-semibold tracking-wide"
						>
							Fligo
						</a>
						<div className=" backdrop-blur-md rounded-xl p-6 shadow max-h-80[vh] overflow-y-auto">
							<SignupForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserMangement;
