import { describe, expect, it } from "vitest";
import { waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "../test/setup";
import { renderHookWithQueryClient } from "../test/test-utils";
import { useLeagueBadge } from "./useLeagueBadge";
import { API_URL, API_KEY } from "@/constants/api";

const badgeUrl = "https://example.com/badge.png";
const seasonsResponse = {
  seasons: [
    { strSeason: "2021-22", strBadge: "" },
    { strSeason: "2022-23", strBadge: badgeUrl },
  ],
};

const path = `${API_URL}/${API_KEY}/search_all_seasons.php`;

describe("useLeagueBadge", () => {
  it("does not fetch when not revealed", async () => {
    const { result } = renderHookWithQueryClient(() => useLeagueBadge("1", false));

    expect(result.current.status).toBe("pending");
    expect(result.current.data).toBeUndefined();
  });

  it("fetches badge data when revealed is true", async () => {
    server.use(http.get(path, () => HttpResponse.json(seasonsResponse)));

    const { result } = renderHookWithQueryClient(() => useLeagueBadge("1", true));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBe(badgeUrl);
    expect(result.current.isError).toBe(false);
  });

  it("shows error state when the badge request fails", async () => {
    server.use(http.get(path, () => new HttpResponse(null, { status: 500 })));

    const { result } = renderHookWithQueryClient(() => useLeagueBadge("1", true));

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeTruthy();
  });
});
