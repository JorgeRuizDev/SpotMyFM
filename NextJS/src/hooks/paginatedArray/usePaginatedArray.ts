import { useEffect, useMemo, useState } from "react";

/**
 * Hook that splits an array into pagesize chunks. Returns functions to update the returned paged array.
 * @param array
 * @param pageSize
 * @param defaultPage
 * @returns { activePageItems, currentPage, setCurrentPage }: Current page items, current page number, and a setCurrentPage setter.
 */
function usePaginatedArray<ArrayType>(
  array: Array<ArrayType>,
  pageSize: number,
  defaultPage?: number
) {
  const [currentPage, setCurrentPage] = useState(defaultPage || 0);
  const slicedArray = useMemo(() => {
    if (array.length === 0) {
      return [];
    }
    return array.slice(
      currentPage * pageSize,
      currentPage * pageSize + pageSize
    );
  }, [array, currentPage, pageSize]);

  const [activePageItems, setActivePageItems] = useState(slicedArray);

  useEffect(() => setActivePageItems(slicedArray), [slicedArray]);

  return { activePageItems, currentPage, setCurrentPage };
}

export default usePaginatedArray;
