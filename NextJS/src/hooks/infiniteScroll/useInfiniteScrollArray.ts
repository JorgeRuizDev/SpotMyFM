import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Given an array, creates the logic to work with an InfiniteScroll components
 * @param array: Array to infinitely scroll
 * @param itemsPerScroll: Number of items it adds once it reaches the end
 * @param initialItemsCount: Items loaded for the tieme
 * @param resetOnArrayChange: Reset the scroll if the array changes.
 * @returns { currentLoadedElements, length, hasMore, next, resetScrollOffset }: List of items, total items, if it has more, get the next items (Call when reached the bottom), reset.
 */
function useInfiniteScrollArray<ArrayType>(
  array: Array<ArrayType>,
  itemsPerScroll: number,
  initialItemsCount: number,
  resetOnArrayChange?: boolean
) {
  const [currentOffset, setCurrentOffset] = useState(initialItemsCount);

  const currentLoadedElements = useMemo(() => array.slice(0, currentOffset), [
    currentOffset,
    array,
  ]);

  const hasMore = useMemo(() => currentLoadedElements.length < array.length, [
    array.length,
    currentLoadedElements.length,
  ]);

  const length = useMemo(() => currentLoadedElements.length, [
    currentLoadedElements.length,
  ]);

  const next = useCallback(() => {
    setCurrentOffset(currentOffset + itemsPerScroll);
  }, [currentOffset, itemsPerScroll]);

  const resetScrollOffset = useCallback(() => {
    setCurrentOffset(initialItemsCount);
  }, [initialItemsCount]);

  // If the array changes, reset the scroll / loaded elements
  useEffect(() => {
    resetOnArrayChange && resetScrollOffset;
  }, [array, resetScrollOffset, resetOnArrayChange]);

  return { currentLoadedElements, length, hasMore, next, resetScrollOffset };
}

export default useInfiniteScrollArray;
