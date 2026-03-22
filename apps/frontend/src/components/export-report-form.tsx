"use client";
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
import type { ExportReportFormProps } from "@/props/export-report-props";

export function ExportReportForm({
	form,
	onSubmit,
	exporting,
	exportError,
	successMessage,
	onUppercaseChange,
}: ExportReportFormProps) {
	return (
		<Card className="w-full max-w-lg mx-auto border border-gray-200 shadow-sm">
			<CardHeader className="pb-4">
				<CardTitle className="text-lg font-semibold text-gray-900">
					Export Analytics Report
				</CardTitle>
				<CardDescription className="text-sm text-gray-500">
					Generate and email a CSV report of flight analytics data
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
						aria-label="Export report form"
					>
						{/* Email Field */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Email Address <span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="your.email@example.com"
											{...field}
											disabled={exporting}
											aria-required="true"
											className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20"
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
									<FormLabel className="text-sm font-medium text-gray-700">
										Time Period <span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
											disabled={exporting}
										>
											<SelectTrigger
												aria-label="Select time period"
												className="border-gray-200"
											>
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

						{/* Origin Airport */}
						<FormField
							control={form.control}
							name="origin_airport"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Origin Airport{" "}
										<span className="text-gray-400 font-normal">
											(Optional)
										</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g., LAX, JFK, DEL"
											{...field}
											disabled={exporting}
											value={field.value?.toUpperCase() ?? ""}
											onChange={onUppercaseChange(field.onChange)}
											className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Destination Airport */}
						<FormField
							control={form.control}
							name="destination_airport"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Destination Airport{" "}
										<span className="text-gray-400 font-normal">
											(Optional)
										</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g., BOM, LHR, NRT"
											{...field}
											disabled={exporting}
											value={field.value?.toUpperCase() ?? ""}
											onChange={onUppercaseChange(field.onChange)}
											className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Aircraft ID */}
						<FormField
							control={form.control}
							name="aircraft_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Aircraft ID{" "}
										<span className="text-gray-400 font-normal">
											(Optional)
										</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g., A380-001"
											{...field}
											disabled={exporting}
											className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Error Message */}
						{exportError && (
							<div
								role="alert"
								className="bg-red-50 border border-red-200 rounded-lg p-3"
							>
								<p className="text-sm text-red-700">{exportError}</p>
							</div>
						)}

						{/* Success Message */}
						{successMessage && (
							<div
								role="status"
								className="bg-green-50 border border-green-200 rounded-lg p-3"
							>
								<p className="text-sm text-green-700 whitespace-pre-line">
									{successMessage}
								</p>
							</div>
						)}

						{/* Submit Button */}
						<Button
							type="submit"
							className="w-full bg-sky-950 hover:bg-sky-900 text-white font-medium"
							disabled={exporting}
							aria-busy={exporting}
						>
							{exporting ? "Processing..." : "Generate & Email Report"}
						</Button>

						<p className="text-xs text-gray-400 text-center">
							The report will be generated in the background and emailed to you
						</p>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
