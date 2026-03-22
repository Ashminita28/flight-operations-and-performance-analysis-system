"use client";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { LoginForm } from "@/components/login-form";

export function LoginContainer() {
	const login = useAuthStore(s => s.login);
	const navigate = useNavigate();

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [error, setError] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const email = emailRef.current?.value ?? "";
		const password = passwordRef.current?.value ?? "";

		try {
			setError("");
			await login(email, password);

			const user = useAuthStore.getState().user;

			if (user) {
				toast.success("Login Successful");
				navigate("/main-dashboard");
			} else {
				toast.error("Login Failed");
			}
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : "Login failed";
			setError(message);
		}
	};

	return (
		<LoginForm
			emailRef={emailRef}
			passwordRef={passwordRef}
			error={error}
			onSubmit={handleSubmit}
		/>
	);
}
