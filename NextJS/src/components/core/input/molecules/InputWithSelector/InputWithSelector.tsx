import {
  InputHTMLAttributes,
  ReactNode,
  createRef,
  useEffect,
  useState,
} from "react";
import Styled from "./InputWithSelector.styles";
import { MdClear } from "react-icons/md";
import DropdownMenu from "../../atoms/DropdownMenu";
import { IDropItem } from "../../atoms/DropdownMenu/DropdownMenu";
interface IInputWithSelectorProps {
  onChange?: (e: string) => void;
  dropTitle?: ReactNode | ReactNode[];
  dropItems?: IDropItem[];
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

function InputWithSelector({
  onChange,
  dropItems,
  dropTitle,
  inputProps,
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
          <div
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <DropdownMenu titleStyle="input" items={dropItems}>
              {dropTitle}
            </DropdownMenu>
            <Styled.VerticalLine />
          </div>
        )}

        <Styled.TextField
          ref={inputRef}
          {...inputProps}
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
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
