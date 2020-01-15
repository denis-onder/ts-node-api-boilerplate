import { expect } from "chai";
import apiTester from "../utils/apiTester";

// Rules for automating server startup
// import server from "../Server";

// before(() => server.start());

// afterEach(() => {
//   if (this.currentTest.state === "failed") server.stop("Test suite failed.");
// });

// after(() => server.stop());

// Token placeholder
let token;

const testingAccount = {
  first_name: "Test",
  last_name: "Account",
  email: "test_account@example.com",
  password: "test12345",
  confirm_password: "test12345"
};

const editedAccount = {
  first_name: "Edited",
  last_name: "Account",
  email: "edited_account@example.com",
  password: "12345test",
  confirm_password: "12345test"
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
        "clientID",
        "__v"
      );
    });
  });
  describe("Login", () => {
    it("should return an object with the loggedIn and token props", async () => {
      const res = await apiTester("post", "/api/auth/login", testingAccount);
      expect(res.data).to.include.all.keys("loggedIn", "token");
      token = res.data.token;
    });
  });
  describe("Get current user", () => {
    it("should return all non-sensitive user information", async () => {
      const res = await apiTester("get", "/api/auth/me", null, token);
      expect(res.data).to.include.all.keys(
        "id",
        "first_name",
        "last_name",
        "email",
        "createdAt"
      );
    });
  });
  describe("Edit", () => {
    it("should return the edited user's object", async () => {
      const res = await apiTester(
        "put",
        "/api/auth/edit",
        editedAccount,
        token
      );
      expect(res.data).to.include.all.keys(
        "_id",
        "first_name",
        "last_name",
        "email",
        "password",
        "clientID",
        "createdAt",
        "__v"
      );
    });
  });
  describe("Delete", () => {
    it("should return an object with the deleted and timestamp props", async () => {
      const res = await apiTester("delete", "/api/auth/delete", null, token);
      expect(res.data).to.include.all.keys("deleted", "timestamp");
    });
  });
});
