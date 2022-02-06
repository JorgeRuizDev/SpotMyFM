import Styled from "./SearchPage.styles";
import Buttons from "styles/Buttons";

import Text from "styles/Text";
import Switch from "components/core/input/atoms/Switch";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import SimpleSlider from "components/core/input/atoms/Sliders/SimpleSlider";
import { FaSearch } from "react-icons/fa";
import { useClientsStore } from "store/useClients";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import SearchResultsView from "components/core/cards/views/SearchResultsView";
interface ISearchPageProps {}

type searchType = "tracks" | "albums" | "artists" | "playlists";

function SearchPage(props: ISearchPageProps): JSX.Element {
  const SearchType: Record<searchType, string> = useMemo(
    () => ({
      albums: "Albums",
      tracks: "Tracks",
      artists: "Artists",
      playlists: "Playlists",
    }),
    []
  );

  const api = useClientsStore((s) => s.spotifyApi);
  const { getTracks, getAlbumsById, getArtists } = useDataFacade();

  const [searchTracks, setSearchTracks] = useState(true);
  const [searchArtists, setSearchArtists] = useState(false);
  const [searchAlbums, setSearchAlbums] = useState(false);
  const [searchPlaylists, setSearchPlaylists] = useState(false);

  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);

  const [maxRes, setMaxRes] = useState(15);
  const [searchStr, setSearchStr] = useState("");

  const validStr = useMemo(() => searchStr.length >= 3, [searchStr]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;

    if (v.length >= 3) {
      setSearchStr(v);
    } else {
      setSearchStr("");
    }
  }, []);

  const search = useCallback(async () => {
    if (validStr) {
      if (searchTracks) {
        const _tracks = (await api.searchTracks(searchStr, { limit: maxRes }))
          .tracks.items;
        const tracks = await getTracks(_tracks);
        setTracks(tracks);
      } else {
        setTracks([]);
      }

      if (searchAlbums) {
        const _albums = (await api.searchAlbums(searchStr, { limit: maxRes }))
          .albums.items;
        const albums = await getAlbumsById(_albums.map((a) => a.id));
        setAlbums(albums);
      } else {
        setAlbums([]);
      }

      if (searchArtists) {
        const _artists = (await api.searchArtists(searchStr, { limit: maxRes }))
          .artists.items;
        const artists = await getArtists(_artists);
        setArtists(artists);
      } else {
        setArtists([]);
      }

      if (searchPlaylists) {
        const playlists = (
          await api.searchPlaylists(searchStr, { limit: maxRes })
        ).playlists.items;
        setPlaylists(playlists);
      } else {
        setPlaylists([]);
      }
    }
  }, [
    api,
    getAlbumsById,
    getArtists,
    getTracks,
    maxRes,
    searchAlbums,
    searchArtists,
    searchPlaylists,
    searchStr,
    searchTracks,
    validStr,
  ]);

  return (
    <Styled.Col>
      <Text.Center>
        <h1>
          <Text.Inline>
            <Text.green>
              <FaSearch />
            </Text.green>
            <span> Spotify Search</span>
          </Text.Inline>{" "}
        </h1>
      </Text.Center>
      <Styled.Center>
        <Styled.CardWrap>
          <Styled.Card>
            <Text.Center>
              <h4>Settings</h4>
            </Text.Center>
            <Switch
              isChecked={searchTracks}
              onToggle={() => {
                setSearchTracks((p) => !p);
              }}
            >
              <p>Search Tracks</p>
            </Switch>
            <Switch
              isChecked={searchAlbums}
              onToggle={() => {
                setSearchAlbums((p) => !p);
              }}
            >
              <p>Search Albums</p>
            </Switch>
            <Switch
              isChecked={searchArtists}
              onToggle={() => {
                setSearchArtists((p) => !p);
              }}
            >
              <p>Search Artists</p>
            </Switch>
            <Switch
              isChecked={searchPlaylists}
              onToggle={() => {
                setSearchPlaylists((p) => !p);
              }}
            >
              <p>Search Playlists</p>
            </Switch>
            <hr />
            <p>Show {maxRes} results per category</p>
            <SimpleSlider
              max={50}
              min={10}
              defaultValue={15}
              onAfterChange={(c) => setMaxRes(c)}
            />
          </Styled.Card>

          <Styled.Form>
            <Text.Center>
              <Text.Inline>
                <input
                  placeholder="David Bowie Heroes"
                  onChange={handleChange}
                  onSubmit={search}
                  minLength={3}
                />
                <Buttons.PrimaryGreenButton
                  disabled={!validStr}
                  type="submit"
                  rounded
                  onClick={(e) => {
                    e.preventDefault();
                    search();
                  }}
                >
                  <FaSearch />
                </Buttons.PrimaryGreenButton>
              </Text.Inline>
            </Text.Center>
          </Styled.Form>
        </Styled.CardWrap>
      </Styled.Center>

      <SearchResultsView
        tracks={tracks}
        artists={artists}
        albums={albums}
        playlists={playlists}
      />
    </Styled.Col>
  );
}

export default SearchPage;
