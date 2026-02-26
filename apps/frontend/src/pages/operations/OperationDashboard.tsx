import { CardAircraft } from "@/components/aircraft-card";
import { CardCrew } from "@/components/crew-card";
import { CardFlight } from "@/components/flight-card";
import { CardFlightEvent } from "@/components/flightevent-card";
import { CardMaintainance } from "@/components/maintainance-card";

function OperationDashboard() {
	return (
		<>
			<h1>OPERATION DASHBOARD</h1>
			<div className="h-screen flex items-center justify-center">
				<CardAircraft />
				<CardFlight />
				<CardFlightEvent />
				<CardCrew />
				<CardMaintainance />
			</div>
		</>
	);
}

export default OperationDashboard;
