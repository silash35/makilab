import { filterNumber, filterString } from "./filters";

const parseClient = (body) => {
  const newBody = {
    name: filterString(body.name),
    email: filterString(body.email),
    address: filterString(body.address),
    zip: filterNumber(body.zip),
    whatsapp: filterNumber(body.whatsapp),
    tel: filterNumber(body.tel),
    cpfOrCnpj: filterString(body.cpfOrCnpj),
  };

  return newBody;
};

export default parseClient;
