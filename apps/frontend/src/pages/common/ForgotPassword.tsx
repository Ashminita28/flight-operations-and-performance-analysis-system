import { useState } from "react";
import { api } from "../../api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();

		try {
			await api("/forgot-password", {
				method: "POST",
				body: JSON.stringify({ email }),
			});

			setMessage("OTP sent to your email");
		} catch (err: any) {
			setMessage(err.message);
		}
	};

	const navigate = useNavigate();

	async function handleOtpSent() {
		try {
			navigate("/reset-password");
		} catch (err: any) {
			setError(err.message);
		}
	}

	return (
		<div className="min-h-screen bg-sky-950 flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-xl w-80 space-y-4"
			>
				<h2 className="text-xl font-semibold text-center">Forgot Password</h2>

				<Input
					type="email"
					placeholder="Enter your email"
					onChange={e => setEmail(e.target.value)}
					required
				/>

				<Button
					onClick={handleOtpSent}
					type="submit"
					className="w-full bg-sky-950"
				>
					Send OTP
				</Button>

				{message && <p className="text-center text-red-500">{message}</p>}
			</form>
		</div>
	);
}
