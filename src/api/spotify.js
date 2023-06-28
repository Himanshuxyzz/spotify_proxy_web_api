const router = require("express").Router();
const { getCurrentPlayingItem, getUserTopTracks } = require("../utils/utils");
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
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

router.get("/playing", apiLimiter, async (req, res) => {
  const result = await getCurrentPlayingItem();
  // message: "Play any song in device to get the data";
  console.log(typeof result);
  res.status(200).json(result);
});

router.get("/top-tracks", apiLimiter, async (req, res) => {
  const result = await getUserTopTracks();
  res.status(200).json(result);
});

module.exports = router;
