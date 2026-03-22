export interface TablePagination {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface TableQueryParams {
	page?: number;
	limit?: number;
	search?: string;
	sort_by?: string;
	sort_order?: "ASC" | "DESC";
	[key: string]: unknown;
}
