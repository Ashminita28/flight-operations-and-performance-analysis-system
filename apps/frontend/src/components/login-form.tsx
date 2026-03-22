"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { LoginFormProps } from "@/props/login-props";

export function LoginForm({
	emailRef,
	passwordRef,
	error,
	onSubmit,
	className,
}: LoginFormProps) {
	return (
		<div className={cn("flex flex-col gap-6", className)}>
			<Card className="border border-gray-200 shadow-sm">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-xl font-semibold text-gray-900">
						Welcome back
					</CardTitle>
					<p className="text-sm text-gray-500 mt-1">
						Sign in to your Fligo account
					</p>
				</CardHeader>

				<CardContent>
					<form
						onSubmit={onSubmit}
						aria-label="Login form"
					>
						<FieldGroup>
							<Field>
								<FieldLabel className="text-sm font-medium text-gray-700">
									Email
								</FieldLabel>
								<Input
									ref={emailRef}
									type="email"
									required
									aria-required="true"
									aria-label="Email address"
									placeholder="you@example.com"
									className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20"
								/>
							</Field>

							<Field>
								<div className="flex items-center justify-between">
									<FieldLabel className="text-sm font-medium text-gray-700">
										Password
									</FieldLabel>
									<a
										href="/forget-password"
										className="text-xs text-sky-950 hover:underline underline-offset-4"
									>
										Forgot password?
									</a>
								</div>
								<Input
									ref={passwordRef}
									type="password"
									required
									aria-required="true"
									aria-label="Password"
									className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20"
								/>
							</Field>

							<Field>
								<Button
									type="submit"
									className="w-full bg-sky-950 hover:bg-sky-900 text-white font-medium"
								>
									Sign In
								</Button>
							</Field>
						</FieldGroup>
					</form>

					{error && (
						<p
							role="alert"
							className="text-sm text-red-500 text-center mt-3"
						>
							{error}
						</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
