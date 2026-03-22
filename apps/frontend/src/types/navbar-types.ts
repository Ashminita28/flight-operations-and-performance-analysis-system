export interface MenuItem {
	title: string;
	url: string;
	description?: string;
	icon?: React.ReactNode;
	items?: MenuItem[];
}

export interface NavbarProps {
	className?: string;
	logo?: {
		url: string;
		src: string;
		alt: string;
		title: string;
	};
	menu?: MenuItem[];
	auth?: {
		login: {
			title: string;
			url: string;
		};
	};
}
