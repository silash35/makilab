import app from "@test/utils/app";
import request from "supertest";

describe("Home Page", () => {
  it("should load even if unauthenticated", async () => {
    await request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.text).toEqual("This is a backend of OpenSOM. Where the magic happens.");
      });
  });
});
