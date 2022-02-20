import { Album } from "data/cacheDB/dexieDB/models/Album";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useClientsStore } from "store/useClients";
import cookieManager from "util/cookies/loginCookieManager";
import Styled from "./AlbumManager.styles";
import Ms from "styles/Miscellaneous";
import Switch from "components/core/input/atoms/Switch";
import AlbumView from "components/core/cards/views/AlbumView";
import Text from "styles/Text";
interface IAlbumManagerProps {}

function AlbumManager(props: IAlbumManagerProps): JSX.Element {
  const { spotifyApi, backendDbApi, cacheClient } = useClientsStore();
  const { getAlbums, getSavedAlbums, getAlbumsById } = useDataFacade();
  const [displayAlbums, setDisplayAlbums] = useState<Album[]>([]);

  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
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
      setIsLoading(false);
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
    const map = new Map<string, Album>();
    if (showTagged) {
      taggedAlbums.forEach((a) => map.set(a.spotifyId, a));
    }

    if (showCached) {
      cachedAlbums.forEach((a) => map.set(a.spotifyId, a));
    }

    if (showSaved) {
      for (const a of savedAlbums) {
        const current = map.get(a.spotifyId);

        if (current) {
          // update the object with the save date
          current.savedAt = a.savedAt;
          map.set(current.spotifyId, current);
        } else {
          map.set(a.spotifyId, a);
        }
      }
      savedAlbums.forEach((a) => map.set(a.spotifyId, a));
    }

    const display = Array.from(map.values());

    const tagged = display.filter((a) => a.albumTags.length);

    const saved = display.filter((a) => a.savedAt);

    setDisplayAlbums(Array.from(new Set([...tagged, ...saved])));
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
      <Text.PageTitle>Album Manager</Text.PageTitle>
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
      <AlbumView albums={displayAlbums} settings={{ isLoading: isLoading }} />
    </Styled.Wrap>
  );
}

export default AlbumManager;
