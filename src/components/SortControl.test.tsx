import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { SortControl } from "./SortControl";

describe("SortControl", () => {
  it("renders the sort field select with current selection", () => {
    renderWithQueryClient(
      <SortControl
        field="sport"
        direction="asc"
        onFieldChange={vi.fn()}
        onDirectionChange={vi.fn()}
        disabled={false}
      />,
    );

    const select = screen.getByRole("combobox");

    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("sport");
    expect(screen.getByRole("option", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Sport" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "ID" })).toBeInTheDocument();
  });

  it("calls onFieldChange when a new field is selected", () => {
    const onFieldChange = vi.fn();

    renderWithQueryClient(
      <SortControl
        field="name"
        direction="asc"
        onFieldChange={onFieldChange}
        onDirectionChange={vi.fn()}
        disabled={false}
      />,
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "sport" } });

    expect(onFieldChange).toHaveBeenCalledWith("sport");
  });

  it("toggles sort direction when the button is clicked", () => {
    const onDirectionChange = vi.fn();

    renderWithQueryClient(
      <SortControl
        field="name"
        direction="asc"
        onFieldChange={vi.fn()}
        onDirectionChange={onDirectionChange}
        disabled={false}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Sort descending/i }));

    expect(onDirectionChange).toHaveBeenCalledWith("desc");
  });

  it("renders disabled state when disabled prop is true", () => {
    renderWithQueryClient(
      <SortControl
        field="name"
        direction="desc"
        onFieldChange={vi.fn()}
        onDirectionChange={vi.fn()}
        disabled={true}
      />,
    );

    expect(screen.getByRole("combobox")).toBeDisabled();
    expect(screen.getByRole("button", { name: /Sort ascending/i })).toBeDisabled();
  });
});
