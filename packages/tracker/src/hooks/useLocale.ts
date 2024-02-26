import { useCurrentLocale } from "next-i18n-router/client";

import i18nConfig from "@/i18nConfig";

const useLocale = () => {
  const locale = useCurrentLocale(i18nConfig);
  return { locale };
};

export default useLocale;
