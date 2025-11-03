import { createContext, useContext, useMemo, useState } from "react";
import en from "./strings.en";
import de from "./strings.de";

type Lang = "en" | "de";
type Dict = typeof en;

const I18nCtx = createContext<{
  t: (k: keyof Dict) => string;
  lang: Lang;
  setLang: (l: Lang) => void;
} | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const dict = lang === "de" ? de : en;

  const value = useMemo(
    () => ({
      t: (k: keyof Dict) => dict[k] ?? String(k),
      lang,
      setLang,
    }),
    [dict, lang]
  );

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}
