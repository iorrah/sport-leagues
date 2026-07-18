import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the main title and subtitle", () => {
    renderWithQueryClient(<Hero />);

    expect(screen.getByRole("heading", { name: /Sport Leagues/i })).toBeInTheDocument();
    expect(screen.getByText(/The home of all sport leagues/i)).toBeInTheDocument();
  });
});
