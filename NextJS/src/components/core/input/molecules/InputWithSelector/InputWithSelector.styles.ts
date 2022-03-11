import { MdClear } from "react-icons/md";
import styled, { css } from "styled-components";
import tw from "twin.macro";

interface IWrapProps {
  isFocused?: boolean;
}

const VerticalLine = tw.div`
  h-1/2
  rounded-full
  w-0.5
  bg-gray-300
  
`;

const Cross = styled(MdClear)(({ visible }: { visible: boolean }) => [
  tw`
    cursor-pointer
    
  `,

  visible ? tw`visible` : tw`invisible`,
]);

const field = `
  h-full
  text-textColor-lightTheme
  font-sans
  px-2
  h-10
  bg-gray-100
`;

const hover = `
  ${field}
  bg-gray-200
  rounded
`;

const TextField = styled.input(() => [
  tw`
  
    all[initial]
    dark:all[initial]
    hover:all[initial]
    focus:all[initial]
    
    ${field}
    dark:(${field} hover:(${hover} ) focus:(${hover} ))
    hover:(${hover} )
    focus:(${hover} )
    
  `,
]);

const FieldWrap = styled.div(({}: IWrapProps) => [
  css`
    :focus-within {
      ${tw`ring-green-400 ring-2 border-transparent`},
    }

    .dark & {
    }
  `,
  tw`
  flex
  sm:flex-row
  flex-col
  gap-2

  items-center
  justify-center
  min-height[40px]
  
  sm:(p-0 px-2)
  p-2

  //Background:
  bg-white

  // Shape
  rounded-xl

  dark:border
  border
  border-green-200


  // Design:
  shadow-md
  m-2


  // Text
  text-gray-600
  text-base

  outline-none
  
  `,
]);

const Styled = { FieldWrap, TextField, Cross, VerticalLine };

export default Styled;
