import express from "express";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { fileURLToPath } from "url";

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
    "https://github.com/Roshan-Peter/Lapcenter/blob/main/instagram.png?raw=true",
    "https://github.com/Roshan-Peter/Lapcenter/blob/main/linkedin.png?raw=true",
  ], // Allowed origins
  methods: ["GET"], // Allowed HTTP methods
  credentials: true, // Allow credentials if needed (cookies, authorization headers)
};

// Middleware
app.use(helmet(corsOptions)); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("tiny")); // HTTP request logging

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "img-src *; " + // Temporarily allow all images
      "script-src 'self' https://cdn.jsdelivr.net; " +
      "style-src 'self' 'unsafe-inline';"
  );
  next();
});

app.use(express.static(path.join(__dirname, "dist")));

// Handle all routes by serving the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
