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
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4"
				/>
				<h1 className="text-base font-medium">{title}</h1>

				<div className="ml-auto flex items-center gap-2 relative">
					<Button
						variant="ghost"
						size="icon"
						onClick={onToggle}
						className="relative"
					>
						<Bell className="h-5 w-5" />

						{notifications?.length > 0 && (
							<span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
								{notifications.length}
							</span>
						)}
					</Button>

					{isOpen && (
						<div className="absolute right-0 top-10 w-72 bg-white border rounded-lg shadow-lg p-3 z-50">
							<h3 className="font-medium text-sm mb-2">Notifications</h3>

							{notifications.length === 0 ? (
								<p className="text-sm text-gray-500">No notifications</p>
							) : (
								<div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
									{notifications.map(n => (
										<div
											key={n.id}
											className="text-sm p-2 border rounded-md bg-gray-50"
										>
											<p>{n.message}</p>
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
