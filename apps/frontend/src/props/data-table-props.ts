import type {
	FlightStatus,
	FlightQueryParams,
	FlightRow,
} from "@/types/flight-types";
export interface DataTableProps {
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
