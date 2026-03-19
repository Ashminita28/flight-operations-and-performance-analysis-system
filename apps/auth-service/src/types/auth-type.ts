export interface LoginDTO {
	email: string;
	password: string;
}
export interface RegisterDTO {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	password: string;
	roleName: string;
}
export interface LogoutDTO {
	userId: string;
}

export interface ResetDTO {
	email: string;
	otp: string;
	newPassword: string;
}
