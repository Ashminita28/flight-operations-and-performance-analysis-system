import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { SignupContainer } from "../../src/containers/signup-container";
import type { RegisterPayload } from "../../src/types/auth-types";

// --- mocks ---
const mockNavigate = vi.fn();
const mockRegister = vi.fn();

// router mock
vi.mock("react-router-dom", () => ({
	useNavigate: () => mockNavigate,
}));

// Zustand mock
type AuthState = {
	register: (payload: RegisterPayload) => Promise<void>;
};

const mockStoreState: AuthState = {
	register: mockRegister,
};

vi.mock("@/store/auth-store", () => ({
	useAuthStore: Object.assign(
		(selector: (state: AuthState) => unknown) => selector(mockStoreState),
		{
			getState: () => mockStoreState,
		},
	),
}));

describe("SignupContainer", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("updates form values on input change", () => {
		render(<SignupContainer />);

		const firstNameInput = screen.getByPlaceholderText("John");

		fireEvent.change(firstNameInput, {
			target: { value: "Alice" },
		});

		expect((firstNameInput as HTMLInputElement).value).toBe("Alice");
	});

	it("calls register with correct payload", async () => {
		mockRegister.mockResolvedValue(undefined);

		render(<SignupContainer />);

		fireEvent.change(screen.getByPlaceholderText("John"), {
			target: { value: "Alice" },
		});

		fireEvent.change(screen.getByPlaceholderText("Doe"), {
			target: { value: "Smith" },
		});

		fireEvent.change(screen.getByPlaceholderText("john.doe@example.com"), {
			target: { value: "alice@test.com" },
		});

		fireEvent.change(screen.getByPlaceholderText("+91 98765 43210"), {
			target: { value: "9999999999" },
		});

		fireEvent.change(screen.getByLabelText(/password/i), {
			target: { value: "password123" },
		});

		fireEvent.submit(screen.getByRole("form", { name: /register user form/i }));

		expect(mockRegister).toHaveBeenCalledWith(
			expect.objectContaining({
				first_name: "Alice",
				last_name: "Smith",
				email: "alice@test.com",
			}),
		);
	});

	it("navigates on successful registration", async () => {
		mockRegister.mockResolvedValue(undefined);

		render(<SignupContainer />);

		fireEvent.submit(screen.getByRole("form", { name: /register user form/i }));

		expect(mockNavigate).toHaveBeenCalledWith("/main-dashboard");
	});

	it("shows success message on success", async () => {
		mockRegister.mockResolvedValue(undefined);

		render(<SignupContainer />);

		fireEvent.submit(screen.getByRole("form", { name: /register user form/i }));

		const alert = await screen.findByRole("alert");

		expect(alert.textContent).toBe("User Registered Successfully");
	});

	it("shows error message on failure", async () => {
		mockRegister.mockRejectedValue(new Error("Registration failed"));

		render(<SignupContainer />);

		fireEvent.submit(screen.getByRole("form", { name: /register user form/i }));

		const alert = await screen.findByRole("alert");

		expect(alert.textContent).toBe("Registration failed");
	});
});
