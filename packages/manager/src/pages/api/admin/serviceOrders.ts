import type { NextApiRequest } from "next";

import serviceOrdersManager from "@/database/serviceOrdersManager";
import apiFactory from "@/utils/backend/apiFactory";
import { parseUpdateSO, parseUpdateStatusSO } from "@/utils/backend/parsers";

const methods = {
  async GET(req: NextApiRequest) {
    let answer;
    if (req.query.id === undefined) {
      answer = await serviceOrdersManager.readAll();
    } else {
      answer = await serviceOrdersManager.readOne(
        Array.isArray(req.query.id) ? Number(req.query.id[0]) : Number(req.query.id)
      );
    }

    if (!answer) {
      throw new Error("Not Found");
    }
    return answer;
  },

  async POST(req: NextApiRequest) {
    return await serviceOrdersManager.update(Number(req.body.id), parseUpdateSO(req.body));
  },

  async PUT(req: NextApiRequest) {
    return await serviceOrdersManager.update(Number(req.body.id), parseUpdateStatusSO(req.body));
  },

  async DELETE(req: NextApiRequest) {
    await serviceOrdersManager.delete(Number(req.body.id));
  },
};

export default apiFactory(methods);
