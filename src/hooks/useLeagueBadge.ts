import { useQuery } from "@tanstack/react-query";
import { fetchSeasonBadge } from "@/lib/api";

export const useLeagueBadge = (leagueId: string, isRevealed: boolean) =>
  useQuery({
    queryKey: ["badge", leagueId],
    queryFn: () => fetchSeasonBadge(leagueId),
    enabled: isRevealed,
    staleTime: Infinity,
    gcTime: Infinity,
  });
