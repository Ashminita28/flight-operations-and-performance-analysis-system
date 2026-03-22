import * as React from "react";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
	IconChevronDown,
	IconChevronLeft,
	IconChevronRight,
	IconChevronsLeft,
	IconChevronsRight,
	IconLayoutColumns,
	IconPlus,
	IconSearch,
} from "@tabler/icons-react";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
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
import type { FlightStatus } from "@/types/flight-types";
import { buildColumns } from "@/constants/table-columns/flight-columns";
import type { DataTableProps } from "@/props/data-table-props";

export function FlightTable({
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
	const navigate = useNavigate();

	// search debounce
	const [searchQuery, setSearchQuery] = React.useState("");
	React.useEffect(() => {
		const timer = setTimeout(() => {
			if (searchQuery.trim().length >= 2 || searchQuery.trim() === "") {
				onSearch(searchQuery.trim());
			}
		}, 400);
		return () => clearTimeout(timer);
	}, [searchQuery, onSearch]);

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

	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});

	const columns = React.useMemo(() => buildColumns(onDelete), [onDelete]);

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data,
		columns,
		manualPagination: true,
		pageCount: totalPages,
		state: { columnVisibility },
		getRowId: row => row.id,
		enableRowSelection: true,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Tabs
			defaultValue="outline"
			className="w-full flex-col justify-start gap-6 bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
		>
			{/* ── Toolbar ── */}
			<div className="flex items-center justify-between px-2 gap-3 flex-wrap">
				{/* Search */}
				<div className="relative w-full max-w-sm">
					<IconSearch
						className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
						aria-hidden="true"
					/>
					<Input
						placeholder="Search by flight number..."
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						aria-label="Search flights"
						className="pl-8 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-sky-950 focus:ring-sky-950/20"
					/>
				</div>

				{/* Controls */}
				<div className="flex items-center gap-2 flex-wrap">
					{/* Status filter */}
					<Select
						onValueChange={val =>
							onStatusFilter(val === "all" ? "" : (val as FlightStatus))
						}
					>
						<SelectTrigger
							className="w-36 border-gray-200 text-gray-700"
							size="sm"
							aria-label="Filter by status"
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

					{/* Sort by */}
					<Select
						defaultValue="departure"
						onValueChange={handleSortByChange}
					>
						<SelectTrigger
							className="w-36 border-gray-200 text-gray-700"
							size="sm"
							aria-label="Sort by field"
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
							className="w-24 border-gray-200 text-gray-700"
							size="sm"
							aria-label="Sort order"
						>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="ASC">ASC</SelectItem>
							<SelectItem value="DESC">DESC</SelectItem>
						</SelectContent>
					</Select>

					{/* Column visibility */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								className="border-gray-200 text-gray-700 hover:bg-gray-50"
								aria-label="Customize columns"
							>
								<IconLayoutColumns
									className="mr-1 h-4 w-4"
									aria-hidden="true"
								/>
								<span className="hidden lg:inline">Customize Columns</span>
								<span className="lg:hidden">Columns</span>
								<IconChevronDown
									className="ml-1 h-4 w-4"
									aria-hidden="true"
								/>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-56 border-gray-200"
						>
							{table
								.getAllColumns()
								.filter(col => col.getCanHide())
								.map(col => (
									<DropdownMenuCheckboxItem
										key={col.id}
										className="capitalize text-gray-700"
										checked={col.getIsVisible()}
										onCheckedChange={val => col.toggleVisibility(!!val)}
									>
										{col.id}
									</DropdownMenuCheckboxItem>
								))}
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Add flight */}
					<Button
						size="sm"
						onClick={onAddClick}
						aria-label="Add new flight"
						className="bg-sky-950 hover:bg-sky-900 text-white border-sky-950"
					>
						<IconPlus
							className="mr-1 h-4 w-4"
							aria-hidden="true"
						/>
						<span className="hidden lg:inline">Add Flight</span>
					</Button>
				</div>
			</div>

			{/* Row count */}
			<div className="px-2">
				<p className="text-xs text-gray-400">
					{loading
						? "Loading..."
						: `Showing ${data.length} of ${totalRows} flights`}
				</p>
			</div>

			{/* ── Table ── */}
			<TabsContent
				value="outline"
				className="relative flex flex-col gap-4 overflow-auto px-2"
			>
				<div className="overflow-hidden rounded-lg border border-gray-200">
					<DndContext
						collisionDetection={closestCenter}
						modifiers={[restrictToVerticalAxis]}
					>
						<Table aria-label="Flights table">
							<TableHeader className="bg-gray-50 sticky top-0 z-10">
								{table.getHeaderGroups().map(headerGroup => (
									<TableRow
										key={headerGroup.id}
										className="border-b border-gray-200 hover:bg-transparent"
									>
										{headerGroup.headers.map(header => (
											<TableHead
												key={header.id}
												colSpan={header.colSpan}
												className="text-sky-950 font-semibold text-xs uppercase tracking-wide py-3 px-4"
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
											className="border-b border-gray-100"
										>
											{columns.map((_, j) => (
												<TableCell
													key={j}
													className="px-4 py-3"
												>
													<div
														className="h-4 bg-gray-100 rounded animate-pulse w-20"
														aria-hidden="true"
													/>
												</TableCell>
											))}
										</TableRow>
									))
								) : table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map(row => (
										<TableRow
											key={row.id}
											onClick={() => navigate(`/flights/${row.original.id}`)}
											className="cursor-pointer border-b border-gray-100 hover:bg-sky-50 transition-colors"
										>
											{row.getVisibleCells().map(cell => (
												<TableCell
													key={cell.id}
													className="px-4 py-3 text-sm text-sky-950"
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={columns.length}
											className="h-24 text-center text-sm text-sky-950"
										>
											No results found
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</DndContext>
				</div>

				{/* ── Pagination ── */}
				<div className="flex items-center justify-between px-2 py-1">
					<div className="flex w-full items-center gap-6 lg:w-fit">
						{/* Rows per page */}
						<div className="hidden items-center gap-2 lg:flex">
							<Label
								htmlFor="rows-per-page"
								className="text-sm font-medium text-gray-600"
							>
								Rows per page
							</Label>
							<Select
								value={`${pageSize}`}
								onValueChange={val => onPageSizeChange(Number(val))}
							>
								<SelectTrigger
									size="sm"
									id="rows-per-page"
									aria-label="Rows per page"
									className="w-20 border-gray-200 text-gray-700"
								>
									<SelectValue placeholder={pageSize} />
								</SelectTrigger>
								<SelectContent side="top">
									{[10, 20, 30, 40, 50].map(size => (
										<SelectItem
											key={size}
											value={`${size}`}
											className="text-gray-700"
										>
											{size}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Page indicator */}
						<div className="text-sm font-medium text-gray-600">
							Page {currentPage} of {totalPages}
						</div>

						{/* Navigation buttons */}
						<div className="ml-auto flex items-center gap-1 lg:ml-0">
							<Button
								variant="outline"
								className="hidden h-8 w-8 p-0 lg:flex border-gray-200 text-gray-600 hover:bg-gray-50"
								onClick={() => onPageChange(1)}
								disabled={currentPage <= 1}
								aria-label="Go to first page"
							>
								<IconChevronsLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="size-8 border-gray-200 text-gray-600 hover:bg-gray-50"
								onClick={() => onPageChange(currentPage - 1)}
								disabled={currentPage <= 1}
								aria-label="Go to previous page"
							>
								<IconChevronLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="size-8 border-gray-200 text-gray-600 hover:bg-gray-50"
								onClick={() => onPageChange(currentPage + 1)}
								disabled={currentPage >= totalPages}
								aria-label="Go to next page"
							>
								<IconChevronRight className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="hidden size-8 lg:flex border-gray-200 text-gray-600 hover:bg-gray-50"
								onClick={() => onPageChange(totalPages)}
								disabled={currentPage >= totalPages}
								aria-label="Go to last page"
							>
								<IconChevronsRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
}
