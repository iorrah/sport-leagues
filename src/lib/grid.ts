const pluralize = (count: number, word: string) => (count === 1 ? word : `${word}s`);

export const buildTitle = ({
  leagueCount,
  sportsCount,
  searchTerm,
  selectedSport,
}: {
  leagueCount: number;
  sportsCount: number;
  searchTerm: string;
  selectedSport: string;
}) => {
  const leagueLabel = pluralize(leagueCount, "league");

  if (searchTerm) {
    return `${leagueCount} ${leagueLabel} found for "${searchTerm}"`;
  }

  if (selectedSport !== "all") {
    return `${leagueCount} ${selectedSport} ${leagueLabel}`;
  }

  return `${leagueCount} ${leagueLabel} across ${sportsCount} ${pluralize(sportsCount, "sport")}`;
};

export const buildStatusText = (revealedCount: number, leagueCount: number) => {
  const leaguePhrase = leagueCount === 1 ? "this league" : "these leagues";

  if (revealedCount === 0) {
    const badgeLabel = pluralize(leagueCount, "badge");
    return `You haven't revealed any league ${badgeLabel} for ${leaguePhrase} yet`;
  }

  const isComplete = leagueCount > 0 && revealedCount === leagueCount;
  if (isComplete) {
    return `You've revealed all the badges for ${leaguePhrase}!`;
  }

  const remainingCount = Math.max(leagueCount - revealedCount, 0);
  const revealedBadgeLabel = pluralize(revealedCount, "badge");
  return `${revealedCount} ${revealedBadgeLabel} revealed · ${remainingCount} to reveal`;
};

export const getProgressPercentage = (revealedCount: number, leagueCount: number) => {
  if (leagueCount === 0) {
    return 0;
  }

  return Math.min(Math.round((revealedCount / leagueCount) * 100), 100);
};
