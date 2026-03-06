import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { DataTable } from "@/components/data-table";
import FlightRegistration from "./operations/FlightRegistration";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
	const navigate = useNavigate();

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	useEffect(() => {
		loadFlights();
	}, []);

	async function loadFlights() {
		try {
			const [flightsRes, aircraftRes] = await Promise.all([
				api<{ success: boolean; data: any[] }>("/flights"),
				api<{ success: boolean; data: any[] }>("/aircraft").catch(() => ({
					success: false,
					data: [],
				})),
			]);

			console.log("Flights from backend", flightsRes);

			const aircraftMap: Record<string, string> = {};
			if (aircraftRes.data) {
				aircraftRes.data.forEach((a: any) => {
					aircraftMap[a.id] = a.name ?? a.model ?? a.registration ?? a.id;
				});
			}

			const formatted: FlightRow[] = flightsRes.data.map((f: any) => ({
				id: f.id,
				flightNumber: f.flight_number,
				airline: f.airline_code,
				route: `${f.origin_airport} → ${f.destination_airport}`,
				status: f.status,
				aircraft: aircraftMap[f.aircraft_id] ?? f.aircraft_id,
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
			<Button onClick={() => navigate("/main-dashboard")}>
				Back to Dashboard
			</Button>
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<DataTable
						initialData={data}
						onAddClick={handleOpenModal}
					/>
					{isOpen && (
						<div className="fixed inset-0 backdrop-blur-sm bg-white/30  bg-opacity-50 flex items-center justify-center z-50">
							<FlightRegistration
								onClose={() => setIsOpen(false)}
								refreshFlights={loadFlights}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
