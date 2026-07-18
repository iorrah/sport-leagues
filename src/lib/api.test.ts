import { describe, expect, it, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../test/setup";
import { apiFetch, fetchAllLeagues, fetchSeasonBadge } from "./api";
import { ApiError, RateLimitError } from "./errors";
import { API_URL, API_KEY } from "@/constants/api";

const pathToUrl = (path: string) => `${API_URL}/${API_KEY}${path}`;

describe("apiFetch", () => {
  it("returns parsed JSON on success", async () => {
    server.use(http.get(pathToUrl("/all_leagues.php"), () => HttpResponse.json({ leagues: [] })));

    await expect(apiFetch("/all_leagues.php")).resolves.toEqual({ leagues: [] });
  });

  it("throws ApiError on non-ok response", async () => {
    server.use(
      http.get(pathToUrl("/all_leagues.php"), () => new HttpResponse(null, { status: 500 })),
    );

    await expect(apiFetch("/all_leagues.php")).rejects.toBeInstanceOf(ApiError);
  });

  it("throws RateLimitError when response status is 429", async () => {
    server.use(
      http.get(pathToUrl("/all_leagues.php"), () => new HttpResponse(null, { status: 429 })),
    );

    await expect(apiFetch("/all_leagues.php")).rejects.toBeInstanceOf(RateLimitError);
  });

  it("aborts and rejects when fetch times out", async () => {
    vi.useFakeTimers();

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(
      (_url: RequestInfo | URL, options?: RequestInit) =>
        new Promise((_resolve, reject) => {
          options?.signal?.addEventListener("abort", () => {
            reject(new DOMException("The operation was aborted", "AbortError"));
          });
        }),
    );

    try {
      const promise = apiFetch("/all_leagues.php");
      promise.catch(() => {});
      await vi.advanceTimersByTimeAsync(10000);

      await expect(promise).rejects.toThrow();
    } finally {
      fetchSpy.mockRestore();
      vi.useRealTimers();
    }
  });
});

describe("fetchAllLeagues", () => {
  it("returns an empty array when API returns no leagues field", async () => {
    server.use(http.get(pathToUrl("/all_leagues.php"), () => HttpResponse.json({})));

    await expect(fetchAllLeagues()).resolves.toEqual([]);
  });
});

describe("fetchSeasonBadge", () => {
  it("returns first non-empty strBadge from seasons", async () => {
    server.use(
      http.get(pathToUrl("/search_all_seasons.php"), () =>
        HttpResponse.json({
          seasons: [
            { strSeason: "2021-22", strBadge: "" },
            { strSeason: "2022-23", strBadge: "https://example.com/badge.png" },
          ],
        }),
      ),
    );

    await expect(fetchSeasonBadge("1")).resolves.toBe("https://example.com/badge.png");
  });

  it("returns null when no season badges exist", async () => {
    server.use(
      http.get(pathToUrl("/search_all_seasons.php"), () =>
        HttpResponse.json({ seasons: [{ strSeason: "2021-22", strBadge: "" }] }),
      ),
    );

    await expect(fetchSeasonBadge("1")).resolves.toBeNull();
  });

  it("propagates RateLimitError for 429 responses", async () => {
    server.use(
      http.get(pathToUrl("/search_all_seasons.php"), () => new HttpResponse(null, { status: 429 })),
    );

    await expect(fetchSeasonBadge("1")).rejects.toBeInstanceOf(RateLimitError);
  });
});
