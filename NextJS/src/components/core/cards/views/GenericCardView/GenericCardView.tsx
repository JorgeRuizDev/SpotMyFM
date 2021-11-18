import Paginate from "components/core/display/atoms/Paginate";
import useInfiniteScrollArray from "hooks/infiniteScroll/useInfiniteScrollArray";
import usePaginatedArray from "hooks/paginatedArray/usePaginatedArray";
import React, { ReactNode, createRef } from "react";
import { isMobile } from "react-device-detect";
import SkelletonCard from "../../simpleCards/SkelletonCard";
import Styled from "./GenericCardView.styles";
import InfiniteScroll from "react-infinite-scroll-component";
import MultipleSkeletonCards from "../../simpleCards/MultipleSkeletonCards";
import DropdownMenu from "components/core/input/atoms/DropdownMenu";
import Buttons from "styles/Buttons";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import FilterInput from "components/core/input/atoms/FilterInput";
interface IGenericCardViewProps<T> {
  setSorting: (option: string) => void;
  setIsAscendant: (o: boolean) => void;
  sortingOptions: { options: string[]; isAscendant: boolean; selected: string };
  setInputFilter: (s: string) => void;
  children: ReactNode[];
  isLoading?: boolean;
  view?: "card" | "list";
  toggleView: (s: string) => void;
  filterInputProps: IFilterInputProps<T>;
}

function GenericCardView<T>({
  children,
  setSorting,
  sortingOptions,
  setInputFilter,
  setIsAscendant,
  view = "card",
  filterInputProps,
  isLoading = false,
}: IGenericCardViewProps<T>): JSX.Element {
  // Paginate the current children
  const pageSize = isMobile ? 20 : 50;
  const { activePageItems, currentPage, setCurrentPage } = usePaginatedArray(
    children || [],
    pageSize,
    0
  );

  // A reference to the start of a page (To jump back after each page change)
  const layoutStartRef = createRef<HTMLDivElement>();

  // Infinite Scroll:
  const {
    currentLoadedElements: scrollItems,
    length,
    hasMore,
    next,
    resetScrollOffset,
  } = useInfiniteScrollArray(activePageItems, 10, 10, true);

  return (
    <>
      <div ref={layoutStartRef}></div>
      <PaginationBar />
      <FilterInput {...filterInputProps} />
      <SortRow />
      <InfiniteScroll
        dataLength={length} //This is important field to render the next data
        next={next}
        scrollThreshold={0.6}
        hasMore={hasMore}
        loader={<MultipleSkeletonCards />}
      >
        <ItemLayout />
      </InfiniteScroll>
      <PaginationBar />
    </>
  );

  /**
   * Small Pagination menu
   *
   * @return {Pagination component}
   */
  function PaginationBar(): JSX.Element {
    return (
      <>
        <Paginate
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={pageSize}
          total={children?.length || 0}
          onChange={() => {
            resetScrollOffset();
            layoutStartRef?.current?.scrollIntoView();
          }}
        />
      </>
    );
  }
  function ItemLayout(): JSX.Element {
    return (
      <Styled.CardLayout>
        {isLoading ? (
          <MultipleSkeletonCards />
        ) : children.length == 0 ? (
          "No Items to load"
        ) : null}
        {scrollItems}
      </Styled.CardLayout>
    );
  }

  function SortRow(): JSX.Element {
    return (
      <Styled.LayoutButtonsWrap>
        <DropdownMenu
          items={sortingOptions.options.map((o) => {
            return {
              component: o,
              onClick: () => {
                setSorting(o);
              },
            };
          })}
        >
          <span>Sort Tracks</span>
        </DropdownMenu>
        <Buttons.SecondaryGreenButton
          onClick={() => setIsAscendant(!sortingOptions.isAscendant)}
        >
          <span>
            {sortingOptions.selected}{" "}
            {sortingOptions.isAscendant ? "Ascending" : "Descending"}
          </span>
        </Buttons.SecondaryGreenButton>
      </Styled.LayoutButtonsWrap>
    );
  }
}

export default GenericCardView;