"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { SignupForm } from "@/components/signup-form";
import { DEFAULT_VALUES } from "../constants/signup-constant";
import type { RegisterPayload } from "@/types/auth-types";

export function SignupContainer() {
	const register = useAuthStore(s => s.register);
	const navigate = useNavigate();

	const [values, setValues] = useState<RegisterPayload>(DEFAULT_VALUES);
	const [message, setMessage] = useState<string>("");

	const handleChange = (field: keyof RegisterPayload, value: string) => {
		setValues(prev => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await register(values);
			setMessage("User Registered Successfully");
			navigate("/main-dashboard");
		} catch (err: unknown) {
			setMessage(err instanceof Error ? err.message : "Registration Failed");
		}
	};

	return (
		<SignupForm
			values={values}
			onChange={handleChange}
			message={message}
			onSubmit={handleSubmit}
		/>
	);
}
