import Styled from "./SearchPage.styles";
import Buttons from "styles/Buttons";

import Text from "styles/Text";
import Switch from "components/core/input/atoms/Switch";
import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import SimpleSlider from "components/core/input/atoms/Sliders/SimpleSlider";
import { FaSearch } from "react-icons/fa";
import { useClientsStore } from "store/useClients";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import SearchResultsView from "components/core/cards/views/SearchResultsView";
import DropdownMenu from "components/core/input/atoms/DropdownMenu";
import { toast } from "react-toastify";
interface ISearchPageProps {}

type searchType = "tracks" | "albums" | "artists" | "playlists";

function SearchPage(props: ISearchPageProps): JSX.Element {
  const SearchType: Record<searchType, ReactNode> = useMemo(
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

  const [isLoading, setIsLoading] = useState(false);

  const [searchTypeSel, setSearchTypeSel] = useState<[string, ReactNode]>([
    "tracks",
    SearchType.tracks,
  ]);

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

  const search = useCallback(
    async (searchType = searchTypeSel[0]) => {
      if (!validStr) {
        return;
      }

      setIsLoading(true);
      setTracks([]);
      setPlaylists([]);
      setAlbums([]);
      setArtists([]);

      console.log(searchStr);
      console.log(searchTypeSel[0]);

      switch (searchType) {
        case "tracks":
          const _tracks = (await api.searchTracks(searchStr, { limit: maxRes }))
            .tracks.items;
          const tracks = await getTracks(_tracks);
          setTracks(tracks);
          break;
        case "albums":
          const _albums = (await api.searchAlbums(searchStr, { limit: maxRes }))
            .albums.items;
          const albums = await getAlbumsById(_albums.map((a) => a.id));
          setAlbums(albums);
          break;
        case "artists":
          const _artists = (
            await api.searchArtists(searchStr, { limit: maxRes })
          ).artists.items;
          const artists = await getArtists(_artists);
          setArtists(artists);
          break;
        case "playlists":
          const playlists = (
            await api.searchPlaylists(searchStr, { limit: maxRes })
          ).playlists.items;
          setPlaylists(playlists);
          break;
      }
      setIsLoading(false);
    },
    [
      api,
      getAlbumsById,
      getArtists,
      getTracks,
      maxRes,
      searchStr,
      searchTypeSel,
      validStr,
    ]
  );

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
          <Styled.Card>
            <DropdownMenu
              items={Object.entries(SearchType).map((o) => ({
                component: (
                  <span
                    style={{
                      textDecorationLine:
                        o[0] === searchTypeSel[0] ? "underline" : "none",
                    }}
                  >
                    {o[1]}
                  </span>
                ),
                onClick: () => {
                  setSearchTypeSel(o);
                  search(o[0]);
                },
              }))}
            >
              Search {searchTypeSel[1]} {validStr && `With ${searchStr}`}
            </DropdownMenu>
            <p>Show {maxRes} results</p>
            <div style={{ width: "100%" }}>
              <SimpleSlider
                max={50}
                min={10}
                defaultValue={15}
                onAfterChange={(c) => {
                  setMaxRes(c);
                }}
              />
            </div>
          </Styled.Card>
          <hr />
        </Styled.CardWrap>
      </Styled.Center>

      <SearchResultsView
        tracks={tracks}
        artists={artists}
        albums={albums}
        playlists={playlists}
        searchType={searchTypeSel[0]}
        isLoading={isLoading}
      />
    </Styled.Col>
  );
}

export default SearchPage;
