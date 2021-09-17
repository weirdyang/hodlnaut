const { expect } = require("chai");
const chaiHttp = require("chai-http");
const chai = require("chai");
const { getAmount } = require("../Controller/amountController");
const app = require("../app");

chai.use(chaiHttp);

const url = "http://www.bitstamp.net/api/v2/ticker/";

describe("Test", () => {
  it("Basic Test", async () => {
    expect(1).to.equal(1);
  });
});

describe("Test Amount", () => {
  it("should get amount from user-1", (done) => {
    chai
      .request(app)
      .get("/test/1")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body.status).to.deep.equal('success');
        expect(res.body.amount).to.be.greaterThan(0);
        done();
      });
  });
});
