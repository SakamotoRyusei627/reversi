const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const setupServer = require("../server");
const expect = chai.expect;

const server = setupServer();
describe("オセロサーバーテスト", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });
  describe("GET /cards", () => {
    it("/cardsに対して正常にアクセスできステータスコード200を返す", (done) => {
      request.get("/cards").end((err, res) => {
        expect(res).to.have.status(200);
      });
      done();
    });
    it("データが配列の1つ返ってくる", (done) => {
      request.get("/cards").end((err, res) => {
        expect(res.body).to.have.lengthOf(1);
      });
      done();
    });
  });
});
