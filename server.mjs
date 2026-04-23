import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const port = 5173;
const base = process.cwd();

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".md": "text/markdown; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const server = http.createServer(async (req, res) => {
  const rawPath = (req.url || "/").split("?")[0];
  const pathname = decodeURIComponent(rawPath === "/" ? "/index.html" : rawPath);
  let filePath = path.join(base, pathname);

  if (!filePath.startsWith(base)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  try {
    const info = await stat(filePath);
    if (!info.isFile()) filePath = path.join(base, "index.html");
  } catch {
    filePath = path.join(base, "index.html");
  }

  try {
    const content = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.setHeader("Content-Type", mime[ext] || "application/octet-stream");
    res.end(content);
  } catch {
    res.statusCode = 500;
    res.end("Server error");
  }
});

server.listen(port, () => {
  console.log(`Preview server running: http://localhost:${port}`);
});
