import type {
	ExportFormValues,
	ExportReportPayload,
} from "../../types/export-report-types";

export function buildExportPayload(
	data: ExportFormValues,
): ExportReportPayload {
	return {
		email: data.email,
		time_filter: data.time_filter,
		origin_airport: data.origin_airport || undefined,
		destination_airport: data.destination_airport || undefined,
		aircraft_id: data.aircraft_id || undefined,
	};
}

export function formatSuccessMessage(email: string, jobId: string): string {
	return `Export initiated successfully! Job ID: ${jobId}\n\nYou will receive the CSV file at ${email} shortly.`;
}

export function toUppercaseHandler(onChange: (value: string) => void) {
	return (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value.toUpperCase());
	};
}
