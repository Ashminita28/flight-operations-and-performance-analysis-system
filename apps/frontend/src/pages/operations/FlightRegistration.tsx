"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFlightStore } from "@/store/flight-store";
import { useAircraftStore } from "@/store/aircraft-store";

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectContent,
} from "@/components/ui/select";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FlightregistrationProps {
	onClose?: () => void;
	refreshFlights?: () => void;
}
const flightSchema = z.object({
	flight_number: z.string().min(2),
	airline_code: z.string().min(2),
	origin_airport: z.string().min(3),
	destination_airport: z.string().min(3),
	aircraft_id: z.string(),
	scheduled_departure: z.string(),
	scheduled_arrival: z.string(),
	status: z.string(),
	flight_date: z.string(),
});

type FlightFormValues = z.infer<typeof flightSchema>;

export default function FlightRegistration({
	onClose,
	refreshFlights,
}: FlightregistrationProps) {
	const createFlight = useFlightStore(s => s.createFlight);
	const { aircraft, fetchAircraft } = useAircraftStore();

	useEffect(() => {
		fetchAircraft();
	}, []);

	const form = useForm<FlightFormValues>({
		resolver: zodResolver(flightSchema),
	});

	async function onSubmit(data: FlightFormValues) {
		try {
			await createFlight(data);
			form.reset();
			if (refreshFlights) {
				await refreshFlights();
			}
			if (onClose) onClose();
		} catch (err: any) {
			alert(err.message);
		}
	}

	return (
		<Card className="bg-[#142B4D] text-white">
			<div>
				<Button onClick={onClose}>X</Button>
			</div>
			<CardHeader>
				<CardTitle>Register Flight</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="px-7 pb-7">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<div className="grid grid-cols-2 gap-3">
								<FormField
									control={form.control}
									name="flight_number"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Flight Number</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="airline_code"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Airline Code</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid grid-cols-2 gap-3 mt-3">
								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select status" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="scheduled">Scheduled</SelectItem>
													<SelectItem value="boarding">Boarding</SelectItem>
													<SelectItem value="departed">Departed</SelectItem>
													<SelectItem value="landed">Landed</SelectItem>
													<SelectItem value="cancelled">Cancelled</SelectItem>
													<SelectItem value="delayed">Delayed</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="flight_date"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Flight Date</FormLabel>
											<FormControl>
												<Input
													type="date"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid grid-cols-2 gap-3 mt-3">
								<FormField
									control={form.control}
									name="origin_airport"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Origin</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="destination_airport"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Destination</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="aircraft_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Aircraft</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select aircraft" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{aircraft.map(a => (
													<SelectItem
														key={a.id}
														value={a.id}
													>
														{a.registration} - {a.model}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-2 gap-3 mt-3">
								<FormField
									control={form.control}
									name="scheduled_departure"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Departure</FormLabel>
											<FormControl>
												<Input
													type="datetime-local"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="scheduled_arrival"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Arrival</FormLabel>
											<FormControl>
												<Input
													type="datetime-local"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<Button
								type="submit"
								className="w-full bg-blue-600"
							>
								Register Flight
							</Button>
						</form>
					</Form>
				</div>
			</CardContent>
		</Card>
	);
}
