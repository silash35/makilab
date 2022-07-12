import generateProduct from "@test/utils/generateProduct";
import mockRouter from "@test/utils/mockRouter";
import testSOCard from "@test/utils/testSOCard";
import { fireEvent, render, screen, within } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";

import Home from "@/pages/index";

const fetchMock = createFetchMock(vi);

describe("Home Page", () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

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
    fetchMock.mockResponseOnce(JSON.stringify(product));

    mockRouter("en");
    render(<Home />);

    search("OS23");

    await testSOCard(product);
  });

  it("should search and not found", async () => {
    fetchMock.mockResponseOnce(() => ({ status: 404 }));

    mockRouter("en");
    render(<Home />);

    search("OS23");

    await screen.findByText("No products found, did you type the Service Order correctly?");
  });

  it("should search and handle unknown error", async () => {
    fetchMock.mockRejectOnce(Error("Unknown error"));

    mockRouter("en");
    render(<Home />);

    search("OS23");

    await screen.findByText("Unknown error, please try again later");
  });
});

const search = (value: string) => {
  const searchBar = screen.getByPlaceholderText(
    "Enter your Service Order number"
  ) as HTMLInputElement;
  fireEvent.change(searchBar, { target: { value } });

  expect(searchBar.value).toBe(value);

  const button = screen.getByText("Search");
  fireEvent.click(button);
};
