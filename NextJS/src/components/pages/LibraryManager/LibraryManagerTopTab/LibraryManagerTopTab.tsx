import Styled from "./LibraryManagerTopTab.styles";
import * as Tab from "components/core/display/atoms/Tabs";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import SimpleSlider from "components/core/input/atoms/Sliders/SimpleSlider";
import { useCallback, useMemo, useState } from "react";
import Text from "styles/Text";
import _ from "lodash";
import { ImShuffle } from "react-icons/im";
interface ILibraryManagerTopTabProps {
  setTracks: (t: Track[]) => void;
  cachedTracks: Track[];
  setIsLoading: (isLoading: boolean) => void;
}

const defaultValue = 10;

function LibraryManagerTopTab({
  cachedTracks,
  setTracks,
  setIsLoading,
}: ILibraryManagerTopTabProps): JSX.Element {
  const trackCount = useMemo(() => cachedTracks.length, [cachedTracks]);

  const [numberTracks, setNumberTracks] = useState(defaultValue);

  const shuffle = useCallback(
    (nTracks: number) => {
      setIsLoading(true);

      const shuffled = _.shuffle(cachedTracks).slice(
        0,
        Math.min(defaultValue, nTracks)
      );

      setTracks(shuffled);
      setIsLoading(false);
    },
    [cachedTracks, setIsLoading, setTracks]
  );

  return (
    <Styled.Wrap>
      <Styled.MinH>
        <Tab.Tabs defaultTabId="1">
          <Tab.TabWrap>
            <Tab.Tab id={"1"}>
              <p>Track Manager</p>
            </Tab.Tab>
            <Tab.Tab id={"2"}>
              <p>
                <Text.Inline>
                  <span>Random Shuffle</span>
                  <ImShuffle />
                </Text.Inline>
              </p>
            </Tab.Tab>
          </Tab.TabWrap>

          <Tab.TabContentWrap>
            <Tab.TabContent id={"1"}>
              <p>Track Manager</p>
            </Tab.TabContent>
            <Tab.TabContent id={"2"}>
              <Styled.CenterSliderContainer>
                <h4>
                  <Text.Inline>
                    <ImShuffle />
                    <span>Random Shuffle</span>
                  </Text.Inline>
                </h4>
                <Styled.SliderContainer>
                  <SimpleSlider
                    min={10}
                    max={trackCount}
                    defaultValue={trackCount}
                    onChange={(x) => setNumberTracks(x)}
                    onAfterChange={shuffle}
                  />
                </Styled.SliderContainer>
                <p>
                  Select a <Text.green>random amount of tracks</Text.green> from
                  your library
                </p>
                <p>{numberTracks} Tracks Selected!</p>
              </Styled.CenterSliderContainer>
            </Tab.TabContent>
          </Tab.TabContentWrap>
        </Tab.Tabs>
      </Styled.MinH>
    </Styled.Wrap>
  );
}

export default LibraryManagerTopTab;
