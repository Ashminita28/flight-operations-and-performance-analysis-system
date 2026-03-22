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
import type { SignupFormProps } from "@/props/signup-props";

export function SignupForm({
	values,
	onChange,
	message,
	onSubmit,
}: SignupFormProps) {
	return (
		<Card className="border border-gray-200 shadow-sm">
			<CardHeader className="pb-4">
				<CardTitle className="text-lg font-semibold text-gray-900">
					Register User
				</CardTitle>
				<CardDescription className="text-sm text-gray-500">
					Admin creates new user accounts here
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					onSubmit={onSubmit}
					aria-label="Register user form"
				>
					<FieldGroup>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<Field>
								<FieldLabel className="text-sm font-medium text-gray-700">
									First Name
								</FieldLabel>
								<Input
									value={values.first_name}
									onChange={e => onChange("first_name", e.target.value)}
									required
									aria-required="true"
									placeholder="John"
									className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20"
								/>
							</Field>

							<Field>
								<FieldLabel className="text-sm font-medium text-gray-700">
									Last Name
								</FieldLabel>
								<Input
									value={values.last_name}
									onChange={e => onChange("last_name", e.target.value)}
									required
									aria-required="true"
									placeholder="Doe"
									className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20"
								/>
							</Field>
						</div>

						<Field>
							<FieldLabel className="text-sm font-medium text-gray-700">
								Email
							</FieldLabel>
							<Input
								type="email"
								value={values.email}
								onChange={e => onChange("email", e.target.value)}
								required
								aria-required="true"
								placeholder="john.doe@example.com"
								className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20"
							/>
						</Field>

						<Field>
							<FieldLabel className="text-sm font-medium text-gray-700">
								Phone
							</FieldLabel>
							<Input
								value={values.phone}
								onChange={e => onChange("phone", e.target.value)}
								required
								aria-required="true"
								placeholder="+91 98765 43210"
								className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20"
							/>
						</Field>

						<Field>
							<FieldLabel className="text-sm font-medium text-gray-700">
								Password
							</FieldLabel>
							<Input
								type="password"
								value={values.password}
								onChange={e => onChange("password", e.target.value)}
								required
								aria-required="true"
								className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20"
							/>
						</Field>

						<Field>
							<FieldLabel className="text-sm font-medium text-gray-700">
								Role
							</FieldLabel>
							<Select
								value={values.roleName}
								onValueChange={(value: string) => onChange("roleName", value)}
							>
								<SelectTrigger
									aria-label="Select user role"
									className="border-gray-200"
								>
									<SelectValue placeholder="Select a role" />
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
							className="w-full bg-sky-950 hover:bg-sky-900 text-white font-medium"
						>
							Register User
						</Button>

						{message && (
							<p
								role="alert"
								className="text-sm text-center text-red-500 mt-1"
							>
								{message}
							</p>
						)}
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
