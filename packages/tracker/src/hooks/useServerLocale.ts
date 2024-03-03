interface locales<T> {
  pt: T;
  en: T;
}

const useLocale = <T>({ pt, en }: locales<T>, locale?: string) => {
  return { locale, t: locale === "en" ? en : pt };
};

export default useLocale;
