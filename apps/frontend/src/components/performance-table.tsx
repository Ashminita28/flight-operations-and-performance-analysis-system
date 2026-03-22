"use client";

import { useMemo, useState } from "react";
import {
	flexRender,
	getCoreRowModel,
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

import { performanceColumns } from "../../src/constants/table-columns/performance-column";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

import type { Performance } from "@/types/flight-types";

interface Props {
	data: Performance[];
	loading: boolean;
	page: number;
	totalPages: number;
	total: number;
	onPageChange: (page: number) => void;
	onSearch: (flightId: string) => void;
}

export default function PerformanceTable({
	data,
	loading,
	page,
	totalPages,
	total,
	onPageChange,
	onSearch,
}: Props) {
	const memoData = useMemo(() => data, [data]);
	const [search, setSearch] = useState("");

	const [sorting, setSorting] = useState<SortingState>([]);
	const [filters, setFilters] = useState<ColumnFiltersState>([]);
	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data: memoData,
		columns: performanceColumns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			sorting,
			columnFilters: filters,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setFilters,
		manualPagination: true,
		pageCount: totalPages,
	});

	return (
		<Card className="flex flex-col">
			<CardHeader>
				<CardTitle>Flight Performance</CardTitle>
				<CardDescription>
					Fuel usage, load factor and efficiency metrics
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Filters */}
				<div className="flex gap-2 border-b pb-4">
					<div className="relative w-full max-w-sm">
						<IconSearch className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Search Flight ID"
							value={search}
							onChange={e => setSearch(e.target.value.toUpperCase())}
							className="pl-10"
						/>
					</div>

					<Button
						size="sm"
						onClick={() => onSearch(search)}
					>
						Search
					</Button>

					<Button
						size="sm"
						variant="outline"
						onClick={() => {
							setSearch("");
							onSearch("");
						}}
					>
						Clear
					</Button>
				</div>

				{/* Table */}
				<div className="border rounded-lg overflow-x-auto">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map(hg => (
								<TableRow key={hg.id}>
									{hg.headers.map(header => (
										<TableHead key={header.id}>
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
										colSpan={performanceColumns.length}
										className="text-center py-6"
									>
										Loading...
									</TableCell>
								</TableRow>
							) : data.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={performanceColumns.length}
										className="text-center py-6"
									>
										No data found
									</TableCell>
								</TableRow>
							) : (
								table.getRowModel().rows.map(row => (
									<TableRow key={row.id}>
										{row.getVisibleCells().map(cell => (
											<TableCell key={cell.id}>
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
				<div className="flex justify-between items-center border-t pt-4">
					<span className="text-xs text-muted-foreground">
						Page {page} of {totalPages || 1} • {total} rows
					</span>

					<div className="flex gap-1">
						<Button
							size="sm"
							variant="outline"
							onClick={() => onPageChange(1)}
							disabled={page === 1}
						>
							<IconChevronsLeft className="w-4 h-4" />
						</Button>

						<Button
							size="sm"
							variant="outline"
							onClick={() => onPageChange(page - 1)}
							disabled={page === 1}
						>
							<IconChevronLeft className="w-4 h-4" />
						</Button>

						<Button
							size="sm"
							variant="outline"
							onClick={() => onPageChange(page + 1)}
							disabled={page >= totalPages}
						>
							<IconChevronRight className="w-4 h-4" />
						</Button>

						<Button
							size="sm"
							variant="outline"
							onClick={() => onPageChange(totalPages)}
							disabled={page >= totalPages}
						>
							<IconChevronsRight className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
