import { useEffect, useState } from "react";
import { api } from "@/api/api";

import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function FlightDashboard() {
	const [data, setData] = useState([]);

	useEffect(() => {
		loadFlights();
	}, []);

	async function loadFlights() {
		try {
			const res = await api("/flights/");

			const formatted = res.data.map((f: any, index: number) => ({
				id: index + 1,

				header: f.flight_number,

				type: f.departure_airport + " → " + f.arrival_airport,

				status: f.status,

				target: f.departure_datetime,

				limit: f.arrival_datetime,

				reviewer: "Assigned",
			}));

			setData(formatted);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" />

			<SidebarInset>
				<SiteHeader />

				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<SectionCards />

							<div className="px-4 lg:px-6">
								<ChartAreaInteractive />
							</div>

							<DataTable data={data} />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
