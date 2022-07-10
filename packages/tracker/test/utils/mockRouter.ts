import { useRouter } from "next/router";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

// Shut Up Typescript
const mock = vi.fn(useRouter);

const mockRouter = (locale: string) => {
  (useRouter as typeof mock).mockImplementation(() => {
    return {
      locale,
    } as ReturnType<typeof useRouter>;
  });
};

export default mockRouter;
