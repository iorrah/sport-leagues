import type { League, SortField, SortDirection } from "@/types";

export const filterLeagues = (
  leagues: League[],
  searchTerm: string,
  selectedSport: string,
): League[] => {
  return leagues.filter((league) => {
    // Sport filter
    if (selectedSport !== "all" && league.strSport !== selectedSport) {
      return false;
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = league.strLeague.toLowerCase().includes(term);
      const matchAlt = (league.strLeagueAlternate || "").toLowerCase().includes(term);

      if (!matchName && !matchAlt) {
        return false;
      }
    }

    return true;
  });
};

export const sortLeagues = (
  leagues: League[],
  field: SortField,
  direction: SortDirection,
): League[] => {
  const sorted = [...leagues];

  sorted.sort((a, b) => {
    let result = 0;

    if (field === "name") {
      result = a.strLeague.localeCompare(b.strLeague);
    } else if (field === "sport") {
      result = a.strSport.localeCompare(b.strSport);
    } else if (field === "id") {
      result = Number(a.idLeague) - Number(b.idLeague);
    }

    return direction === "asc" ? result : -result;
  });

  return sorted;
};
