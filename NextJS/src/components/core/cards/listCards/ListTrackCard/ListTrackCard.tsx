import Modal from "components/core/display/molecules/Modal";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import prettyMilliseconds from "pretty-ms";
import React, { useState } from "react";
import formatPopularity from "util/spotify/formatPopularity";
import { PlaylistButton } from "../../buttons/CardButtons/CardButtons";

import TrackCompleteDetails from "../../detailedCards/TrackCompleteDetails";
import { AiOutlineClockCircle } from "react-icons/ai";
import Styled from "./ListTrackCard.styles";
import { IGenericCardViewSortProps } from "../../views/GenericCardView/GenericCardView";
import Buttons from "styles/Buttons";
import { FaPlus } from "react-icons/fa";
import useTranslation from "next-translate/useTranslation";
interface IListTrackCardProps {
  track: Track;
  pos?: number;

  toggleFromPlaylist?: (track: Track) => void;
  inPlaylist?: boolean;
  isNested?: boolean;
  small?: boolean;
}

function ListTrackCard({
  track,
  pos,
  inPlaylist,
  toggleFromPlaylist,
  isNested = false,
  small = false,
}: IListTrackCardProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Styled.ListItem
        onClick={(e) => {
          setIsModalOpen((s) => !s);
          e.preventDefault();
        }}
        style={small ? { minHeight: "50px" } : {}}
      >
        <Styled.LeftSide>
          <Styled.FirstTwoCols>
            <Styled.Pos>{pos != undefined && <p>{pos}</p>}</Styled.Pos>
            <Styled.Cover
              src={
                track.album?.spotifyCoverUrl[
                  track.album?.spotifyCoverUrl.length - 1
                ]
              }
              alt={"Album Cover"}
            ></Styled.Cover>
          </Styled.FirstTwoCols>

          <Styled.E1>
            <p>{track.name}</p>
            <span>
              {track.artists.map((a, i) => (
                <a
                  href={a.spotifyUrl}
                  key={i}
                  onClick={(e) => e.stopPropagation()}
                >
                  {a.name + " "}
                </a>
              ))}
            </span>
          </Styled.E1>
          {!small && (
            <>
              <Styled.E2>
                <p>{track.album?.name}</p>
              </Styled.E2>

              <Styled.E3>
                <p>{track.album?.spotifyReleaseDate?.toLocaleDateString()}</p>
              </Styled.E3>

              <Styled.E5>
                <Styled.TrucateP>
                  {track.artists[0]?.spotifyGenres?.slice(0, 2).join(", ") ||
                    "No Genres"}
                </Styled.TrucateP>
              </Styled.E5>

              <Styled.E6>
                <p>{formatPopularity(track.spotifyPopularity)}</p>
              </Styled.E6>
            </>
          )}
        </Styled.LeftSide>
        <Styled.RightSide onClick={(e) => e.stopPropagation()}>
          <Styled.Length>
            <p>{prettyMilliseconds(track.spotifyDurationMS)}</p>
          </Styled.Length>
          {toggleFromPlaylist ? (
            <PlaylistButton
              track={track}
              inPlaylist={inPlaylist}
              toggleFromPlaylist={toggleFromPlaylist}
              showLabels={false}
            />
          ) : (
            <Buttons.SecondaryGreenButton
              rounded
              onClick={() => setIsModalOpen((s) => !s)}
            >
              <FaPlus />
            </Buttons.SecondaryGreenButton>
          )}
        </Styled.RightSide>
      </Styled.ListItem>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TrackCompleteDetails
          track={track}
          album={track.album}
          artists={track.artists}
          isNested={isNested}
        />
      </Modal>
    </>
  );
}

function ListTrackCardHeader({
  pos,
  sorting,
}: {
  pos?: boolean;
  sorting?: IGenericCardViewSortProps;
}): JSX.Element {
  const { t } = useTranslation();

  return (
    <Styled.Header>
      <Styled.LeftSide>
        <Styled.FirstTwoCols>
          <Styled.Pos>{pos && <p>#</p>}</Styled.Pos>
        </Styled.FirstTwoCols>

        <Styled.E1>
          <Styled.GreenP>{t("cards:name")}</Styled.GreenP>
        </Styled.E1>

        <Styled.E2>
          <Styled.GreenP>{t("cards:album")}</Styled.GreenP>
        </Styled.E2>

        <Styled.E3>
          <Styled.GreenP>{t("cards:release_date")}</Styled.GreenP>
        </Styled.E3>

        <Styled.E5>
          <Styled.GreenP>{t("cards:genres")}</Styled.GreenP>
        </Styled.E5>

        <Styled.E6>
          <Styled.GreenP>{t("cards:popularity")}</Styled.GreenP>
        </Styled.E6>
      </Styled.LeftSide>

      <Styled.RightSide>
        <Styled.E4>
          <Styled.RightSideSpacing>
            <Styled.GreenP>
              <AiOutlineClockCircle />
            </Styled.GreenP>
          </Styled.RightSideSpacing>
        </Styled.E4>
      </Styled.RightSide>
    </Styled.Header>
  );
}

export { ListTrackCard, ListTrackCardHeader };
