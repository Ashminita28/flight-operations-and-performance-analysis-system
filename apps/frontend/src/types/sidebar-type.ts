export const navItems = [
	{
		title: "Profile",
		url: "/profile",
		roles: ["Admin", "Manager", "Operations", "Analyst"],
	},
	{ title: "Manage User", url: "/users", roles: ["Admin"] },
	{
		title: "Active Dashboard",
		url: "/main-dashboard",
		roles: ["Admin", "Analyst", "Manager", "Operations"],
	},
	{
		title: "Flights Listing",
		url: "/flight-dashboard",
		roles: ["Admin", "Operations"],
	},
	{ title: "Events Dashboard", url: "/events", roles: ["Admin", "Manger"] },
	{
		title: "Performance Dashboard",
		url: "/performances",
		roles: ["Admin", "Manger", "Analytics"],
	},
];
