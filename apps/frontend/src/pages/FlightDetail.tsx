import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { AddEventModal } from "../pages/operations/OperationalEventModal";
import { UpdateStatusModal } from "../pages/operations/UpdateStatusModal";
import { useFlightStore } from "../store/flight-store";
import { useOperationStore } from "@/store/operation-store";
import { usePerformanceStore } from "../store/performance-store";
import type { FlightStatus } from "@/types/types";
import { AddPerformanceModal } from "./operations/PerformanceModal";

const STATUS_COLORS: Record<FlightStatus, string> = {
	scheduled: "bg-blue-100 text-blue-700",
	boarding: "bg-yellow-100 text-yellow-700",
	departed: "bg-sky-100 text-sky-700",
	landed: "bg-green-100 text-green-700",
	diverted: "bg-purple-100 text-purple-700",
	cancelled: "bg-red-100 text-red-700",
	delayed: "bg-orange-100 text-orange-700",
};

const SEVERITY_COLORS: Record<string, string> = {
	low: "bg-gray-100 text-gray-600",
	medium: "bg-yellow-100 text-yellow-700",
	high: "bg-orange-100 text-orange-700",
	critical: "bg-red-100 text-red-700",
};

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
	}, [id]);

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
			<div className="flex items-center justify-center h-screen bg-slate-900">
				<p className="text-slate-400 text-sm">Loading flight details...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-900 p-6">
			<div className="max-w-3xl mx-auto flex flex-col gap-5">
				<button
					onClick={() => navigate("/flight-dashboard")}
					className="text-slate-400 text-sm hover:text-white w-fit flex items-center gap-1"
				>
					← Back to Flights
				</button>

				<div className="flex items-center justify-between flex-wrap gap-3">
					<div>
						<h1 className="text-2xl font-bold text-white">{f.flight_number}</h1>
						<p className="text-slate-400 text-sm mt-0.5">
							{f.origin_airport} → {f.destination_airport}
						</p>
					</div>
					<div className="flex gap-2 flex-wrap">
						<Button
							variant="outline"
							size="sm"
							className="border-slate-600 text-slate-200 hover:bg-slate-700"
							onClick={() => setStatusModalOpen(true)}
						>
							Update Status
						</Button>
						<Button
							size="sm"
							className="bg-blue-600 hover:bg-blue-700 text-white"
							onClick={() => setEventModalOpen(true)}
						>
							Add Event
						</Button>
						<Button
							size="sm"
							className="bg-emerald-600 hover:bg-emerald-700 text-white"
							onClick={() => setPerformanceModalOpen(true)}
						>
							Add Performance
						</Button>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-5 shadow-sm">
					<h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
						Flight Details
					</h2>
					<div className="grid grid-cols-2 gap-y-4 gap-x-6">
						<div>
							<p className="text-xs text-slate-400 mb-0.5">Flight Number</p>
							<p className="text-sm font-semibold text-slate-800">
								{f.flight_number}
							</p>
						</div>
						<div>
							<p className="text-xs text-slate-400 mb-0.5">Airline Code</p>
							<p className="text-sm font-semibold text-slate-800">
								{f.airline_code}
							</p>
						</div>
						<div>
							<p className="text-xs text-slate-400 mb-0.5">Status</p>
							<span
								className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[f.status as FlightStatus] ?? "bg-gray-100 text-gray-600"}`}
							>
								{f.status}
							</span>
						</div>
						<div>
							<p className="text-xs text-slate-400 mb-0.5">Route</p>
							<p className="text-sm font-semibold text-slate-800">
								{f.origin_airport} → {f.destination_airport}
							</p>
						</div>
						<div>
							<p className="text-xs text-slate-400 mb-0.5">
								Scheduled Departure
							</p>
							<p className="text-sm font-semibold text-slate-800">
								{new Date(f.scheduled_departure).toLocaleString()}
							</p>
						</div>
						<div>
							<p className="text-xs text-slate-400 mb-0.5">Scheduled Arrival</p>
							<p className="text-sm font-semibold text-slate-800">
								{new Date(f.scheduled_arrival).toLocaleString()}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-5 shadow-sm">
					<h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
						Performance Metrics
					</h2>
					{performance ? (
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
							<div className="bg-slate-50 rounded-xl p-4">
								<p className="text-xs text-slate-400 mb-1">Fuel Used</p>
								<p className="text-lg font-bold text-slate-800">
									{performance.fuel_used_kg}
								</p>
								<p className="text-xs text-slate-400">kg</p>
							</div>
							<div className="bg-slate-50 rounded-xl p-4">
								<p className="text-xs text-slate-400 mb-1">Distance</p>
								<p className="text-lg font-bold text-slate-800">
									{performance.distance_km}
								</p>
								<p className="text-xs text-slate-400">km</p>
							</div>
							<div className="bg-slate-50 rounded-xl p-4">
								<p className="text-xs text-slate-400 mb-1">Fuel Efficiency</p>
								<p className="text-lg font-bold text-slate-800">
									{performance.fuel_efficiency_kg_per_km}
								</p>
								<p className="text-xs text-slate-400">kg / km</p>
							</div>
							<div className="bg-slate-50 rounded-xl p-4">
								<p className="text-xs text-slate-400 mb-1">Load Factor</p>
								<p className="text-lg font-bold text-slate-800">
									{performance.load_factor_pct}%
								</p>
								<p className="text-xs text-slate-400">passenger load</p>
							</div>
							<div className="bg-slate-50 rounded-xl p-4">
								<p className="text-xs text-slate-400 mb-1">CO₂ Emissions</p>
								<p className="text-lg font-bold text-slate-800">
									{performance.co2_emissions_kg}
								</p>
								<p className="text-xs text-slate-400">kg</p>
							</div>
						</div>
					) : (
						<p className="text-sm text-slate-400">
							No performance data recorded yet.
						</p>
					)}
				</div>

				<div className="bg-white rounded-2xl p-5 shadow-sm">
					<h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
						Operational Events
					</h2>
					{events.length === 0 ? (
						<p className="text-sm text-slate-400">
							No events recorded for this flight.
						</p>
					) : (
						<div className="flex flex-col gap-3">
							{events.map(event => (
								<div
									key={event.id}
									className="border border-slate-100 rounded-xl p-4 flex flex-col gap-1.5"
								>
									<div className="flex items-center justify-between gap-2">
										<span className="text-sm font-semibold text-slate-700 capitalize">
											{event.event_type.replace(/_/g, " ")}
										</span>
										<span
											className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${SEVERITY_COLORS[event.severity?.toLowerCase()] ?? "bg-gray-100 text-gray-600"}`}
										>
											{event.severity}
										</span>
									</div>
									{event.description && (
										<p className="text-sm text-slate-500">
											{event.description}
										</p>
									)}
									<p className="text-xs text-slate-400">
										{new Date(event.event_time).toLocaleString()}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
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
		</div>
	);
}
