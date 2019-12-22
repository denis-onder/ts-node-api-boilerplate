import { expect } from "chai";
import apiTester from "../utils/apiTester";

const testingAccount = {
  first_name: "Test",
  last_name: "Account",
  email: "test_account@example.com",
  password: "test12345",
  confirm_password: "test12345"
};

describe("Example test", () => {
  describe("Registration", () => {
    it("should return the user object", async () => {
      const res = await apiTester("post", "/api/auth/register", testingAccount);
      expect(res.data).to.include.all.keys(
        "_id",
        "first_name",
        "last_name",
        "email",
        "password",
        "createdAt",
        "__v"
      );
    });
  });
});
