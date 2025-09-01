const express = require("express");
const axios = require("axios");
const router = express.Router();

const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;
const NATIVE_LAND_API_KEY = process.env.NATIVE_LAND_API_KEY;

// GET /api/city?lat=xx&lng=yy
router.get("/city", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}`
    );

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch city data" });
  }
});

// GET /api/lands?lat=xx&lng=yy
router.get("/lands", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const response = await axios.get(
      `https://native-land.ca/api/index.php?maps=territories&position=${lat},${lng}&key=${NATIVE_LAND_API_KEY}`
    );

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch indigenous lands data" });
  }
});

module.exports = router;
