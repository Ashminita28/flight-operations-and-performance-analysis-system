import { useEffect, useState, useCallback } from "react";
import { FlightTable } from "@/components/all-flights-table";
import FlightRegistration from "./operations/FlightRegistration";
import { useFlightStore } from "@/store/flight-store";
import { useAircraftStore } from "@/store/aircraft-store";
import type {
	FlightRow,
	FlightStatus,
	FlightQueryParams,
} from "@/types/flight-types";

export default function FlightDashboard() {
	const [isOpen, setIsOpen] = useState(false);
	const flights = useFlightStore(s => s.flights);
	const pagination = useFlightStore(s => s.pagination);
	const filters = useFlightStore(s => s.filters);
	const loading = useFlightStore(s => s.loading);
	const aircraftMap = useFlightStore(s => s.aircraftMap);
	const fetchAircraft = useAircraftStore(s => s.fetchAircraft);
	const fetchFlights = useFlightStore(s => s.fetchFlights);
	const deleteFlight = useFlightStore(s => s.deleteFlight);

	useEffect(() => {
		const fetchData = async () => {
			await fetchAircraft();
			await fetchFlights();
		};

		fetchData();
	}, [fetchAircraft, fetchFlights]);

	const tableData: FlightRow[] = (Array.isArray(flights) ? flights : []).map(
		f => ({
			id: f.id,
			flightNumber: f.flight_number,
			airline: f.airline_code,
			route: `${f.origin_airport} → ${f.destination_airport}`,
			status: f.status,
			aircraft: aircraftMap[f.aircraft_id] ?? f.aircraft_id,
			date: f.flight_date,
			departure: f.scheduled_departure,
			arrival: f.scheduled_arrival,
			return: f.is_return_flight ? "Yes" : "No",
		}),
	);

	const handlePageChange = useCallback(
		(page: number) => {
			fetchFlights({ page });
		},
		[fetchFlights],
	);

	const handlePageSizeChange = useCallback(
		(limit: number) => {
			fetchFlights({ limit, page: 1 });
		},
		[fetchFlights],
	);

	const handleSearch = useCallback(
		(query: string) => {
			fetchFlights({
				page: 1,
				flight_number: query || undefined,
			});
		},
		[fetchFlights],
	);

	const handleStatusFilter = useCallback(
		(status: FlightStatus | "") => {
			fetchFlights({ status, page: 1 });
		},
		[fetchFlights],
	);

	const handleSort = useCallback(
		(params: Pick<FlightQueryParams, "sort_by" | "sort_order">) => {
			fetchFlights({ ...params, page: 1 });
		},
		[fetchFlights],
	);

	const handleDelete = useCallback(
		async (id: string) => {
			if (!confirm("Delete this flight? This cannot be undone.")) return;
			try {
				await deleteFlight(id);
			} catch (err: unknown) {
				const message =
					err instanceof Error ? err.message : "Failed to delete flight";
				alert(message);
			}
		},
		[deleteFlight],
	);

	const refreshFlights = useCallback(() => {
		fetchFlights(filters);
	}, [filters, fetchFlights]);

	return (
		<div className="flex flex-1 flex-col bg-gray-50 min-h-screen">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<FlightTable
						data={tableData}
						loading={loading}
						currentPage={pagination.page}
						totalPages={pagination.total_pages}
						totalRows={pagination.total}
						pageSize={pagination.limit}
						onPageChange={handlePageChange}
						onPageSizeChange={handlePageSizeChange}
						onAddClick={() => setIsOpen(true)}
						onSearch={handleSearch}
						onStatusFilter={handleStatusFilter}
						onSort={handleSort}
						onDelete={handleDelete}
					/>
				</div>
			</div>

			{isOpen && (
				<div
					className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
					onClick={e => {
						if (e.target === e.currentTarget) setIsOpen(false);
					}}
				>
					<div className="w-full max-w-lg mx-4">
						<FlightRegistration
							onClose={() => setIsOpen(false)}
							refreshFlights={refreshFlights}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
