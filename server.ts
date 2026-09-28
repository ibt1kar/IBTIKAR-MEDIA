import express from "express";
import http from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDistPath(): string {
  const candidates = [
    path.join(__dirname, "dist"),
    path.join(process.cwd(), "dist"),
    __dirname,
    process.cwd(),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(path.join(candidate, "index.html"))) {
      return candidate;
    }
  }
  return path.join(process.cwd(), "dist");
}

async function startServer() {
  const app = express();

  // In AI Studio dev container: DEFAULT_APP_PORT is '3000', NODE_ENV is 'development', Nginx on 8080 proxies to 3000.
  // In Cloud Run (deployed): DEFAULT_APP_PORT is undefined, PORT is '8080', NODE_ENV is 'production'.
  const isDevContainer = Boolean(process.env.DEFAULT_APP_PORT);
  const isProduction = process.env.NODE_ENV === "production" || !isDevContainer;

  const port = isDevContainer
    ? Number(process.env.DEFAULT_APP_PORT) || 3000
    : Number(process.env.PORT) || 8080;

  app.use(express.json());

  // Universal health check routes for Cloud Run and container orchestrators
  app.get(["/api/health", "/health", "/_ah/health", "/ping"], (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  if (!isProduction) {
    // Development mode: attach Vite middleware
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve pre-built static bundle
    const distPath = getDistPath();
    app.use(express.static(distPath, { maxAge: "1d", index: false }));

    // SPA fallback for all GET and HEAD requests
    app.use((req, res, next) => {
      if (req.method !== "GET" && req.method !== "HEAD") {
        return next();
      }
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
      }
      return res.status(200).send("<!doctype html><html><body>App loading...</body></html>");
    });
  }

  // Start primary HTTP server
  const server = http.createServer(app);
  server.listen(port, "0.0.0.0", () => {
    console.log(
      `Server listening on http://0.0.0.0:${port} (mode: ${
        isProduction ? "production" : "development"
      })`
    );
  });

  server.on("error", (err: any) => {
    console.error(`Server error on port ${port}:`, err);
  });

  // Graceful termination for Cloud Run
  const shutdown = () => {
    console.log("Shutting down gracefully...");
    server.close(() => {
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer();
