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
import { usePerformanceStore } from "../../store/performance-state";

interface Props {
	open: boolean;
	onClose: () => void;
	flightId: string;
}

export function AddPerformanceModal({ open, onClose, flightId }: Props) {
	const [fuelPlanned, setFuelPlanned] = useState("");
	const [fuelUsed, setFuelUsed] = useState("");
	const [fuelRemaining, setFuelRemaining] = useState("");
	const [blockTime, setBlockTime] = useState("");
	const [flightTime, setFlightTime] = useState("");
	const [distance, setDistance] = useState("");
	const [passengers, setPassengers] = useState("");
	const [cargoWeight, setCargoWeight] = useState("");
	const [payload, setPayload] = useState("");
	const [loadFactor, setLoadFactor] = useState("");
	const [co2Emissions, setCo2Emissions] = useState("");
	const [saving, setSaving] = useState(false);

	const createPerformance = usePerformanceStore(s => s.createPerformance);

	const handleSubmit = async () => {
		if (
			!fuelPlanned ||
			!fuelUsed ||
			!fuelRemaining ||
			!blockTime ||
			!flightTime
		)
			return;

		setSaving(true);

		await createPerformance({
			flight_id: flightId,
			fuel_planned_kg: parseFloat(fuelPlanned),
			fuel_used_kg: parseFloat(fuelUsed),
			fuel_remaining_kg: parseFloat(fuelRemaining),
			fuel_efficiency_kg_per_km:
				parseFloat(fuelUsed) / parseFloat(distance || "1"),
			block_time_minutes: parseInt(blockTime),
			flight_time_minutes: parseInt(flightTime),
			distance_km: parseFloat(distance),
			passengers_count: parseInt(passengers || "0"),
			cargo_weight_kg: parseFloat(cargoWeight || "0"),
			payload_kg: parseFloat(payload || "0"),
			load_factor_pct: parseFloat(loadFactor || "0"),
			co2_emissions_kg: parseFloat(co2Emissions || "0"),
		});

		setSaving(false);

		// reset form
		setFuelPlanned("");
		setFuelUsed("");
		setFuelRemaining("");
		setBlockTime("");
		setFlightTime("");
		setDistance("");
		setPassengers("");
		setCargoWeight("");
		setPayload("");
		setLoadFactor("");
		setCo2Emissions("");

		onClose();
	};

	return (
		<Dialog
			open={open}
			onOpenChange={isOpen => !isOpen && onClose()}
		>
			<DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Add Flight Performance</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-3 py-2">
					<Label>Fuel Planned (kg)</Label>
					<Input
						type="number"
						value={fuelPlanned}
						onChange={e => setFuelPlanned(e.target.value)}
					/>

					<Label>Fuel Used (kg)</Label>
					<Input
						type="number"
						value={fuelUsed}
						onChange={e => setFuelUsed(e.target.value)}
					/>

					<Label>Fuel Remaining (kg)</Label>
					<Input
						type="number"
						value={fuelRemaining}
						onChange={e => setFuelRemaining(e.target.value)}
					/>

					<Label>Block Time (minutes)</Label>
					<Input
						type="number"
						value={blockTime}
						onChange={e => setBlockTime(e.target.value)}
					/>

					<Label>Flight Time (minutes)</Label>
					<Input
						type="number"
						value={flightTime}
						onChange={e => setFlightTime(e.target.value)}
					/>

					<Label>Distance (km)</Label>
					<Input
						type="number"
						value={distance}
						onChange={e => setDistance(e.target.value)}
					/>

					<Label>Passengers Count</Label>
					<Input
						type="number"
						value={passengers}
						onChange={e => setPassengers(e.target.value)}
					/>

					<Label>Cargo Weight (kg)</Label>
					<Input
						type="number"
						value={cargoWeight}
						onChange={e => setCargoWeight(e.target.value)}
					/>

					<Label>Payload (kg)</Label>
					<Input
						type="number"
						value={payload}
						onChange={e => setPayload(e.target.value)}
					/>

					<Label>Load Factor (%)</Label>
					<Input
						type="number"
						value={loadFactor}
						onChange={e => setLoadFactor(e.target.value)}
					/>

					<Label>CO2 Emissions (kg)</Label>
					<Input
						type="number"
						value={co2Emissions}
						onChange={e => setCo2Emissions(e.target.value)}
					/>
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={onClose}
						disabled={saving}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={
							saving ||
							!fuelPlanned ||
							!fuelUsed ||
							!fuelRemaining ||
							!blockTime ||
							!flightTime
						}
					>
						{saving ? "Saving..." : "Add Performance"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
