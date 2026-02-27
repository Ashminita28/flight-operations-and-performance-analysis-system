"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuthStore } from "../store/auth-store";
import { useNavigate } from "react-router-dom";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const login = useAuthStore(s => s.login);
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
			const user = useAuthStore.getState().user;
			if (user?.roles?.includes("Admin")) {
				navigate("/admin");
			} else if (user?.roles?.includes("Manager")) {
				navigate("/flight-dashboard");
			} else if (user?.roles?.includes("Analyst")) {
				navigate("/analyst");
			} else if (user?.roles?.includes("Operations")) {
				navigate("/operations");
			} else {
				navigate("/main-dashboard");
			}
		} catch (err: any) {
			setError(err.message || "Login failed");
		}
	};

	return (
		<div
			className={cn("flex flex-col gap-6", className)}
			{...props}
		>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<FieldLabel>Email</FieldLabel>
								<Input
									type="email"
									onChange={e => setEmail(e.target.value)}
									required
								/>
							</Field>

							<Field>
								<div className="flex items-center">
									<FieldLabel>Password</FieldLabel>

									<a
										href="/forget-password"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</a>
								</div>
								<Input
									type="password"
									onChange={e => setPassword(e.target.value)}
									required
								/>
							</Field>

							<Field>
								<Button
									type="submit"
									className="bg-sky-950 w-full"
								>
									Login
								</Button>
							</Field>
						</FieldGroup>
					</form>

					{error && <p className="text-red-500 text-center mt-3">{error}</p>}
				</CardContent>
			</Card>
		</div>
	);
}
