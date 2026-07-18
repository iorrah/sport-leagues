import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { GridError } from "./GridError";

describe("GridError", () => {
  it("renders the error message and retry button", () => {
    renderWithQueryClient(<GridError refetch={vi.fn()} />);

    expect(screen.getByRole("heading", { name: /Failed to load leagues/i })).toBeInTheDocument();
    expect(screen.getByText(/We couldn't connect to TheSportsDB API/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Retry/i })).toBeInTheDocument();
  });

  it("calls refetch when retry is clicked", () => {
    const refetch = vi.fn();

    renderWithQueryClient(<GridError refetch={refetch} />);

    screen.getByRole("button", { name: /Retry/i }).click();

    expect(refetch).toHaveBeenCalled();
  });
});
