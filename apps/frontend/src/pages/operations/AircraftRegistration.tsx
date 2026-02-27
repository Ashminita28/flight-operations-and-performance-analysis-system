"use client";

import { api } from "@/api/api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { Input } from "@/components/ui/input";

export function AircraftRegistration() {
	const form = useForm({
		defaultValues: {
			registration_number: "",
			model: "",
			manufacturer: "",
			capacity: "",
			manufacture_year: "",
		},
	});

	async function onSubmit(data: any) {
		await api("/aircraft/", {
			method: "POST",
			body: JSON.stringify(data),
		});

		console.log("Aircraf registered");
		toast.success("Aircraft Registered");

		form.reset();
	}

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Register Aircraft</CardTitle>
				<CardDescription>Add Aircraft</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					id="aircraftForm"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FieldGroup>
						<Field>
							<FieldLabel>Registration Number</FieldLabel>
							<Input
								{...form.register("registration_number")}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Model</FieldLabel>
							<Input
								{...form.register("model")}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Manufacturer</FieldLabel>
							<Input
								{...form.register("manufacturer")}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Capacity</FieldLabel>
							<Input
								{...form.register("capacity")}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Manufacture Year</FieldLabel>
							<Input
								{...form.register("manufacture_year")}
								required
							/>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter>
				<Button
					type="submit"
					form="aircraftForm"
				>
					Submit
				</Button>
			</CardFooter>
		</Card>
	);
}
