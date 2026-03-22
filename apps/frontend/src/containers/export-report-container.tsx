"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useAnalyticsStore } from "@/store/analytics-store";
import { exportSchema } from "@/schemas/export-schema";

import { ExportReportForm } from "@/components/export-report-form";

import {
	buildExportPayload,
	formatSuccessMessage,
	toUppercaseHandler,
} from "../utils/reports/export-report-utils";

import { DEFAULT_VALUES } from "../constants/export-report-constants";
import type { ExportFormValues } from "../types/export-report-types";

export function ExportReportFormContainer() {
	const { initiateExport, exporting, exportError, clearError } =
		useAnalyticsStore();

	const [successMessage, setSuccessMessage] = useState("");

	const form = useForm<ExportFormValues>({
		resolver: zodResolver(exportSchema),
		defaultValues: DEFAULT_VALUES,
	});

	const onSubmit = useCallback(
		async (data: ExportFormValues) => {
			try {
				clearError();
				setSuccessMessage("");

				const payload = buildExportPayload(data);
				const result = await initiateExport(payload);

				const message = formatSuccessMessage(data.email, result.job_id);
				setSuccessMessage(message);

				form.reset();
				toast.success("Export initiated! Check your email soon.");
			} catch (error: unknown) {
				const errorMsg =
					error instanceof Error ? error.message : "Failed to initiate export";

				toast.error(errorMsg);
			}
		},
		[clearError, initiateExport, form],
	);

	return (
		<ExportReportForm
			form={form}
			onSubmit={onSubmit}
			exporting={exporting}
			exportError={exportError}
			successMessage={successMessage}
			onUppercaseChange={toUppercaseHandler}
		/>
	);
}
