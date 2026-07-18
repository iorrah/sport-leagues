import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { GridContent } from "./GridContent";

describe("GridContent", () => {
  it("renders children within the content container", () => {
    renderWithQueryClient(
      <GridContent>
        <div>Grid content children</div>
      </GridContent>,
    );

    expect(screen.getByText("Grid content children")).toBeInTheDocument();
  });
});
