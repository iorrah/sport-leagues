import { describe, expect, it } from "vitest";
import { waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "../test/setup";
import { renderHookWithQueryClient } from "../test/test-utils";
import { useLeagues } from "./useLeagues";
import { API_URL, API_KEY } from "@/constants/api";

const leaguesResponse = {
  leagues: [
    { idLeague: "1", strLeague: "Premier League", strSport: "Soccer" },
    { idLeague: "2", strLeague: "NBA", strSport: "Basketball" },
  ],
};

const path = `${API_URL}/${API_KEY}/all_leagues.php`;

describe("useLeagues", () => {
  it("loads league data successfully", async () => {
    server.use(http.get(path, () => HttpResponse.json(leaguesResponse)));

    const { result } = renderHookWithQueryClient(() => useLeagues());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(leaguesResponse.leagues);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("exposes error state when fetch fails", async () => {
    server.use(http.get(path, () => new HttpResponse(null, { status: 500 })));

    const { result } = renderHookWithQueryClient(() => useLeagues());

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeTruthy();
  });
});
