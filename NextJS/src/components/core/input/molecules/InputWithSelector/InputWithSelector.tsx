import { ReactNode, createRef, useEffect, useState } from "react";
import Styled from "./InputWithSelector.styles";
import { MdClear } from "react-icons/md";
import DropdownMenu from "../../atoms/DropdownMenu";
import { IDropItem } from "../../atoms/DropdownMenu/DropdownMenu";
interface IInputWithSelectorProps {
  onChange?: (e: string) => void;
  placeholder?: string;
  dropTitle?: ReactNode | ReactNode[];
  dropItems?: IDropItem[];
  autofocus?: boolean;
}

function InputWithSelector({
  onChange,
  placeholder,
  dropItems,
  dropTitle,
  autofocus,
}: IInputWithSelectorProps): JSX.Element {
  const [val, setVal] = useState("");
  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    onChange && onChange(val);
  }, [onChange, val]);

  return (
    <>
      <Styled.FieldWrap>
        {dropTitle && (
          <>
            <DropdownMenu titleStyle="input" items={dropItems}>
              {dropTitle}
            </DropdownMenu>
            <Styled.VerticalLine />
          </>
        )}

        <Styled.TextField
          ref={inputRef}
          value={val}
          autoFocus={autofocus}
          onChange={(e) => {
            setVal(e.target.value);
          }}
          placeholder={placeholder}
        />
        <Styled.Cross
          visible={!!val.length}
          onClick={() => {
            setVal("");
            inputRef?.current && inputRef.current.focus();
          }}
        />
      </Styled.FieldWrap>
    </>
  );
}

export default InputWithSelector;
