import Head from "components/util/Head";
import LudwigDropZone from "../../../core/input/atoms/LudwigDropZone";
import React from "react";
import { toast } from "react-toastify";

import Styled from "./LandingPage.styles";
import { Theme } from "enums/Theme";
import { getOauth } from "../../../../util/spotify/oauthFrontend";
import { useThemeStore } from "../../../../store/useTheme";
import FullPage from "./FullPage";
import AndMoreDemo from "./Demos/AndMoreDemo";
import LoginPage from "./LoginPage";
import FilterDemo from "./Demos/FilterDemo";
import TrackDemo from "./Demos/TrackDemo";
import AlbumView from "components/core/cards/views/AlbumView";
import AlbumDemo from "./Demos/AlbumDemo";
import useTranslation from "next-translate/useTranslation";

export default function (): JSX.Element {
  const theme = useThemeStore((s) => s.currentTheme);
  const t = useTranslation().t
  return (
    <div>
      <Head />

      <FullPage
        styles={generateBackgrounds(6, theme == Theme.DARK)}
        topButton={t('cards:try-now')}
      >
        <Styled.CenterCol>
          <DivTop />
          <LoginPage />
        </Styled.CenterCol>

        <Styled.DemoWrapper>
          <Styled.CenterCol>
            <h3>{t('cards:explore_your_library')}</h3>
            <p>{t('cards:click_anywhere_in_order_to_enable_hover_preview')}</p>
            <hr />
            <TrackDemo />
          </Styled.CenterCol>
        </Styled.DemoWrapper>
        <Styled.DemoWrapper>
          <Styled.CenterCol>
            <h3>{t('cards:analyze_your_tracks')}</h3>
            <p>{t('cards:upload_an_mp3_wav_file')}</p>
            <hr />
            <LudwigDropZone />
          </Styled.CenterCol>
        </Styled.DemoWrapper>

        <Styled.DemoWrapper>
          <Styled.CenterCol>
            <h3>{t('cards:explore_and_tag_your_albums')}</h3>
            <hr />
            <AlbumDemo/>
          </Styled.CenterCol>
        </Styled.DemoWrapper>
        <Styled.DemoWrapper>
          <Styled.CenterCol>
            <h3>{t('cards:use_advanced_filters')}</h3>
            <h5>{t('cards:create_specific_playlists')}</h5>
            <hr />
            <FilterDemo />
          </Styled.CenterCol>

        </Styled.DemoWrapper>
        <div>
          <Styled.DemoWrapper>
            <Styled.CenterCol>
              <h3>{t('cards:and_many_more')}</h3>
              <hr />
            </Styled.CenterCol>
            <AndMoreDemo />
          </Styled.DemoWrapper>
          <DivBottom />
        </div>
      </FullPage>
    </div>
  );
}

function generateBackgrounds(count: number, isDark: boolean) {
  function darkPalette() {
    const p: string[] = [];
    for (let i = 0; i < count; i++) {
      p.push(`hsl(0, 0%, ${13 + 1 * i}%)`);
    }

    return p;
  }

  function lightPalette() {
    const p: string[] = [];
    for (let i = 0; i < count; i++) {
      p.push(`hsl(220, 13%, ${91 - 2 * i}%)`);
    }

    return p;
  }

  const styles: React.CSSProperties[] = [];

  for (const bg of isDark ? darkPalette() : lightPalette()) {
    styles.push({ background: bg });
  }

  return styles;
}

function DivTop() {
  return (
    <div
      className="custom-shape-divider-top-1630680612"
      style={{ position: "absolute", top: 0 }}
    >
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="shape-fill"
        ></path>
      </svg>
    </div>
  );
}

function DivBottom() {
  return (
    <div
      style={{
        width: "100vw",
      }}
    >
      <div className="custom-shape-divider-bottom-1630680696">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export function toastLogIn(message: string) {
  toast.info(
    <span onClick={() => getOauth().promptCredentials()}>{message}</span>
  );
}
