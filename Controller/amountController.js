const userBalances = require("../Models/user-balances");
const request = require("request-promise");

const url = "http://www.bitstamp.net/api/v2/ticker/";

const getAmount = async (req, res) => {
  try {
    console.log(res);
    let user = userBalances["user-".concat(req.params.id)];
    let total = 0;

    for await (var [key, value] of Object.entries(user)) {
      let pair = await key.toLowerCase().concat("usd");
      let rateString = await request(url.concat(pair));
      let rate = await parseFloat(JSON.parse(rateString)["last"]);
      total += (await rate) * value;
    }

    return res.status(200).json({ status: "success", amount: total });
  } catch (error) {
    return res.status(500);
  }
};

module.exports = {
  getAmount,
};
