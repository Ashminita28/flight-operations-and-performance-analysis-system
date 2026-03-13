"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useAuthStore } from "@/store/auth-store";
import { flightSchema } from "@/schemas/flight-schema";

interface FlightRegistrationProps {
	onClose?: () => void;
	refreshFlights?: () => void;
}

type FlightFormValues = z.infer<typeof flightSchema>;

export default function FlightRegistration({
	onClose,
	refreshFlights,
}: FlightRegistrationProps) {
	const createFlight = useFlightStore(s => s.createFlight);
	const { aircraft, fetchAircraft } = useAircraftStore();

	useEffect(() => {
		fetchAircraft();
	}, [fetchAircraft]);

	const form = useForm<FlightFormValues>({
		resolver: zodResolver(flightSchema),
	});

	async function onSubmit(data: FlightFormValues) {
		try {
			let user = useAuthStore.getState().user;
			if (!user) {
				alert("User not authenticated");
				return;
			}

			await createFlight({
				...data,
				created_by: user.id,
			});
			form.reset();
			if (refreshFlights) {
				await refreshFlights();
			}
			if (onClose) onClose();
		} catch (err: any) {
			alert(err.message ?? "Failed to register flight");
		}
	}

	const aircraftList = Array.isArray(aircraft) ? aircraft : [];

	return (
		<Card className="bg-[#0f2847] border border-slate-600 text-white shadow-2xl">
			<CardHeader className="flex flex-row justify-between items-center border-b border-slate-600 pb-4">
				<CardTitle className="text-white text-xl">Register Flight</CardTitle>
				<Button
					variant="ghost"
					onClick={onClose}
					className="text-slate-300 hover:text-white hover:bg-slate-700 h-8 w-8 p-0 text-lg"
				>
					✕
				</Button>
			</CardHeader>

			<CardContent className="pt-4 max-h-[75vh] overflow-y-auto">
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
										<FormLabel className="text-slate-300">
											Flight Number *
										</FormLabel>
										<FormControl>
											<Input
												placeholder="AI203"
												{...field}
												className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="airline_code"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-300">
											Airline Code *
										</FormLabel>
										<FormControl>
											<Input
												placeholder="AI"
												{...field}
												className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<FormField
								control={form.control}
								name="origin_airport"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-300">
											Origin Airport *
										</FormLabel>
										<FormControl>
											<Input
												placeholder="DEL"
												{...field}
												className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="destination_airport"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-300">
											Destination Airport *
										</FormLabel>
										<FormControl>
											<Input
												placeholder="BOM"
												{...field}
												className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="aircraft_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-slate-300">Aircraft *</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<FormControl>
											<SelectTrigger className="bg-slate-800 border-slate-600 text-white">
												<SelectValue placeholder="Select aircraft" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="bg-slate-800 border-slate-600">
											{aircraftList.length === 0 ? (
												<SelectItem
													value="loading"
													disabled
													className="text-slate-400"
												>
													Loading aircraft...
												</SelectItem>
											) : (
												aircraftList.map(a => (
													<SelectItem
														key={a.id}
														value={a.id}
														className="text-white hover:bg-slate-700"
													>
														{a.registration} — {a.model}
													</SelectItem>
												))
											)}
										</SelectContent>
									</Select>
									<FormMessage className="text-red-400" />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-3">
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-300">Status *</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger className="bg-slate-800 border-slate-600 text-white">
													<SelectValue />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="bg-slate-800 border-slate-600">
												<SelectItem
													value="scheduled"
													className="text-white"
												>
													Scheduled
												</SelectItem>
												<SelectItem
													value="boarding"
													className="text-white"
												>
													Boarding
												</SelectItem>
												<SelectItem
													value="departed"
													className="text-white"
												>
													Departed
												</SelectItem>
												<SelectItem
													value="landed"
													className="text-white"
												>
													Landed
												</SelectItem>
												<SelectItem
													value="delayed"
													className="text-white"
												>
													Delayed
												</SelectItem>
												<SelectItem
													value="diverted"
													className="text-white"
												>
													Diverted
												</SelectItem>
												<SelectItem
													value="cancelled"
													className="text-white"
												>
													Cancelled
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="flight_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-300">
											Flight Date *
										</FormLabel>
										<FormControl>
											<Input
												type="date"
												{...field}
												className="bg-slate-800 border-slate-600 text-white"
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<FormField
								control={form.control}
								name="scheduled_departure"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-300">
											Scheduled Departure *
										</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className="bg-slate-800 border-slate-600 text-white"
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="scheduled_arrival"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-300">
											Scheduled Arrival *
										</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className="bg-slate-800 border-slate-600 text-white"
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<FormField
								control={form.control}
								name="estimated_departure"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-300">
											Estimated Departure
										</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className="bg-slate-800 border-slate-600 text-white"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="estimated_arrival"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-300">
											Estimated Arrival
										</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className="bg-slate-800 border-slate-600 text-white"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<FormField
								control={form.control}
								name="actual_departure"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-300">
											Actual Departure
										</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className="bg-slate-800 border-slate-600 text-white"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="actual_arrival"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-300">
											Actual Arrival
										</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className="bg-slate-800 border-slate-600 text-white"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<FormField
								control={form.control}
								name="gate_departure"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-300">
											Departure Gate
										</FormLabel>
										<FormControl>
											<Input
												placeholder="A12"
												{...field}
												className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="gate_arrival"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-300">
											Arrival Gate
										</FormLabel>
										<FormControl>
											<Input
												placeholder="B4"
												{...field}
												className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="is_return_flight"
							render={({ field }) => (
								<FormItem className="flex items-center gap-3">
									<FormControl>
										<input
											type="checkbox"
											checked={field.value ?? false}
											onChange={e => field.onChange(e.target.checked)}
											className="w-4 h-4 accent-blue-500 cursor-pointer"
										/>
									</FormControl>
									<FormLabel className="text-slate-300 mt-0! cursor-pointer">
										Return Flight
									</FormLabel>
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							disabled={form.formState.isSubmitting}
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
						>
							{form.formState.isSubmitting
								? "Registering..."
								: "Register Flight"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
