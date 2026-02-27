"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { useAuthStore } from "../store/auth-store";
import { useNavigate } from "react-router-dom";

export function SignupForm() {
	const register = useAuthStore(s => s.register);

	const navigate = useNavigate();

	const [form, setForm] = useState({
		first_name: "",

		last_name: "",

		email: "",

		phone: "",

		password: "",

		roleName: "Operations",
	});

	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await register(
				form.first_name,

				form.last_name,

				form.email,

				form.phone,

				form.password,

				form.roleName,
			);

			setMessage("User Registered Successfully");

			navigate("/admin");
		} catch (err: any) {
			setMessage(err.message || "Registration Failed");
		}
	};

	return (
		<Card className="bg-white">
			<CardHeader>
				<CardTitle>Register User</CardTitle>

				<CardDescription>Admin creates users here</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit}>
					<FieldGroup>
						<Field>
							<FieldLabel>First Name</FieldLabel>

							<Input
								value={form.first_name}
								onChange={e =>
									setForm({
										...form,

										first_name: e.target.value,
									})
								}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Last Name</FieldLabel>

							<Input
								value={form.last_name}
								onChange={e =>
									setForm({
										...form,

										last_name: e.target.value,
									})
								}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Email</FieldLabel>

							<Input
								type="email"
								value={form.email}
								onChange={e =>
									setForm({
										...form,

										email: e.target.value,
									})
								}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Phone</FieldLabel>

							<Input
								value={form.phone}
								onChange={e =>
									setForm({
										...form,

										phone: e.target.value,
									})
								}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Password</FieldLabel>

							<Input
								type="password"
								value={form.password}
								onChange={e =>
									setForm({
										...form,

										password: e.target.value,
									})
								}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Role</FieldLabel>

							<Select
								value={form.roleName}
								onValueChange={value =>
									setForm({
										...form,

										roleName: value,
									})
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value="Operations">Operations</SelectItem>

									<SelectItem value="Manager">Manager</SelectItem>

									<SelectItem value="Analyst">Analyst</SelectItem>

									<SelectItem value="Admin">Admin</SelectItem>
								</SelectContent>
							</Select>
						</Field>

						<Button
							type="submit"
							className="bg-sky-950 w-full"
						>
							Register User
						</Button>

						{message && (
							<p className="text-center text-red-500 mt-3">{message}</p>
						)}
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
