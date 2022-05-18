import Styled from "./AlbumDemo.styles";
import demoAlbums from "./demoAlbums";
import { toastLogIn } from "components/organisms/LandingPage/LandingPage";
import useAlbumSorter from "hooks/useAlbumSorter";
import React, { useState } from "react";
import { Album } from "models/Album";
import usePaginatedArray from "hooks/usePaginatedArray";
import { isMobile } from "react-device-detect";
import FilterInput from "components/molecules/FilterInput";
import DropdownMenu from "components/atoms/DropdownMenu";
import Buttons from "styles/Buttons";
import SimpleAlbumCard from "components/molecules/cards/SimpleAlbumCard";
import Paginate from "components/atoms/Paginate";

interface IAlbumDemoProps {}

function AlbumDemo(props: IAlbumDemoProps) {
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  // Saves the filtered albums and in the Modal onClose it updates de GUI.
  const [tmpAdvancedFilter, setTmpAdvancedFilter] = useState<Album[]>([]);
  const [advancedFilteredAlbums, setAdvancedFilteredAlbums] = useState<Album[]>(
    []
  );

  const {
    sortedAlbums,
    isAscendentState,
    setIsAscendentState,
    sortOptions,
    setOptionState,
    optionState,
  } = useAlbumSorter(
    advancedFilteredAlbums.length === 0 ? demoAlbums : advancedFilteredAlbums
  );

  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);

  // Pagination:
  const pageSize = isMobile ? 2 : 4;

  const {
    activePageItems: pageAlbums,
    currentPage,
    setCurrentPage,
  } = usePaginatedArray<Album>(filteredAlbums, pageSize, 0);

  return (
    <>
      <Styled.Wrap>
        <div>
          <FilterInput
            array={sortedAlbums}
            setFilteredArray={setFilteredAlbums}
            filterFunction={filterFunction}
          />
          <PaginationBar />
          <SortSelector />
          <CardLayout />

          <PaginationBar />
        </div>
      </Styled.Wrap>
    </>
  );

  /**
   * Small Pagination menu
   *
   * @return {Pagination component}
   */
  function PaginationBar(): JSX.Element {
    return (
      <Paginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={pageSize}
        total={filteredAlbums.length}
        onChange={() => {}}
      />
    );
  }

  function CardLayout(): JSX.Element {
    return (
      <Styled.CardLayout>
        {pageAlbums.map((a, i) => (
          <SimpleAlbumCard
            key={i}
            album={a}
            isSaved={Math.random() > 0.5}
            toggleIsSaved={() => {
              toastLogIn("Log In to modify your saved albums!");
            }}
          />
        ))}
      </Styled.CardLayout>
    );
  }

  function SortSelector(): JSX.Element {
    return (
      <Buttons.LayoutCenter>
        <DropdownMenu
          items={Object.entries(sortOptions).map((o) => {
            return {
              component: o[1],
              onClick: () => {
                setOptionState(o[1]);
              },
            };
          })}
        >
          <span>Sort Albums</span>
        </DropdownMenu>
        <Buttons.SecondaryGreenButton
          onClick={() => setIsAscendentState((p) => !p)}
        >
          <span>
            {optionState} {isAscendentState ? "Ascending" : "Descending"}
          </span>
        </Buttons.SecondaryGreenButton>
      </Buttons.LayoutCenter>
    );
  }
}

function filterFunction(a: Album, value: string): boolean {
  return (
    a.name.toUpperCase().includes(value) ||
    a.artists
      ?.map((a) => a.name.toUpperCase().includes(value))
      .includes(true) ||
    a.spotifyReleaseDate?.getFullYear().toString().includes(value) ||
    false
  );
}

export default AlbumDemo;
