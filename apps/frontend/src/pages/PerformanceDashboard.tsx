"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import PerformanceTable from "../components/performance-table";
import { usePerformanceStore } from "@/store/performance-store";

export default function PerformanceDashboard() {
	const performances = usePerformanceStore(s => s.performances);
	const loading = usePerformanceStore(s => s.loading);
	const fetchAllPerformance = usePerformanceStore(s => s.fetchAllPerformance);

	const [page, setPage] = useState(1);

	const data = useMemo(() => performances, [performances]);

	useEffect(() => {
		fetchAllPerformance();
	}, [fetchAllPerformance]);

	const handleSearch = useCallback(() => {}, []);

	return (
		<PerformanceTable
			data={data}
			loading={loading}
			page={page}
			totalPages={Math.ceil(data.length / 10) || 1}
			total={data.length}
			onPageChange={setPage}
			onSearch={handleSearch}
		/>
	);
}
