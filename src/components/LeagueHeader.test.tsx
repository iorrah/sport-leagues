import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { LeagueHeader } from "./LeagueHeader";

const leagues = [
  { idLeague: "1", strLeague: "Premier League", strSport: "Soccer" },
  { idLeague: "2", strLeague: "NBA", strSport: "Basketball" },
];

describe("LeagueHeader", () => {
  it("renders title, status text, progress, and filter pills", () => {
    renderWithQueryClient(
      <LeagueHeader
        leagues={leagues}
        revealedCount={1}
        searchTerm="Premier"
        selectedSport="Basketball"
      />,
    );

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      '2 leagues found for "Premier"',
    );
    expect(screen.getByText(/1 badge revealed · 1 to reveal/i)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "50");
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText(/Search: Premier/i)).toBeInTheDocument();
    expect(screen.getByText("Basketball")).toBeInTheDocument();
  });

  it("does not render pills when searchTerm is empty and selectedSport is all", () => {
    renderWithQueryClient(
      <LeagueHeader leagues={leagues} revealedCount={0} searchTerm="" selectedSport="all" />,
    );

    expect(screen.queryByText(/Search:/i)).not.toBeInTheDocument();
    expect(screen.queryByText("all")).not.toBeInTheDocument();
  });
});
