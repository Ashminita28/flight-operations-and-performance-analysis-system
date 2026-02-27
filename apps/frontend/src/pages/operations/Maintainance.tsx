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

export function Maintainanace() {
	const form = useForm({
		defaultValues: {
			aircraft_id: "",
			description: "",
		},
	});

	async function onSubmit(data: any) {
		await api("/aircraft/maintenance", {
			method: "POST",
			body: JSON.stringify(data),
		});

		toast.success("Maintenance Added");

		form.reset();
	}

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Maintenance</CardTitle>
				<CardDescription>Add Maintenance</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					id="maintainForm"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FieldGroup>
						<Field>
							<FieldLabel>Aircraft ID</FieldLabel>
							<Input
								{...form.register("aircraft_id")}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Description</FieldLabel>
							<Input
								{...form.register("description")}
								required
							/>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter>
				<Button
					type="submit"
					form="maintainForm"
				>
					Submit
				</Button>
			</CardFooter>
		</Card>
	);
}
