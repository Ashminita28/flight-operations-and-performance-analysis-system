import { useAuthStore } from "../../store/auth-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, ShieldCheck, User } from "lucide-react";

export default function Profile() {
	const user = useAuthStore(s => s.user);

	if (!user) return null;

	const initials = user.name
		.split(" ")
		.map((n: string) => n[0])
		.join("")
		.toUpperCase();

	const roles = user.roles?.join(", ") ?? "—";

	return (
		<div className="p-6 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold text-sky-950 mb-6">User Profile</h1>

			<Card className="shadow-md">
				<CardHeader className="flex flex-col items-center gap-3 pb-4">
					<Avatar className="h-20 w-20 text-2xl">
						<AvatarFallback className="bg-sky-950 text-white font-semibold text-xl">
							{initials}
						</AvatarFallback>
					</Avatar>
					<div className="text-center">
						<CardTitle className="text-xl text-sky-950">{user.name}</CardTitle>
						<p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
					</div>
				</CardHeader>

				<Separator />

				<CardContent className="mt-4 space-y-4">
					<div className="flex items-center gap-3 text-sm">
						<User className="h-4 w-4 text-sky-950 shrink-0" />
						<span className="text-muted-foreground w-20 shrink-0">Name</span>
						<span className="font-medium">{user.name}</span>
					</div>

					<div className="flex items-center gap-3 text-sm">
						<Mail className="h-4 w-4 text-sky-950 shrink-0" />
						<span className="text-muted-foreground w-20 shrink-0">Email</span>
						<span className="font-medium">{user.email}</span>
					</div>

					{user.phone && (
						<div className="flex items-center gap-3 text-sm">
							<Phone className="h-4 w-4 text-sky-950 shrink-0" />
							<span className="text-muted-foreground w-20 shrink-0">Phone</span>
							<span className="font-medium">{user.phone}</span>
						</div>
					)}

					<div className="flex items-start gap-3 text-sm">
						<ShieldCheck className="h-4 w-4 text-sky-950 shrink-0 mt-0.5" />
						<span className="text-muted-foreground w-20 shrink-0">Roles</span>
						<div className="flex flex-wrap gap-1.5">
							{user.roles?.length ? (
								user.roles.map((role: string) => (
									<Badge
										key={role}
										variant="secondary"
										className="bg-sky-100 text-sky-950 hover:bg-sky-100"
									>
										{role}
									</Badge>
								))
							) : (
								<span className="font-medium">{roles}</span>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
