import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useLoginStore } from "store/useLogin";
import router from "next/router";
import { ReusableProvider } from "reusable";
describe("<ProtectedRoute />", () => {
  test("Renders the component", () => {
    const component = render(
      <ReusableProvider>
        <ProtectedRoute />
      </ReusableProvider>
    );
  });

  test("No requirements", () => {
    const component = render(
      <ReusableProvider>
        <ProtectedRoute>OK</ProtectedRoute>
      </ReusableProvider>
    );
    expect(component.getByText("OK"));
  });

  jest.mock("next/router");
  router.push = jest.fn();

  test("Must Be Logged", () => {
    const { result } = renderHook(() => useLoginStore());

    const component = render(
      <ReusableProvider>
        <ProtectedRoute onlyLogged={true}>OK</ProtectedRoute>
      </ReusableProvider>
    );

    act(() => {
      // Check that does not render the child and tries to push to the root page
      expect(component.queryByText("OK")).toBe(null);
      expect(router.push).toHaveBeenCalledTimes(1);
    });

    act(() => {
      result.current.logIn("ThereIsNoToken");
    });

    // Check that renders the child
    expect(component.getByText("OK"));

    // Check that there are no extra route changes
    expect(router.push).toHaveBeenCalledTimes(1);
  });
});
