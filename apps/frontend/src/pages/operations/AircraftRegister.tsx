"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAircraftStore } from "@/store/aircraft-store";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const aircraftSchema = z.object({
	registration: z.string().min(3),
	icao_type: z.string().min(2),
	manufacturer: z.string().min(2),
	model: z.string().min(2),
	seat_capacity: z.coerce.number().positive(),
	fuel_capacity_kg: z.coerce.number().positive(),
	max_payload_kg: z.coerce.number().positive(),
	year_of_manufacture: z.coerce.number().min(1950),
	status: z.string(),
	base_airport_code: z.string().min(3),
	notes: z.string().optional(),
});

type AircraftFormValues = z.infer<typeof aircraftSchema>;
export default function AircraftForm() {
	const createAircraft = useAircraftStore(s => s.createAircraft);

	const form = useForm<AircraftFormValues>({
		resolver: zodResolver(aircraftSchema) as any,
		defaultValues: {
			registration: "",
			icao_type: "",
			manufacturer: "",
			model: "",
			seat_capacity: 0,
			fuel_capacity_kg: 0,
			max_payload_kg: 0,
			year_of_manufacture: 0,
			status: "",
			base_airport_code: "",
			notes: "",
		},
	});

	async function onSubmit(data: AircraftFormValues) {
		try {
			await createAircraft(data);
			form.reset();
		} catch (err: any) {
			alert(err.message);
		}
	}

	return (
		<Card className="bg-[#142B4D] text-white">
			<CardHeader>
				<CardTitle>Register Aircraft</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="registration"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Registration</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="manufacturer"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Manufacturer</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="model"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Model</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="seat_capacity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Seat Capacity</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<FormControl>
										<Input
											placeholder="active / maintenance"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="notes"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Notes</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full bg-blue-600"
						>
							Register Aircraft
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
