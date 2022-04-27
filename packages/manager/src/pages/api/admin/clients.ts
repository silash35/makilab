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
    let client;
    const id = Number(body.clientID);

    if (isNaN(id)) {
      throw new Error("Invalid data: clientID");
    } else {
      if (id === 0) {
        client = await clientsManager.create(parseCreateClient(body, body));
      } else {
        client = await clientsManager.update(Number(body.clientID), parseUpdateClient(body, body));
      }
    }

    return client;
  },

  async DELETE(req: NextApiRequest) {
    await clientsManager.delete(Number(req.body.id));
  },
};

export default apiFactory(methods);
