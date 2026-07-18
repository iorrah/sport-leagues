import { useCallback, useState, useMemo } from "react";
import type { League } from "@/types";
import {
  LeagueCard,
  LeagueHeader,
  ErrorBoundary,
  SkeletonGrid,
  EmptyState,
  RateLimitBanner,
  GridSection,
  GridContent,
  GridError,
} from "@/components";

interface Props {
  leagues: League[] | undefined;
  isLoading: boolean;
  isError: boolean;
  isRateLimited: boolean;
  refetch: () => Promise<unknown>;
  searchTerm: string;
  selectedSport: string;
  onReveal: (leagueName: string) => void;
}
export const LeagueGrid = ({
  leagues,
  isLoading,
  isError,
  isRateLimited,
  refetch,
  searchTerm,
  selectedSport,
  onReveal,
}: Props) => {
  const [revealedLeagues, setRevealedLeagues] = useState<Set<string>>(() => new Set());

  const revealedCountInView = useMemo(
    () => leagues?.filter((league) => revealedLeagues.has(league.idLeague)).length ?? 0,
    [leagues, revealedLeagues],
  );

  const handleReveal = useCallback(
    (leagueId: string, leagueName: string) => {
      setRevealedLeagues((previous) => {
        if (previous.has(leagueId)) {
          return previous;
        }

        const next = new Set(previous);
        next.add(leagueId);
        return next;
      });

      onReveal(leagueName);
    },
    [onReveal],
  );

  const handleHide = useCallback((leagueId: string) => {
    setRevealedLeagues((previous) => {
      if (!previous.has(leagueId)) {
        return previous;
      }

      const next = new Set(previous);
      next.delete(leagueId);
      return next;
    });
  }, []);

  return (
    <GridSection>
      {isRateLimited && <RateLimitBanner />}

      {isError && !isRateLimited && (
        <GridError
          refetch={() => {
            void refetch();
          }}
        />
      )}

      {!isError && (
        <ErrorBoundary>
          <GridContent>
            {isLoading ? (
              <SkeletonGrid />
            ) : (
              <>
                {leagues && leagues.length === 0 ? (
                  <EmptyState />
                ) : (
                  <>
                    {leagues && leagues.length > 0 && (
                      <div className="w-full">
                        <LeagueHeader
                          leagues={leagues}
                          revealedCount={revealedCountInView}
                          searchTerm={searchTerm}
                          selectedSport={selectedSport}
                        />
                        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:gap-16 lg:grid-cols-3">
                          {leagues.map((league) => (
                            <LeagueCard
                              key={league.idLeague}
                              league={league}
                              searchTerm={searchTerm}
                              isRevealed={revealedLeagues.has(league.idLeague)}
                              onReveal={handleReveal}
                              onHide={handleHide}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </GridContent>
        </ErrorBoundary>
      )}
    </GridSection>
  );
};
