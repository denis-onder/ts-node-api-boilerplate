import { expect } from "chai";
import server from "../Server";

before(() => server.start());

describe("Example test", () => {
  it("should return 2", () => {
    expect(1 + 1).to.eq(2);
  });
});

afterEach(function() {
  if (this.currentTest.state === "failed") {
    server.stop("Test suite failed.");
  }
});

after(() => server.stop());
