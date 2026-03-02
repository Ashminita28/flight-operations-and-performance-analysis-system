import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { DataTable } from "@/components/data-table";
import FlightRegistration from "./operations/FlightRegistration";

type FlightRow = {
	id: string;
	flightNumber: string;
	airline: string;
	route: string;
	status: string;
	aircraft: string;
	date: string;
	departure: string;
	arrival: string;
	return: string;
};

export default function FlightDashboard() {
	const [data, setData] = useState<FlightRow[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const handleOpenModal = () => {
		setIsOpen(true);
	};

	useEffect(() => {
		loadFlights();
	}, []);

	async function loadFlights() {
		try {
			const res = await api<{ success: boolean; data: any[] }>("/flights");
			console.log("Flights from backed", res);

			const formatted: FlightRow[] = res.data.map((f: any) => ({
				id: f.id,
				flightNumber: f.flight_number,
				airline: f.airline_code,
				route: `${f.origin_airport} → ${f.destination_airport}`,
				status: f.status,
				aircraft: f.aircraft_id,
				date: f.flight_date,
				departure: new Date(f.scheduled_departure).toISOString(),
				arrival: new Date(f.scheduled_arrival).toISOString(),
				return: f.is_return_flight ?? "",
			}));

			setData(formatted);
		} catch (err) {
			console.error("Error loading flights:", err);
		}
	}

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<DataTable
						initialData={data}
						onAddClick={handleOpenModal}
					/>
					{isOpen && (
						<FlightRegistration
							onClose={() => setIsOpen(false)}
							refreshFlights={loadFlights}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
