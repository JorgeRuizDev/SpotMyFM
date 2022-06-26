import Styled from "./SearchPage.styles";
import Buttons from "styles/Buttons";

import Text from "styles/Text";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useClientsStore } from "store/useClients";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import SearchResultsView from "components/core/cards/views/SearchResultsView";
import InputWithSelector from "components/core/input/molecules/InputWithSelector";
import useTranslation from "next-translate/useTranslation";
interface ISearchPageProps {}

type searchType = "tracks" | "albums" | "artists" | "playlists";

function SearchPage(props: ISearchPageProps): JSX.Element {
  const api = useClientsStore((s) => s.spotifyApi);
  const { getTracks, getAlbumsById, getArtists } = useDataFacade();

  const [isLoading, setIsLoading] = useState(false);

  const [showResults, setShowResults] = useState(false);
  const [prevSearchType, setPrevSearchType] = useState("tracks");
  const [searchTypeSel, setSearchTypeSel] = useState("tracks");

  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);

  const [maxRes, setMaxRes] = useState(15);
  const [searchStr, setSearchStr] = useState("");

  const validStr = useMemo(() => searchStr.length >= 3, [searchStr]);

  const handleChange = useCallback((v: string) => {
    if (v.length >= 3) {
      setSearchStr(v);
    } else {
      setSearchStr("");
    }
  }, []);

  const search = useCallback(
    async (searchStr: string) => {
      if (!validStr) {
        return;
      }

      // Update the previous search type
      setPrevSearchType(searchTypeSel);
      setIsLoading(true);
      setTracks([]);
      setPlaylists([]);
      setAlbums([]);
      setArtists([]);

      switch (searchTypeSel) {
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
      setShowResults(true);
      setIsLoading(false);
    },
    [api, getAlbumsById, getArtists, getTracks, maxRes, searchTypeSel, validStr]
  );

  useEffect(() => {
    // On search type change: Search Again
    if (searchTypeSel !== prevSearchType) {
      search(searchStr);
    }
  }, [prevSearchType, search, searchStr, searchTypeSel]);
  const { t } = useTranslation();
  return (
    <Styled.Col>
      <Text.PageTitle>
        <span>{t("cards:spotify_search")}</span>
      </Text.PageTitle>

      <Styled.Center>
        <Styled.CardWrap>
          <Styled.Form onSubmit={() => search(searchStr)}>
            <Styled.Center>
              <Styled.Inline>
                <InputWithSelector
                  onChange={handleChange}
                  inputProps={{
                    minLength: 3,
                    placeholder: "David Bowie Heroes",
                    onKeyDown: (e) => {
                      if (e.key == "Enter") {
                        search(searchStr);
                      }
                    },
                  }}
                  dropTitle={
                    <span style={{ whiteSpace: "nowrap" }}>
                      {t("cards:number_of_results")}
                    </span>
                  }
                  dropItems={[5, 10, 15, 25, 35, 50].map((n, i) => ({
                    component: (
                      <span
                        style={{
                          textDecorationLine:
                            n === maxRes ? "underline" : "none",
                        }}
                      >
                        {t("cards:results", { n: n })}
                      </span>
                    ),
                    onClick: () => setMaxRes(n),
                  }))}
                />
                <Buttons.PrimaryGreenButton
                  disabled={!validStr}
                  type="submit"
                  rounded
                  onClick={(e) => {
                    e.preventDefault();
                    search(searchStr);
                  }}
                >
                  <FaSearch />
                </Buttons.PrimaryGreenButton>
              </Styled.Inline>
            </Styled.Center>
          </Styled.Form>
          <Styled.Card>
            <Buttons.CheckableGreenButton
              isChecked={searchTypeSel === "tracks"}
              onClick={() => setSearchTypeSel("tracks")}
            >
              {t("home:tracks")}
            </Buttons.CheckableGreenButton>
            <Buttons.CheckableGreenButton
              isChecked={searchTypeSel === "albums"}
              onClick={() => setSearchTypeSel("albums")}
            >
              {t("cards:albums")}
            </Buttons.CheckableGreenButton>
            <Buttons.CheckableGreenButton
              isChecked={searchTypeSel === "artists"}
              onClick={() => setSearchTypeSel("artists")}
            >
              {t("cards:artists")}
            </Buttons.CheckableGreenButton>
            <Buttons.CheckableGreenButton
              onClick={() => setSearchTypeSel("playlists")}
              isChecked={searchTypeSel === "playlists"}
            >
              {t("cards:playlists")}
            </Buttons.CheckableGreenButton>
          </Styled.Card>
        </Styled.CardWrap>
      </Styled.Center>

      {showResults && (
        <>
          <SearchResultsView
            tracks={tracks}
            artists={artists}
            albums={albums}
            playlists={playlists}
            searchType={searchTypeSel}
            isLoading={isLoading}
          />
        </>
      )}
    </Styled.Col>
  );
}

export default SearchPage;
