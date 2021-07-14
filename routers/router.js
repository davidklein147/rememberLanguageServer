const express = require("express");
const con = require("../utils/sql");

const router = express.Router();
router.post("/logup", require("../collections/authColle").logup);

module.exports = router