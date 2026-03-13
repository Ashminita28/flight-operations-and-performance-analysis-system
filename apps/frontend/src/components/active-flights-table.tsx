"use client";

import { useEffect, useState } from "react";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
} from "@tanstack/react-table";
import {
	IconChevronLeft,
	IconChevronRight,
	IconChevronsLeft,
	IconChevronsRight,
	IconSearch,
} from "@tabler/icons-react";

import { useAnalyticsStore } from "@/store/analytics-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { ActiveFlightData } from "@/types/analytics-types";

const STATUS_COLORS: Record<string, string> = {
	scheduled: "bg-blue-100 text-blue-800 border-blue-200",
	boarding: "bg-purple-100 text-purple-800 border-purple-200",
	departed: "bg-green-100 text-green-800 border-green-200",
};

const columns: ColumnDef<ActiveFlightData>[] = [
	{
		accessorKey: "flight_number",
		header: "Flight #",
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
			const status = row.getValue("status") as string;
			return (
				<Badge
					variant="outline"
					className={`${STATUS_COLORS[status] || "bg-gray-100 text-gray-800"}`}
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

interface ActiveFlightsTableProps {
	onFilterChange?: (filters: any) => void;
}

export function ActiveFlightsTable({}: ActiveFlightsTableProps) {
	const {
		activeFlights,
		pagination,
		loading,
		filters,
		fetchActiveFlights,
		setFilters,
	} = useAnalyticsStore();

	// Local state for filters
	const [originAirport, setOriginAirport] = useState(
		filters.origin_airport || "",
	);
	const [destinationAirport, setDestinationAirport] = useState(
		filters.destination_airport || "",
	);
	const [sortingState, setSortingState] = useState<SortingState>([]);
	const [columnFiltersState, setColumnFiltersState] =
		useState<ColumnFiltersState>([]);

	// Load active flights on mount and filter change
	useEffect(() => {
		fetchActiveFlights({
			...filters,
			origin_airport: originAirport || undefined,
			destination_airport: destinationAirport || undefined,
		});
	}, [originAirport, destinationAirport]);

	const table = useReactTable({
		data: activeFlights,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			sorting: sortingState,
			columnFilters: columnFiltersState,
		},
		onSortingChange: setSortingState,
		onColumnFiltersChange: setColumnFiltersState,
		manualPagination: false,
		pageCount: pagination.total_pages,
	});

	const handleNextPage = () => {
		if (pagination.page < pagination.total_pages) {
			setFilters({ page: pagination.page + 1 });
			fetchActiveFlights({
				...filters,
				page: pagination.page + 1,
				origin_airport: originAirport || undefined,
				destination_airport: destinationAirport || undefined,
			});
		}
	};

	const handlePreviousPage = () => {
		if (pagination.page > 1) {
			setFilters({ page: pagination.page - 1 });
			fetchActiveFlights({
				...filters,
				page: pagination.page - 1,
				origin_airport: originAirport || undefined,
				destination_airport: destinationAirport || undefined,
			});
		}
	};

	const handleFirstPage = () => {
		setFilters({ page: 1 });
		fetchActiveFlights({
			...filters,
			page: 1,
			origin_airport: originAirport || undefined,
			destination_airport: destinationAirport || undefined,
		});
	};

	const handleLastPage = () => {
		setFilters({ page: pagination.total_pages });
		fetchActiveFlights({
			...filters,
			page: pagination.total_pages,
			origin_airport: originAirport || undefined,
			destination_airport: destinationAirport || undefined,
		});
	};

	return (
		<Card className="flex flex-col">
			<CardHeader>
				<div className="flex flex-col gap-2">
					<CardTitle>Active Flights</CardTitle>
					<CardDescription>
						Showing flights scheduled, boarding, or currently in the air
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="flex-1 space-y-4">
				{/* Filters */}
				<div className="flex flex-col gap-3 border-b pb-4 @container/filters">
					<div className="grid grid-cols-1 gap-3 @[480px]/filters:grid-cols-2">
						<div className="space-y-2">
							<Label
								htmlFor="origin"
								className="text-xs font-medium"
							>
								Origin Airport
							</Label>
							<div className="relative">
								<IconSearch className="absolute left-3 top-1/2 w-4 h-4 text-muted-foreground -translate-y-1/2" />
								<Input
									id="origin"
									placeholder="e.g., LAX, JFK"
									value={originAirport}
									onChange={e => setOriginAirport(e.target.value.toUpperCase())}
									className="pl-10 h-9"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="destination"
								className="text-xs font-medium"
							>
								Destination Airport
							</Label>
							<div className="relative">
								<IconSearch className="absolute left-3 top-1/2 w-4 h-4 text-muted-foreground -translate-y-1/2" />
								<Input
									id="destination"
									placeholder="e.g., BOM, LHR"
									value={destinationAirport}
									onChange={e =>
										setDestinationAirport(e.target.value.toUpperCase())
									}
									className="pl-10 h-9"
								/>
							</div>
						</div>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							setOriginAirport("");
							setDestinationAirport("");
						}}
						className="w-full @[480px]/filters:w-auto"
					>
						Clear Filters
					</Button>
				</div>

				{/* Table */}
				<div className="border rounded-lg overflow-x-auto">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow
									key={headerGroup.id}
									className="bg-muted/50 hover:bg-muted/50"
								>
									{headerGroup.headers.map(header => (
										<TableHead
											key={header.id}
											className="font-semibold text-xs uppercase tracking-wide"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="text-center py-8 text-muted-foreground"
									>
										Loading flights...
									</TableCell>
								</TableRow>
							) : table.getRowModel().rows.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="text-center py-8 text-muted-foreground"
									>
										No active flights found
									</TableCell>
								</TableRow>
							) : (
								table.getRowModel().rows.map(row => (
									<TableRow
										key={row.id}
										className="hover:bg-muted/50 transition-colors"
									>
										{row.getVisibleCells().map(cell => (
											<TableCell
												key={cell.id}
												className="text-sm"
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>

				{/* Pagination */}
				<div className="flex items-center justify-between gap-2 border-t pt-4 @container/pagination">
					<div className="text-xs text-muted-foreground whitespace-nowrap">
						<span className="hidden @[480px]/pagination:inline">
							Page {pagination.page} of {pagination.total_pages || 1} •{" "}
						</span>
						{pagination.total} flights
					</div>
					<div className="flex items-center gap-1">
						<Button
							variant="outline"
							size="sm"
							onClick={handleFirstPage}
							disabled={pagination.page === 1 || loading}
							title="First page"
						>
							<IconChevronsLeft className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={handlePreviousPage}
							disabled={pagination.page === 1 || loading}
							title="Previous page"
						>
							<IconChevronLeft className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={handleNextPage}
							disabled={pagination.page >= pagination.total_pages || loading}
							title="Next page"
						>
							<IconChevronRight className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={handleLastPage}
							disabled={pagination.page >= pagination.total_pages || loading}
							title="Last page"
						>
							<IconChevronsRight className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
