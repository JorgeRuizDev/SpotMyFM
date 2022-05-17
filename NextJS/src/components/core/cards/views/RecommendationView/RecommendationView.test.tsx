import React from "react";
import RecommendationView from "./RecommendationView";
import { render } from "@testing-library/react";
import { ReusableProvider } from "reusable";

describe("<RecommendationView />", () => {
  test("Renders the component", () => {
    const component = render(
      <ReusableProvider>
        <RecommendationView
          tracks={[]}
          setRecommendations={() => {}}
          selectedTracks={[]}
        />
      </ReusableProvider>
    );
  });
});
