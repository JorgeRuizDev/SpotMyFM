import React from "react";
import LudwigResultsCard from "./LudwigResultsCard";
import { render } from "@testing-library/react";

describe("<LudwigResultsCard />", () => {
 test("Renders the component", () => {
   const component = render(< LudwigResultsCard isLoading={false} />);
 });
});