const userBalances = require("../Models/user-balances");
const request = require("request-promise");

const url = "http://www.bitstamp.net/api/v2/ticker/";

const getAmount = async (req, res) => {
  try {
    let user = userBalances["user-".concat(req.params.id)];
    let total = 0;

    for await (var [key, value] of Object.entries(user)) {
      let pair = await key.toLowerCase().concat("usd");
      let rateString = await request(url.concat(pair));
      let rate = await parseFloat(JSON.parse(rateString)["high"]);
      total += (await rate) * value;
    }

    let totalAmount = { amount: total };
    return res.json(totalAmount);
  } catch (error) {
    errorMessage.error = "An error occured";
    return res.status(status.error).send(errorMessage);
  }
};

module.exports = {
  getAmount,
};
