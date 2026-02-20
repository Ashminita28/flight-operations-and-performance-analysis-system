"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuthStore } from "../store/auth-store";
import { useNavigate } from "react-router-dom";

export function SignupForm() {
	const register = useAuthStore(s => s.register);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
	});

	const [message, setMessage] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		try {
			await register(
				formData.name,
				formData.email,
				formData.phone,
				formData.password,
			);
			setMessage("Account created successfully");
			navigate("/login");
		} catch (err: any) {
			setMessage(err.message || "Registration failed");
		}
	};

	return (
		<Card className="bg-white">
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>Enter your information below</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit}>
					<FieldGroup>
						<Field>
							<FieldLabel>Full Name</FieldLabel>
							<Input
								name="name"
								onChange={handleChange}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Email</FieldLabel>
							<Input
								name="email"
								type="email"
								onChange={handleChange}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Phone</FieldLabel>
							<Input
								name="phone"
								onChange={handleChange}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Password</FieldLabel>
							<Input
								name="password"
								type="password"
								onChange={handleChange}
								required
							/>
						</Field>

						<Field>
							<Button
								type="submit"
								className="bg-sky-950 w-full"
							>
								Create Account
							</Button>

							<FieldDescription className="text-center mt-3">
								Already have an account?{" "}
								<a
									href="/login"
									className="underline"
								>
									Sign in
								</a>
							</FieldDescription>
						</Field>
					</FieldGroup>
				</form>

				{message && <p className="mt-4 text-center text-red-500">{message}</p>}
			</CardContent>
		</Card>
	);
}
