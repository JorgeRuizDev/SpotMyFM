import Switch from "components/core/input/atoms/Switch";
import { usePlaylistManager } from "hooks/spotify/usePlaylistManger";
import _ from "lodash";

import React, { useState } from "react";
import { toast } from "react-toastify";
import spotifyResponseCodes from "restClients/spotify/spotifyResponseCodes";

import { useClientsStore } from "store/useClients";
import Buttons from "styles/Buttons";
import Styled from "./CreatePlaylist.styles";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans"
interface ICreatePlaylistProps {
  tracks: string[];
  unselectAll: () => void;
}
/**
 * Component that includes a form to create a playlist from a Track[]
 * @param ICreatePlaylistProps
 * @returns
 */
function CreatePlaylist({
  tracks,
  unselectAll,
}: ICreatePlaylistProps): JSX.Element {
  const [playlistName, setPlaylistName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isCollaborative, setIsCollaborative] = useState(false);
  const [numberOfPlaylists, setNumberOfPlaylists] = useState(1);
  const spotifyApi = useClientsStore((s) => s.spotifyApi);
  const { addTracksToPlaylist, createPlaylist: createPlaylistApi } =
    usePlaylistManager();
  function savePlaylistName(e: React.ChangeEvent<HTMLInputElement>) {
    setPlaylistName(e?.target?.value);
  }
  const {t} = useTranslation();

  return (
    <Styled.TwoCols>
      <Styled.Box>
        <Styled.Form
          onSubmit={(e) => {
            e.preventDefault();
            if (playlistName.length >= 1 && numberOfPlaylists > 0) {
              createPlaylistsHandler();
            }
          }}
        >
          <Styled.Box>
            <p>{t('cards:playlist_name')}</p>
            <input
    type={"text"}
    minLength={1}
    required={true}
    placeholder={"MySpotifyFM Playlist"}
    onChange={savePlaylistName}
    />
            <Buttons.PrimaryGreenButton onClick={createPlaylistsHandler}>
              {t('cards:create_playlist')}
            </Buttons.PrimaryGreenButton>
          </Styled.Box>
        </Styled.Form>
      </Styled.Box>
      <Styled.Box>
        <ul>
          <li>
            <p>
              {t('cards:divide_in', {'numberOfPlaylists': numberOfPlaylists, 'expr': " ", 'expr_2': numberOfPlaylists > 1 ? "playlists" : "playlist"})}
            </p>
            <input
              type="number"
              id="nPlaylists"
              name="points"
              step="1"
              min={1}
              max={10}
              defaultValue={1}
              onChange={(e) => {
                setNumberOfPlaylists(parseInt(e.target.value) || 1);
              }}
            />
          </li>
          <li>
            <Switch
              onToggle={() => {
                setIsPublic((x) => !x);
              }}
              isChecked={isCollaborative ? false : isPublic}
              disabled={isCollaborative}
            >
              <p>
                  <Trans
                      i18nKey="cards:make_the_playlist_public"
                      components={{
                          b: <b/>
                      }}
                  />
              </p>
            </Switch>
          </li>
          <li>
            <Switch
              onToggle={() => {
                setIsCollaborative((x) => !x);
              }}
              isChecked={isCollaborative}
            >
              <p>
                  <Trans
                      i18nKey="cards:make_the_playlist_collaborative"
                      components={{
                          b: <b/>
                      }}
                  />
              </p>
            </Switch>
          </li>
        </ul>
      </Styled.Box>
    </Styled.TwoCols>
  );

  function createPlaylistsHandler() {
    if (numberOfPlaylists <= 0 || !playlistName.length) {
      return;
    }

    numberOfPlaylists > 1 ? createMultiplePlaylists() : createPlaylist();
  }

  async function createMultiplePlaylists() {
    const chunkSize = Math.ceil(tracks.length / Math.abs(numberOfPlaylists));
    for (const [i, chunk] of _.chunk(tracks, chunkSize).entries()) {
      try {
        const playlist = await createPlaylistApi(
          `${playlistName} (${i + 1})`,
          "Created with SpotMyFM",
          isPublic,
          isCollaborative
        );
        await addTracksToPlaylist(playlist?.id || "", chunk);
      } catch (e) {
        errorHandler(e);
      }
    }
    toast.success(`${numberOfPlaylists} playlists created!`);
    unselectAll();
  }

  async function createPlaylist() {
    try {
      const playlist = await createPlaylistApi(
        playlistName,
        "Created with SpotMyFM",
        isPublic,
        isCollaborative
      );
      await addTracksToPlaylist(playlist?.id || "", tracks);

      toast.success("New Playlist Created!");
      unselectAll();
    } catch (e) {
      errorHandler(e);
    }
  }

  function errorHandler(e: any) {
    const error = spotifyApi.parse(e);

    if (error?.status === spotifyResponseCodes?.Errors.TOO_MANY_REQUEST) {
      toast.error("Please, try again.");
    } else {
      unselectAll();
    }
  }
}

export default React.memo(CreatePlaylist);
