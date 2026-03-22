import { Navbar1 } from "@/components/navbar1";
import { Button } from "@/components/ui/button";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<Navbar1 />

			<main className="flex flex-1 items-center">
				<div className="max-w-2xl px-6 sm:px-12 lg:px-24 py-20">
					<p className="text-sky-700 font-medium text-sm uppercase tracking-widest mb-3">
						Flight Operations Management System
					</p>
					<h1 className="text-gray-900 text-4xl sm:text-5xl font-bold leading-tight mb-5">
						Centralized Flight Operations &amp; Performance Analytics
					</h1>
					<p className="text-gray-500 text-base sm:text-lg mb-8 max-w-lg">
						Monitor flights in real-time, track delays, and analyze flight
						performance — all in one system.
					</p>
					<Button
						size="lg"
						className="bg-sky-950 hover:bg-sky-900 text-white font-semibold px-8"
						aria-label="Explore the dashboard"
					>
						Explore
					</Button>
				</div>
			</main>
		</div>
	);
}
