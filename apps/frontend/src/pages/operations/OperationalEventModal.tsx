import { useState, useEffect } from "react";
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
import { Textarea } from "../../components/ui/textarea";
import { useOperationStore } from "@/store/operation-store";
import { useDelayStore } from "../../store/delay-store";
import { operationSchema } from "@/schemas/operation-schema";
import { toast } from "sonner";

interface Props {
	open: boolean;
	onClose: () => void;
	flightId: string;
}

export function AddEventModal({ open, onClose, flightId }: Props) {
	const [delayCategoryId, setDelayCategoryId] = useState("");
	const [delayMinutes, setDelayMinutes] = useState("");
	const [description, setDescription] = useState("");
	const [eventTime, setEventTime] = useState("");
	const [eventType, setEventType] = useState("");
	const [severity, setSeverity] = useState("");
	const [saving, setSaving] = useState(false);

	const addOperationalEvent = useOperationStore(s => s.addEvent);
	const categories = useDelayStore(s => s.categories);
	const fetchCategories = useDelayStore(s => s.fetchCategories);

	useEffect(() => {
		if (open) fetchCategories();
	}, [open, fetchCategories]);

	const handleSubmit = async () => {
		if (!flightId) return;

		const formData = {
			event_type: eventType,
			delay_category_id: delayCategoryId,
			delay_minutes: delayMinutes,
			severity,
			description,
			event_time: eventTime,
		};

		const result = operationSchema.safeParse(formData);

		if (!result.success) {
			toast.error(result.error.message);
			return;
		}

		if (
			!description ||
			!eventTime ||
			!severity ||
			!eventType ||
			!delayCategoryId
		)
			return;

		setSaving(true);

		await addOperationalEvent(flightId, {
			event_type: eventType,
			delay_category_id: delayCategoryId,
			delay_minutes: delayMinutes ? parseInt(delayMinutes) : undefined,
			severity,
			description,
			event_time: new Date(eventTime).toISOString(),
		});
		toast("Operation Event Submitted Successfully");

		setSaving(false);
		setEventType("");
		setDelayCategoryId("");
		setDelayMinutes("");
		setSeverity("");
		setDescription("");
		setEventTime("");

		onClose();
	};

	return (
		<Dialog
			open={open}
			onOpenChange={isOpen => !isOpen && onClose()}
		>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Add Operational Event</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-4 py-2">
					<div className="flex flex-col gap-2">
						<Label>Event Type</Label>
						<Input
							placeholder="Enter event type (cancelled,delayed,diverted) only"
							value={eventType}
							onChange={e => setEventType(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Event Category</Label>
						<select
							value={delayCategoryId}
							onChange={e => setDelayCategoryId(e.target.value)}
							className="border rounded px-2 py-1"
						>
							<option value="">Select category</option>
							{categories.map(cat => (
								<option
									key={cat.id}
									value={cat.id}
								>
									{cat.code} – {cat.name}
								</option>
							))}
						</select>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Delay Minutes</Label>
						<Input
							placeholder="Add minutes if delayed"
							type="number"
							value={delayMinutes}
							onChange={e => setDelayMinutes(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Severity</Label>
						<Input
							placeholder="Enter severity"
							value={severity}
							onChange={e => setSeverity(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Event Time</Label>
						<Input
							type="datetime-local"
							value={eventTime}
							onChange={e => setEventTime(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Description(Reason)</Label>
						<Textarea
							rows={3}
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
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
						disabled={
							saving || !description || !eventTime || !severity || !eventType
						}
					>
						{saving ? "Saving..." : "Add Event"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
