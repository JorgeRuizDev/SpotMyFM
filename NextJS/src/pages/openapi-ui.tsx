import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import tw from "twin.macro"

const BG = tw.div`
  bg-lightMaterialBG-base
  dark:bg-lightMaterialBG-base

  text-textColor-lightTheme
  dark:text-textColor-lightTheme

`
export default function UI() {
  return (
    <BG>
      <SwaggerUI url="https://raw.githubusercontent.com/JorgeRuizDev/SpotMyFM/main/NextJS/src/api/openAPI/spec.yml" />
    </BG>
  );
}
