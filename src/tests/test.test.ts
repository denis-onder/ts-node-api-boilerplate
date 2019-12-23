import { expect } from "chai";

/** Rules for automating server startup
 *  import server from "../Server";
 *
 *  before(() => server.start());
 *
 *  afterEach(function() {
 *  if (this.currentTest.state === "failed") {
 *    server.stop("Test suite failed.");
 *  }
 *  });
 *
 *  after(() => server.stop());
 */

describe("Example test", () => {
  it("should return 2", () => {
    expect(1 + 1).to.eq(2);
  });
});
