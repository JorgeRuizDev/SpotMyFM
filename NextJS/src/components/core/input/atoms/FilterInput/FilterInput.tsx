import { useCallback, useEffect, useState } from "react";
import Styled from "./FilterInput.styles";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
/**
 *
 *
 * @template T
 * @param {IFilterInputProps<T>} {
 *   array,
 *   setFilteredArray,
 *   filterFunction, // V is an uppercase string
 *   placeholder
 * }
 * @return {*}
 */
function FilterInput<T>({
  array,
  setFilteredArray,
  filterFunction,
  placeholder,
}: IFilterInputProps<T>) {
  // Save the input value
  const [value, setValue] = useState("");

  const filter = useCallback(() => {
    if (value.length > 2) {
      setFilteredArray(array.filter((x) => filterFunction(x, value)));
    } else {
      setFilteredArray(array);
    }
  }, [setFilteredArray, array, value, filterFunction]);

  // On tracks change: filter again
  useEffect(filter, [array, filter, value]);

  return (
    <Styled.LayoutButtonsWrap>
      <input
        type="text"
        onChange={handleInput}
        placeholder={placeholder || "1969"}
      />
    </Styled.LayoutButtonsWrap>
  );

  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    setValue(e.currentTarget.value.toUpperCase());
  }
}

export default FilterInput;
