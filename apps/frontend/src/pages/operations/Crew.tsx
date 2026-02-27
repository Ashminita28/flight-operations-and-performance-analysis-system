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

export function Crew() {
	const form = useForm({
		defaultValues: {
			crew_name: "",
			position: "",
			contact_info: "",
		},
	});

	async function onSubmit(data: any) {
		await api("/crews/", {
			method: "POST",
			body: JSON.stringify(data),
		});

		toast.success("Crew Added");

		form.reset();
	}

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Crew</CardTitle>
				<CardDescription>Add Crew</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					id="crewForm"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FieldGroup>
						<Field>
							<FieldLabel>Name</FieldLabel>
							<Input
								{...form.register("crew_name")}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Position</FieldLabel>
							<Input
								{...form.register("position")}
								required
							/>
						</Field>
						<Field>
							<FieldLabel>Contact Info</FieldLabel>
							<Input
								{...form.register("position")}
								required
							/>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter>
				<Button
					type="submit"
					form="crewForm"
				>
					Submit
				</Button>
			</CardFooter>
		</Card>
	);
}
