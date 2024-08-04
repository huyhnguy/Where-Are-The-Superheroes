const express = require('express');
const router = express.Router();

const characterController = require("../controllers/characterController");
const scoreController = require("../controllers/scoreController");

router.post("/characters/deadpool", characterController.deadpool);
router.post("/characters/flash", characterController.flash);
router.post("/characters/spiderman", characterController.spiderman);

router.post("/scoreboard/score", scoreController.score);

module.exports = router;