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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { useFlightStore } from "../../store/flight-store";
import type { FlightStatus } from "../../types/types";

const STATUS_OPTIONS: { value: FlightStatus; label: string }[] = [
	{ value: "scheduled", label: "Scheduled" },
	{ value: "boarding", label: "Boarding" },
	{ value: "departed", label: "Departed" },
	{ value: "landed", label: "Landed" },
	{ value: "diverted", label: "Diverted" },
	{ value: "cancelled", label: "Cancelled" },
	{ value: "delayed", label: "Delayed" },
];

interface Props {
	open: boolean;
	onClose: () => void;
	flightId: string;
	currentStatus: FlightStatus;
}

export function UpdateStatusModal({
	open,
	onClose,
	flightId,
	currentStatus,
}: Props) {
	const [status, setStatus] = useState<FlightStatus>(currentStatus);
	const [saving, setSaving] = useState(false);
	const updateFlightStatus = useFlightStore(
		s=>s.changeStatus
	);

	const handleSubmit = async () => {
		setSaving(true);
		await updateFlightStatus(flightId, status);
		setSaving(false);
		onClose();
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onClose}
		>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Update Flight Status</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-4 py-2">
					<div className="flex flex-col gap-2">
						<Label htmlFor="status-select">Status</Label>
						<Select
							value={status}
							onValueChange={(val: unknown) => setStatus(val as FlightStatus)}
						>
							<SelectTrigger id="status-select">
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent>
								{STATUS_OPTIONS.map(opt => (
									<SelectItem
										key={opt.value}
										value={opt.value}
									>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
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
						disabled={saving}
					>
						{saving ? "Saving..." : "Update Status"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
