export const MESSAGES = {
	// AUTH SERVICE MESSAGES
	USER_NOT_FOUND: "User not found",
	USER_ALREADY_EXISTS: "User already exists",
	USER_CREATION_FAILED: "User creation failed",
	ROLE_NOT_FOUND: "Role not found",
	WRONG_PASSWORD: "Wrong password",
	INVALID_TOKEN: "Invalid token",
	INVALID_OTP: "Invalid OTP",
	OTP_EXPIRED: "OTP expired",
	FLIGHT_SYSTEM_CREDENTIALS: "Flight System Credentials",
	PASSWORD_RESET_OTP: "Password Reset OTP",
	OTP_SENT: "OTP sent",
	PASSWORD_RESET_SUCCESSFULL: "Password reset successful",
	ALL_REGISTERED_USERS: "All registered users",

	// AIRCRAFT SERVICE MESSAGES
	AIRCRAFT_NOT_FOUND: "Aircraft not found",
	AIRCRAFT_UNDER_MAINTAINANCE: "Aircraft is under maintainance",

	// AIRPORT SERVICE MESSAGES
	AIRPORT_NOT_FOUND: "Airport not found",

	// FLIGHT SERVICE MESSAGES
	FLIGHT_NOT_FOUND: "Flight not found",
	NUMBER_EXISTS: "A flight with this flight number already exists on this date",
	INVALID_TIME: "Scheduled arrival must be after scheduled departure",
	SAME_AIRPORT: "Origin and destination airports cannot be the same",
	AIRCRAFT_UNAVAILABLE: "Aircraft is already assigned to an overlapping flight",
	INVALID_STATUS: "Invalid flight status provided",
	INVALID_STATUS_TRANSITION: "This status transition is not allowed",
	ID_REQUIRED: "Flight ID is required",
	STATUS_REQUIRED: "Status is required",
	CANNOT_DELETE: "Only scheduled or cancelled flights can be deleted",
	FLIGHT_NUMBER_REQUIRED: "Flight number is required",
	FLIGHT_NUMBER_EXISTS: "Flight already registered",
	DATE_REQUIRED: "Date query parameter is required",
	DEPARTURE_PAST: "Departure cannot be past date",

	// OPERATIONAL EVENT MESSAGES
	EVENT_NOT_FOUND: "Event not found",

	// DELAY MESSAGES
	DELAY_CATEGORY_NOT_FOUND: "Delay category not found",
	DELAY_CODE_ALREADY_EXISTS: "Delay category code already exists",

	// PERFORMANCE MESSAGES
	PERFORMANCE_RECORD_FOR_LANDED_FLIGHT:
		"Performance can only be recorded for landed flights",
	PERFORMANCE_EXISTS: "Performance record already exists for this flight",
};
