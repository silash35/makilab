import request from "supertest";

import Client from "../types/client";
import app from "./app";
import getAuth from "./getAuth";

const cleanUp = async () => {
  console.log("Clean up");

  const res = await request(app)
    .get("/api/private/clients")
    .set("Authorization", await getAuth())
    .expect(200);

  const clients = res.body as Client[];

  for (const client of clients) {
    await request(app)
      .delete("/api/private/clients")
      .send({ id: client.id })
      .set("Authorization", await getAuth())
      .expect(200)
      .then((response) => {
        expect(response.body.deletedID).be.equal(client.id);
      });
  }
};

export default cleanUp;
