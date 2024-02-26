import useLocale from "@/hooks/useLocale";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

// Shut Up Typescript
const mock = vi.fn(useLocale);

const mockRouter = (locale: string) => {
  (useLocale as typeof mock).mockImplementation(() => {
    return {
      locale,
    } as ReturnType<typeof useLocale>;
  });
};

export default mockRouter;
