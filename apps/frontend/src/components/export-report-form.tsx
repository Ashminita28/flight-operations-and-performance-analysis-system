"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAnalyticsStore } from "@/store/analytics-store";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { exportSchema } from "@/schemas/export-schema";

type ExportFormValues = z.infer<typeof exportSchema>;

export function ExportReportForm() {
	const { initiateExport, exporting, exportError, clearError } =
		useAnalyticsStore();
	const [successMessage, setSuccessMessage] = useState("");

	const form = useForm<ExportFormValues>({
		resolver: zodResolver(exportSchema),
		defaultValues: {
			email: "",
			time_filter: "monthly",
			origin_airport: "",
			destination_airport: "",
			aircraft_id: "",
		},
	});

	async function onSubmit(data: ExportFormValues) {
		try {
			clearError();
			setSuccessMessage("");

			const result = await initiateExport({
				email: data.email,
				time_filter: data.time_filter,
				origin_airport: data.origin_airport || undefined,
				destination_airport: data.destination_airport || undefined,
				aircraft_id: data.aircraft_id || undefined,
			});

			setSuccessMessage(
				`Export initiated successfully! Job ID: ${result.job_id}\n\nYou will receive the CSV file at ${data.email} shortly.`,
			);
			form.reset();
			toast.success("Export initiated! Check your email soon.");
		} catch (error: any) {
			const errorMsg = error.message || "Failed to initiate export";
			toast.error(errorMsg);
		}
	}

	return (
		<Card className="w-full max-w-lg mx-auto">
			<CardHeader>
				<CardTitle>Export Analytics Report</CardTitle>
				<CardDescription>
					Generate and email a CSV report of flight analytics data
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						{/* Email Field */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address *</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="your.email@example.com"
											{...field}
											disabled={exporting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Time Filter */}
						<FormField
							control={form.control}
							name="time_filter"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Time Period *</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
											disabled={exporting}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="daily">Last Day</SelectItem>
												<SelectItem value="weekly">Last Week</SelectItem>
												<SelectItem value="monthly">Last Month</SelectItem>
												<SelectItem value="yearly">Last Year</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Origin Airport (Optional) */}
						<FormField
							control={form.control}
							name="origin_airport"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Origin Airport (Optional)</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g., LAX, JFK, DEL"
											{...field}
											disabled={exporting}
											value={field.value?.toUpperCase() || ""}
											onChange={e =>
												field.onChange(e.target.value.toUpperCase())
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Destination Airport (Optional) */}
						<FormField
							control={form.control}
							name="destination_airport"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Destination Airport (Optional)</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g., BOM, LHR, NRT"
											{...field}
											disabled={exporting}
											value={field.value?.toUpperCase() || ""}
											onChange={e =>
												field.onChange(e.target.value.toUpperCase())
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Aircraft ID (Optional) */}
						<FormField
							control={form.control}
							name="aircraft_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Aircraft ID (Optional)</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g., A380-001"
											{...field}
											disabled={exporting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Error Message */}
						{exportError && (
							<div className="bg-red-50 border border-red-200 rounded-md p-3">
								<p className="text-sm text-red-700">{exportError}</p>
							</div>
						)}

						{/* Success Message */}
						{successMessage && (
							<div className="bg-green-50 border border-green-200 rounded-md p-3">
								<p className="text-sm text-green-700 whitespace-pre-line">
									{successMessage}
								</p>
							</div>
						)}

						{/* Submit Button */}
						<Button
							type="submit"
							className="w-full bg-sky-950 hover:bg-sky-900"
							disabled={exporting}
						>
							{exporting ? "Processing..." : "Generate & Email Report"}
						</Button>

						<p className="text-xs text-muted-foreground text-center">
							The report will be generated in the background and emailed to you
						</p>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
