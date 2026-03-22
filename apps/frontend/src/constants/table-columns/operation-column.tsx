import type { ColumnDef } from "@tanstack/react-table";
import type { OperationalEvent } from "@/types/flight-types";

export const operationColumns: ColumnDef<OperationalEvent>[] = [
	{
		accessorKey: "flight_id",
		header: "Flight",
		cell: ({ row }) => (
			<span className="font-semibold">{row.getValue("flight_id")}</span>
		),
	},
	{
		accessorKey: "event_type",
		header: "Event Type",
		cell: ({ row }) => <span>{row.getValue("event_type")}</span>,
	},
	{
		id: "delay_minutes",
		header: "Delay Minutes",
		cell: ({ row }) => <span>{row.getValue("delay_minutes")}</span>,
	},
	{
		accessorKey: "event_time",
		header: "Event Time",
		cell: ({ row }) => {
			const date = new Date(row.getValue("event_time") as string);
			return (
				<span className="text-sm">
					{date.toLocaleTimeString("en-US", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>
			);
		},
	},
	{
		accessorKey: "description",
		header: "Reason",
		cell: ({ row }) => (
			<span className="text-sm">{row.getValue("description")}</span>
		),
	},
];
