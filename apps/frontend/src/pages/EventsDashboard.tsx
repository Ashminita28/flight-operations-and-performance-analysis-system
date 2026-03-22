"use client";

import { useEffect } from "react";
import { useOperationStore } from "@/store/operation-store";
import { OperationalEventsTable } from "@/components/operational-event-table";
import { operationColumns } from "@/constants/table-columns/operation-column";

export default function EventsDashboard() {
	const events = useOperationStore(s => s.events);
	const loading = useOperationStore(s => s.loading);
	const fetchAllEvents = useOperationStore(s => s.fetchAllEvents);

	useEffect(() => {
		fetchAllEvents();
	}, [fetchAllEvents]);

	return (
		<OperationalEventsTable
			data={events}
			columns={operationColumns}
			loading={loading}
		/>
	);
}
