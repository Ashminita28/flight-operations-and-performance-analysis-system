import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { AddEventModal } from "../pages/operations/OperationalEventModal";
import { UpdateStatusModal } from "../pages/operations/UpdateStatusModal";
import { useFlightStore } from "../store/flight-store";
import { useOperationStore } from "@/store/operation-store";
import { usePerformanceStore } from "../store/performance-store";
import type { FlightStatus } from "@/types/flight-types";
import { AddPerformanceModal } from "./operations/PerformanceModal";
import { STATUS_COLORS, SEVERITY_COLORS } from "@/constants/flight-constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	AlertCircle,
	Clock,
	Plane,
	Fuel,
	BarChart2,
	Calendar,
	ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FlightDetail() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { selectedFlight: f, fetchFlightById, loading } = useFlightStore();
	const { events, fetchEvents } = useOperationStore();
	const { performance, fetchPerformance } = usePerformanceStore();

	const [statusModalOpen, setStatusModalOpen] = useState(false);
	const [eventModalOpen, setEventModalOpen] = useState(false);
	const [performanceModalOpen, setPerformanceModalOpen] = useState(false);

	useEffect(() => {
		if (id) {
			fetchFlightById(id);
			fetchEvents(id);
			fetchPerformance(id);
		}
	}, [id, fetchEvents, fetchFlightById, fetchPerformance]);

	const handleStatusModalClose = () => {
		setStatusModalOpen(false);
		if (id) fetchFlightById(id);
	};
	const handleEventModalClose = () => {
		setEventModalOpen(false);
		if (id) fetchEvents(id);
	};
	const handlePerformanceModalClose = () => {
		setPerformanceModalOpen(false);
		if (id) fetchPerformance(id);
	};

	if (loading || !f) {
		return (
			<div
				className="flex items-center justify-center h-screen bg-gray-50"
				role="status"
				aria-label="Loading flight details"
			>
				<p className="text-gray-400 text-sm">Loading flight details...</p>
			</div>
		);
	}

	return (
		<main
			className="min-h-screen bg-gray-50 p-4 sm:p-6"
			aria-label="Flight detail"
		>
			<div className="max-w-3xl mx-auto flex flex-col gap-5">
				{/* Back button */}
				<button
					onClick={() => navigate("/flight-dashboard")}
					aria-label="Back to flight dashboard"
					className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 w-fit transition-colors"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Flights
				</button>

				{/* Header */}
				<div className="flex items-start justify-between flex-wrap gap-3">
					<div>
						<div className="flex items-center gap-2">
							<h1 className="text-2xl font-semibold text-gray-900">
								{f.flight_number}
							</h1>
							<span
								className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
									STATUS_COLORS[f.status as FlightStatus] ??
									"bg-gray-100 text-gray-600"
								}`}
							>
								{f.status}
							</span>
						</div>
						<p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
							<Plane className="h-3.5 w-3.5" />
							{f.origin_airport} → {f.destination_airport}
						</p>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-2 flex-wrap">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setStatusModalOpen(true)}
							aria-label="Update flight status"
							className="border-gray-200 text-gray-700 hover:bg-gray-50 text-sm"
						>
							Update Status
						</Button>
						<Button
							size="sm"
							onClick={() => setEventModalOpen(true)}
							aria-label="Add operational event"
							className="bg-sky-950 hover:bg-sky-900 text-white text-sm"
						>
							Add Event
						</Button>
						<Button
							size="sm"
							onClick={() => setPerformanceModalOpen(true)}
							aria-label="Record flight performance"
							className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
						>
							Add Performance
						</Button>
					</div>
				</div>

				{/* Flight Details Card */}
				<Card className="border border-gray-200 shadow-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
							<Calendar className="h-4 w-4" />
							Flight Details
						</CardTitle>
					</CardHeader>
					<Separator />
					<CardContent className="pt-4">
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
							<DetailItem
								label="Flight Number"
								value={f.flight_number}
							/>
							<DetailItem
								label="Airline Code"
								value={f.airline_code}
							/>
							<DetailItem
								label="Aircraft"
								value={f.aircraft_id}
							/>
							<DetailItem
								label="Route"
								value={`${f.origin_airport} → ${f.destination_airport}`}
							/>
							<DetailItem
								label="Departure Gate"
								value={f.gate_departure ?? "—"}
							/>
							<DetailItem
								label="Arrival Gate"
								value={f.gate_arrival ?? "—"}
							/>
							<DetailItem
								label="Scheduled Departure"
								value={new Date(f.scheduled_departure).toLocaleString()}
							/>
							<DetailItem
								label="Scheduled Arrival"
								value={new Date(f.scheduled_arrival).toLocaleString()}
							/>
							{f.actual_departure && (
								<DetailItem
									label="Actual Departure"
									value={new Date(f.actual_departure).toLocaleString()}
								/>
							)}
							{f.actual_arrival && (
								<DetailItem
									label="Actual Arrival"
									value={new Date(f.actual_arrival).toLocaleString()}
								/>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Performance Card */}
				<Card className="border border-gray-200 shadow-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
							<BarChart2 className="h-4 w-4" />
							Performance Metrics
						</CardTitle>
					</CardHeader>
					<Separator />
					<CardContent className="pt-4">
						{performance ? (
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
								<MetricCard
									label="Fuel Used"
									value={performance.fuel_used_kg}
									unit="kg"
									icon={<Fuel className="h-4 w-4 text-sky-950" />}
								/>
								<MetricCard
									label="Distance"
									value={performance.distance_km}
									unit="km"
									icon={<Plane className="h-4 w-4 text-sky-950" />}
								/>
								<MetricCard
									label="Fuel Efficiency"
									value={performance.fuel_efficiency_kg_per_km}
									unit="kg/km"
									icon={<BarChart2 className="h-4 w-4 text-sky-950" />}
								/>
								<MetricCard
									label="Load Factor"
									value={`${performance.load_factor_pct}%`}
									unit="passenger load"
									icon={<BarChart2 className="h-4 w-4 text-sky-950" />}
								/>
								<MetricCard
									label="CO₂ Emissions"
									value={performance.co2_emissions_kg}
									unit="kg"
									icon={<AlertCircle className="h-4 w-4 text-sky-950" />}
								/>
								<MetricCard
									label="Flight Time"
									value={performance.flight_time_minutes}
									unit="min"
									icon={<Clock className="h-4 w-4 text-sky-950" />}
								/>
							</div>
						) : (
							<p className="text-sm text-gray-400 py-2">
								No performance data recorded yet.
							</p>
						)}
					</CardContent>
				</Card>

				{/* Operational Events Card */}
				<Card className="border border-gray-200 shadow-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
							<AlertCircle className="h-4 w-4" />
							Operational Events
						</CardTitle>
					</CardHeader>
					<Separator />
					<CardContent className="pt-4">
						{events.length === 0 ? (
							<p className="text-sm text-gray-400 py-2">
								No events recorded for this flight.
							</p>
						) : (
							<div className="flex flex-col gap-3">
								{events.map(event => (
									<div
										key={event.id}
										className="border border-gray-100 rounded-lg p-4 bg-gray-50 flex flex-col gap-1.5"
									>
										<div className="flex items-center justify-between gap-2 flex-wrap">
											<span className="text-sm font-semibold text-gray-800 capitalize">
												{event.event_type.replace(/_/g, " ")}
											</span>
											<Badge
												variant="secondary"
												className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${
													SEVERITY_COLORS[event.severity?.toLowerCase()] ??
													"bg-gray-100 text-gray-600"
												}`}
											>
												{event.severity}
											</Badge>
										</div>
										{event.description && (
											<p className="text-sm text-gray-600">
												{event.description}
											</p>
										)}
										<p className="text-xs text-gray-400">
											{new Date(event.event_time).toLocaleString()}
										</p>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Modals */}
			<UpdateStatusModal
				open={statusModalOpen}
				onClose={handleStatusModalClose}
				flightId={f.id}
				currentStatus={f.status as FlightStatus}
			/>
			{f && (
				<AddEventModal
					open={eventModalOpen}
					onClose={handleEventModalClose}
					flightId={f.id}
				/>
			)}
			<AddPerformanceModal
				open={performanceModalOpen}
				onClose={handlePerformanceModalClose}
				flightId={f.id}
			/>
		</main>
	);
}

/* ── Small helper components ── */

function DetailItem({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="text-xs text-gray-400 mb-0.5">{label}</p>
			<p className="text-sm font-medium text-gray-800">{value}</p>
		</div>
	);
}

function MetricCard({
	label,
	value,
	unit,
	icon,
}: {
	label: string;
	value: string | number;
	unit: string;
	icon: React.ReactNode;
}) {
	return (
		<div className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col gap-1">
			<div className="flex items-center gap-1.5 mb-1">
				{icon}
				<p className="text-xs text-gray-400">{label}</p>
			</div>
			<p className="text-xl font-bold text-gray-900">{value}</p>
			<p className="text-xs text-gray-400">{unit}</p>
		</div>
	);
}
