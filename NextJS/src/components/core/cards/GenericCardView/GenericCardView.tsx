import useInfiniteScrollArray from "hooks/infiniteScroll/useInfiniteScrollArray";
import usePaginatedArray from "hooks/paginatedArray/usePaginatedArray";
import { ReactNode } from "react";
import { isMobile } from "react-device-detect";
import Styled from "./GenericCardView.styles";
interface IGenericCardViewProps {
  setSorting: (option: string) => void;
  sortingOptions: string[];
  setInputFilter: (s: string) => void;
  children: ReactNode[] | null;
  type?: "card" | "list";
}

function GenericCardView({
  children = null,
  setSorting,
  sortingOptions,
  setInputFilter,
  type = "card",
}: IGenericCardViewProps) {
  // Paginate the current children
  const pageSize = isMobile ? 20 : 50;
  const { activePageItems, currentPage, setCurrentPage } = usePaginatedArray(
    children || [],
    pageSize,
    0
  );

  // Infinite Scroll:
  const {
    currentLoadedElements: scrollTracks,
    length,
    hasMore,
    next,
    resetScrollOffset,
  } = useInfiniteScrollArray(activePageItems, 10, 10, true);

  return <></>;
}

export default GenericCardView;
