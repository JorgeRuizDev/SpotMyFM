import prettyMilliseconds from "pretty-ms";
import React, { useCallback, useEffect, useState } from "react";

import Styled from "./TrackLengthIntervalSelector.styles";
import Buttons from "styles/Buttons";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { IInterval } from "util/filters/intervalFilters";
import DoubleSlider from "../../atoms/Sliders/DoubleSlider";
import useTranslation from "next-translate/useTranslation";

interface ITrackLengthIntervalSelectorProps {
  tracks: Track[];
  setInterval: (x: IInterval<number>) => void;
}

function TrackLengthIntervalSelector({
  tracks,
  setInterval,
}: ITrackLengthIntervalSelectorProps) {
  const [shortest, setShortest] = useState<number>();
  const [longest, setLongest] = useState<number>();

  const [lowInterval, setLowInterval] = useState<number>(0);
  const [topInterval, setTopInterval] = useState<number>(
    Number.MAX_SAFE_INTEGER
  );

  // Get the shortest and longest duration in MS
  useEffect(() => {
    let min = 0;
    let max = 0;

    for (const t of tracks) {
      const duration = t.spotifyDurationMS;
      if (duration > max) {
        max = duration;
      } else if (duration < min) {
        min = duration;
      }
    }
    setShortest(min);
    setLowInterval(min);
    setLongest(max);
    setTopInterval(max);
    setInterval({ low: min, top: max });
  }, [tracks, setInterval]);

  const onChange = useCallback(
    (x, y) => {
      setLowInterval(x);
      setTopInterval(y);
      setInterval({ low: x, top: y });
    },
    [setInterval]
  );

  function resetSlider() {
    setLowInterval(shortest || 0);
    setTopInterval(longest || Number.MAX_SAFE_INTEGER);
  }
  const { t } = useTranslation();
  return (
    <Styled.Wrap>
      <h4>{t("cards:track_length_interval")}</h4>
      {longest !== undefined && shortest !== undefined ? (
        <>
          <Styled.SliderWrap>
            <DoubleSlider
              min={shortest}
              max={longest}
              formatOutput={formatOutput}
              step={2000}
              minDistance={20000}
              onAfterChange={onChange}
              currentValues={[lowInterval, topInterval]}
            />
          </Styled.SliderWrap>
          <Styled.Center>
            <p>
              {prettyMilliseconds(lowInterval)} -{" "}
              {prettyMilliseconds(topInterval)}
            </p>
            <Buttons.PrimaryGreenButton onClick={resetSlider}>
              {t("cards:reset_to_default2")}
            </Buttons.PrimaryGreenButton>
          </Styled.Center>
        </>
      ) : null}
    </Styled.Wrap>
  );
}

function formatOutput(d: number) {
  return <span style={{ whiteSpace: "nowrap" }}>{prettyMilliseconds(d)}</span>;
}

export default TrackLengthIntervalSelector;
