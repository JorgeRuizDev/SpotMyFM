import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import { useEffect, useState } from "react";
import { useClientsStore } from "store/useClients";
import { sortByReleaseDate } from "util/sorters/albumSoters";
import ListAlbumCard, {
  ListAlbumCardHeader,
} from "../../listCards/ListAlbumCard";
import SimpleAlbumCard from "../../simpleCards/SimpleAlbumCard";
import GenericCardView from "../GenericCardView";
import { ViewTypeOption } from "../GenericCardView/GenericCardView";
import Styled from "./ArtistAlbumsView.styles";
interface IArtistAlbumsViewProps {
  artist: Artist;
  scrollableTarget?: string;
}
/**
 * Component that shows all the albums and singles of a given artist
 * @param param0
 * @returns
 */
function ArtistAlbumsView({
  artist,
  scrollableTarget,
}: IArtistAlbumsViewProps): JSX.Element {
  const api = useClientsStore((s) => s.spotifyApi);
  const { getAlbumsById } = useDataFacade();
  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [singles, setSingles] = useState<Album[]>([]);

  const [currentView, setCurrentView] = useState<ViewTypeOption>("LIST");

  // Get the artist Albums
  useEffect(() => {
    const f = async () => {
      setIsLoading(true);
      const _albums = await api.getAllArtistAlbums(artist.spotifyId, ["album"]);

      const albums = (await getAlbumsById(_albums.map((a) => a.id)))
        .sort(sortByReleaseDate)
        .reverse();

      const _singles = await api.getAllArtistAlbums(artist.spotifyId, [
        "single",
      ]);
      const singles = (await getAlbumsById(_singles.map((a) => a.id)))
        .sort(sortByReleaseDate)
        .reverse();

      setAlbums(albums);
      setSingles(singles);
    };
    f();
  }, [api, artist.spotifyId, getAlbumsById]);

  return (
    <>
      <GenericCardView
        isLoading={isLoading}
        setView={setCurrentView}
        view={
          currentView === "GRID"
            ? { type: currentView }
            : { type: currentView, ListHeader: <ListAlbumCardHeader pos /> }
        }
      >
        {albums.length || singles.length
          ? currentView === "GRID"
            ? [
                <>
                  <AlbumHead />
                  {albums.map((a, i) => (
                    <SimpleAlbumCard album={a} key={i} />
                  ))}
                  <SingleHead />
                  {singles.map((a, i) => (
                    <SimpleAlbumCard album={a} key={-i - 1} />
                  ))}
                </>,
              ]
            : [
                <>
                  <AlbumHead />
                  {albums.map((a, i) => (
                    <ListAlbumCard album={a} key={i} pos={i + 1} />
                  ))}

                  <SingleHead />
                  {singles.map((a, i) => (
                    <ListAlbumCard album={a} key={-i - 1} pos={i + 1} />
                  ))}
                </>,
              ]
          : []}
      </GenericCardView>
    </>
  );
}

function AlbumHead() {
  return (
    <Styled.Head>
      <h3>Albums</h3>
    </Styled.Head>
  );
}

function SingleHead() {
  return (
    <Styled.Head>
      <h3>Singles</h3>
    </Styled.Head>
  );
}

export default ArtistAlbumsView;
