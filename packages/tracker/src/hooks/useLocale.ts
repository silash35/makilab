import { useCurrentLocale } from "next-i18n-router/client";

import i18nConfig from "@/i18nConfig";

interface locales<T> {
  pt: T;
  en: T;
}

const useLocale = <T>({ pt, en }: locales<T>) => {
  const locale = useCurrentLocale(i18nConfig);
  return { locale, t: locale === "en" ? en : pt };
};

export default useLocale;
