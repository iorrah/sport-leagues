import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { GridSection } from "./GridSection";

describe("GridSection", () => {
  it("renders children inside the section wrapper", () => {
    renderWithQueryClient(
      <GridSection>
        <div>Section content</div>
      </GridSection>,
    );

    expect(screen.getByText("Section content")).toBeInTheDocument();
  });
});
