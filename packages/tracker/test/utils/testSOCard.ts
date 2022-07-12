import { screen } from "@testing-library/react";

import type generateProduct from "./generateProduct";

export default async (product: ReturnType<typeof generateProduct>) => {
  await screen.findByText(`SO ${product.id}: ${product.name}`);
  screen.getByText(
    "We have received your product for technical evaluation. Wait for our contact by Whatsapp or Email"
  );
};
