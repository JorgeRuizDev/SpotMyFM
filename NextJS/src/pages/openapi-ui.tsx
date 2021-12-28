import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function UI() {
  return (
    <div tw={"bg-white dark:bg-white"}>
      <SwaggerUI url="https://raw.githubusercontent.com/JorgeRuizDev/SpotMyFM/main/NextJS/src/api/openAPI/spec.yml" />
    </div>
  );
}
