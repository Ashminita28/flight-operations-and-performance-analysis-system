import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { usePerformanceStore } from "../../store/performance-store";
import type {
	PerformanceProps,
	FormErrors,
} from "@/props/performance-modal-props";
import { validatePositiveNumber } from "@/utils/reports/positive-number-validator";

export function AddPerformanceModal({
	open,
	onClose,
	flightId,
}: PerformanceProps) {
	const { createPerformance, error: storeError } = usePerformanceStore();

	const [fuelUsed, setFuelUsed] = useState("");
	const [distance, setDistance] = useState("");
	const [passengers, setPassengers] = useState("");
	const [payload, setPayload] = useState("");
	const [flightTime, setFlightTime] = useState("");
	const [saving, setSaving] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

	const validate = (): boolean => {
		const errors: FormErrors = {};

		if (!fuelUsed) {
			errors.fuel_used_kg = "Fuel used is required";
		} else {
			const e = validatePositiveNumber(fuelUsed, "Fuel used");
			if (e) errors.fuel_used_kg = e;
		}

		if (!distance) {
			errors.distance_km = "Distance is required";
		} else {
			const e = validatePositiveNumber(distance, "Distance");
			if (e) errors.distance_km = e;
		}

		if (!flightTime) {
			errors.flight_time_minutes = "Flight time is required";
		} else {
			const num = parseInt(flightTime);
			if (isNaN(num) || num <= 0)
				errors.flight_time_minutes = "Flight time must be a positive integer";
		}

		if (passengers) {
			const num = parseInt(passengers);
			if (isNaN(num) || num < 0)
				errors.passengers_count = "Passengers must be a non-negative integer";
		}

		if (payload) {
			const e = validatePositiveNumber(payload, "Payload");
			if (e) errors.payload_kg = e;
		}

		setFieldErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async () => {
		setSubmitError(null);
		if (!validate()) return;

		try {
			setSaving(true);
			await createPerformance(flightId, {
				fuel_used_kg: parseFloat(fuelUsed),
				distance_km: parseFloat(distance),
				passengers_count: passengers ? parseInt(passengers) : 0,
				payload_kg: payload ? parseFloat(payload) : 0,
				flight_time_minutes: parseInt(flightTime),
			});
			setFuelUsed("");
			setDistance("");
			setPassengers("");
			setPayload("");
			setFlightTime("");
			setFieldErrors({});
			onClose();
		} catch (error: unknown) {
			setSubmitError(
				error instanceof Error
					? error.message
					: "Failed to save performance data",
			);
		} finally {
			setSaving(false);
		}
	};

	const handleClose = () => {
		setFieldErrors({});
		setSubmitError(null);
		onClose();
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen: unknown) => !isOpen && handleClose()}
		>
			<DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto border border-gray-200 shadow-md">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold text-gray-900">
						Record Flight Performance
					</DialogTitle>
				</DialogHeader>

				<div
					className="flex flex-col gap-4 py-2"
					aria-label="Performance form"
				>
					{(submitError || storeError) && (
						<div
							role="alert"
							className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700"
						>
							{submitError || storeError}
						</div>
					)}

					{/* Fuel Used */}
					<div className="flex flex-col gap-1.5">
						<Label
							htmlFor="fuel_used"
							className="text-sm font-medium text-gray-700"
						>
							Fuel Used (kg) <span className="text-red-500">*</span>
						</Label>
						<Input
							id="fuel_used"
							type="number"
							min="0"
							step="0.01"
							placeholder="e.g. 4500"
							value={fuelUsed}
							onChange={e => setFuelUsed(e.target.value)}
							aria-describedby={
								fieldErrors.fuel_used_kg ? "fuel-error" : undefined
							}
							className={`border-gray-200 focus:border-sky-950 focus:ring-sky-950/20 ${fieldErrors.fuel_used_kg ? "border-red-400" : ""}`}
						/>
						{fieldErrors.fuel_used_kg && (
							<p
								id="fuel-error"
								className="text-xs text-red-500"
							>
								{fieldErrors.fuel_used_kg}
							</p>
						)}
					</div>

					{/* Distance */}
					<div className="flex flex-col gap-1.5">
						<Label
							htmlFor="distance"
							className="text-sm font-medium text-gray-700"
						>
							Distance (km) <span className="text-red-500">*</span>
						</Label>
						<Input
							id="distance"
							type="number"
							min="0"
							step="0.1"
							placeholder="e.g. 1200"
							value={distance}
							onChange={e => setDistance(e.target.value)}
							aria-describedby={
								fieldErrors.distance_km ? "dist-error" : undefined
							}
							className={`border-gray-200 focus:border-sky-950 focus:ring-sky-950/20 ${fieldErrors.distance_km ? "border-red-400" : ""}`}
						/>
						{fieldErrors.distance_km && (
							<p
								id="dist-error"
								className="text-xs text-red-500"
							>
								{fieldErrors.distance_km}
							</p>
						)}
					</div>

					{/* Flight Time */}
					<div className="flex flex-col gap-1.5">
						<Label
							htmlFor="flight_time"
							className="text-sm font-medium text-gray-700"
						>
							Flight Time (minutes) <span className="text-red-500">*</span>
						</Label>
						<Input
							id="flight_time"
							type="number"
							min="1"
							step="1"
							placeholder="e.g. 120"
							value={flightTime}
							onChange={e => setFlightTime(e.target.value)}
							aria-describedby={
								fieldErrors.flight_time_minutes ? "time-error" : undefined
							}
							className={`border-gray-200 focus:border-sky-950 focus:ring-sky-950/20 ${fieldErrors.flight_time_minutes ? "border-red-400" : ""}`}
						/>
						{fieldErrors.flight_time_minutes && (
							<p
								id="time-error"
								className="text-xs text-red-500"
							>
								{fieldErrors.flight_time_minutes}
							</p>
						)}
					</div>

					{/* Passengers */}
					<div className="flex flex-col gap-1.5">
						<Label
							htmlFor="passengers"
							className="text-sm font-medium text-gray-700"
						>
							Passengers Count
						</Label>
						<Input
							id="passengers"
							type="number"
							min="0"
							step="1"
							placeholder="e.g. 165"
							value={passengers}
							onChange={e => setPassengers(e.target.value)}
							className={`border-gray-200 focus:border-sky-950 focus:ring-sky-950/20 ${fieldErrors.passengers_count ? "border-red-400" : ""}`}
						/>
						{fieldErrors.passengers_count && (
							<p className="text-xs text-red-500">
								{fieldErrors.passengers_count}
							</p>
						)}
					</div>

					{/* Payload */}
					<div className="flex flex-col gap-1.5">
						<Label
							htmlFor="payload"
							className="text-sm font-medium text-gray-700"
						>
							Payload (kg)
						</Label>
						<Input
							id="payload"
							type="number"
							min="0"
							step="0.01"
							placeholder="e.g. 15000"
							value={payload}
							onChange={e => setPayload(e.target.value)}
							className={`border-gray-200 focus:border-sky-950 focus:ring-sky-950/20 ${fieldErrors.payload_kg ? "border-red-400" : ""}`}
						/>
						{fieldErrors.payload_kg && (
							<p className="text-xs text-red-500">{fieldErrors.payload_kg}</p>
						)}
					</div>

					<p className="text-xs text-gray-400">
						<span className="text-red-500">*</span> Required fields
					</p>
				</div>

				<DialogFooter className="gap-2">
					<Button
						variant="outline"
						onClick={handleClose}
						disabled={saving}
						className="border-gray-200 text-gray-700 hover:bg-gray-50"
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={saving}
						className="bg-sky-950 hover:bg-sky-900 text-white"
					>
						{saving ? "Saving..." : "Record Performance"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
