//  Analytics Export Consumer
export interface ExportMessage {
	job_id: string;
	filters: {
		time_filter: string;
		origin_airport?: string;
		destination_airport?: string;
		aircraft_id?: string;
		email: string;
	};
	timestamp: string;
}
