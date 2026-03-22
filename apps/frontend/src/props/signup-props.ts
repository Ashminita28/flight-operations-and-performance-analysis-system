import type { RegisterPayload } from "@/types/auth-types";
export interface SignupFormProps {
	values: RegisterPayload;
	onChange: (field: keyof RegisterPayload, value: string) => void;
	message: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
