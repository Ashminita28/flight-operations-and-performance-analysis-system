import type { UseFormReturn } from "react-hook-form";
import type { ExportFormValues } from "../types/export-report-types";

export interface ExportReportFormProps {
	form: UseFormReturn<ExportFormValues>;
	onSubmit: (data: ExportFormValues) => void;
	exporting: boolean;
	exportError: string | null;
	successMessage: string;
	onUppercaseChange: (
		onChange: (value: string) => void,
	) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}
