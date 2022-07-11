import { screen } from "@testing-library/react";

import type generateProduct from "./generateProduct";

export default async (product: ReturnType<typeof generateProduct>) => {
  await screen.findByText(`SO ${product.id}:`, { exact: false });
  screen.getByText(product.name, { exact: false });
  screen.getByText(
    "We have received your product for technical evaluation. Wait for our contact by Whatsapp or Email"
  );
};
