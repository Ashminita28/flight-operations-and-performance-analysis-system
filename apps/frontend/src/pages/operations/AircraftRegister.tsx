"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { aircraftSchema } from "@/schemas/aircraft-schema";
import type {
	AircraftFormInput,
	AircraftFormOutput,
} from "@/schemas/aircraft-schema";
import { DEFAULT_VALUES } from "@/constants/aircraft-constants";

export default function AircraftForm() {
	const createAircraft = useAircraftStore(s => s.createAircraft);

	const form = useForm<AircraftFormInput, unknown, AircraftFormOutput>({
		resolver: zodResolver(aircraftSchema),
		defaultValues: DEFAULT_VALUES,
	});

	async function onSubmit(data: AircraftFormOutput) {
		try {
			await createAircraft(data);
			form.reset();
		} catch (err: unknown) {
			alert(err instanceof Error ? err.message : "Failed to register aircraft");
		}
	}

	return (
		<Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
			<CardHeader className="pb-4 border-b border-gray-100">
				<CardTitle className="text-lg font-semibold text-gray-900">
					Register Aircraft
				</CardTitle>
				<CardDescription className="text-sm text-gray-500 mt-0.5">
					Add a new aircraft to the system
				</CardDescription>
			</CardHeader>

			<CardContent className="pt-5">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid grid-cols-1 sm:grid-cols-2 gap-4"
						aria-label="Register aircraft form"
					>
						{/* Registration */}
						<FormField
							control={form.control}
							name="registration"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Registration
									</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g. VT-ABC"
											className="border-gray-200 focus:border-sky-950 text-gray-900 placeholder:text-gray-400"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Manufacturer */}
						<FormField
							control={form.control}
							name="manufacturer"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Manufacturer
									</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g. Boeing"
											className="border-gray-200 focus:border-sky-950 text-gray-900 placeholder:text-gray-400"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Model */}
						<FormField
							control={form.control}
							name="model"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Model
									</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g. 737-800"
											className="border-gray-200 focus:border-sky-950 text-gray-900 placeholder:text-gray-400"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Seat Capacity */}
						<FormField
							control={form.control as typeof form.control}
							name="seat_capacity"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Seat Capacity
									</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="e.g. 180"
											value={(field.value ?? "") as string | number}
											onChange={e => field.onChange(e.target.value)}
											className="border-gray-200 focus:border-sky-950 text-gray-900 placeholder:text-gray-400"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Status */}
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Status
									</FormLabel>
									<FormControl>
										<Input
											placeholder="active / maintenance"
											className="border-gray-200 focus:border-sky-950 text-gray-900 placeholder:text-gray-400"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Notes */}
						<FormField
							control={form.control}
							name="notes"
							render={({ field }) => (
								<FormItem className="sm:col-span-2">
									<FormLabel className="text-sm font-medium text-gray-700">
										Notes
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Additional details..."
											className="min-h-25 border-gray-200 focus:border-sky-950 resize-none text-gray-900 placeholder:text-gray-400"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Submit Button */}
						<div className="sm:col-span-2 pt-1">
							<Button
								type="submit"
								className="w-full bg-sky-950 hover:bg-sky-900 text-white font-medium"
							>
								Register Aircraft
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
