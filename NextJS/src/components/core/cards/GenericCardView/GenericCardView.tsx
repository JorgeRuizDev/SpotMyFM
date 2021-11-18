import Paginate from "components/core/display/atoms/Paginate";
import useInfiniteScrollArray from "hooks/infiniteScroll/useInfiniteScrollArray";
import usePaginatedArray from "hooks/paginatedArray/usePaginatedArray";
import React, { ReactNode, createRef } from "react";
import { isMobile } from "react-device-detect";
import SkelletonCard from "../simpleCards/SkelletonCard";
import Styled from "./GenericCardView.styles";
import InfiniteScroll from "react-infinite-scroll-component";
import MultipleSkeletonCards from "../simpleCards/MultipleSkeletonCards";
interface IGenericCardViewProps {
  setSorting: (option: string) => void;
  sortingOptions: string[];
  setInputFilter: (s: string) => void;
  children: ReactNode[] | null;
  view?: "card" | "list";
  toggleView: (s: string) => void;
}

function GenericCardView({
  children = null,
  setSorting,
  sortingOptions,
  setInputFilter,
  view = "card",
}: IGenericCardViewProps) {
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
  function PaginationBar() {
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

        <ItemLayout />
      </>
    );
  }
  function ItemLayout() {
    return (
      <Styled.CardLayout>
        {children == null ? (
          <MultipleSkeletonCards />
        ) : children.length == 0 ? (
          "No Items to load"
        ) : null}
        {scrollItems}
      </Styled.CardLayout>
    );
  }
}

export default GenericCardView;
