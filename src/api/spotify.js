const router = require("express").Router();
const { getCurrentPlayingItem, getUserTopTracks } = require("../utils/utils");

router.get("/playing", async (req, res) => {
  const result = await getCurrentPlayingItem();
  res.status(200).json(result);
});

router.get("/top-tracks", async (req, res) => {
  const result = await getUserTopTracks();
  res.status(200).json(result);
});

module.exports = router;
