import express from "express";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();

  // In AI Studio dev container, DEFAULT_APP_PORT is 3000 and Nginx listens on 8080 proxying to 3000.
  // In Cloud Run (production), DEFAULT_APP_PORT is undefined, PORT is 8080 (or set by Cloud Run).
  const isDev = process.env.NODE_ENV !== "production" && !!process.env.DEFAULT_APP_PORT;
  const PORT = isDev ? 3000 : (Number(process.env.PORT) || 8080);

  app.use(express.json());

  // Health check routes
  app.get(["/api/health", "/health", "/_ah/health"], (req, res) => {
    res.json({ status: "ok" });
  });

  // Serve app: Vite middleware in development, static files in production
  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.join(__dirname, "index.html"))
      ? __dirname
      : path.join(process.cwd(), "dist");

    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(200).send("<!doctype html><html><body>App loading...</body></html>");
      }
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} (mode: ${isDev ? "development" : "production"})`);
  });

  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`Port ${PORT} in use, attempting fallback...`);
      const fallbackPort = PORT === 3000 ? 8080 : 3000;
      const fallbackServer = app.listen(fallbackPort, "0.0.0.0", () => {
        console.log(`Server running on fallback http://0.0.0.0:${fallbackPort}`);
      });
      fallbackServer.on("error", (e) => {
        console.error("Fallback server error:", e);
      });
    } else {
      console.error("Server error:", err);
    }
  });
}

startServer();
