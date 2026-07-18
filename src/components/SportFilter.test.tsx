import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { SportFilter } from "./SportFilter";

describe("SportFilter", () => {
  it("renders available sports and current selection", () => {
    renderWithQueryClient(
      <SportFilter
        sports={["Soccer", "Basketball"]}
        value="Basketball"
        onChange={vi.fn()}
        disabled={false}
      />,
    );

    const select = screen.getByRole("combobox");

    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("Basketball");
    expect(screen.getByRole("option", { name: "All sports" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Soccer" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Basketball" })).toBeInTheDocument();
  });

  it("calls onChange when a sport is selected", () => {
    const onChange = vi.fn();

    renderWithQueryClient(
      <SportFilter
        sports={["Soccer", "Basketball"]}
        value="all"
        onChange={onChange}
        disabled={false}
      />,
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Soccer" } });

    expect(onChange).toHaveBeenCalledWith("Soccer");
  });

  it("renders disabled state when disabled prop is true", () => {
    renderWithQueryClient(
      <SportFilter sports={["Soccer"]} value="all" onChange={vi.fn()} disabled={true} />,
    );

    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
