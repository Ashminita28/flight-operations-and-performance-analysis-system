import { describe, it, expect, beforeEach, vi } from "vitest";
import { useOperationStore } from "../../src/store/operation-store";
import { operationService } from "../../src/services/operation-service";
import type { OperationalEvent } from "../../src/types/flight-types";

vi.mock("../../src/services/operation-service");

describe("Operation Store", () => {
	const mockEvent: OperationalEvent = {
		id: "1",
		flight_id: "FL1",
		event_type: "delay",
		delay_category_id: "WX",
		delay_minutes: "30",
		description: "Weather delay",
		event_time: new Date(),
		resolved_at: new Date(),
		severity: "high",
		createdAt: new Date().toISOString(),
	};

	beforeEach(() => {
		useOperationStore.setState({
			events: [],
			loading: false,
			error: null,
		});

		vi.clearAllMocks();
	});

	it("fetchEvents success", async () => {
		vi.mocked(operationService.getEvents).mockResolvedValue([mockEvent]);

		await useOperationStore.getState().fetchEvents("FL1");

		const state = useOperationStore.getState();

		expect(state.events).toEqual([mockEvent]);
		expect(state.loading).toBe(false);
		expect(state.error).toBeNull();
	});

	it("fetchEvents error", async () => {
		vi.mocked(operationService.getEvents).mockRejectedValue(
			new Error("failed"),
		);

		await useOperationStore.getState().fetchEvents("FL1");

		const state = useOperationStore.getState();

		expect(state.error).toBe("failed");
		expect(state.loading).toBe(false);
	});

	it("addEvent success", async () => {
		vi.mocked(operationService.createEvent).mockResolvedValue(undefined);
		vi.mocked(operationService.getEvents).mockResolvedValue([mockEvent]);

		await useOperationStore.getState().addEvent("FL1", {});

		const state = useOperationStore.getState();

		expect(state.events).toEqual([mockEvent]);
	});
});
