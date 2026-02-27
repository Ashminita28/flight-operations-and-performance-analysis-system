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

export function FlightRegistration() {
	const form = useForm({
		defaultValues: {
			flight_number: "",
			departure_airport: "",
			arrival_airport: "",
			departure_date: "",
			departure_datetime: "",
			arrival_datetime: "",
			status: "",
		},
	});

	async function onSubmit(data: any) {
		await api("/flights/", {
			method: "POST",
			body: JSON.stringify(data),
		});

		toast.success("Flight Created");

		form.reset();
	}

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Register Flight</CardTitle>
				<CardDescription>Add Flight</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					id="flightForm"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FieldGroup>
						<Field>
							<FieldLabel>Flight Number</FieldLabel>
							<Input
								{...form.register("flight_number")}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Departure Airport</FieldLabel>
							<Input
								{...form.register("departure_airport")}
								required
							/>
						</Field>

						<Field>
							<FieldLabel>Arrival Airport</FieldLabel>
							<Input
								{...form.register("arrival_airport")}
								required
							/>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter>
				<Button
					type="submit"
					form="flightForm"
				>
					Submit
				</Button>
			</CardFooter>
		</Card>
	);
}
