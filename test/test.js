const { expect } = require("chai");
const chaiHttp = require("chai-http");
const chai = require("chai");
const { getAmount } = require("../Controller/amountController");
const app = require("../app");
const request = require("request-promise");

chai.use(chaiHttp);

const urlBTC = "http://www.bitstamp.net/api/v2/ticker/btcusd";
const urlETH = "http://www.bitstamp.net/api/v2/ticker/ethusd";

describe("Test", () => {
  it("Basic Test", async () => {
    expect(1).to.equal(1);
  });
});

describe("BTCUSD value is correct", () => {
  var btcusd;
  var ethusd;

  before("get btcusd", async () => {
    let rateString = await request(urlBTC);
    btcusd = await parseFloat(JSON.parse(rateString)["last"]);
    rateString = await request(urlETH);
    ethusd = await parseFloat(JSON.parse(rateString)["last"]);
  });

  it("check if value is correct for BTC using user-998", (done) => {
    chai
      .request(app)
      .get("/test/998")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res).to.be.an("object");
        expect(res.body.status).to.deep.equal("success");
        expect(res.body.amount).to.be.equal(btcusd);
        done();
      });
  });

  it("check if value is correct for ETH using user-999", (done) => {
    chai
      .request(app)
      .get("/test/999")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res).to.be.an("object");
        expect(res.body.status).to.deep.equal("success");
        expect(res.body.amount).to.be.equal(ethusd);
        done();
      });
  });

  it("check if value is correct for 1 ETH and 1 BTC using user-1000", (done) => {
    chai
      .request(app)
      .get("/test/1000")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res).to.be.an("object");
        expect(res.body.status).to.deep.equal("success");
        expect(res.body.amount).to.be.equal(ethusd+btcusd);
        done();
      });
  });
});
