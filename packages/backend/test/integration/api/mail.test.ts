import { faker } from "@faker-js/faker";
import app from "@test/utils/app";
import getAuth from "@test/utils/getAuth";
import testSafety from "@test/utils/testSafety";
import request from "supertest";

describe("Mail API - POST", () => {
  const email = {
    to: faker.internet.email(),
    text: faker.lorem.paragraph(),
  };

  it("should not send Email when unauthenticated", async () => {
    await testSafety("post", "/api/private/mail", email);
  });

  it("should send Email when authenticated", async () => {
    const res = await request(app)
      .post("/api/private/mail")
      .send(email)
      .set("Authorization", await getAuth())
      .expect(200);

    expect(res.body.status).equal("success");

    await request("")
      .get(res.body.testMessageUrl)
      .then((res) => {
        expect(res.text).include(email.text);
      });
  });
});
