import { useState, useCallback, useRef, memo } from "react";
import { api } from "../../api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const ForgotPassword = memo(function ForgotPassword() {
	const navigate = useNavigate();

	const emailRef = useRef<HTMLInputElement>(null);

	const [message, setMessage] = useState("");

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const email = emailRef.current?.value ?? "";

			try {
				await api("/password/forgot-password", {
					method: "POST",
					body: JSON.stringify({ email }),
				});
				setMessage("OTP Sent Successfully");
				setTimeout(() => {
					navigate("/reset-password");
				}, 1500);
			} catch (err: unknown) {
				setMessage(err instanceof Error ? err.message : "Something went wrong");
			}
		},
		[navigate],
	);

	const handleBackToLogin = useCallback(() => {
		navigate("/login");
	}, [navigate]);

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
					ref={emailRef}
					type="email"
					placeholder="Enter Email"
					required
				/>
				<Button
					type="submit"
					className="w-full bg-sky-950"
				>
					Send OTP
				</Button>
				<p
					onClick={handleBackToLogin}
					className="text-center text-sm cursor-pointer underline"
				>
					Back to Login
				</p>
				{message && <p className="text-center text-red-500">{message}</p>}
			</form>
		</div>
	);
});

export default ForgotPassword;
