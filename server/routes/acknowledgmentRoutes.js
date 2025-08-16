const express = require("express");
const router = express.Router();
const acknowledgmentController = require("../controllers/acknowledgmentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, acknowledgmentController.createAcknowledgment);
router.get("/", authMiddleware, acknowledgmentController.getAcknowledgments);

module.exports = router;
