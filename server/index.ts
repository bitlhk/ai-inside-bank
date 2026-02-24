import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // ✅ Production needs a real /api/ai proxy (Vite proxy only works in dev).
  // This makes the frontend call:
  //   POST /api/ai/chat/completions
  // get forwarded to:
  //   https://api.modelarts-maas.com/v2/chat/completions
  app.use(
    "/api/ai",
    createProxyMiddleware({
      target: "https://api.modelarts-maas.com",
      changeOrigin: true,
      secure: true,

      // IMPORTANT:
      // When mounted at "/api/ai", the path seen here is typically "/chat/completions".
      // So we must prepend "/v2" (NOT replace "/api/ai").
      pathRewrite: (p) => `/v2${p}`,

      // Avoid cutting off long model responses
      timeout: 60_000,
      proxyTimeout: 60_000,

      // Helpful while debugging (shows proxied URL in logs)
      logLevel: process.env.NODE_ENV === "production" ? "info" : "debug",

      onError(err, _req, res) {
        console.error("AI proxy error:", (err as any)?.message || err);
        res
          .status(502)
          .json({ error: "Bad Gateway", detail: String((err as any)?.message || err) });
      },
    })
  );

  // ✅ Reduce disconnects for longer requests
  server.keepAliveTimeout = 65_000;
  server.headersTimeout = 66_000;
  server.requestTimeout = 60_000;

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
