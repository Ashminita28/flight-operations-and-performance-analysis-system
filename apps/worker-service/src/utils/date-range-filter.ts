// Get date range based on time filter
export function getDateRangeByFilter(timeFilter: string): {
	startDate: string;
	endDate: string;
} {
	const endDate = new Date();
	const startDate = new Date();

	switch (timeFilter) {
		case "daily":
			startDate.setDate(startDate.getDate() - 1);
			break;
		case "weekly":
			startDate.setDate(startDate.getDate() - 7);
			break;
		case "monthly":
			startDate.setMonth(startDate.getMonth() - 1);
			break;
		case "yearly":
			startDate.setFullYear(startDate.getFullYear() - 1);
			break;
		default:
			startDate.setMonth(startDate.getMonth() - 1);
	}

	return {
		startDate: startDate.toISOString().split("T")[0] ?? "",
		endDate: endDate.toISOString().split("T")[0] ?? "",
	};
}
