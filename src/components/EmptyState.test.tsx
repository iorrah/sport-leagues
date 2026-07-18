import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders the empty state message", () => {
    renderWithQueryClient(<EmptyState />);

    expect(screen.getByRole("heading", { name: /No leagues found/i })).toBeInTheDocument();
    expect(
      screen.getByText(/We couldn't find any leagues matching your current search/i),
    ).toBeInTheDocument();
  });
});
