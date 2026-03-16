import { Response } from "express";

export interface Pagination {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface ApiResponse<T = unknown> {
	success: boolean;
	message: string;
	data?: T;
	pagination?: Pagination;
	error?: string;
}

export interface ResponseOptions<T> {
	res: Response;
	statusCode?: number;
	success: boolean;
	message?: string;
	data?: T;
	pagination?: Pagination;
	error?: string;
}
