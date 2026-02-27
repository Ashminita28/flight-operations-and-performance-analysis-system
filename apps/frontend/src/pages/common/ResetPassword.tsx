import { useState } from "react";
import { api } from "../../api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await api("/password/reset-password", {
				method: "POST",

				body: JSON.stringify({
					email,

					otp,

					password,
				}),
			});

			setMessage("Password Reset Success");

			setTimeout(() => {
				navigate("/login");
			}, 1500);
		} catch (err: any) {
			setMessage(err.message);
		}
	};

	return (
		<div className="min-h-screen bg-sky-950 flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-xl w-96 space-y-5 shadow-lg"
			>
				<h2 className="text-2xl font-bold text-center text-sky-950">
					Reset Password
				</h2>

				<Input
					placeholder="Email"
					onChange={e => setEmail(e.target.value)}
					required
				/>

				<Input
					placeholder="OTP"
					onChange={e => setOtp(e.target.value)}
					required
				/>

				<Input
					type="password"
					placeholder="New Password"
					onChange={e => setPassword(e.target.value)}
					required
				/>

				<Button
					type="submit"
					className="w-full bg-sky-950"
				>
					Reset Password
				</Button>

				{message && <p className="text-center text-red-500">{message}</p>}
			</form>
		</div>
	);
}
