"use client";

import { Menu, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import type { NavbarProps, MenuItem } from "../types/navbar-types";
import {
	DEFAULT_AUTH,
	DEFAULT_LOGO,
	DEFAULT_MENU,
} from "../constants/navbar-constants";

export function Navbar1({
	logo = DEFAULT_LOGO,
	menu = DEFAULT_MENU,
	auth = DEFAULT_AUTH,
	className,
}: NavbarProps) {
	return (
		<section className={cn("py-4", className)}>
			<div className="container">
				{/* Desktop */}
				<nav className="hidden lg:flex justify-between items-center">
					<div className="flex items-center gap-6">
						<a
							href={logo.url}
							className="flex items-center gap-2"
						>
							<Plane />
							<span className="text-2xl font-bold">{logo.title}</span>
						</a>

						<NavigationMenu>
							<NavigationMenuList>
								{menu.map(item => (
									<DesktopItem
										key={item.title}
										item={item}
									/>
								))}
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					<Button
						asChild
						size="sm"
					>
						<a href={auth.login.url}>{auth.login.title}</a>
					</Button>
				</nav>

				{/* Mobile */}
				<div className="lg:hidden flex justify-between items-center">
					<Plane />

					<Sheet>
						<SheetTrigger asChild>
							<Button
								size="icon"
								variant="outline"
							>
								<Menu />
							</Button>
						</SheetTrigger>

						<SheetContent>
							<SheetHeader>
								<SheetTitle>{logo.title}</SheetTitle>
							</SheetHeader>

							<Accordion
								type="single"
								collapsible
							>
								{menu.map(item => (
									<MobileItem
										key={item.title}
										item={item}
									/>
								))}
							</Accordion>

							<Button
								asChild
								className="mt-4"
							>
								<a href={auth.login.url}>{auth.login.title}</a>
							</Button>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</section>
	);
}

function DesktopItem({ item }: { item: MenuItem }) {
	if (item.items) {
		return (
			<NavigationMenuItem>
				<NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
				<NavigationMenuContent>
					{item.items.map(sub => (
						<NavigationMenuLink
							asChild
							key={sub.title}
						>
							<a href={sub.url}>{sub.title}</a>
						</NavigationMenuLink>
					))}
				</NavigationMenuContent>
			</NavigationMenuItem>
		);
	}

	return (
		<NavigationMenuItem>
			<NavigationMenuLink href={item.url}>{item.title}</NavigationMenuLink>
		</NavigationMenuItem>
	);
}

function MobileItem({ item }: { item: MenuItem }) {
	if (item.items) {
		return (
			<AccordionItem value={item.title}>
				<AccordionTrigger>{item.title}</AccordionTrigger>
				<AccordionContent>
					{item.items.map(sub => (
						<a
							key={sub.title}
							href={sub.url}
						>
							{sub.title}
						</a>
					))}
				</AccordionContent>
			</AccordionItem>
		);
	}

	return <a href={item.url}>{item.title}</a>;
}
