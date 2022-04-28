import type { NextApiRequest } from "next";

import clientsManager from "@/database/clientsManager";
import apiFactory from "@/utils/backend/apiFactory";
import { parseCreateClient, parseUpdateClient } from "@/utils/backend/parsers";

const methods = {
  async GET() {
    return await clientsManager.readAll();
  },

  async POST(req: NextApiRequest) {
    const body = req.body;
    const client = await clientsManager.create(parseCreateClient(body, body));

    return client;
  },

  async PUT(req: NextApiRequest) {
    const body = req.body;
    const id = Number(body.clientID);

    if (isNaN(id)) {
      throw new Error("Invalid data: clientID");
    } else {
      return await clientsManager.update(id, parseUpdateClient(body, body));
    }
  },

  async DELETE(req: NextApiRequest) {
    await clientsManager.delete(Number(req.body.id));
  },
};

export default apiFactory(methods);
