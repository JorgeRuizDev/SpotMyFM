import Paginate from "components/core/display/atoms/Paginate";
import useInfiniteScrollArray from "hooks/infiniteScroll/useInfiniteScrollArray";
import usePaginatedArray from "hooks/paginatedArray/usePaginatedArray";
import React, { ReactNode, createRef } from "react";
import { isMobile } from "react-device-detect";
import Styled from "./GenericCardView.styles";
import InfiniteScroll from "react-infinite-scroll-component";
import MultipleSkeletonCards from "../../simpleCards/MultipleSkeletonCards";
import DropdownMenu from "components/core/input/atoms/DropdownMenu";
import Buttons from "styles/Buttons";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import FilterInput from "components/core/input/atoms/FilterInput";
import { BsFillGrid3X2GapFill, BsListUl } from "react-icons/bs";
export interface IGenericCardViewSort {
  options: Record<string, string>;
  isAscendant: boolean;
  selected: string;
}

export type ViewType = "card" | "list";

interface IGenericCardViewProps<T> {
  setSorting: (option: string) => void;
  setIsAscendant: (o: boolean) => void;
  sorting: IGenericCardViewSort;
  children: ReactNode[];
  isLoading?: boolean;
  view?: ViewType;
  setView?: (s: ViewType) => void;
  filterInputProps: IFilterInputProps<T>;
}

function GenericCardView<T>({
  children,
  setSorting,
  sorting,
  setIsAscendant,
  view = "card",
  setView,
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
      <SortRow />

      <FilterInput {...filterInputProps} />
      <PaginationBar />
      <InfiniteScroll
        style={{ overflow: "unset" }}
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
      <Paginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={pageSize}
        total={children.length}
        onChange={() => {
          resetScrollOffset();
          layoutStartRef?.current?.scrollIntoView();
        }}
      />
    );
  }
  function ItemLayout(): JSX.Element {
    return (
      <Styled.CardLayout>
        {scrollItems.length > 0 ? (
          scrollItems
        ) : isLoading ? (
          <MultipleSkeletonCards />
        ) : (
          <h3>No Items Found</h3>
        )}
      </Styled.CardLayout>
    );
  }

  function SortRow(): JSX.Element {
    return (
      <Styled.LayoutButtonsWrap>
        <DropdownMenu
          items={Object.entries(sorting.options).map((o) => {
            return {
              component: o[1],
              onClick: () => {
                setSorting(o[1]);
              },
            };
          })}
        >
          <span>Sort Tracks</span>
        </DropdownMenu>
        <Buttons.SecondaryGreenButton
          onClick={() => setIsAscendant(!sorting.isAscendant)}
        >
          <span>
            {sorting.selected}{" "}
            {sorting.isAscendant ? "Ascending" : "Descending"}
          </span>
        </Buttons.SecondaryGreenButton>
        {setView && (
          <Buttons.SecondaryGreenButton
            rounded
            onClick={() => setView(view == "card" ? "list" : "card")}
          >
            {view == "list" ? <BsFillGrid3X2GapFill /> : <BsListUl />}
          </Buttons.SecondaryGreenButton>
        )}
      </Styled.LayoutButtonsWrap>
    );
  }
}

export default GenericCardView;
