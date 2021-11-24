import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as TwinGlobalStyle } from "twin.macro";

const BaseInput = `
  //Background:
  bg-white
  dark:bg-gray-100

  // Shape
  rounded-xl

  dark:border
  border
  border-green-200


  // Design:
  shadow-md
  m-2
  py-2
  px-3

  // Text
  text-gray-600
  text-lg

  // Active Ring:
  focus:(ring-green-400 ring-2 border-transparent)
  outline-none

`;
export const baseButton = `
  shadow-md
  outline-none
  font-bold
  focus:outline-none

  rounded-full
  hover:bg-darkCard-hover
  bg-darkCard-base
  text-white
  cursor-pointer
  

  m-1
  // Size
  py-2
  px-4
  width[fit-content]
  min-height[2.625rem]

  flex
  flex-row
  justify-center
  content-center
  items-center
  space-x-2
  disabled:(shadow-none opacity-30)

`;

const CustomGlobalStyle = createGlobalStyle`
  input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    display: none;
  }
  * { -webkit-tap-highlight-color: rgba(0,0,0,0); }
  
  input {
    ${tw` 
      ${BaseInput}
      
    `}
  }

  

  input[type="text"]{

    ${tw` 
      ${BaseInput}
    `}
  }

  input[type="radio"]{
    ${tw`
      ring-green-600
      //BG color:
      bg-white
      checked:(bg-lightGreen-base )


      hover:(checked:bg-green-400 bg-green-200)

      // focus -> Last item interacted with 
      focus:(checked:bg-lightGreen-base ring-green-600 border-transparent)

      // Active -> On Hold:
      active:(bg-green-300 checked:bg-green-600 ring-lightGreen-base border-transparent)
      cursor-pointer
      disabled:((bg-gray-500 border-transparent cursor-default))
    `}
  }

  input[type="number"]{
    ${tw`
        ${BaseInput}
      `}
  }

  input[type="date"]{
    ${tw`
        ${BaseInput}
        select-none
        cursor-pointer  
      `}
  }


  button {
    ${tw`

    
    ${baseButton}
    `}
  }
* { -webkit-tap-highlight-color: rgba(0,0,0,0); }

  p, h1, h2, h3, h4, h5, h6, li, a, tr{
    ${tw`
      text-gray-600
      dark:text-white
      font-medium
      font-sans
      tracking-tight
      leading-normal
      


    `}
  }
  span{
    white-space: nowrap

    ${tw`
      font-medium
      font-sans
      tracking-tight
      leading-normal
    `}
  }


  b{
    ${tw`
      text-gray-700
      dark:text-white
      text-base
      font-sans
      font-bold
      dark:font-bold

    `}
  }

  a{
    ${tw`
      text-darkGreen-base
      dark:text-lightGreen-base
      hover:underline
    `}
  }
  h1{
    ${tw`
      text-6xl
    `}
  }
  h2{
    ${tw`
      text-5xl
    `}
  }
  h3{
    ${tw`
      text-4xl
    `}
  }
  h4{
    ${tw`
      text-3xl
    `}
  }
  h5{
    ${tw`
      text-2xl
    `}
  }
  p,b{
    ${tw`
      text-lg
    `}
  }
  p{
    ${tw`
      text-justify
    `}
  }
  

  body {
    ${tw`
      bg-gradient-to-r
      //dark:from-gray-800
      //dark:to-gray-900
      dark:bg-darkMaterialBG-base
      bg-gray-200
      h-screen
    `}
  }

  ol, ul {
    ${tw`
      list-inside
    `}
  }

  ol {
    ${tw`
      list-decimal
    `}
  }
  ul {
    ${tw`
      pl-4
    `}
  }

  svg{
    vertical-align: bottom
  }


  ::-webkit-scrollbar {
    ${tw`
      w-3.5
      rounded-full
      `}
  }
  
  ::-webkit-scrollbar-track {
    ${tw`
      background[#323739]
      bg-opacity-70
    `}
  }
  ::-webkit-scrollbar-thumb {
    ${tw`
      hover:bg-gray-400
      bg-gray-500
    `}
  }
  ::-webkit-scrollbar-corner {
    ${tw`
    `}
  }


  hr {
    ${tw`
      mt-2
      mb-2
      
      h-0.5
      border-0
      rounded-full
      
      bg-darkCard-base
      dark:bg-white

      width[90%]

      `}
  }
`;

function GlobalStyle() {
  return (
    <>
      <CustomGlobalStyle />
      <TwinGlobalStyle />
    </>
  );
}

export default GlobalStyle;
