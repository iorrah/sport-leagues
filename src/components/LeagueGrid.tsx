import { useCallback, useState } from "react";
import { AlertCircle } from "lucide-react";
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
} from "@/components";

interface Props {
  leagues: League[] | undefined;
  isLoading: boolean;
  isError: boolean;
  isRateLimited: boolean;
  refetch: () => void;
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
        <div className="flex flex-1 items-center justify-center py-20">
          <div className="w-full max-w-xl rounded-xl bg-white p-12 shadow-md">
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 flex h-24 w-20 items-center justify-center rounded-xl bg-muted/5">
                <AlertCircle className="h-14 w-14 text-destructive/60" strokeWidth={1} />
              </div>

              <h2 className="mb-3 text-2xl font-semibold text-foreground">
                Failed to load leagues
              </h2>

              <p className="max-w-md leading-7 text-muted-foreground">
                We couldn't connect to TheSportsDB API. Check your internet connection or try again
                in a few moments.
              </p>

              <button
                onClick={() => refetch()}
                className="mt-10 flex min-w-64 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-medium text-white transition-all hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
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
                          revealedCount={revealedLeagues.size}
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
