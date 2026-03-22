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
import type { OperationProps } from "@/props/operation-props";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function AddEventModal({ open, onClose, flightId }: OperationProps) {
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
			onOpenChange={(isOpen: unknown) => !isOpen && onClose()}
		>
			<DialogContent className="sm:max-w-lg border border-gray-200 shadow-md">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold text-gray-900">
						Add Operational Event
					</DialogTitle>
				</DialogHeader>

				<div
					className="flex flex-col gap-4 py-2"
					aria-label="Operational event form"
				>
					{/* Event Type */}
					<div className="flex flex-col gap-1.5">
						<Label
							htmlFor="event-type"
							className="text-sm font-medium text-gray-700"
						>
							Event Type <span className="text-red-500">*</span>
						</Label>
						<Select
							value={eventType}
							onValueChange={setEventType}
						>
							<SelectTrigger
								id="event-type"
								aria-label="Select event type"
								className="border-gray-200"
							>
								<SelectValue placeholder="Select event type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="cancelled">Cancelled</SelectItem>
								<SelectItem value="delayed">Delayed</SelectItem>
								<SelectItem value="diverted">Diverted</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Event Category */}
					<div className="flex flex-col gap-1.5">
						<Label
							htmlFor="event-category"
							className="text-sm font-medium text-gray-700"
						>
							Event Category <span className="text-red-500">*</span>
						</Label>
						<Select
							value={delayCategoryId}
							onValueChange={setDelayCategoryId}
						>
							<SelectTrigger
								id="event-category"
								aria-label="Select event category"
								className="border-gray-200"
							>
								<SelectValue placeholder="Select category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map(cat => (
									<SelectItem
										key={cat.id}
										value={cat.id}
									>
										{cat.code} – {cat.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Delay Minutes */}
					<div className="flex flex-col gap-1.5">
						<Label
							htmlFor="delay-minutes"
							className="text-sm font-medium text-gray-700"
						>
							Delay Minutes
						</Label>
						<Input
							id="delay-minutes"
							placeholder="Add minutes if delayed"
							type="number"
							value={delayMinutes}
							onChange={e => setDelayMinutes(e.target.value)}
							className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20"
						/>
					</div>

					{/* Severity */}
					<div className="flex flex-col gap-1.5">
						<Label
							htmlFor="severity"
							className="text-sm font-medium text-gray-700"
						>
							Severity <span className="text-red-500">*</span>
						</Label>
						<Select
							value={severity}
							onValueChange={setSeverity}
						>
							<SelectTrigger
								id="severity"
								aria-label="Select severity level"
								className="border-gray-200"
							>
								<SelectValue placeholder="Select severity" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="low">Low</SelectItem>
								<SelectItem value="medium">Medium</SelectItem>
								<SelectItem value="high">High</SelectItem>
								<SelectItem value="critical">Critical</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Event Time */}
					<div className="flex flex-col gap-1.5">
						<Label
							htmlFor="event-time"
							className="text-sm font-medium text-gray-700"
						>
							Event Time <span className="text-red-500">*</span>
						</Label>
						<Input
							id="event-time"
							type="datetime-local"
							value={eventTime}
							onChange={e => setEventTime(e.target.value)}
							className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20"
						/>
					</div>

					{/* Description */}
					<div className="flex flex-col gap-1.5">
						<Label
							htmlFor="description"
							className="text-sm font-medium text-gray-700"
						>
							Description / Reason <span className="text-red-500">*</span>
						</Label>
						<Textarea
							id="description"
							rows={3}
							value={description}
							onChange={e => setDescription(e.target.value)}
							placeholder="Describe the reason for this event..."
							className="border-gray-200 focus:border-sky-950 focus:ring-sky-950/20 resize-none"
						/>
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
						disabled={
							saving || !description || !eventTime || !severity || !eventType
						}
						className="bg-sky-950 hover:bg-sky-900 text-white"
					>
						{saving ? "Saving..." : "Add Event"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
