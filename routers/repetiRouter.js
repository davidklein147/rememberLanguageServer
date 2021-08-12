const express = require("express");
const con = require("../utils/sql");
const repetitionContro = require("../controllers/repetitionContro")

const router = express.Router();
router.get("/dailylist/:id", repetitionContro.dailyRepetitionList);


module.exports = router;