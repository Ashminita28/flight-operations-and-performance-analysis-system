import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { SiteHeaderProps } from "@/props/site-header-props";

export function SiteHeader({
	title,
	notifications,
	isOpen,
	onToggle,
}: SiteHeaderProps) {
	return (
		<header
			className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-gray-200 bg-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
			aria-label="Site header"
		>
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger
					className="-ml-1 text-gray-500 hover:text-gray-800"
					aria-label="Toggle sidebar"
				/>
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4 bg-gray-200"
				/>
				<h1 className="text-sm font-semibold text-gray-800">{title}</h1>

				<div className="ml-auto flex items-center gap-2 relative">
					<Button
						variant="ghost"
						size="icon"
						onClick={onToggle}
						aria-label={`Notifications${notifications?.length > 0 ? ` (${notifications.length} unread)` : ""}`}
						aria-expanded={isOpen}
						aria-haspopup="true"
						className="relative text-gray-500 hover:text-gray-800 hover:bg-gray-100"
					>
						<Bell className="h-5 w-5" />
						{notifications?.length > 0 && (
							<span
								className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-medium"
								aria-hidden="true"
							>
								{notifications.length}
							</span>
						)}
					</Button>

					{isOpen && (
						<div
							role="region"
							aria-label="Notifications panel"
							className="absolute right-0 top-11 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50"
						>
							<h2 className="font-semibold text-sm text-gray-800 mb-2">
								Notifications
							</h2>

							{notifications.length === 0 ? (
								<p className="text-sm text-gray-400">No notifications</p>
							) : (
								<div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
									{notifications.map(n => (
										<div
											key={n.id}
											className="text-sm p-2 border border-gray-100 rounded-md bg-gray-50"
										>
											<p className="text-gray-700">{n.message}</p>
										</div>
									))}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
