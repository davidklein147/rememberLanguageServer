const express = require("express");
const con = require("../utils/sql");
const authContro = require("../controllers/authContro")

const router = express.Router();
router.post("/logup", authContro.logup);
router.post("/login", authContro.login);

module.exports = router;