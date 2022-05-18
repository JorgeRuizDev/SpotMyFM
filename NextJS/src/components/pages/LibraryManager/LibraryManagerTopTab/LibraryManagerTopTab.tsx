import Styled from "./LibraryManagerTopTab.styles";
import * as Tab from "components/core/display/atoms/Tabs";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import SimpleSlider from "components/core/input/atoms/Sliders/SimpleSlider";
import { useCallback, useMemo, useState } from "react";
import Text from "styles/Text";
import _ from "lodash";
import { ImShuffle } from "react-icons/im";
import useTranslation from "next-translate/useTranslation";
interface ILibraryManagerTopTabProps {
  setTracks: (t: Track[]) => void;
  cachedTracks: Track[];
  setIsLoading: (isLoading: boolean) => void;
  resetTrackSel: () => void;
}

function LibraryManagerTopTab({
  cachedTracks,
  setTracks,
  setIsLoading,
  resetTrackSel,
}: ILibraryManagerTopTabProps): JSX.Element {
  const trackCount = useMemo(() => cachedTracks.length, [cachedTracks]);
  const { t } = useTranslation();

  const [numberTracks, setNumberTracks] = useState(trackCount);

  const shuffle = useCallback(
    (nTracks: number) => {
      setIsLoading(true);

      const shuffled = _.shuffle(cachedTracks).slice(0, nTracks);

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
              <p>{t("cards:track_manager")}</p>
            </Tab.Tab>
            <Tab.Tab id={"2"}>
              <p>
                <Text.Inline>
                  <span>{t("cards:random_shuffle")}</span>
                  <ImShuffle />
                </Text.Inline>
              </p>
            </Tab.Tab>
          </Tab.TabWrap>

          <Tab.TabContentWrap>
            <Tab.TabContent id={"1"}>
              <Text.Column centered>
                <h5>
                  <Text.green>{t("cards:explore_your_library")}</Text.green>
                </h5>
                <p>
                  {t(
                    "cards:browse_filter_create_personalized_playlists_and_ch"
                  )}{" "}
                  <Text.green>{cachedTracks.length}</Text.green>{" "}
                  {t("cards:saved_songs")}
                </p>
                <br />
                <p>
                  {t("cards:generate_a")}{" "}
                  <Text.green>{t("cards:shuffled_sample")}</Text.green>{" "}
                  {t("cards:of_your_saved_tracks_in_the")}{" "}
                  <Text.green>{t("cards:random_shuffle_tab")}</Text.green>
                </p>
                <br />
              </Text.Column>
            </Tab.TabContent>
            <Tab.TabContent id={"2"}>
              <Styled.CenterSliderContainer>
                <h4>
                  <Text.Inline>
                    <ImShuffle />
                    <span>{t("cards:random_shuffle")}</span>
                  </Text.Inline>
                </h4>
                <Styled.SliderContainer>
                  <SimpleSlider
                    min={10}
                    max={trackCount}
                    onChange={(x) => setNumberTracks(x)}
                    onAfterChange={shuffle}
                  />
                </Styled.SliderContainer>
                <p>
                  {t("cards:select_a")}{" "}
                  <Text.green>{t("cards:random_amount_of_tracks")}</Text.green>{" "}
                  {t("cards:from_your_library")}
                </p>
                <p>
                  {t("cards:tracks_selected", { numberTracks: numberTracks })}
                  <Styled.ClickText
                    onClick={() => {
                      resetTrackSel();
                    }}
                  >
                    {t("cards:reset_selection")}
                  </Styled.ClickText>
                  )
                </p>
              </Styled.CenterSliderContainer>
            </Tab.TabContent>
          </Tab.TabContentWrap>
        </Tab.Tabs>
      </Styled.MinH>
    </Styled.Wrap>
  );
}

export default LibraryManagerTopTab;
