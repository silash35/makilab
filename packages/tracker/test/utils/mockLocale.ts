import type { ArgumentsType, Mock } from "vitest";

vi.mock("next-i18n-router/client", () => ({
  useCurrentLocale: vi.fn(),
}));

import { useCurrentLocale } from "next-i18n-router/client";

type MockedUseCurrentLocale = Mock<
  ArgumentsType<typeof useCurrentLocale>,
  ReturnType<typeof useCurrentLocale>
>;

const mockLocale = (locale: string) => {
  (useCurrentLocale as MockedUseCurrentLocale).mockImplementation(() => {
    return locale;
  });
};

export default mockLocale;
