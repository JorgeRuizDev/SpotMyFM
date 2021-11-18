import React from "react";
import { useEffect } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
} from "react-icons/md";

import Styled from "./Paginate.styles";
interface IPaginateProps {
  currentPage: number;
  total: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  onChange: () => void;

  goBackToTop?: boolean;
}

function Paginate(props: IPaginateProps) {
  const totalPages = Math.ceil(props.total / props.itemsPerPage);

  useEffect(() => {
    if (props.currentPage > totalPages) {
      props.setCurrentPage(0);
    }
  }, [props, totalPages]);

  // Create the bottom pages:
  const pages = [];
  for (
    let i = Math.max(0, props.currentPage - 2);
    i < Math.min(totalPages, props.currentPage + 3);
    i++
  ) {
    pages.push(
      <Styled.Page
        key={i}
        isActive={i == props.currentPage}
        onClick={() => clickHandler(i)}
      >
        {i + 1}
      </Styled.Page>
    );
  }

  return totalPages > 1 ? (
    <>
      <Styled.InlineCenter>
        <Styled.Page
          isActive={false}
          onClick={() => clickHandler(0)}
          disabled={props.currentPage == 0}
        >
          <MdFirstPage />
        </Styled.Page>
        {
          <Styled.Page
            isActive={false}
            onClick={() => clickHandler(props.currentPage - 1)}
            disabled={props.currentPage == 0}
          >
            <MdChevronLeft />
          </Styled.Page>
        }

        {/* Pages:  */}
        {pages.map((p) => p)}

        <Styled.Page
          isActive={false}
          onClick={() => clickHandler(props.currentPage + 1)}
          disabled={props.currentPage == totalPages - 1}
        >
          <MdChevronRight />
        </Styled.Page>
        <Styled.Page
          isActive={false}
          onClick={() => clickHandler(totalPages - 1)}
          disabled={props.currentPage == totalPages - 1}
        >
          <MdLastPage />
        </Styled.Page>
      </Styled.InlineCenter>

      <Styled.InlineCenter>
        <p>
          {totalPages} pages ({props.total} items)
        </p>
      </Styled.InlineCenter>
    </>
  ) : null;

  function clickHandler(page: number, resetPos?: boolean) {
    if (page < 0) {
      page = 0;
    } else if (page >= totalPages) {
      page = totalPages - 1;
    }

    props.setCurrentPage(page);
    props.onChange();
  }
}

export default Paginate;