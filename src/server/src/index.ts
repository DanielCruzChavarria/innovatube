// Import the 'express' module along with 'Request' and 'Response' types from express
import express from "express";
import { db } from "./services/db";
import { auth } from "./services/auth";
import session from "cookie-session";
import dotenv from "dotenv";
import { youtube } from "./services/youtube";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import path from "path";
dotenv.config(); // Load environment variables from .env file

const morgan = require("morgan");

// Create an Express application

const app = express();
// app.use(
//   cors({
//     origin: "https://front-angular-production.up.railway.app",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     credentials: true,
//   })
// );
app.use(morgan("tiny"));
app.use(
  session({
    secret: process.env["SESSION_SECRET"] || "secret",
  })
);

// Configurar CSP con helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "script-src": ["*"],
      "script-src-attr": ["'unsafe-inline'"],  // Permitir scripts en atributos
      "default-src": ["*"],               // Permitir carga por defecto desde el mismo origen
      "img-src": ["*"]                         // Permitir carga de imágenes desde cualquier origen
    },
  },
}));

app.use(compression());


app.use("/api", auth);
app.use("/api", youtube);
app.use(db);

app.use(express.static(path.join(__dirname, '../../innovatube/')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../innovatube/', 'index.html'));
});

const port = process.env['PORT'] || 3200;

app.get("/ping", async (_, res) => {
  res.send("pong");
});

const server = app.listen(port, () => {
  console.log(__dirname)
  console.log(`App listening on port  ${port}`);
});

process.on("SIGTERM", () => {
  console.debug("SIGTERM signal received: closing HTTP server ");
  server.close(() => {
    console.debug("HTTP server closed");
  });
});
