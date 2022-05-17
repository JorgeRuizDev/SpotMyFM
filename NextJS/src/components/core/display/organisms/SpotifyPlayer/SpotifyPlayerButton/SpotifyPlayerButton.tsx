import { Track } from "data/cacheDB/dexieDB/models/Track";
import { createRef, useEffect, useState } from "react";
import Styled from "./SpotifyPlayerButton.styles";
import useTranslation from "next-translate/useTranslation";
interface ISpotifyPlayerButtonProps {
  playing?: Track;
}

function SpotifyPlayerButton({
  playing,
}: ISpotifyPlayerButtonProps): JSX.Element {
  const parentRef = createRef<HTMLDivElement>();
  const titleRef = createRef<HTMLDivElement>();
  const artistRef = createRef<HTMLDivElement>();

  // Current parent Width
  const [parentW, setParentW] = useState(0);

  const [titleOverflows, setTitleOverflows] = useState(true);
  const [artistsOverflows, setArtistsOverflows] = useState(true);

  // Set the parent width
  useEffect(() => {
    setParentW((parentRef.current?.offsetWidth || 0) - 60);
  }, [parentRef]);

  useEffect(() => {
    const w = artistRef.current?.offsetWidth || 0;

    if (parentW <= w) {
      setArtistsOverflows(true);
    } else {
      setArtistsOverflows(false);
    }
  }, [artistRef, parentW]);

  useEffect(() => {
    const w = titleRef.current?.offsetWidth || 0;

    if (parentW <= w) {
      setTitleOverflows(true);
    } else {
      setTitleOverflows(false);
    }
  }, [parentW, titleRef]);
  const {t} = useTranslation();
  const title = (
    <Styled.PlayingText>
      <Styled.Title>
        {playing ? (
          <span>
            {playing.name} · {playing.album?.name || ""}
          </span>
        ) : (
          <span>{t('cards:there_is_no_active_track')}</span>
        )}
      </Styled.Title>
    </Styled.PlayingText>
  );

  const subtitle = (
    <Styled.PlayingText>
      {playing && (
        <Styled.Subtitle>
          {playing.artists.map((a) => a.name).join(" , ")}
        </Styled.Subtitle>
      )}
    </Styled.PlayingText>
  );

  return (
    <Styled.PlayerWrap ref={parentRef}>
      {playing && (
        <Styled.TrackImg
          style={{ maxHeight: "50px" }}
          alt={playing.name}
          src={
            playing.album?.spotifyCoverUrl[
              playing.album?.spotifyCoverUrl.length - 1
            ] || ""
          }
        />
      )}
      <Styled.TextColWrap>
        <Styled.PlayingStatusWrap>
          <Styled.Marquee1 ref={titleRef} animateMarq={titleOverflows}>
            {title}
          </Styled.Marquee1>
          <Styled.Marquee2 animateMarq={titleOverflows}>
            {title}
          </Styled.Marquee2>
        </Styled.PlayingStatusWrap>
        <Styled.PlayingStatusWrap>
          <Styled.Marquee1 ref={artistRef} animateMarq={artistsOverflows}>
            {subtitle}
          </Styled.Marquee1>
          <Styled.Marquee2 animateMarq={artistsOverflows}>
            {subtitle}
          </Styled.Marquee2>
        </Styled.PlayingStatusWrap>
      </Styled.TextColWrap>
    </Styled.PlayerWrap>
  );
}

export default SpotifyPlayerButton;
