const express = require("express");
const { trackVisit, trackUniqueUser } = require("../controllers/analyticsController");

const router = express.Router();

router.post("/track-visit", trackVisit);
router.post("/track-unique-user", trackUniqueUser);

module.exports = router;
