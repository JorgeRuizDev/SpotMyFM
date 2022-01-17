import useTranslation from "next-translate/useTranslation";
import DropdownMenu from "components/core/input/atoms/DropdownMenu";
import Styled from "./LocaleSelector.styles";
import { useRouter } from "next/router";
import Twemoji from "../Twemoji";
import Cookies from "js-cookie";

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

function LocaleSelector(props: ILocaleSelectorProps): JSX.Element {
  const current = useTranslation().lang;
  const { pathname, asPath, push } = useRouter();

  const cookie = Cookies.get("NEXT_LOCALE");

  function switchLocale(locale: string) {
    push(pathname, asPath, { locale: locale, scroll: false });

    if (cookie !== locale) {
      Cookies.set("NEXT_LOCALE", locale, {expires: new Date(new Date().getTime() + 3600 * 24 * 14 * 1000)});
    }
  }

  return (
    <DropdownMenu
      items={Object.entries(translations).map((o) => {
        return {
          component: (
            <>
              <Twemoji emoji={o[1].iconCode} type="hex" />
              <span
                style={{
                  textDecoration: current === o[1].code ? "underline" : "none",
                }}
              >
                {o[1].lang}
              </span>
            </>
          ),
          onClick: () => {
            switchLocale(o[1].code);
          },
        };
      })}
    >
      <Twemoji emoji={translations[current]?.iconCode} type="hex" />
      <span>{translations[current]?.lang}</span>
    </DropdownMenu>
  );
}

export default LocaleSelector;
