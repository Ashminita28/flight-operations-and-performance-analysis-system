import { CardAircraft } from "@/components/aircraft-card";
import { CardCrew } from "@/components/crew-card";
import { CardFlight } from "@/components/flight-card";
import { CardFlightEvent } from "@/components/flightevent-card";
import { CardMaintainance } from "@/components/maintainance-card";

function OperationDashboard() {
	return (
		<div className="min-h-screen bg-sky-950 text-white p-10">
			<h1 className="text-3xl font-bold text-center mb-10">
				OPERATION DASHBOARD
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
				<CardAircraft />
				<CardFlight />
				<CardFlightEvent />
				<CardCrew />
				<CardMaintainance />
			</div>
		</div>
	);
}

export default OperationDashboard;
