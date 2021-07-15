const express = require("express");
const con = require("../utils/sql");
const authContro = require("../controllers/authContro")

const router = express.Router();
router.post("/logup", authContro.logup);

module.exports = router