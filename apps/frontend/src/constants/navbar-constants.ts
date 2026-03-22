import type { MenuItem, NavbarProps } from "../types/navbar-types";

export const DEFAULT_LOGO: NonNullable<NavbarProps["logo"]> = {
	url: "/",
	src: "",
	alt: "logo",
	title: "Fligo",
};

export const DEFAULT_MENU: MenuItem[] = [
	{ title: "Home", url: "/" },
	{ title: "About", url: "/" },
	{ title: "Features", url: "/" },
	{ title: "Services", url: "/dashboard" },
];

export const DEFAULT_AUTH: NonNullable<NavbarProps["auth"]> = {
	login: { title: "Login", url: "/login" },
};
