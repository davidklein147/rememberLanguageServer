const express = require("express");
const con = require("../utils/sql");
const inputContro = require("../controllers/inputsContro")

const router = express.Router();
router.post("/create", inputContro.create);


module.exports = router;