import request from "supertest";

import app from "../utils/app";

describe("Sign in API - POST", () => {
  it("should not return token if password is wrong", async () => {
    const testValues = [undefined, null, true, false, "", "admin", 1, "password1", "pass word"];

    for (const testValue of testValues) {
      await request(app).post("/api/auth/signin").send({ password: testValue }).expect(401);
    }
  });
});
