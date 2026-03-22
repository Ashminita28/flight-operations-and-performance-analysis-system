import { exportSchema } from "@/schemas/export-schema";
import type { z } from "zod";
export type ExportFormValues = z.infer<typeof exportSchema>;

export interface ExportReportPayload {
	time_filter: ExportFormValues["time_filter"];
	origin_airport?: string;
	destination_airport?: string;
	aircraft_id?: string;
	email: string;
}

export interface ExportReportResult {
	job_id: string;
}
