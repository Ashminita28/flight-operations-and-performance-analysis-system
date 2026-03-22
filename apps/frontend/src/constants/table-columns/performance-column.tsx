import type { ColumnDef } from "@tanstack/react-table";
import type { Performance } from "@/types/flight-types";

export const performanceColumns: ColumnDef<Performance>[] = [
	{
		accessorKey: "flight_id",
		header: "Flight",
		cell: ({ row }) => (
			<span className="font-semibold">{row.getValue("flight_id")}</span>
		),
	},
	{
		accessorKey: "fuel_used_kg",
		header: "Fuel Used",
		cell: ({ row }) => <span>{row.getValue("fuel_used_kg")}</span>,
	},
	{
		accessorKey: "distance_km",
		header: "Distance Covered",
		cell: ({ row }) => (
			<span className="text-sm">{row.getValue("distance_km")}</span>
		),
	},
	{
		accessorKey: "load_factor_pct",
		header: "Load Factor",
		cell: ({ row }) => (
			<span className="text-sm">{row.getValue("load_factor_pct")}</span>
		),
	},
	{
		accessorKey: "passengers_count",
		header: "Passenger Count",
		cell: ({ row }) => (
			<span className="text-sm">{row.getValue("passengers_count")}</span>
		),
	},
	{
		accessorKey: "flight_time_minutes",
		header: "Flight Time",
		cell: ({ row }) => (
			<span className="text-sm">{row.getValue("flight_time_minutes")}</span>
		),
	},
];
