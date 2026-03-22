import { SignupContainer } from "@/containers/signup-container";

const UserMangement: React.FC = () => {
	return (
		<div className="min-h-screen bg-sky-950 bg-center relative overflow-scroll">
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
							<SignupContainer />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserMangement;
