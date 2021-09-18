const userBalances = require("../Models/user-balances");
const request = require("request-promise");

const url = "http://www.bitstamp.net/api/v2/ticker/";
const rates = {
  BTC: null,
  ETH: null,
};

const getAmount = async (req, res) => {
  try {
    let user = userBalances["user-".concat(req.params.id)];
    let amount = 0;

    // store all rates first
    for await (var [key, value] of Object.entries(user)) {
      let pair = await key.toLowerCase().concat("usd");
      let rateString = await request(url.concat(pair));
      rates[key] = await parseFloat(JSON.parse(rateString)["last"]);
    }

    // calculate amount
    for await (var [key, value] of Object.entries(user)) {
      amount += await rates[key] * value;
    }

    return res.status(200).json({ status: "success", amount: amount });
  } catch (error) {
    return res.status(500);
  }
};

module.exports = {
  getAmount,
};
