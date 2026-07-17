import { useQuery } from "@tanstack/react-query";
import type { League } from "@/types";
import { fetchAllLeagues } from "@/lib/api";

export const useLeagues = () =>
  useQuery<League[], Error>({
    queryKey: ["leagues"],
    queryFn: async () => await fetchAllLeagues(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
