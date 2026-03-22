"use client";

import { useMemo, useState } from "react";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

import type { OperationalEvent } from "@/types/flight-types";

interface Props {
	data: OperationalEvent[];
	columns: ColumnDef<OperationalEvent>[];
	loading: boolean;
}

export function OperationalEventsTable({ data, columns, loading }: Props) {
	const [flightFilter, setFlightFilter] = useState("");
	const [eventTypeFilter, setEventTypeFilter] = useState("");

	const filteredData = useMemo(() => {
		return data.filter(item => {
			return (
				(!flightFilter ||
					item.flight_id.toLowerCase().includes(flightFilter.toLowerCase())) &&
				(!eventTypeFilter ||
					item.event_type.toLowerCase().includes(eventTypeFilter.toLowerCase()))
			);
		});
	}, [data, flightFilter, eventTypeFilter]);
	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data: filteredData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card className="flex flex-col">
			<CardHeader>
				<CardTitle>Operational Events</CardTitle>
				<CardDescription>
					Track delays and operational incidents
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Filters */}
				<div className="flex flex-col gap-3 border-b pb-4">
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
						<Input
							placeholder="Filter by Flight ID"
							value={flightFilter}
							onChange={e => setFlightFilter(e.target.value)}
						/>
						<Input
							placeholder="Filter by Event Type"
							value={eventTypeFilter}
							onChange={e => setEventTypeFilter(e.target.value)}
						/>
					</div>

					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							setFlightFilter("");
							setEventTypeFilter("");
						}}
					>
						Clear Filters
					</Button>
				</div>

				{/* Table */}
				<div className="border rounded-lg overflow-x-auto">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map(header => (
										<TableHead key={header.id}>
											{flexRender(
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
										className="text-center py-6"
									>
										Loading events...
									</TableCell>
								</TableRow>
							) : table.getRowModel().rows.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="text-center py-6"
									>
										No events found
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
			</CardContent>
		</Card>
	);
}
