import { useState } from "react";
import { api } from "../../api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await api("/password/forgot-password", {
				method: "POST",
				body: JSON.stringify({ email }),
			});

			setMessage("OTP Sent Successfully");

			setTimeout(() => {
				navigate("/reset-password");
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
					Forgot Password
				</h2>

				<Input
					type="email"
					placeholder="Enter Email"
					onChange={e => setEmail(e.target.value)}
					required
				/>

				<Button
					type="submit"
					className="w-full bg-sky-950"
				>
					Send OTP
				</Button>

				<p
					onClick={() => navigate("/login")}
					className="text-center text-sm cursor-pointer underline"
				>
					Back to Login
				</p>

				{message && <p className="text-center text-red-500">{message}</p>}
			</form>
		</div>
	);
}
