import useTranslation from "next-translate/useTranslation";
import DropdownMenu from "components/core/input/atoms/DropdownMenu";
import Styled from "./LocaleSelector.styles";
import { useRouter } from "next/router";
import Twemoji from "../Twemoji";
import Cookies from "js-cookie";
import { useCallback } from "react";

interface ILocaleSelectorProps {}

interface transItem {
  iconCode: string;
  code: string;
  lang: string;
}

const translations: { [key: string]: transItem } = {
  es: {
    iconCode: "1f1ea-1f1e6",
    code: "es",
    lang: "Español",
  },
  en: {
    iconCode: "1f1fa-1f1f8",
    code: "en",
    lang: "English",
  },
} as const;

/**
 * DropDown Menu that toggles the current language
 *
 */
function LocaleSelector(props: ILocaleSelectorProps): JSX.Element {
  const currentLan = useTranslation().lang;
  const { pathname, asPath, push } = useRouter();

  const switchLocale = useCallback(
    (locale: string) => {
      const currentCookie = Cookies.get("NEXT_LOCALE");
      push(pathname, asPath, { locale: locale, scroll: false });

      if (currentCookie !== locale) {
        Cookies.set("NEXT_LOCALE", locale, {
          expires: new Date(new Date().getTime() + 3600 * 24 * 14 * 1000),
        });
      }
    },
    [asPath, pathname, push]
  );

  return (
    <DropdownMenu
      items={Object.entries(translations).map((o) => ({
        onClick: () => switchLocale(o[1].code),
        component: (
          <>
            <Twemoji emoji={o[1].iconCode} type="hex" />
            <span
              style={{
                textDecoration: currentLan === o[1].code ? "underline" : "none",
              }}
            >
              {o[1].lang}
            </span>
          </>
        ),
      }))}
    >
      <Twemoji emoji={translations[currentLan]?.iconCode} type="hex" />
      <span>{translations[currentLan]?.lang}</span>
    </DropdownMenu>
  );
}

export default LocaleSelector;
