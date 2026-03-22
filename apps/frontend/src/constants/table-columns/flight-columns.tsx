import type { ColumnDef } from "@tanstack/react-table";
import type { FlightRow } from "@/types/flight-types";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { STATUS_BADGE } from "../flight-constants";
export function buildColumns(
	onDelete: (id: string) => void,
): ColumnDef<FlightRow>[] {
	return [
		{
			accessorKey: "flightNumber",
			header: "Flight",
			cell: ({ row }) => (
				<span className="font-semibold text-sky-950 tracking-wide">
					{row.original.flightNumber}
				</span>
			),
			enableHiding: false,
		},
		{
			accessorKey: "airline",
			header: "Airline",
			cell: ({ row }) => (
				<div className="w-24">
					<Badge
						variant="outline"
						className="text-sky-950 px-1.5"
					>
						{row.original.airline}
					</Badge>
				</div>
			),
		},
		{
			accessorKey: "route",
			header: "Route",
			cell: ({ row }) => (
				<div className="w-36">
					<Badge
						variant="outline"
						className="text-sky-950 px-1.5"
					>
						{row.original.route}
					</Badge>
				</div>
			),
		},
		{
			accessorKey: "aircraft",
			header: "Aircraft",
			cell: ({ row }) => (
				<div className="w-40">
					<Badge
						variant="outline"
						className="text-sky-950 px-1.5 truncate max-w-full block"
					>
						{row.original.aircraft}
					</Badge>
				</div>
			),
		},
		{
			accessorKey: "date",
			header: "Flight Date",
			cell: ({ row }) => (
				<div className="w-28">
					<Badge
						variant="outline"
						className="text-sky-950 px-1.5"
					>
						{row.original.date}
					</Badge>
				</div>
			),
		},
		{
			accessorKey: "departure",
			header: "Departure",
			cell: ({ row }) => (
				<div className="w-32">
					<Badge
						variant="outline"
						className="text-sky-950 px-1.5"
					>
						{new Date(row.original.departure).toLocaleString("en-IN", {
							day: "2-digit",
							month: "short",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</Badge>
				</div>
			),
		},
		{
			accessorKey: "arrival",
			header: "Arrival",
			cell: ({ row }) => (
				<div className="w-32">
					<Badge
						variant="outline"
						className="text-sky-950 px-1.5"
					>
						{new Date(row.original.arrival).toLocaleString("en-IN", {
							day: "2-digit",
							month: "short",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</Badge>
				</div>
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
						{status}
					</Badge>
				);
			},
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="data-[state=open]:bg-muted text-sky-950 flex size-8"
							size="icon"
							onClick={e => e.stopPropagation()}
						>
							<IconDotsVertical />
							<span className="sr-only">Open menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="w-32"
					>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							variant="destructive"
							onClick={(e: { stopPropagation: () => void }) => {
								e.stopPropagation();
								onDelete(row.original.id);
							}}
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];
}
