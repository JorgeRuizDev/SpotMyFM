import {
  Tab,
  TabContent,
  TabContentWrap,
  TabWrap,
  Tabs,
} from "components/core/display/atoms/Tabs";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { getDecade } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Buttons from "styles/Buttons";
import { IInterval } from "util/filters/intervalFilters";
import DoubleSlider from "../../atoms/Sliders/DoubleSlider";
import AnyIntervalPicker from "./AnyIntervalPicker";
import Styled from "./DateIntervalSelector.styles";

interface IDateIntervalSelectorProps {
  albums: Album[];
  setDateInterval: (x: IInterval<Date>) => void;
}

interface IDateStats {
  totalAlbums: number;
  oldest: Album;
  newest: Album;
}

function DateIntervalSelector({
  albums,
  setDateInterval,
}: IDateIntervalSelectorProps): JSX.Element {
  // Current oldest and newest dates among all the albums. Can be null
  const [oldestDate, setOldestDate] = useState<Date | null>(null);
  const [dateStats, setDateStats] = useState<IDateStats | null>(null);
  const [newestDate, setNewestDate] = useState<Date | null>(null);
  const [min, setMin] = useState(new Date());
  const [max, setMax] = useState(new Date());

  // Return the current interval on every change
  useEffect(() => {
    setDateInterval({ low: min, top: max });
  }, [min, max, setDateInterval]);

  // On year slide change update the current min and max to the selected ones
  const onYearSliderChange = useCallback((x: number, y: number) => {
    setMin(new Date(x, 0, 1));
    setMax(new Date(y, 11, 31));
  }, []);

  // On decade slide change update the current min and max to the selected ones
  const onSliderDecadesChange = useCallback(
    (x: number, y: number) => {
      onYearSliderChange(x * 10 + 1, y * 10);
    },
    [onYearSliderChange]
  );

  useEffect(() => {
    if (albums.length == 0) return;

    const sorted = albums.sort(
      (x, y) =>
        (x?.spotifyReleaseDate?.getTime() || 0) -
        (y?.spotifyReleaseDate?.getTime() || 0)
    );

    const min = sorted?.[0]?.spotifyReleaseDate || new Date(0);
    const max = sorted?.[sorted.length - 1]?.spotifyReleaseDate || new Date(0);

    setDateStats({
      totalAlbums: sorted.length,
      oldest: sorted?.[0],
      newest: sorted?.[sorted.length - 1],
    });

    !oldestDate && setOldestDate(min);
    !newestDate && setNewestDate(max);
    setMin(min);
    setMax(max);
  }, [albums, oldestDate, newestDate]);

  return (
    <div>
      <h4>📆 Select the release date interval</h4>

      {oldestDate !== null && newestDate !== null ? (
        <div>
          <Tabs defaultTabId={"1"}>
            <TabWrap>
              <Tab id={"1"}>
                <p>Year Interval</p>
              </Tab>
              <Tab id={"2"}>
                <p>Decade Interval</p>
              </Tab>
              <Tab id={"3"}>
                <p>Any Interval</p>
              </Tab>
              <Tab id={"4"}>
                <p>
                  <FaInfoCircle />
                </p>
              </Tab>
            </TabWrap>

            <TabContentWrap>
              <TabContent id={"1"}>
                <Styled.SliderWrap>
                  <DoubleSlider
                    key={0}
                    min={oldestDate.getFullYear() || 0}
                    max={newestDate.getFullYear() || 1}
                    currentValues={[min?.getFullYear(), max?.getFullYear()]}
                    minDistance={0}
                    onAfterChange={onYearSliderChange}
                  />
                </Styled.SliderWrap>
              </TabContent>
              <TabContent id={"2"}>
                <Styled.SliderWrap>
                  <DoubleSlider
                    key={1}
                    min={(getDecade(oldestDate) - 10) / 10}
                    max={(getDecade(newestDate) + 10) / 10}
                    currentValues={[getDecade(min) / 10, getDecade(max) / 10]}
                    formatOutput={formatSliderOutputDecades}
                    onAfterChange={onSliderDecadesChange}
                  />
                </Styled.SliderWrap>
              </TabContent>
              <TabContent id={"3"}>
                <AnyIntervalPicker
                  oldestDate={min}
                  newestDate={max}
                  setMin={setMin}
                  setMax={setMax}
                />
              </TabContent>
              <TabContent id={"4"}>
                <h4>Album Date Stats</h4>
                {dateStats !== null ? (
                  <>
                    <p>
                      Oldest Album: {dateStats.oldest.name} by{" "}
                      {dateStats.oldest.artists[0]?.name} -{" "}
                      {dateStats.oldest.spotifyReleaseDate?.toLocaleDateString()}
                    </p>

                    <p>
                      Oldest Album: {dateStats.newest.name} by{" "}
                      {dateStats.newest.artists[0]?.name} -{" "}
                      {dateStats.newest.spotifyReleaseDate?.toLocaleDateString()}
                    </p>
                  </>
                ) : null}
              </TabContent>
            </TabContentWrap>
          </Tabs>
          <Styled.Center>
            <p>Selected Interval:</p>
            <p>
              {min?.toLocaleDateString() || 0} -{" "}
              {max?.toLocaleDateString() || 0}
            </p>
            <Buttons.PrimaryGreenButton
              onClick={() => {
                setMin(oldestDate);
                setMax(newestDate);
              }}
            >
              Full Interval
            </Buttons.PrimaryGreenButton>
          </Styled.Center>
          ^
        </div>
      ) : null}
    </div>
  );
}

/**
 * Changes the Slider format to display just the current decade.
 * @param x
 * @returns
 */
function formatSliderOutputDecades(x: number) {
  return (x * 10).toString();
}
export default DateIntervalSelector;
