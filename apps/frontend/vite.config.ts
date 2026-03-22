import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), analyzer()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./tests/setup.ts",
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						if (id.includes("react-dom")) return "react-dom";
						if (id.includes("react-router")) return "router";
						if (id.includes("recharts")) return "charts";
						if (id.includes("@tanstack/react-table")) return "table";
						if (id.includes("zod")) return "zod";
						if (id.includes("react")) return "react";
					}
				},
			},
		},
	},
});
