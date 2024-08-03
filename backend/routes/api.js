const express = require('express');
const router = express.Router();

const characterController = require("../controllers/characterController");

router.post("/characters/deadpool", characterController.deadpool);
router.post("/characters/flash", characterController.flash);
router.post("/characters/spiderman", characterController.spiderman);

module.exports = router;