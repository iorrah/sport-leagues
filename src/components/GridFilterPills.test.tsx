import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { GridFilterPills } from "./GridFilterPills";

describe("GridFilterPills", () => {
  it("renders no pills when searchTerm is empty and selectedSport is all", () => {
    renderWithQueryClient(<GridFilterPills searchTerm="" selectedSport="all" />);

    expect(screen.queryByText(/Search:/i)).not.toBeInTheDocument();
    expect(screen.queryByText("Soccer")).not.toBeInTheDocument();
  });

  it("renders a search pill when searchTerm is provided", () => {
    renderWithQueryClient(<GridFilterPills searchTerm="Premier" selectedSport="all" />);

    expect(screen.getByText(/Search: Premier/i)).toBeInTheDocument();
  });

  it("renders a sport pill when a specific sport is selected", () => {
    renderWithQueryClient(<GridFilterPills searchTerm="" selectedSport="Soccer" />);

    expect(screen.getByText("Soccer")).toBeInTheDocument();
  });

  it("renders both pills when searchTerm and selectedSport are provided", () => {
    renderWithQueryClient(<GridFilterPills searchTerm="Premier" selectedSport="Basketball" />);

    expect(screen.getByText(/Search: Premier/i)).toBeInTheDocument();
    expect(screen.getByText("Basketball")).toBeInTheDocument();
  });
});
