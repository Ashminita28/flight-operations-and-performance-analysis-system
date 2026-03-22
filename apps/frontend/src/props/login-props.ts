export interface LoginFormProps {
	emailRef: React.RefObject<HTMLInputElement | null>;
	passwordRef: React.RefObject<HTMLInputElement | null>;
	error: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	className?: string;
}
