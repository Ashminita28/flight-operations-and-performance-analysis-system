import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AddEventModal } from "../pages/operations/OperationalEventModal";
import { UpdateStatusModal } from "../pages/operations/UpdateStatusModal";
import { useFlightStore } from "../store/flight-store";
import { useOperationStore } from "@/store/operation-state";
import { usePerformanceStore } from "../store/performance-state";
import type { FlightStatus } from "@/types/flight-types";
import { AddPerformanceModal } from "./operations/PerformanceModal";

const STATUS_COLORS: Record<FlightStatus, string> = {
	scheduled: "bg-blue-100 text-blue-800 border-blue-200",
	boarding: "bg-amber-100 text-amber-800 border-amber-200",
	departed: "bg-sky-100 text-sky-800 border-sky-200",
	landed: "bg-green-100 text-green-800 border-green-200",
	diverted: "bg-purple-100 text-purple-800 border-purple-200",
	cancelled: "bg-red-100 text-red-800 border-red-200",
	delayed: "bg-orange-100 text-orange-800 border-orange-200",
};

const getSeverityColor = (severity: string) => {
	switch (severity.toLowerCase()) {
		case "low":
			return "bg-gray-100 text-gray-700";
		case "medium":
			return "bg-yellow-100 text-yellow-800";
		case "high":
			return "bg-orange-100 text-orange-800";
		case "critical":
			return "bg-red-100 text-red-800";
		default:
			return "bg-white/10 text-white";
	}
};

export function FlightDetail() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { selectedFlight: f, fetchFlightById, loading } = useFlightStore();
	const { events, fetchEvents } = useOperationStore();
	const { performances, fetchPerformance } = usePerformanceStore();

	const [statusModalOpen, setStatusModalOpen] = useState(false);
	const [eventModalOpen, setEventModalOpen] = useState(false);
	const [performanceModalOpen, setPerformanceModalOpen] = useState(false);

	useEffect(() => {
		if (id) {
			fetchFlightById(id);
			fetchEvents(id);
			fetchPerformance();
		}
	}, [id]);

	const handleStatusModalClose = () => {
		setStatusModalOpen(false);
		if (id) {
			fetchFlightById(id);
		}
	};

	const handleEventModalClose = () => {
		setEventModalOpen(false);
		if (id) {
			fetchEvents(id);
		}
	};

	const handlePerformanceModalClose = () => {
		setPerformanceModalOpen(false);
		if (id) {
			fetchPerformance();
		}
	};

	if (loading || !f) {
		return (
			<div className="flex items-center justify-center h-48 text-sm text-white">
				Loading flight details...
			</div>
		);
	}

	const flightEvents = events;
	const flightPerformance = performances.find(p => p.flight_id === f.id);

	return (
		<div className="flex flex-col gap-6 p-6 bg-blue-950 min-h-screen text-white">
			<div className="flex items-start justify-between">
				<div>
					<Button
						variant="ghost"
						size="sm"
						className="mb-2 -ml-2 text-white"
						onClick={() => navigate("/flight-dashboard")}
					>
						← Back to Flights
					</Button>
					<h1 className="text-2xl font-semibold tracking-tight">
						Flight {f.flight_number}
					</h1>
					<p className="text-sm text-white/80 mt-1">
						{f.origin_airport} → {f.destination_airport}
					</p>
				</div>

				<div className="flex gap-2">
					<Button
						variant="outline"
						onClick={() => setStatusModalOpen(true)}
					>
						Update Status
					</Button>
					<Button
						onClick={e => {
							e.stopPropagation();
							setEventModalOpen(true);
						}}
					>
						Add Event
					</Button>
					<Button
						onClick={e => {
							e.stopPropagation();
							setPerformanceModalOpen(true);
						}}
					>
						Add Performance
					</Button>
				</div>
			</div>

			<Card className="bg-white/10 border-white/20">
				<CardHeader>
					<CardTitle>Flight Details</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-2 text-sm">
					<div className="flex justify-between">
						<span>Flight Number</span>
						<span>{f.flight_number}</span>
					</div>
					<div className="flex justify-between">
						<span>Airline Code</span>
						<span>{f.airline_code}</span>
					</div>
					<div className="flex justify-between">
						<span>Status</span>
						<span
							className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${STATUS_COLORS[f.status as FlightStatus]}`}
						>
							{f.status}
						</span>
					</div>
					<div className="flex justify-between">
						<span>Scheduled Departure</span>
						<span>{new Date(f.scheduled_departure).toLocaleString()}</span>
					</div>
					<div className="flex justify-between">
						<span>Scheduled Arrival</span>
						<span>{new Date(f.scheduled_arrival).toLocaleString()}</span>
					</div>
				</CardContent>
			</Card>

			<Card className="bg-white/10 border-white/20">
				<CardHeader>
					<CardTitle>Performance Metrics</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-2 text-sm">
					{flightPerformance ? (
						<>
							{Object.entries(flightPerformance).map(([key, value]) => (
								<div
									key={key}
									className="flex justify-between"
								>
									<span>
										{key
											.replace(/_/g, " ")
											.replace(/\b\w/g, c => c.toUpperCase())}
									</span>
									<span>{value}</span>
								</div>
							))}
						</>
					) : (
						<p className="text-sm text-white/80">
							No performance data recorded.
						</p>
					)}
				</CardContent>
			</Card>

			<Card className="bg-white/10 border-white/20">
				<CardHeader>
					<CardTitle>Operational Events</CardTitle>
				</CardHeader>
				<CardContent>
					{flightEvents.length === 0 ? (
						<p className="text-sm text-white/80">
							No events recorded for this flight.
						</p>
					) : (
						<div className="flex flex-col gap-3">
							{flightEvents.map(event => (
								<div
									key={event.id}
									className="rounded-lg border p-3 text-sm border-white/20"
								>
									<div className="flex justify-between">
										<span className="font-medium capitalize">
											{event.event_type.replace("_", " ")}
										</span>
										<span
											className={`rounded-full px-2 py-0.5 text-xs font-medium ${getSeverityColor(event.severity)}`}
										>
											{event.severity}
										</span>
									</div>
									<p className="text-white/80">{event.description}</p>
									<div className="text-xs text-white/70 mt-1">
										{new Date(event.event_time).toLocaleString()}
									</div>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>

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
