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
import type { FlightStatus } from "../../types/flight-types";
import type { StatusProps } from "@/props/status-modal-props";
import { STATUS_OPTIONS } from "@/constants/status-constants";

export function UpdateStatusModal({
	open,
	onClose,
	flightId,
	currentStatus,
}: StatusProps) {
	const [status, setStatus] = useState<FlightStatus>(currentStatus);
	const [saving, setSaving] = useState(false);
	const updateFlightStatus = useFlightStore(s => s.changeStatus);

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
			<DialogContent className="sm:max-w-md border border-gray-200 shadow-md">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold text-gray-900">
						Update Flight Status
					</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-4 py-2">
					<div className="flex flex-col gap-1.5">
						<Label
							htmlFor="status-select"
							className="text-sm font-medium text-gray-700"
						>
							Status
						</Label>
						<Select
							value={status}
							onValueChange={(val: unknown) => setStatus(val as FlightStatus)}
						>
							<SelectTrigger
								id="status-select"
								aria-label="Select new flight status"
								className="border-gray-200"
							>
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

				<DialogFooter className="gap-2">
					<Button
						variant="outline"
						onClick={onClose}
						disabled={saving}
						className="border-gray-200 text-gray-700 hover:bg-gray-50"
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={saving}
						className="bg-sky-950 hover:bg-sky-900 text-white"
					>
						{saving ? "Saving..." : "Update Status"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
