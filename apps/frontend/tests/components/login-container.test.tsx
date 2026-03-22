import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { LoginContainer } from "../../src/containers/login-container";
import type { User } from "../../src/services/auth-service";

//mocks
const mockNavigate = vi.fn();
const mockLogin = vi.fn();
const mockToastSuccess = vi.fn();
const mockToastError = vi.fn();

// router mock
vi.mock("react-router-dom", () => ({
	useNavigate: () => mockNavigate,
}));

// toast mock
vi.mock("sonner", () => ({
	toast: {
		success: mockToastSuccess,
		error: mockToastError,
	},
}));

// Zustand mock
type AuthState = {
	user: User | null;
	login: (email: string, password: string) => Promise<User>;
};

const mockStoreState: AuthState = {
	user: null,
	login: mockLogin,
};

vi.mock("@/store/auth-store", () => ({
	useAuthStore: Object.assign(
		(selector: (state: AuthState) => unknown) => selector(mockStoreState),
		{
			getState: () => mockStoreState,
		},
	),
}));

describe("LoginContainer", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockStoreState.user = null;
	});

	it("calls login on form submit", async () => {
		mockLogin.mockResolvedValue({
			id: "1",
			name: "test",
			email: "test@test.com",
		});

		render(<LoginContainer />);

		fireEvent.submit(screen.getByRole("form", { name: /login form/i }));

		expect(mockLogin).toHaveBeenCalled();
	});

	it("navigates on success when user exists", async () => {
		mockLogin.mockResolvedValue({
			id: "1",
			name: "test",
			email: "test@test.com",
		});

		mockStoreState.user = {
			id: "1",
			name: "test",
			email: "test@test.com",
		};

		render(<LoginContainer />);

		fireEvent.submit(screen.getByRole("form", { name: /login form/i }));

		expect(mockNavigate).toHaveBeenCalledWith("/main-dashboard");
		expect(mockToastSuccess).toHaveBeenCalledWith("Login Successful");
	});

	it("shows error toast when user is null", async () => {
		mockLogin.mockResolvedValue({
			id: "1",
			name: "test",
			email: "test@test.com",
		});

		mockStoreState.user = null;

		render(<LoginContainer />);

		fireEvent.submit(screen.getByRole("form", { name: /login form/i }));

		expect(mockToastError).toHaveBeenCalledWith("Login Failed");
	});

	it("sets error message on login failure", async () => {
		mockLogin.mockRejectedValue(new Error("Invalid credentials"));

		render(<LoginContainer />);

		fireEvent.submit(screen.getByRole("form", { name: /login form/i }));

		const alert = await screen.findByRole("alert");

		expect(alert.textContent).toBe("Invalid credentials");
	});
});
