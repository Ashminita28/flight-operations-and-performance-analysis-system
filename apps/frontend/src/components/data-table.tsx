import * as React from "react";
import {
	closestCenter,
	DndContext,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
	type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
	IconChevronDown,
	IconChevronLeft,
	IconChevronRight,
	IconChevronsLeft,
	IconChevronsRight,
	IconDotsVertical,
	IconLayoutColumns,
	IconPlus,
	IconSearch,
} from "@tabler/icons-react";
import {
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type Row,
	type SortingState,
	type VisibilityState,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import type { FlightRow, FlightStatus, FlightQueryParams } from "@/types/types";

const STATUS_BADGE: Record<FlightStatus, string> = {
	scheduled: "bg-blue-100   text-blue-800   border-blue-200",
	boarding: "bg-amber-100  text-amber-800  border-amber-200",
	departed: "bg-sky-100    text-sky-800    border-sky-200",
	landed: "bg-green-100  text-green-800  border-green-200",
	diverted: "bg-purple-100 text-purple-800 border-purple-200",
	cancelled: "bg-red-100    text-red-800    border-red-200",
	delayed: "bg-orange-100 text-orange-800 border-orange-200",
};

interface DataTableProps {
	data: FlightRow[];
	loading: boolean;

	totalRows: number;
	totalPages: number;
	currentPage: number;
	pageSize: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;

	onAddClick: () => void;
	onSearch: (query: string) => void;
	onStatusFilter: (status: FlightStatus | "") => void;
	onSort: (params: Pick<FlightQueryParams, "sort_by" | "sort_order">) => void;
	onDelete: (id: string) => void;
}

function buildColumns(onDelete: (id: string) => void): ColumnDef<FlightRow>[] {
	return [
		{
			accessorKey: "flightNumber",
			header: "Flight",
			cell: ({ row }) => (
				<span className="font-semibold text-white tracking-wide">
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
						className="text-white px-1.5"
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
						className="text-white px-1.5"
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
						className="text-white px-1.5 truncate max-w-full block"
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
						className="text-white px-1.5"
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
						className="text-white px-1.5"
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
						className="text-white px-1.5"
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
							className="data-[state=open]:bg-muted text-white flex size-8"
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
							onClick={e => {
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

function DraggableRow({ row }: { row: Row<FlightRow> }) {
	const navigate = useNavigate();
	const { transform, transition, setNodeRef, isDragging } = useSortable({
		id: row.original.id,
	});

	return (
		<TableRow
			data-state={row.getIsSelected() && "selected"}
			data-dragging={isDragging}
			ref={setNodeRef}
			className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 cursor-pointer hover:bg-white/5 border-white/10"
			style={{ transform: CSS.Transform.toString(transform), transition }}
			onClick={() => navigate(`/flights/${row.original.id}`)}
		>
			{row.getVisibleCells().map(cell => (
				<TableCell key={cell.id}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
	);
}

export function DataTable({
	data,
	loading,
	totalRows,
	totalPages,
	currentPage,
	pageSize,
	onPageChange,
	onPageSizeChange,
	onAddClick,
	onSearch,
	onStatusFilter,
	onSort,
	onDelete,
}: DataTableProps) {
	const [rows, setRows] = React.useState<FlightRow[]>(data);

	React.useEffect(() => {
		setRows(data);
	}, [data]);

	const [searchQuery, setSearchQuery] = React.useState("");
	React.useEffect(() => {
		const timer = setTimeout(() => {
			if (searchQuery.trim().length >= 2 || searchQuery.trim() === "") {
				onSearch(searchQuery.trim());
			}
		}, 400);
		return () => clearTimeout(timer);
	}, [searchQuery]);

	const [activeSortBy, setActiveSortBy] = React.useState<
		"departure" | "date" | "route"
	>("departure");
	const [activeSortOrder, setActiveSortOrder] = React.useState<"ASC" | "DESC">(
		"ASC",
	);

	const handleSortByChange = (value: string) => {
		const sortBy = value as "departure" | "date" | "route";
		setActiveSortBy(sortBy);
		onSort({ sort_by: sortBy, sort_order: activeSortOrder });
	};

	const handleSortOrderChange = (value: string) => {
		const sortOrder = value as "ASC" | "DESC";
		setActiveSortOrder(sortOrder);
		onSort({ sort_by: activeSortBy, sort_order: sortOrder });
	};

	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const sortableId = React.useId();
	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {}),
	);

	const columns = React.useMemo(() => buildColumns(onDelete), [onDelete]);

	const dataIds = React.useMemo<UniqueIdentifier[]>(
		() => rows.map(({ id }) => id),
		[rows],
	);

	const table = useReactTable({
		data: rows,
		columns,
		manualPagination: true,
		pageCount: totalPages,
		state: { sorting, columnVisibility, rowSelection, columnFilters },
		getRowId: row => row.id,
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			setRows(prev => {
				const oldIndex = dataIds.indexOf(active.id);
				const newIndex = dataIds.indexOf(over.id);
				return arrayMove(prev, oldIndex, newIndex);
			});
		}
	}

	return (
		<Tabs
			defaultValue="outline"
			className="w-full flex-col justify-start gap-6 bg-[#0a1628] rounded-xl p-4"
		>
			<div className="flex items-center justify-between px-4 lg:px-6 gap-3 flex-wrap">
				<div className="relative w-full max-w-sm">
					<IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-white/60" />
					<Input
						placeholder="Search by flight number..."
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className="pl-8 bg-white/10 border-white/20 text-white placeholder:text-white/40"
					/>
				</div>

				<div className="flex items-center gap-2 flex-wrap">
					<Select
						onValueChange={val =>
							onStatusFilter(val === "all" ? "" : (val as FlightStatus))
						}
					>
						<SelectTrigger
							className="w-36 bg-white/10 border-white/20 text-white"
							size="sm"
						>
							<SelectValue placeholder="All statuses" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All statuses</SelectItem>
							<SelectItem value="scheduled">Scheduled</SelectItem>
							<SelectItem value="boarding">Boarding</SelectItem>
							<SelectItem value="departed">Departed</SelectItem>
							<SelectItem value="landed">Landed</SelectItem>
							<SelectItem value="delayed">Delayed</SelectItem>
							<SelectItem value="diverted">Diverted</SelectItem>
							<SelectItem value="cancelled">Cancelled</SelectItem>
						</SelectContent>
					</Select>

					{/* Sort by field */}
					<Select
						defaultValue="departure"
						onValueChange={handleSortByChange}
					>
						<SelectTrigger
							className="w-36 bg-white/10 border-white/20 text-white"
							size="sm"
						>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="departure">Sort: Departure</SelectItem>
							<SelectItem value="date">Sort: Date</SelectItem>
							<SelectItem value="route">Sort: Route</SelectItem>
						</SelectContent>
					</Select>

					{/* Sort order */}
					<Select
						defaultValue="ASC"
						onValueChange={handleSortOrderChange}
					>
						<SelectTrigger
							className="w-24 bg-white/10 border-white/20 text-white"
							size="sm"
						>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="ASC">ASC</SelectItem>
							<SelectItem value="DESC">DESC</SelectItem>
						</SelectContent>
					</Select>

					{/* Column visibility toggle */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								className="bg-white/10 border-white/20 text-white hover:bg-white/20"
							>
								<IconLayoutColumns />
								<span className="hidden lg:inline">Customize Columns</span>
								<span className="lg:hidden">Columns</span>
								<IconChevronDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-56"
						>
							{table
								.getAllColumns()
								.filter(col => col.getCanHide())
								.map(col => (
									<DropdownMenuCheckboxItem
										key={col.id}
										className="capitalize"
										checked={col.getIsVisible()}
										onCheckedChange={val => col.toggleVisibility(!!val)}
									>
										{col.id}
									</DropdownMenuCheckboxItem>
								))}
						</DropdownMenuContent>
					</DropdownMenu>

					<Button
						variant="outline"
						size="sm"
						onClick={onAddClick}
						className="bg-blue-600 border-blue-500 text-white hover:bg-blue-700"
					>
						<IconPlus />
						<span className="hidden lg:inline">Add Flight</span>
					</Button>
				</div>
			</div>

			{/* Row count */}
			<div className="px-4 lg:px-6">
				<p className="text-xs text-white/50">
					{loading
						? "Loading..."
						: `Showing ${rows.length} of ${totalRows} flights`}
				</p>
			</div>

			{/* TABLE */}
			<TabsContent
				value="outline"
				className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
			>
				<div className="overflow-hidden rounded-lg border border-white/20">
					<DndContext
						collisionDetection={closestCenter}
						modifiers={[restrictToVerticalAxis]}
						onDragEnd={handleDragEnd}
						sensors={sensors}
						id={sortableId}
					>
						<Table>
							<TableHeader className="bg-white/10 sticky top-0 z-10">
								{table.getHeaderGroups().map(headerGroup => (
									<TableRow
										key={headerGroup.id}
										className="border-white/20 hover:bg-transparent"
									>
										{headerGroup.headers.map(header => (
											<TableHead
												key={header.id}
												colSpan={header.colSpan}
												className="text-white font-semibold"
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
							<TableBody className="**:data-[slot=table-cell]:first:w-8">
								{loading ? (
									Array.from({ length: 5 }).map((_, i) => (
										<TableRow
											key={i}
											className="border-white/10"
										>
											{columns.map((_, j) => (
												<TableCell key={j}>
													<div className="h-4 bg-white/10 rounded animate-pulse w-20" />
												</TableCell>
											))}
										</TableRow>
									))
								) : table.getRowModel().rows?.length ? (
									<SortableContext
										items={dataIds}
										strategy={verticalListSortingStrategy}
									>
										{table.getRowModel().rows.map(row => (
											<DraggableRow
												key={row.id}
												row={row}
											/>
										))}
									</SortableContext>
								) : (
									<TableRow>
										<TableCell
											colSpan={columns.length}
											className="h-24 text-center text-white/40"
										>
											No results.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</DndContext>
				</div>

				{/* PAGINATION */}
				<div className="flex items-center justify-between px-4">
					<div className="text-white/70 hidden flex-1 text-sm lg:flex">
						{table.getFilteredSelectedRowModel().rows.length} of {totalRows}{" "}
						row(s) selected.
					</div>

					<div className="flex w-full items-center gap-8 lg:w-fit">
						<div className="hidden items-center gap-2 lg:flex">
							<Label
								htmlFor="rows-per-page"
								className="text-sm font-medium text-white/70"
							>
								Rows per page
							</Label>
							<Select
								value={`${pageSize}`}
								onValueChange={val => {
									onPageSizeChange(Number(val));
								}}
							>
								<SelectTrigger
									size="sm"
									className="w-20 bg-white/10 border-white/20 text-white"
									id="rows-per-page"
								>
									<SelectValue placeholder={pageSize} />
								</SelectTrigger>
								<SelectContent side="top">
									{[10, 20, 30, 40, 50].map(size => (
										<SelectItem
											key={size}
											value={`${size}`}
										>
											{size}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="flex w-fit items-center justify-center text-sm font-medium text-white/70">
							Page {currentPage} of {totalPages}
						</div>

						<div className="ml-auto flex items-center gap-2 lg:ml-0">
							<Button
								variant="outline"
								className="hidden h-8 w-8 p-0 lg:flex bg-white/10 border-white/20 text-white hover:bg-white/20"
								onClick={() => onPageChange(1)}
								disabled={currentPage <= 1}
							>
								<span className="sr-only">Go to first page</span>
								<IconChevronsLeft />
							</Button>
							<Button
								variant="outline"
								className="size-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
								size="icon"
								onClick={() => onPageChange(currentPage - 1)}
								disabled={currentPage <= 1}
							>
								<span className="sr-only">Go to previous page</span>
								<IconChevronLeft />
							</Button>
							<Button
								variant="outline"
								className="size-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
								size="icon"
								onClick={() => onPageChange(currentPage + 1)}
								disabled={currentPage >= totalPages}
							>
								<span className="sr-only">Go to next page</span>
								<IconChevronRight />
							</Button>
							<Button
								variant="outline"
								className="hidden size-8 lg:flex bg-white/10 border-white/20 text-white hover:bg-white/20"
								size="icon"
								onClick={() => onPageChange(totalPages)}
								disabled={currentPage >= totalPages}
							>
								<span className="sr-only">Go to last page</span>
								<IconChevronsRight />
							</Button>
						</div>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
}
