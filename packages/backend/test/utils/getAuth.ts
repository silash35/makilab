import request from "supertest";

import app from "./app";

const getAuth = async () => {
  return await request(app)
    .post("/api/auth/signin")
    .send({ password: import.meta.env.PASSWORD })
    .expect(200)
    .then((response) => response.body.token);
};

export default getAuth;
