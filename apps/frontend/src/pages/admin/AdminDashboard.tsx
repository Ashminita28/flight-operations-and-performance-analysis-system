import { CardAnalyst } from "@/components/analyst-card";
import { CardUser } from "@/components/usermanage-card";
import { CardViewFlight } from "@/components/viewflight-card";

function AdminDashboard() {
	return (
		<div className="min-h-screen bg-sky-950 text-white p-10">
			<h1 className="text-3xl font-bold text-center mb-10">ADMIN DASHBOARD</h1>

			<div className="flex flex-wrap justify-center gap-10">
				<CardUser />
				<CardViewFlight />
				<CardAnalyst />
			</div>
		</div>
	);
}

export default AdminDashboard;
