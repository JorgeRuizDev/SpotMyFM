import {
  Tab,
  TabContent,
  TabContentWrap,
  TabWrap,
  Tabs,
} from "components/core/display/atoms/Tabs";
import { AnimatePresence, motion } from "framer-motion";

import React, { useState } from "react";
import { useEffect } from "react";
import { useClientsStore } from "store/useClients";
import { useSessionStore } from "store/useSession";
import CreatePlaylist from "./CreatePlaylist";
import SelectPlaylist from "./SelectPlaylist";
import Styled from "./TracksToPlaylist.styles";
import useTranslation from "next-translate/useTranslation";
interface ITracksToPlaylistProps {
  tracks: string[];
  unselectAll: () => void;
}

function TracksToPlaylist({ tracks, unselectAll }: ITracksToPlaylistProps) {
  const isAnimated = useSessionStore((s) => s.enableAnimations);
  const api = useClientsStore((s) => s.spotifyApi);

  const user = useClientsStore((s) => s.user);

  const [userPlaylists, setUserPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();

  // Get the Playlists
  useEffect(() => {
    if (user) {
      api
        .getAllPlaylists(user.spotifyUser?.id || "")
        .then((p) => setUserPlaylists(p));
    }
  }, [api, user]);
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      <motion.div
        initial={(isAnimated && { height: 0, opacity: 0 }) || {}}
        animate={(isAnimated && { height: "auto", opacity: 1 }) || {}}
        exit={(isAnimated && { height: 0, opacity: 0 }) || {}}
        transition={{ ease: "easeInOut", duration: 0.4 }}
      >
        <Styled.CenterContent>
          <Styled.ItemBox>
            <h5>
              {t("cards:save_the_selected_tracks_into_a_playlist", {
                length: tracks.length,
              })}
            </h5>
            <TabComponent
              tracks={tracks}
              playlists={userPlaylists}
              unselectAll={unselectAll}
            />
          </Styled.ItemBox>
        </Styled.CenterContent>
      </motion.div>
    </AnimatePresence>
  );
}

interface ITabComponent {
  tracks: string[];
  playlists?: SpotifyApi.PlaylistObjectSimplified[];
  unselectAll: () => void;
}
function TabComponent({ tracks, playlists, unselectAll }: ITabComponent) {
  const { t } = useTranslation();
  return (
    <Tabs defaultTabId={"1"}>
      <TabWrap>
        <Tab id="1">
          <p>{t("cards:create_a_new_playlist")}</p>
        </Tab>
        <Tab id="2">
          <p>{t("cards:use_an_existing_playlist")}</p>
        </Tab>
      </TabWrap>
      <TabContentWrap>
        <TabContent id={"1"}>
          <CreatePlaylist tracks={tracks} key={1} unselectAll={unselectAll} />
        </TabContent>
        <TabContent id={"2"}>
          <SelectPlaylist
            playlists={playlists}
            trackUris={tracks}
            unselectAll={unselectAll}
          />
        </TabContent>
      </TabContentWrap>
    </Tabs>
  );
}

export default React.memo(TracksToPlaylist);
