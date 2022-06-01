import request from "supertest";

import app from "./utils/app";

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

import cleanUp from "./utils/cleanUp";
afterAll(cleanUp);
