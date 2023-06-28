// app.js serves all configurations routes,middlewares e.t.c

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const api = require("./api");
const helmet = require("helmet");
const app = express();
app.use(
  cors({
    origin: [process.env.DEPLOYED_URL, process.env.ORIGIN_URL],
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
// app.get("/ip", (request, response) => response.send(request.ip));

app.get("/", async (req, res) => {
  res.json({
    message: "Spotify proxy server api",
    routes: {
      "to get access spotify routes": "/api/v1",
    },
  });
});

app.use("/api/v1", api);

module.exports = app;
