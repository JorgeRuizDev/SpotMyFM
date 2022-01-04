import { Album } from "data/cacheDB/dexieDB/models/Album";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useClientsStore } from "store/useClients";
import cookieManager from "util/cookies/loginCookieManager";
import Styled from "./AlbumManager.styles";
import Ms from "styles/Miscellaneous";
import Switch from "components/core/input/atoms/Switch";

interface IAlbumManagerProps {}

function AlbumManager(props: IAlbumManagerProps): JSX.Element {
  const { spotifyApi, backendDbApi, cacheClient } = useClientsStore();
  const { getAlbums, getSavedAlbums, getAlbumsById } = useDataFacade();
  const [displayAlbums, setDisplayAlbums] = useState<Album[]>([]);

  const [showSaved, setShowSaved] = useState(true);
  const [showTagged, setShowTagged] = useState(true);
  const [showCached, setShowCached] = useState(false);

  const [savedAlbums, setSavedAlbums] = useState<Album[]>([]);
  const [taggedAlbums, setTaggedAlbums] = useState<Album[]>([]);
  const [cachedAlbums, setCachedAlbums] = useState<Album[]>([]);

  useEffect(() => {
    let jwt = cookieManager.loadJWT();

    // If there is no cookie yet, wait
    if (!jwt) {
      setTimeout(() => {
        jwt = cookieManager.loadJWT();
      }, 100);
    }

    const fn = async () => {
      const savedAlbumsRes = await spotifyApi.getAllMySavedAlbums();
      const saved = await getSavedAlbums(savedAlbumsRes);

      const [taggedMap, tagErr] = await await backendDbApi.getAllAlbumTags(
        jwt || ""
      );

      if (!taggedMap || tagErr) {
        toast.error(
          "There was an error while getting your tagged albums: " + tagErr
        );
      } else {
        const tagged = await getAlbumsById(Array.from(taggedMap.keys()));
        setTaggedAlbums(tagged);
      }
      setSavedAlbums(saved);

      const cached = await cacheClient.getAllAlbums();
      setCachedAlbums(cached);
    };
    fn();
  }, [
    backendDbApi,
    cacheClient,
    getAlbums,
    getAlbumsById,
    getSavedAlbums,
    spotifyApi,
  ]);

  // Fill the Display Albums state with the user configuration
  useEffect(() => {
    const set = new Set<Album>();

    if (showCached) {
      cachedAlbums.forEach((a) => set.add(a));
    }

    if (showSaved) {
      savedAlbums.forEach((a) => set.add(a));
    }

    if (showTagged) {
      taggedAlbums.forEach((a) => set.add(a));
    }

    setDisplayAlbums(Array.from(set.values()));
  }, [
    showCached,
    showSaved,
    showTagged,
    cachedAlbums,
    savedAlbums,
    taggedAlbums,
  ]);

  return (
    <Styled.Wrap>
      <Styled.Title>Playlist Manager</Styled.Title>
      <Styled.Center>
        <Styled.CardWrap>
          <Ms.Card>
            <Styled.CardTitle>Settings</Styled.CardTitle>
            <Switch
              isChecked={showSaved}
              onToggle={() => {
                setShowSaved((p) => !p);
              }}
            >
              <p>Show Saved Albums</p>
            </Switch>
            <Switch
              isChecked={showTagged}
              onToggle={() => {
                setShowTagged((p) => !p);
              }}
            >
              <p>Show Tagged Albums</p>
            </Switch>
            <Switch
              isChecked={showCached}
              onToggle={() => {
                setShowCached((p) => !p);
              }}
            >
              <p>Show Cached Albums</p>
            </Switch>
          </Ms.Card>
        </Styled.CardWrap>
      </Styled.Center>
    </Styled.Wrap>
  );
}

export default AlbumManager;
