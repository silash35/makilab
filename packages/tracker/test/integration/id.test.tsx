import generateProduct from "@test/utils/generateProduct";
import mockRouter from "@test/utils/mockRouter";
import testSOCard from "@test/utils/testSOCard";
import { render } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";

import IdPage, { getServerSideProps } from "@/pages/[id]";

const fetchMock = createFetchMock(vi);

// Shut Up Typescript
type GetSSP = (context: unknown) => {
  notFound: boolean;
  props: {
    locale: string;
    product: ReturnType<typeof generateProduct>;
  };
};

describe("Id Page", () => {
  beforeAll(() => {
    fetchMock.enableMocks();
    mockRouter("en");
  });

  it("should give 404 error when product is not found", async () => {
    fetchMock.mockResponseOnce(() => ({ status: 404 }));

    const { notFound } = await (getServerSideProps as unknown as GetSSP)({
      query: {},
      locale: "en",
    });
    expect(notFound).toBe(true);
  });

  it("should render a Service Order Card", async () => {
    const product = generateProduct();
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify(product));

    const { props } = await (getServerSideProps as unknown as GetSSP)({
      query: { id: "23" },
      locale: "en",
    });

    render(<IdPage {...props} />);
    await testSOCard(product);
  });
});
