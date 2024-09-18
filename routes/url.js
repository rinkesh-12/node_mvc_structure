const express = require("express");
const router = express.Router();

const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleGenerateCount,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/:shortId", handleGenerateCount);

module.exports = router;
