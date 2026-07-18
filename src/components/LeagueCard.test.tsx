import { describe, expect, it, vi } from "vitest";
import { delay, http, HttpResponse } from "msw";
import { screen, waitFor } from "@testing-library/react";
import { server } from "../test/setup";
import { renderWithQueryClient } from "../test/test-utils";
import { LeagueCard } from "./LeagueCard";
import { API_URL, API_KEY } from "@/constants/api";

const league = {
  idLeague: "1",
  strLeague: "Premier League",
  strSport: "Soccer",
};

const badgeUrl = "https://example.com/badge.png";
const path = `${API_URL}/${API_KEY}/search_all_seasons.php`;

describe("LeagueCard", () => {
  it("renders front face and reveal button", () => {
    renderWithQueryClient(
      <LeagueCard
        league={league}
        searchTerm="Premier"
        isRevealed={false}
        onReveal={vi.fn()}
        onHide={vi.fn()}
      />,
    );

    expect(screen.getAllByRole("heading", { name: /Premier League/i })).toHaveLength(2);
    expect(screen.getByTestId("reveal-button-1")).toBeInTheDocument();
  });

  it("calls onReveal when reveal button is clicked", async () => {
    const onReveal = vi.fn();

    renderWithQueryClient(
      <LeagueCard
        league={league}
        searchTerm="Premier"
        isRevealed={false}
        onReveal={onReveal}
        onHide={vi.fn()}
      />,
    );

    screen.getByTestId("reveal-button-1").click();

    await waitFor(() => expect(onReveal).toHaveBeenCalledWith("1", "Premier League"));
  });

  it("highlights literal regex characters safely", () => {
    const specialLeague = {
      idLeague: "4",
      strLeague: "C++ League",
      strSport: "Soccer",
    };

    renderWithQueryClient(
      <LeagueCard
        league={specialLeague}
        searchTerm="C++"
        isRevealed={false}
        onReveal={vi.fn()}
        onHide={vi.fn()}
      />,
    );

    expect(screen.getAllByText("C++", { selector: "mark" })).toHaveLength(2);
  });

  it("shows badge loading state when revealed and query is pending", async () => {
    server.use(
      http.get(path, async ({ request }) => {
        const url = new URL(request.url);

        if (url.searchParams.get("id") !== "1") {
          return new HttpResponse(null, { status: 404 });
        }

        await delay(150);

        return HttpResponse.json({
          seasons: [],
        });
      }),
    );

    renderWithQueryClient(
      <LeagueCard
        league={league}
        searchTerm=""
        isRevealed={true}
        onReveal={vi.fn()}
        onHide={vi.fn()}
      />,
    );

    expect(await screen.findByText("Loading badge...")).toBeInTheDocument();
  });

  it("shows badge image when query succeeds", async () => {
    server.use(
      http.get(path, () =>
        HttpResponse.json({ seasons: [{ strSeason: "2022", strBadge: badgeUrl }] }),
      ),
    );

    renderWithQueryClient(
      <LeagueCard
        league={league}
        searchTerm=""
        isRevealed={true}
        onReveal={vi.fn()}
        onHide={vi.fn()}
      />,
    );

    expect(await screen.findByAltText("Premier League badge")).toHaveAttribute("src", badgeUrl);
  });

  it("shows retry button when badge fetch fails", async () => {
    server.use(
      http.get(path, ({ request }) => {
        const url = new URL(request.url);

        if (url.searchParams.get("id") !== "1") {
          return new HttpResponse(null, { status: 404 });
        }

        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithQueryClient(
      <LeagueCard
        league={league}
        searchTerm=""
        isRevealed={true}
        onReveal={vi.fn()}
        onHide={vi.fn()}
      />,
    );

    expect(await screen.findByText("Couldn't load badge")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });
});
