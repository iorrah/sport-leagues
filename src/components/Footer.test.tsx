import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders footer title, year text, and external links", () => {
    renderWithQueryClient(<Footer />);

    expect(screen.getByRole("heading", { name: /Sport Leagues/i })).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`© ${new Date().getFullYear()} Sport Leagues`, "i")),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Source Code/i })).toHaveAttribute(
      "href",
      "https://github.com/iorrah/sport-leagues",
    );
    expect(screen.getByRole("link", { name: /Sports DB API/i })).toHaveAttribute(
      "href",
      "https://www.thesportsdb.com/free_sports_api",
    );
  });
});
