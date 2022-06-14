import React from "react";
import { FaLastfm, FaSpotify } from "react-icons/fa";
import { AiFillApi } from "react-icons/ai";
import Buttons from "styles/Buttons";
import Styled, { P } from "./LoginPage.styles";
import { getOauth } from "../../../../../util/spotify/oauthFrontend";
import LocaleSelector from "components/util/LocaleSelector";
import useTranslation from "next-translate/useTranslation";

interface ILoginPageProps {}

function LoginPage(props: ILoginPageProps) {
  const { t } = useTranslation();
  return (
    <Styled.ContentWrapper>
      <Styled.ColCenter>
        <Styled.Title>
          {t("cards:welcome_to")} <Styled.Green>SpotMyFM</Styled.Green>!
        </Styled.Title>
        <Styled.Subtitle>
          {t("cards:a_spotify_library_manager")}
        </Styled.Subtitle>
        <LocaleSelector />
      </Styled.ColCenter>
      <Styled.TopButtonWrap>
        <SpotifyLoginBtn />
      </Styled.TopButtonWrap>

      <Styled.CardWrap>
        <Styled.Card>
          <h1>
            <Styled.Green>
              <FaSpotify />
            </Styled.Green>
          </h1>

          <h4 style={{ textAlign: "center" }}>
            <Styled.Green>
              {t("cards:manage_your_spotify_library")}
            </Styled.Green>
          </h4>
          <hr />
          <br />
          <P>
            {t("cards:log_in_with_your_spotify_account_to")}{" "}
            <Styled.Green>{t("cards:explore_play")}</Styled.Green>{" "}
            {t("cards:and")} <Styled.Green>{t("cards:filtra")}</Styled.Green>{" "}
            {t("cards:your_favorite_songs")}
          </P>
          <br />
          <P>
            <Styled.Green>{t("cards:create_or_replace")}</Styled.Green>{" "}
            {t("cards:your_playlists_with_your_personalized_track_select")}
          </P>
          <br />
          <P>
            <Styled.Green>{t("cards:tag_your_albums")}</Styled.Green>{" "}
            {t("cards:use_custom_tags_to_increase_your_album_organizatio")}
          </P>
        </Styled.Card>

        <Styled.Card>
          <h1>
            <Styled.Red>
              <FaLastfm />
            </Styled.Red>
          </h1>
          <h4 style={{ textAlign: "center" }}>
            <Styled.Red>{t("cards:lastfm_community")}</Styled.Red>
          </h4>
          <hr />
          <br />
          <P>
            SpotMyFM{" "}
            <Styled.Red>{t("cards:mixes_your_spotify_library")}</Styled.Red>{" "}
            {t("cards:with_the_awesome")}{" "}
            <Styled.Red>{t("cards:lastfm_community")}</Styled.Red>.
          </P>
          <br />
          <P>
            {t("cards:filter_by")}{" "}
            <Styled.Red>{t("cards:community_tags")}</Styled.Red>{" "}
            {t("cards:or_get_individual_details_for_each_track")}
          </P>
          <hr />
        </Styled.Card>

        <Styled.Card>
          <h1>
            <Styled.Green>
              <AiFillApi />
            </Styled.Green>
          </h1>
          <h4 style={{ textAlign: "center" }}>
            <Styled.Green>{t("cards:deeplearning_backend")}</Styled.Green>
            <hr />
          </h4>
          <br />
          <P>
            <Styled.Green>SpotMyFM</Styled.Green> {t("cards:uses")}{" "}
            <Styled.Green>{t("cards:deep_learning")}</Styled.Green>{" "}
            {t("cards:techniques_to_analyze_your_favorite_tracks_audio_s")}
          </P>
          <br />
          <P>
            <Styled.Green>{t("cards:check_your_stats")}</Styled.Green>{" "}
            {t("cards:with_ludwig_backend_you_can_explore_track_features")}
          </P>
          <br />
          <P>
            {t("cards:extend_your")}{" "}
            <Styled.Green>{t("cards:library")}</Styled.Green>{" "}
            {t("cards:with_similar_tracks_spotmyfm_provides_content_base")}
          </P>
        </Styled.Card>
      </Styled.CardWrap>
      <Styled.ButtonWrap>
        <SpotifyLoginBtn />
      </Styled.ButtonWrap>
    </Styled.ContentWrapper>
  );
}

function SpotifyLoginBtn() {
  const t = useTranslation().t;
  return (
    <Buttons.LoginButton onClick={() => getOauth().promptCredentials()}>
      {t("cards:log_in_with_spotify")}
    </Buttons.LoginButton>
  );
}

export default LoginPage;
