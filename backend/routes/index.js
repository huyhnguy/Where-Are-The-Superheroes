const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(
    path.join(__dirname, "../frontend/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

module.exports = router;
