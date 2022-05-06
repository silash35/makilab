import request from "../request";

export default async (id: number) => {
  const { response, status } = await request({
    method: "DELETE",
    url: "/api/private/serviceOrders",
    body: { id },
  });

  const deletedID = response.deletedID as number;

  return { deletedID, status };
};
