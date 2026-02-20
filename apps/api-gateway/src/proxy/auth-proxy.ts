import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware({
	target: "http://auth-service:3000",
	changeOrigin: true,
	pathRewrite: {
		"^/api/auth": "",
	},
});
