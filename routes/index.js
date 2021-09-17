var express = require("express");
const { getAmount } = require("../Controller/amountController");
const userBalances = require("../Models/user-balances");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/test/:id", getAmount);

module.exports = router;
