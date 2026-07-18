import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders the search input with provided value and placeholder", () => {
    renderWithQueryClient(<SearchBar value="Premier" onChange={vi.fn()} />);

    const input = screen.getByTestId("search-input");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Premier");
    expect(input).toHaveAttribute("placeholder", "Search leagues");
    expect(input).toHaveAccessibleName("Search leagues");
  });

  it("calls onChange when the user types", () => {
    const onChange = vi.fn();

    renderWithQueryClient(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "nba" } });

    expect(onChange).toHaveBeenCalledWith("nba");
  });

  it("preserves printable special characters when calling onChange", () => {
    const onChange = vi.fn();

    renderWithQueryClient(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "<script>alert(1)</script>" } });

    expect(onChange).toHaveBeenCalledWith("<script>alert(1)</script>");
  });

  it("preserves SQL-like input when calling onChange", () => {
    const onChange = vi.fn();

    renderWithQueryClient(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "'; DROP TABLE leagues; --" } });

    expect(onChange).toHaveBeenCalledWith("'; DROP TABLE leagues; --");
  });

  it("preserves emojis when calling onChange", () => {
    const onChange = vi.fn();

    renderWithQueryClient(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "⚽ Premier 😀" } });

    expect(onChange).toHaveBeenCalledWith("⚽ Premier 😀");
  });
});
