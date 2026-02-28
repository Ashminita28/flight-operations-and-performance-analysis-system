import { Navbar1 } from "@/components/navbar1";
import flight from "../../assets/flight.jpeg";
import { Button } from "@/components/ui/button";

export default function HomePage() {
	return (
		<div
			className="absolute inset-0 bg-cover bg-center"
			style={{ backgroundImage: `url(${flight})` }}
		>
			<div className="absolute inset-0 bg-black/50">
				<Navbar1 />
				<div className="relative z-10 flex h-full items-center">
					<div className="max-w-2xl pl-24">
						<p className="text-200 font-bold mb-3 text-lg">
							Flight Operations Management System
						</p>
						<h1 className="text-5xl font-bold leading-tight mb-6">
							Centralized Flight Operations & Performance <br /> Analytics
						</h1>
						<p className="text-300 font-bold text-lg mb-8">
							Monitor flights in real-time, track delays, and analyze flight
							performance - all in one system.
						</p>
						<Button size="lg">Explore</Button>
					</div>
				</div>
			</div>

			<div></div>
		</div>
	);
}
