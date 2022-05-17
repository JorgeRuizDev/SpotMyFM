import Paginate from "components/core/display/atoms/Paginate";
import useInfiniteScrollArray from "hooks/infiniteScroll/useInfiniteScrollArray";
import usePaginatedArray from "hooks/paginatedArray/usePaginatedArray";
import React, { ReactNode, createRef, useMemo } from "react";
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
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import useTranslation from "next-translate/useTranslation";
export interface IGenericCardViewSortProps {
  sortTitle?: string;
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

/**
 * Function that renders tracks with lazy-loading + includes an input filter + sorting selector
 *
 * children: Cards to render
 * sorting: An object with the sorting options
 * view: The Current view (GRID or LIST)
 * filterInputProps: An object with the filter input props
 * isLoading: Boolean flag that shows track skeletons
 * @returns
 */

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
  const pageSize = isMobile ? 20 : 35;

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
        <ItemLayout
          isLoading={isLoading}
          scrollItems={scrollItems}
          view={view}
        />
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

  function SortRow(): JSX.Element {
    const { t } = useTranslation();

    const sortOptions = useMemo(
      () =>
        sorting
          ? [
              {
                component: (
                  <>
                    {!sorting.isAscendant ? (
                      <FaSortAmountDownAlt />
                    ) : (
                      <FaSortAmountUpAlt />
                    )}
                    <span>
                      {t("cards:set")}{" "}
                      {sorting.isAscendant ? "Descending" : "Ascending"}
                    </span>
                  </>
                ),
                onClick: () => sorting.setIsAscendant(!sorting.isAscendant),
              },
              {
                component: "",
              },
              ...Object.entries(sorting.options).map((o) => {
                return {
                  component: (
                    <span
                      style={{
                        textDecoration:
                          sorting.selected === o[1] ? "underline" : "none",
                      }}
                    >
                      {o[1]}
                    </span>
                  ),
                  onClick: () => {
                    sorting.setSorting(o[1]);
                  },
                };
              }),
            ]
          : [],
      []
    );

    return (
      <Styled.LayoutButtonsWrap>
        {sorting && (
          <>
            <DropdownMenu items={sortOptions}>
              <>
                {sorting.isAscendant ? (
                  <FaSortAmountUpAlt />
                ) : (
                  <FaSortAmountDownAlt />
                )}
                <span>Sorting by {sorting.selected}</span>
              </>
            </DropdownMenu>
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

function ItemLayout({
  view,
  scrollItems,
  isLoading,
}: {
  view: ViewType;
  scrollItems: ReactNode[];
  isLoading: boolean;
}): JSX.Element {
  const { t } = useTranslation();

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
        <h3>{t("cards:no_items_found")}</h3>
      )}
    </Styled.CardLayout>
  );
}

export default GenericCardView;
