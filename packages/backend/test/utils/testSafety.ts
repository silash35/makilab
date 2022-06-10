import request from "supertest";

import app from "./app";

type Methods = "get" | "post" | "put" | "delete";

const testSafety = (method: Methods, url: string, body?: object) => {
  request(app)[method](url).send(body).expect(401);
};

export default testSafety;
