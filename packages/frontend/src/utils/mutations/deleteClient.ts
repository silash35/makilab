import request from "../request";

export default async (id: number) => {
  const { response, error } = await request({
    method: "DELETE",
    url: "/api/private/clients",
    body: { id },
  });

  const deletedID = response?.deletedID as number;

  return { deletedID, error };
};
