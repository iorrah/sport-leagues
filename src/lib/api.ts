import type { League, Leagues, Seasons } from "@/types";
import { ApiError, RateLimitError } from "@/lib/errors";
import { API_KEY, API_URL } from "@/constants/api";

export const apiFetch = async <T>(path: string): Promise<T> => {
  const url = `${API_URL}/${API_KEY}${path}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (response.status === 429) {
      throw new RateLimitError();
    }

    if (!response.ok) {
      throw new ApiError(response.status, `HTTP Error: ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const fetchAllLeagues = async (): Promise<League[]> => {
  const data = await apiFetch<Leagues>("/all_leagues.php");

  return data.leagues || [];
};

export const fetchSeasonBadge = async (leagueId: string): Promise<string | null> => {
  const data = await apiFetch<Seasons>(`/search_all_seasons.php?badge=1&id=${leagueId}`);

  if (data && data.seasons && data.seasons.length > 0) {
    const firstWithBadge = data.seasons.find((s) => s.strBadge && s.strBadge.trim() !== "");

    return firstWithBadge ? firstWithBadge.strBadge : null;
  }

  return null;
};
