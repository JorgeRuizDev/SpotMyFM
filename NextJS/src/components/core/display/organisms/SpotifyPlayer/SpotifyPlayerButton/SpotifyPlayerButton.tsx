import { Track } from "data/cacheDB/dexieDB/models/Track";
import { createRef, useEffect, useState } from "react";
import Styled from "./SpotifyPlayerButton.styles";
interface ISpotifyPlayerButtonProps {
  playing?: Track;
}

function SpotifyPlayerButton({ playing }: ISpotifyPlayerButtonProps) {
  const parentRef = createRef<HTMLDivElement>();
  const titleRef = createRef<HTMLDivElement>();
  const artistRef = createRef<HTMLDivElement>();

  // Current parent Width
  const [parentW, setParentW] = useState(0);

  const [titleOverflows, setTitleOverflows] = useState(true);
  const [artistsOverflows, setArtistsOverflows] = useState(true);

  console.log(artistsOverflows);

  // Set the parent width
  useEffect(() => {
    setParentW(parentRef.current?.offsetWidth || 0);
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

    console.log(parentW);
    console.log(w);
    if (parentW <= w) {
      setTitleOverflows(true);
    } else {
      setTitleOverflows(false);
    }
  }, [parentW, titleRef]);

  const title = (
    <Styled.PlayingText>
      <Styled.Title>
        {playing ? (
          <span>
            {playing.name} · {playing.album?.name || ""}
          </span>
        ) : (
          <span>There is No Active Track</span>
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
    <Styled.PlayerWrap ref={parentRef} style={{ backgroundColor: "red" }}>
      {playing && (
        <img
          height={"60px"}
          width={"60px"}
          alt={playing.name}
          src={
            playing.album?.spotifyCoverUrl[
              playing.album?.spotifyCoverUrl.length - 1
            ] || ""
          }
        />
      )}
      <Styled.TextColWrap >
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
