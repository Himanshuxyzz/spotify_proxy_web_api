const router = require("express").Router();
const { getCurrentPlayingItem, getUserTopTracks } = require("../utils/utils");
const rateLimit = require("express-rate-limit");

const playingApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const topTracksApiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 20 requests per `window` (here, per 10 minutes)
  message: "Too many requests from this IP, please try again after 10 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.get("/", (req, res) => {
  res.status(200).json({
    routes: {
      "/playing": "To get current playing song 🎤",
      "/top-trakcs": "To get top tracks 🎧",
    },
    message:
      "Some feature requires you to first open that feature in you device so that our api can return something",
  });
});

router.get("/playing", playingApiLimiter, async (req, res) => {
  const result = await getCurrentPlayingItem();
  res.status(200).json(result);
});

router.get("/top-tracks", topTracksApiLimiter, async (req, res) => {
  const result = await getUserTopTracks();
  res.status(200).json(result);
});

module.exports = router;
