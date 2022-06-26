import Styled from "./AndMoreDemo.styles";
import useTranslation from "next-translate/useTranslation";
interface IAndMoreDemoProps {}

function AndMoreDemo(props: IAndMoreDemoProps) {
  const { t } = useTranslation();
  return (
    <Styled.GridWrap>
      <div>
        <video autoPlay muted loop width="700" height="400">
          <source src="/demo/demoVideos/playlist.mp4" type="video/mp4" />
        </video>

        <Styled.CenterCol>
          <hr />
          <h4>{t("cards:create_or_replace_your_own_playlists")}</h4>
        </Styled.CenterCol>
      </div>
      <div>
        <video autoPlay muted loop width="700" height="400">
          <source src="/demo/demoVideos/shuffle.mp4" type="video/mp4" />
        </video>
        <Styled.CenterCol>
          <hr />
          <h4>{t("cards:create_random_playlists_with_realshuffle")}</h4>
        </Styled.CenterCol>
      </div>
      <div>
        <video autoPlay muted loop width="700" height="400">
          <source src="/demo/demoVideos/player.mp4" type="video/mp4" />
        </video>
        <Styled.CenterCol>
          <hr />
          <h4>{t("cards:play_your_music")}</h4>
        </Styled.CenterCol>
      </div>
      <div>
        <video autoPlay muted loop width="700" height="400">
          <source src="/demo/demoVideos/search.mp4" type="video/mp4" />
        </video>
        <Styled.CenterCol>
          <hr />
          <h4>{t("cards:search_playlists_artists_and_albums")}</h4>
        </Styled.CenterCol>
      </div>
    </Styled.GridWrap>
  );
}

export default AndMoreDemo;
