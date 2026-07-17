import { useQuery } from "@tanstack/react-query";
import { fetchSeasonBadge } from "@/lib/api";

export const useLeagueBadge = (leagueId: string, enabled: boolean) =>
  useQuery<string | null, Error>({
    queryKey: ["badge", leagueId],
    queryFn: () => fetchSeasonBadge(leagueId),
    enabled,
    staleTime: Infinity,
    gcTime: Infinity,
  });
