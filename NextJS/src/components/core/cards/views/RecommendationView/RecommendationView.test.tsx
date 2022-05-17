import React from "react";
import RecommendationView from "./RecommendationView";
import { render } from "@testing-library/react";

describe("<RecommendationView />", () => {
 test("Renders the component", () => {
   const component = render(< RecommendationView  tracks={[]} setRecommendations={() => {}}/>);
 });
});