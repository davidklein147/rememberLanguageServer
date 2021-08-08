const express = require("express");
const con = require("../utils/sql");
const envContro = require("../controllers/envContro")

const router = express.Router();
router.get("/lang", envContro.getLang);

module.exports = router;