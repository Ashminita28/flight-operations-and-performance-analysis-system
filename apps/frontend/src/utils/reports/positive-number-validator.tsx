export function validatePositiveNumber(
	value: string,
	fieldName: string,
): string | undefined {
	if (!value) return undefined;
	const num = parseFloat(value);
	if (isNaN(num) || num <= 0) return `${fieldName} must be a positive number`;
	return undefined;
}
