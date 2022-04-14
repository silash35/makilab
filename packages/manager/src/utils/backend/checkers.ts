import type { Prisma } from "@prisma/client";

// Service Order

export const isCreateSO = (variable: unknown): variable is Prisma.ServiceOrderCreateInput => {
  return (
    typeof variable === "object" &&
    variable !== null &&
    "equipment" in variable &&
    "isUnderWarranty" in variable &&
    "attendedBy" in variable &&
    "attendedOn" in variable
  );
};

export const isUpdateSO = (variable: unknown): variable is Prisma.ServiceOrderUpdateInput => {
  return typeof variable === "object" && variable !== null;
};

// Client

export const isCreateClient = (variable: unknown): variable is Prisma.ClientCreateInput => {
  return typeof variable === "object" && variable !== null && "name" in variable;
};

export const isUpdateClient = (variable: unknown): variable is Prisma.ClientUpdateInput => {
  return typeof variable === "object" && variable !== null;
};
