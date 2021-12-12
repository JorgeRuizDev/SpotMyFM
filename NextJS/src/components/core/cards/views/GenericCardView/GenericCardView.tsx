import Paginate from "components/core/display/atoms/Paginate";
import useInfiniteScrollArray from "hooks/infiniteScroll/useInfiniteScrollArray";
import usePaginatedArray from "hooks/paginatedArray/usePaginatedArray";
import React, { ReactNode, createRef, useRef } from "react";
import { isMobile } from "react-device-detect";
import Styled from "./GenericCardView.styles";
import InfiniteScroll from "react-infinite-scroll-component";
import MultipleSkeletonCards from "../../simpleCards/MultipleSkeletonCards";
import DropdownMenu from "components/core/input/atoms/DropdownMenu";
import Buttons from "styles/Buttons";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import FilterInput from "components/core/input/atoms/FilterInput";
import { BsFillGrid3X2GapFill, BsListUl } from "react-icons/bs";
import MultipleSkeletonList from "../../listCards/MultipleSkeletonList";
export interface IGenericCardViewSortProps {
  sortTitle: string;
  options: Record<string, string>;
  isAscendant: boolean;
  selected: string;
  setSorting: (option: string) => void;
  setIsAscendant: (o: boolean) => void;
}

export type ViewTypeOption = "GRID" | "LIST";

export type ViewType =
  | {
      type: "GRID";
    }
  | {
      type: "LIST";
      ListHeader: JSX.Element;
    };

interface IGenericCardViewProps<T> {
  children: ReactNode[];
  view?: ViewType;
  sorting?: IGenericCardViewSortProps;
  isLoading?: boolean;
  setView?: (s: ViewTypeOption) => void;
  filterInputProps?: IFilterInputProps<T>;
  scrollableTargetId?: string;
}

function GenericCardView<T>({
  children,
  sorting,
  view = { type: "GRID" },
  setView,
  filterInputProps,
  isLoading = false,
  scrollableTargetId,
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
    <div id={"scrollSi"}>
      <div ref={layoutStartRef}></div>
      <SortRow />

      {filterInputProps && <FilterInput {...filterInputProps} />}
      <PaginationBar />
      <InfiniteScroll
        style={{ overflow: "unset" }}
        dataLength={length} //This is important field to render the next data
        next={next}
        scrollThreshold={0.6}
        hasMore={hasMore}
        scrollableTarget={scrollableTargetId}
        loader={
          view.type == "GRID" ? (
            <MultipleSkeletonCards />
          ) : (
            <MultipleSkeletonList />
          )
        }
      >
        <ItemLayout />
      </InfiniteScroll>
      <PaginationBar />
    </div>
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
      <Styled.CardLayout addSpace={view.type == "GRID"}>
        {view.type == "LIST" && view.ListHeader}
        {scrollItems.length > 0 ? (
          scrollItems
        ) : isLoading ? (
          view.type == "GRID" ? (
            <MultipleSkeletonCards />
          ) : (
            <MultipleSkeletonList key={2} />
          )
        ) : (
          <h3>No Items Found</h3>
        )}
      </Styled.CardLayout>
    );
  }

  function SortRow(): JSX.Element {
    return (
      <Styled.LayoutButtonsWrap>
        {sorting && (
          <>
            <DropdownMenu
              items={Object.entries(sorting.options).map((o) => {
                return {
                  component: o[1],
                  onClick: () => {
                    sorting.setSorting(o[1]);
                  },
                };
              })}
            >
              <span>{sorting.sortTitle}</span>
            </DropdownMenu>
            <Buttons.SecondaryGreenButton
              onClick={() => sorting.setIsAscendant(!sorting?.isAscendant)}
            >
              <span>
                {sorting?.selected}{" "}
                {sorting?.isAscendant ? "Ascending" : "Descending"}
              </span>
            </Buttons.SecondaryGreenButton>
          </>
        )}

        {setView && (
          <Buttons.SecondaryGreenButton
            rounded
            onClick={() => setView(view.type == "GRID" ? "LIST" : "GRID")}
          >
            {view.type == "LIST" ? <BsFillGrid3X2GapFill /> : <BsListUl />}
          </Buttons.SecondaryGreenButton>
        )}
      </Styled.LayoutButtonsWrap>
    );
  }
}

export default GenericCardView;
