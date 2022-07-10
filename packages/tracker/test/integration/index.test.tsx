import generateProduct from "@test/utils/generateProduct";
import mockRouter from "@test/utils/mockRouter";
import { fireEvent, render, screen, within } from "@testing-library/react";

import Home from "@/pages/index";

describe("Home Page", () => {
  it("should load in portuguese by default", () => {
    mockRouter("");
    render(<Home />);
    const main = within(screen.getByRole("main"));
    expect(main.getByText("Verifique o status do seu")).toBeDefined();
  });

  it("should load in portuguese when locale is pt", () => {
    mockRouter("pt");
    render(<Home />);
    const main = within(screen.getByRole("main"));
    expect(main.getByText("Verifique o status do seu")).toBeDefined();
  });

  it("should load in english when locale is en", () => {
    mockRouter("en");
    render(<Home />);
    const main = within(screen.getByRole("main"));
    expect(main.getByText("Check your product")).toBeDefined();
  });

  it("should search and found", async () => {
    const product = generateProduct();
    const fetchMock = vi.fn((url: string, body: unknown) => {
      console.log(url);
      console.log(body);
      return async () => ({
        status: 200,
        json: async () => product,
      });
    });
    vi.stubGlobal("fetch", fetchMock);

    mockRouter("en");
    render(<Home />);

    const searchBar = screen.getByPlaceholderText(
      "Enter your Service Order number"
    ) as HTMLInputElement;

    fireEvent.change(searchBar, { target: { value: "OS23" } });

    expect(searchBar.value).toBe("OS23");

    const button = screen.getByText("Search");
    fireEvent.click(button);

    await screen.findByText("Unknown error, please try again later");
  });
});
