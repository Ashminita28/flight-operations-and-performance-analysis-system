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

export function FlightEvent() {
	const form = useForm({
		defaultValues: {
			event_name: "",
			description: "",
		},
	});

	async function onSubmit(data: any) {
		await api("/events/", {
			method: "POST",
			body: JSON.stringify(data),
		});

		toast.success("Event Added");

		form.reset();
	}

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Flight Event</CardTitle>
				<CardDescription>Add Event</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					id="eventForm"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FieldGroup>
						<Field>
							<FieldLabel>Event Name</FieldLabel>
							<Input
								{...form.register("event_name")}
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
					form="eventForm"
				>
					Submit
				</Button>
			</CardFooter>
		</Card>
	);
}
