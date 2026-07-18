import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "../test/test-utils";
import { LeagueGrid } from "./LeagueGrid";

const leagues = [
  { idLeague: "1", strLeague: "Premier League", strSport: "Soccer" },
  { idLeague: "2", strLeague: "NBA", strSport: "Basketball" },
];

describe("LeagueGrid", () => {
  it("renders skeleton grid while loading", () => {
    const { container } = renderWithQueryClient(
      <LeagueGrid
        leagues={undefined}
        isLoading={true}
        isError={false}
        isRateLimited={false}
        refetch={vi.fn()}
        searchTerm=""
        selectedSport="all"
        onReveal={vi.fn()}
      />,
    );

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    expect(screen.queryByText(/No leagues found/i)).not.toBeInTheDocument();
  });

  it("renders empty state when leagues are empty", () => {
    renderWithQueryClient(
      <LeagueGrid
        leagues={[]}
        isLoading={false}
        isError={false}
        isRateLimited={false}
        refetch={vi.fn()}
        searchTerm=""
        selectedSport="all"
        onReveal={vi.fn()}
      />,
    );

    expect(screen.getByText(/No leagues found/i)).toBeInTheDocument();
  });

  it("renders rate limit banner when rate limited", () => {
    renderWithQueryClient(
      <LeagueGrid
        leagues={[]}
        isLoading={false}
        isError={false}
        isRateLimited={true}
        refetch={vi.fn()}
        searchTerm=""
        selectedSport="all"
        onReveal={vi.fn()}
      />,
    );

    expect(screen.getByText(/Rate limit reached/i)).toBeInTheDocument();
  });

  it("renders league cards when leagues are available", () => {
    renderWithQueryClient(
      <LeagueGrid
        leagues={leagues}
        isLoading={false}
        isError={false}
        isRateLimited={false}
        refetch={vi.fn()}
        searchTerm=""
        selectedSport="all"
        onReveal={vi.fn()}
      />,
    );

    expect(screen.getAllByText("Premier League")).toHaveLength(2);
    expect(screen.getAllByText("NBA")).toHaveLength(2);
  });
});
