"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";

const formSchema = z.object({
	title: z
		.string()
		.min(5, "Bug title must be at least 5 characters.")
		.max(32, "Bug title must be at most 32 characters."),
	description: z
		.string()
		.min(20, "Description must be at least 20 characters.")
		.max(100, "Description must be at most 100 characters."),
});

export function AircraftRegistration() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		toast("You submitted the following values:", {
			description: (
				<pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
			position: "bottom-right",
			classNames: {
				content: "flex flex-col gap-2",
			},
			style: {
				"--border-radius": "calc(var(--radius)  + 4px)",
			} as React.CSSProperties,
		});
	}

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Register Aircraft</CardTitle>
				<CardDescription>Register aircraft for today.</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id="form-rhf-demo"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FieldGroup>
						<Controller
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-rhf-demo-title">
										Registration Number
									</FieldLabel>
									<Input
										{...field}
										id="form-rhf-demo-title"
										aria-invalid={fieldState.invalid}
										placeholder="mention the registration number of aircraft"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-rhf-demo-title">Model</FieldLabel>
									<Input
										{...field}
										id="form-rhf-demo-title"
										aria-invalid={fieldState.invalid}
										placeholder="Mention the model"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-rhf-demo-title">
										Manufacturer
									</FieldLabel>
									<Input
										{...field}
										id="form-rhf-demo-title"
										aria-invalid={fieldState.invalid}
										placeholder=""
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-rhf-demo-title">
										Capacity
									</FieldLabel>
									<Input
										{...field}
										id="form-rhf-demo-title"
										aria-invalid={fieldState.invalid}
										placeholder="Login button not working on mobile"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-rhf-demo-title">
										Manufacture Year
									</FieldLabel>
									<Input
										{...field}
										id="form-rhf-demo-title"
										aria-invalid={fieldState.invalid}
										placeholder="Login button not working on mobile"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-rhf-demo-title">
										Total Flight Hours
									</FieldLabel>
									<Input
										{...field}
										id="form-rhf-demo-title"
										aria-invalid={fieldState.invalid}
										placeholder="Login button not working on mobile"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-rhf-demo-title">
										Last Maintenance Date
									</FieldLabel>
									<Input
										{...field}
										id="form-rhf-demo-title"
										aria-invalid={fieldState.invalid}
										placeholder="Login button not working on mobile"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-rhf-demo-title">
										Next Maintenance Date
									</FieldLabel>
									<Input
										{...field}
										id="form-rhf-demo-title"
										aria-invalid={fieldState.invalid}
										placeholder="Login button not working on mobile"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="description"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-rhf-demo-description">
										Notes
									</FieldLabel>
									<InputGroup>
										<InputGroupTextarea
											{...field}
											id="form-rhf-demo-description"
											placeholder="I'm having an issue with the login button on mobile."
											rows={6}
											className="min-h-24 resize-none"
											aria-invalid={fieldState.invalid}
										/>
										<InputGroupAddon align="block-end">
											<InputGroupText className="tabular-nums">
												{field.value.length}/100 characters
											</InputGroupText>
										</InputGroupAddon>
									</InputGroup>
									<FieldDescription>
										Include steps to reproduce, expected behavior, and what
										actually happened.
									</FieldDescription>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter>
				<Field orientation="horizontal">
					<Button
						type="button"
						variant="outline"
						onClick={() => form.reset()}
					>
						Reset
					</Button>
					<Button
						type="submit"
						form="form-rhf-demo"
					>
						Submit
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}
