import request from "supertest";

import app from "./app";

const testSafety = (method: string, url: string, body?: unknown) => {
  request(app)[method](url).send(body).expect(401);
};

export default testSafety;
