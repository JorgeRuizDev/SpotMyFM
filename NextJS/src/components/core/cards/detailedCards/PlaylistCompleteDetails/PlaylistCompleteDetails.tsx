import Styled from "./PlaylistCompleteDetails.styles";
import Buttons from "styles/Buttons";
import useTranslation from "next-translate/useTranslation";
interface IPlaylistCompleteDetailsProps {
  playlist?: SpotifyApi.PlaylistObjectSimplified;
}

function PlaylistCompleteDetails({ playlist }: IPlaylistCompleteDetailsProps) {
  return (
    <>
      <Styled.TwoCols>
        <Col1 />
        <Col2 />
      </Styled.TwoCols>

      <Styled.Center>
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlist?.id}`}
          width="90%"
          height="360"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      </Styled.Center>
    </>
  );

  function Col1() {
      const {t} = useTranslation();
    return (
      <Styled.Col>
        <Styled.Img
          src={playlist?.images?.[0].url}
          alt={playlist?.name + " cover"}
          height={"320px"}
          width={"320px"}
        />
        <Styled.JustifyLeft>
          <h3>{playlist?.name}</h3>
          <h4>{t('cards:tracks2', {'%total%': playlist?.tracks.total})}</h4>
        </Styled.JustifyLeft>
      </Styled.Col>
    );
  }

  function Col2() {
      const {t} = useTranslation();
    return (
      <Styled.Col>
        <h3>{t('cards:details')}</h3>
        <Styled.JustifyLeft>
          {playlist?.description ? (
            <>
              <b>{t('cards:description2')}</b>
              <p>{playlist?.description}</p>
              <hr />
            </>
          ) : null}
          <a href={playlist?.owner.uri}>
            <p>{t('cards:owner2', {'%display_name%': playlist?.owner.display_name})}</p>
          </a>

          <p>{playlist?.public ? "Public" : "Private"}</p>
          <p>
            {playlist?.collaborative ? "Collaborative" : "Not Collaborative"}
          </p>
        </Styled.JustifyLeft>
        <Buttons.PrimaryGreenButton onClick={() => window.open(playlist?.uri)}>
          {t('cards:open')}
        </Buttons.PrimaryGreenButton>
      </Styled.Col>
    );
  }
}

export default PlaylistCompleteDetails;
