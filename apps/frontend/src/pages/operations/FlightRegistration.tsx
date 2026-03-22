"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import type { FlightRegistrationProps } from "@/props/flight-register-props";
import type { FlightFormValues } from "@/schemas/flight-schema";
import { X } from "lucide-react";

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
			const user = useAuthStore.getState().user;
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
		} catch (err: unknown) {
			alert(err instanceof Error ? err.message : "Failed to register aircraft");
		}
	}

	const aircraftList = Array.isArray(aircraft) ? aircraft : [];
	const inp =
		"border-gray-200 focus:border-sky-950 text-gray-900 placeholder:text-gray-400";

	return (
		<Card className="bg-white border border-gray-200 shadow-sm">
			<CardHeader className="flex flex-row justify-between items-center border-b border-gray-100 pb-4">
				<CardTitle className="text-lg font-semibold text-gray-900">
					Register Flight
				</CardTitle>
				<Button
					variant="ghost"
					onClick={onClose}
					aria-label="Close"
					className="h-8 w-8 p-0 text-gray-400 hover:text-gray-700 hover:bg-gray-100"
				>
					<X className="h-4 w-4" />
				</Button>
			</CardHeader>

			<CardContent className="pt-4 max-h-[75vh] overflow-y-auto">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
						aria-label="Register flight form"
					>
						<div className="grid grid-cols-2 gap-3">
							<FormField
								control={form.control}
								name="flight_number"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-medium text-gray-700">
											Flight Number <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="AI203"
												{...field}
												className={inp}
											/>
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
										<FormLabel className="text-sm font-medium text-gray-700">
											Airline Code <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="AI"
												{...field}
												className={inp}
											/>
										</FormControl>
										<FormMessage />
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
										<FormLabel className="text-sm font-medium text-gray-700">
											Origin Airport <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="DEL"
												{...field}
												className={inp}
											/>
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
										<FormLabel className="text-sm font-medium text-gray-700">
											Destination Airport{" "}
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="BOM"
												{...field}
												className={inp}
											/>
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
									<FormLabel className="text-sm font-medium text-gray-700">
										Aircraft <span className="text-red-500">*</span>
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<FormControl>
											<SelectTrigger
												aria-label="Select aircraft"
												className="border-gray-200 text-gray-900"
											>
												<SelectValue placeholder="Select aircraft" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{aircraftList.length === 0 ? (
												<SelectItem
													value="loading"
													disabled
													className="text-gray-400"
												>
													Loading aircraft...
												</SelectItem>
											) : (
												aircraftList.map(a => (
													<SelectItem
														key={a.id}
														value={a.id}
														className="text-gray-900"
													>
														{a.registration} — {a.model}
													</SelectItem>
												))
											)}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-3">
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-medium text-gray-700">
											Status <span className="text-red-500">*</span>
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger
													aria-label="Select status"
													className="border-gray-200 text-gray-900"
												>
													<SelectValue />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{[
													"scheduled",
													"boarding",
													"departed",
													"landed",
													"delayed",
													"diverted",
													"cancelled",
												].map(s => (
													<SelectItem
														key={s}
														value={s}
														className="text-gray-900 capitalize"
													>
														{s.charAt(0).toUpperCase() + s.slice(1)}
													</SelectItem>
												))}
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
										<FormLabel className="text-sm font-medium text-gray-700">
											Flight Date <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												type="date"
												{...field}
												className={inp}
											/>
										</FormControl>
										<FormMessage />
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
										<FormLabel className="text-sm font-medium text-gray-700">
											Scheduled Departure{" "}
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className={inp}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="scheduled_arrival"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-medium text-gray-700">
											Scheduled Arrival <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className={inp}
											/>
										</FormControl>
										<FormMessage />
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
										<FormLabel className="text-sm font-medium text-gray-700">
											Estimated Departure
										</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className={inp}
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
										<FormLabel className="text-sm font-medium text-gray-700">
											Estimated Arrival
										</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className={inp}
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
										<FormLabel className="text-sm font-medium text-gray-700">
											Actual Departure
										</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className={inp}
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
										<FormLabel className="text-sm font-medium text-gray-700">
											Actual Arrival
										</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className={inp}
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
										<FormLabel className="text-sm font-medium text-gray-700">
											Departure Gate
										</FormLabel>
										<FormControl>
											<Input
												placeholder="A12"
												{...field}
												className={inp}
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
										<FormLabel className="text-sm font-medium text-gray-700">
											Arrival Gate
										</FormLabel>
										<FormControl>
											<Input
												placeholder="B4"
												{...field}
												className={inp}
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
											className="w-4 h-4 accent-sky-950 cursor-pointer rounded border-gray-300"
										/>
									</FormControl>
									<FormLabel className="text-sm font-medium text-gray-700 mt-0! cursor-pointer">
										Return Flight
									</FormLabel>
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							disabled={form.formState.isSubmitting}
							className="w-full bg-sky-950 hover:bg-sky-900 text-white font-medium"
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
