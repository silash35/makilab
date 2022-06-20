import config from "@config";
import request from "supertest";

import app from "./app";

const user = config.USERS[0];

const getAuth = async () => {
  return await request(app)
    .post("/api/auth/signin")
    .send({ user: user.name, password: user.password })
    .expect(200)
    .then((response) => response.body.token);
};

export default getAuth;
