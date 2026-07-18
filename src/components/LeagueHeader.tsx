import { Search } from "lucide-react";
import type { League } from "@/types";

interface Props {
  leagues: League[];
  revealedCount: number;
  searchTerm: string;
  selectedSport: string;
}

const pillClassName =
  "inline-flex items-center gap-1.5 rounded-full bg-neutral-200 px-3 py-1 text-xs font-medium text-neutral-500";

export const LeagueHeader = ({ leagues, revealedCount, searchTerm, selectedSport }: Props) => {
  const sportsCount = new Set(leagues.map((league) => league.strSport)).size;

  const remainingCount = Math.max(leagues.length - revealedCount, 0);

  const progressPercentage =
    leagues.length === 0 ? 0 : Math.min(Math.round((revealedCount / leagues.length) * 100), 100);

  const leagueLabel = leagues.length === 1 ? "league" : "leagues";

  const sportLabel = sportsCount === 1 ? "sport" : "sports";

  const badgeLabel = revealedCount === 1 ? "badge" : "badges";

  const isComplete = leagues.length > 0 && revealedCount === leagues.length;

  const title = searchTerm
    ? `${leagues.length} ${leagueLabel} found for "${searchTerm}"`
    : selectedSport !== "all"
      ? `${leagues.length} ${selectedSport} ${leagueLabel}`
      : `${leagues.length} ${leagueLabel} across ${sportsCount} ${sportLabel}`;

  const collectionText =
    revealedCount === 0
      ? "You haven't revealed any league badges for these leagues yet"
      : isComplete
        ? "You've revealed all the badges for these leagues!"
        : `${revealedCount} ${badgeLabel} revealed · ${remainingCount} to reveal`;

  return (
    <div className="mb-8">
      <h3 className="text-xl md:text-3xl">{title}</h3>

      <p className="mt-2 text-sm font-medium">{collectionText}</p>

      <div className="mt-4 flex items-center gap-3">
        <div
          className="h-5 flex-1 overflow-hidden rounded-md bg-neutral-200"
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Badge revealing progress"
        >
          <div
            className="h-full rounded-md bg-primary bg-[linear-gradient(-45deg,transparent_25%,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.15)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.15)_75%)] bg-[length:16px_16px] transition-[width] duration-700 ease-out animate-[progress-stripes_1s_linear_infinite]"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>

        <span className="text-sm font-bold text-muted-foreground">{progressPercentage}%</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {searchTerm && (
          <span className={pillClassName}>
            <Search className="h-3.5 w-3.5" />
            Search: {searchTerm}
          </span>
        )}

        {selectedSport !== "all" && <span className={pillClassName}>{selectedSport}</span>}
      </div>
    </div>
  );
};
