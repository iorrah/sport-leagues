import type { League } from "@/types";
import { ProgressBar } from "./ProgressBar";
import { GridFilterPills } from "./GridFilterPills";
import { getProgressPercentage, buildTitle, buildStatusText } from "@/lib/grid";

interface Props {
  leagues: League[];
  revealedCount: number;
  searchTerm: string;
  selectedSport: string;
}

export const LeagueHeader = ({ leagues, revealedCount, searchTerm, selectedSport }: Props) => {
  const sportsCount = new Set(leagues.map((league) => league.strSport)).size;
  const progressPercentage = getProgressPercentage(revealedCount, leagues.length);

  const title = buildTitle({
    leagueCount: leagues.length,
    sportsCount,
    searchTerm,
    selectedSport,
  });

  const statusText = buildStatusText(revealedCount, leagues.length);

  return (
    <div className="mb-8">
      <h3 className="text-xl md:text-3xl">{title}</h3>
      <p className="mt-2 text-sm font-medium">{statusText}</p>
      <ProgressBar percentage={progressPercentage} />
      <GridFilterPills searchTerm={searchTerm} selectedSport={selectedSport} />
    </div>
  );
};
