import { useState, useCallback, useRef, memo } from "react";
import { api } from "../../api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const ResetPassword = memo(function ResetPassword() {
	const navigate = useNavigate();

	const emailRef = useRef<HTMLInputElement>(null);
	const otpRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [message, setMessage] = useState("");

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const email = emailRef.current?.value ?? "";
			const otp = otpRef.current?.value ?? "";
			const password = passwordRef.current?.value ?? "";

			try {
				await api("/password/reset-password", {
					method: "POST",
					body: JSON.stringify({ email, otp, password }),
				});

				setMessage("Password Reset Success");

				setTimeout(() => {
					navigate("/login");
				}, 1500);
			} catch (err: unknown) {
				setMessage(err instanceof Error ? err.message : "Something went wrong");
			}
		},
		[navigate],
	);

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
					ref={emailRef}
					placeholder="Email"
					required
				/>

				<Input
					ref={otpRef}
					placeholder="OTP"
					required
				/>

				<Input
					ref={passwordRef}
					type="password"
					placeholder="New Password"
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
});

export default ResetPassword;
