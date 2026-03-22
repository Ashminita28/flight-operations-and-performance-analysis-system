"use client";

import { useState } from "react";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
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
import { columns } from "../constants/table-columns/active-flights-column";

export default function ActiveFlightsTable() {
	const { activeFlights, pagination, flightsLoading, filters, setFilters } =
		useAnalyticsStore();

	// Local UI state (only for inputs)
	const [originAirport, setOriginAirport] = useState(
		filters.origin_airport || "",
	);
	const [destinationAirport, setDestinationAirport] = useState(
		filters.destination_airport || "",
	);

	const [sortingState, setSortingState] = useState<SortingState>([]);
	const [columnFiltersState, setColumnFiltersState] =
		useState<ColumnFiltersState>([]);

	// eslint-disable-next-line react-hooks/incompatible-library
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

	// Apply filters
	const applyFilters = () => {
		setFilters({
			...filters,
			page: 1,
			origin_airport: originAirport || undefined,
			destination_airport: destinationAirport || undefined,
		});
	};

	const clearFilters = () => {
		setOriginAirport("");
		setDestinationAirport("");
		setFilters({
			...filters,
			page: 1,
			origin_airport: undefined,
			destination_airport: undefined,
		});
	};

	// Pagination
	const handleNextPage = () => {
		if (pagination.page < pagination.total_pages) {
			setFilters({ ...filters, page: pagination.page + 1 });
		}
	};

	const handlePreviousPage = () => {
		if (pagination.page > 1) {
			setFilters({ ...filters, page: pagination.page - 1 });
		}
	};

	const handleFirstPage = () => {
		setFilters({ ...filters, page: 1 });
	};

	const handleLastPage = () => {
		setFilters({ ...filters, page: pagination.total_pages });
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

					<div className="flex gap-2">
						<Button
							variant="default"
							size="sm"
							onClick={applyFilters}
							className="w-full @[480px]/filters:w-auto"
						>
							Apply Filters
						</Button>

						<Button
							variant="outline"
							size="sm"
							onClick={clearFilters}
							className="w-full @[480px]/filters:w-auto"
						>
							Clear Filters
						</Button>
					</div>
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
							{flightsLoading ? (
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
							disabled={pagination.page === 1 || flightsLoading}
						>
							<IconChevronsLeft className="w-4 h-4" />
						</Button>

						<Button
							variant="outline"
							size="sm"
							onClick={handlePreviousPage}
							disabled={pagination.page === 1 || flightsLoading}
						>
							<IconChevronLeft className="w-4 h-4" />
						</Button>

						<Button
							variant="outline"
							size="sm"
							onClick={handleNextPage}
							disabled={
								pagination.page >= pagination.total_pages || flightsLoading
							}
						>
							<IconChevronRight className="w-4 h-4" />
						</Button>

						<Button
							variant="outline"
							size="sm"
							onClick={handleLastPage}
							disabled={
								pagination.page >= pagination.total_pages || flightsLoading
							}
						>
							<IconChevronsRight className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
