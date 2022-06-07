import { faker } from "@faker-js/faker";
import app from "@test/utils/app";
import getAuth from "@test/utils/getAuth";
import testSafety from "@test/utils/testSafety";
import fs from "fs";
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
    console.log("Email without Attachment", res.body.testMessageUrl);

    await request("")
      .get(res.body.testMessageUrl)
      .then((res) => {
        expect(res.text).include(email.text);
      });
  });

  it("should send Email with Attachment", async () => {
    const text = faker.lorem.paragraph();
    const fileBlob = fs.readFileSync("./public/whatsapp.png");
    const fileName = faker.system.commonFileName("png");

    const res = await request(app)
      .post("/api/private/mail")
      .field("to", faker.internet.email())
      .field("text", text)
      .attach("attachment", fileBlob, { filename: fileName })
      .set("Authorization", await getAuth())
      .expect(200);

    expect(res.body.status).equal("success");
    console.log("Email with Attachment", res.body.testMessageUrl);

    await request("")
      .get(res.body.testMessageUrl)
      .then((res) => {
        expect(res.text).include(text);
        expect(res.text).include(fileName);
      });
  });
});
