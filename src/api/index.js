const express = require("express");
const spotify = require("./spotify");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message:
      "Scared of exposing access tokens!! then use this proxy api to save your tokens",
  });
});

router.use("/spotify", spotify);

module.exports = router;
