// app.js serves all configurations routes,middlewares e.t.c

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const api = require("./api");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(
  cors({
    origin: `${process.env.ORIGIN_URL || process.env.DEPLOYED_URL}`,
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.sendStatus(200);
  res.json({
    message: "Spotify proxy server",
    routes: {
      "to get access token": "/spotify",
    },
  });
});

app.use("/api/v1", api);

module.exports = app;
