var http = require("http");
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
var options = {
  timeout: 2000,
  host: "localhost",
  port: process.env["PORT"] || 3000,
  path: "/ping",
};

var request = http.request(options, (res: { statusCode: string | number }) => {
  console.info("STATUS: " + res.statusCode);
  process.exitCode = res.statusCode === 200 ? 0 : 1;
  process.exit();
});

request.on("error", function (err: any) {
  console.error("ERROR", err);
  process.exit(1);
});

request.end();
