import { useEffect, useState } from "react";

/**
 * Hook that allows selecting / unselecting items
 * @param min
 * @param max
 * @returns
 */
export function useCardSelector<E>(
  min: number,
  max: number,
  autoUnselectOnLimit: boolean = true
): {
  selectedArray: E[];
  toggleSelectedElement: (e: E) => void;
  isSelectedElement: (e: E) => boolean;
  removeAll: () => void;
} {
  const [selectedElements, setSelectedElements] = useState<Set<E>>(new Set());
  const [selectedArray, setSelectedArray] = useState<E[]>([]);
  function toggleSelectedElement(e: E) {
    if (selectedElements.has(e)) {
      removeSelectedElement(e);
    } else {
      if (selectedElements.size >= max && autoUnselectOnLimit) {
        const del = selectedElements.values().next();
        removeSelectedElement(del.value);
      }
      addSelectedElement(e);
    }
  }
  function addSelectedElement(e: E) {
    selectedElements.add(e);
    setSelectedElements(new Set(selectedElements));
  }

  function removeSelectedElement(e: E) {
    selectedElements.delete(e);
    setSelectedElements(new Set(selectedElements));
  }

  function isSelectedElement(e: E) {
    return selectedElements.has(e);
  }

  function removeAll() {
    setSelectedElements(new Set());
  }

  useEffect(() => {
    setSelectedArray(Array.from(selectedElements.values()));
  }, [selectedElements]);

  return {
    selectedArray,
    toggleSelectedElement,
    isSelectedElement,
    removeAll,
  };
}
