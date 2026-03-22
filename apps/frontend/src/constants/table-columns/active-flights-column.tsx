import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { STATUS_BADGE } from "../flight-constants";
import type { ActiveFlightData } from "@/types/analytics-types";

export const columns: ColumnDef<ActiveFlightData>[] = [
	{
		accessorKey: "flight_number",
		header: "Flight",
		cell: ({ row }) => (
			<span className="font-semibold">{row.getValue("flight_number")}</span>
		),
	},
	{
		accessorKey: "airline_code",
		header: "Airline",
		cell: ({ row }) => <span>{row.getValue("airline_code")}</span>,
	},
	{
		id: "route",
		header: "Route",
		accessorFn: row => `${row.origin_airport} → ${row.destination_airport}`,
		cell: ({ row }) => (
			<span>{row.renderValue("route") as React.ReactNode}</span>
		),
	},
	{
		accessorKey: "aircraft_id",
		header: "Aircraft",
		cell: ({ row }) => (
			<span className="text-sm">{row.getValue("aircraft_id")}</span>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.original.status;
			const colorClass = STATUS_BADGE[status] ?? "bg-white/10 text-white";
			return (
				<Badge
					variant="outline"
					className={`px-2 py-0.5 text-xs font-medium capitalize border ${colorClass}`}
				>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</Badge>
			);
		},
	},
	{
		accessorKey: "scheduled_departure",
		header: "Scheduled Departure",
		cell: ({ row }) => {
			const date = new Date(row.getValue("scheduled_departure") as string);
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
		accessorKey: "estimated_departure",
		header: "Est. Departure",
		cell: ({ row }) => {
			const time = row.getValue("estimated_departure");
			if (!time) return <span className="text-muted-foreground">-</span>;
			const date = new Date(time as string);
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
];
