import type { Prisma } from "@prisma/client";

export const isSO = (variable: unknown): variable is Prisma.ServiceOrderCreateInput => {
  return (
    typeof variable === "object" &&
    variable !== null &&
    "equipment" in variable &&
    "attendedBy" in variable &&
    "attendedOn" in variable
  );
};

export const isClient = (variable: unknown): variable is Prisma.ClientCreateInput => {
  return typeof variable === "object" && variable !== null && "name" in variable;
};
