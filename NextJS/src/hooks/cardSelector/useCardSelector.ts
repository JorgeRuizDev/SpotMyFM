import { useState } from "react";

/**
 * Hook that allows selecting / unselecting items
 * @param min
 * @param max
 * @returns
 */
export function useCardSelector<E>(
  min: number,
  max: number
): {
  selectedArray: E[];
  toggleSelectedElement: (e: E) => void;
  addSelectedElement: (e: E) => void;
  removeSelectedElement: (e: E) => void;
  isSelectedElement: (e: E) => boolean;
  removeAll: () => void;
} {
  const [selectedElements, setSelectedElements] = useState<Set<E>>(new Set());

  function toggleSelectedElement(e: E) {
    if (selectedElements.has(e)) {
      removeSelectedElement(e);
    } else {
      if (selectedElements.size <= max) {
        addSelectedElement(e);
      }
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

  const selectedArray = Array.from(selectedElements.values());
  return {
    selectedArray,
    toggleSelectedElement,
    addSelectedElement,
    removeSelectedElement,
    isSelectedElement,
    removeAll,
  };
}
