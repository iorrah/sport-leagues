import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { ControlsBar } from "./ControlsBar";

describe("ControlsBar", () => {
  it("renders SportFilter and SortControl with provided props", () => {
    const onSportChange = vi.fn();
    const onSortFieldChange = vi.fn();
    const onSortDirectionChange = vi.fn();

    renderWithQueryClient(
      <ControlsBar
        sports={["Soccer", "Basketball"]}
        selectedSport="Basketball"
        onSportChange={onSportChange}
        sortField="id"
        sortDirection="desc"
        onSortFieldChange={onSortFieldChange}
        onSortDirectionChange={onSortDirectionChange}
        disabled={false}
      />,
    );

    expect(screen.getAllByRole("combobox")).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: /Sort ascending|Sort descending/i }),
    ).toBeInTheDocument();
  });

  it("renders child controls as disabled when disabled prop is true", () => {
    renderWithQueryClient(
      <ControlsBar
        sports={["Soccer"]}
        selectedSport="all"
        onSportChange={vi.fn()}
        sortField="name"
        sortDirection="asc"
        onSortFieldChange={vi.fn()}
        onSortDirectionChange={vi.fn()}
        disabled={true}
      />,
    );

    expect(screen.getAllByRole("combobox")).toHaveLength(2);
    screen.getAllByRole("combobox").forEach((element) => expect(element).toBeDisabled());
    expect(screen.getByRole("button", { name: /Sort descending/i })).toBeDisabled();
  });
});
