import { faker } from "@faker-js/faker/locale/pt_BR";

export function generateClient(optionals = true, optionalsValueTo?: unknown) {
  if (optionals === true) {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(true),
      zip: faker.location.zipCode("#####-###"),
      whatsapp: faker.phone.number("+## ## #####-####"),
      tel: faker.phone.number("(##) #####-####"),
      cpfOrCnpj: faker.finance.pin(14),
    };
  } else {
    return {
      name: faker.person.fullName(),
      email: optionalsValueTo,
      address: optionalsValueTo,
      zip: optionalsValueTo,
      whatsapp: optionalsValueTo,
      tel: optionalsValueTo,
      cpfOrCnpj: optionalsValueTo,
    };
  }
}

export function generateServiceOrder(optionals = true, optionalsValueTo?: unknown) {
  if (optionals === true) {
    return {
      equipment: faker.vehicle.vehicle(),
      brand: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      productNumber: faker.vehicle.vrm(),
      batchOrImei: faker.vehicle.vin(),
      problemDescription: faker.lorem.sentence(),
      productCondition: faker.lorem.sentence(),
      accessories: faker.commerce.product(),
      listOfServices: faker.lorem.sentence(),
      notes: faker.lorem.paragraphs(10),

      isUnderWarranty: faker.datatype.boolean(),
      voltage: faker.number.int({ min: 0, max: 500 }) + "V",
      attendedBy: faker.person.fullName(),
      attendedOn: faker.person.jobArea(),
    };
  } else {
    return {
      equipment: faker.vehicle.vehicle(),
      brand: optionalsValueTo,
      model: optionalsValueTo,
      productNumber: optionalsValueTo,
      batchOrImei: optionalsValueTo,
      problemDescription: optionalsValueTo,
      productCondition: optionalsValueTo,
      accessories: optionalsValueTo,
      listOfServices: optionalsValueTo,
      notes: optionalsValueTo,

      isUnderWarranty: faker.datatype.boolean(),
      voltage: faker.number.int({ min: 0, max: 500 }) + "V",
      attendedBy: faker.person.fullName(),
      attendedOn: faker.person.jobArea(),
    };
  }
}
