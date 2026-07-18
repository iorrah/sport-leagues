import { MAX_SEARCH_LENGTH } from "@/constants/filters";
import type { League, SortField, SortDirection } from "@/types";

export const normalizeSearch = (value: string): string =>
  value
    .normalize("NFKC")
    .replace(/\p{Cc}/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_SEARCH_LENGTH);

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

    // Search filter. Caller should normalize the search term before passing it in.
    if (searchTerm) {
      const term = searchTerm.toLocaleLowerCase().replace(/\s+/g, "");
      const leagueName = normalizeSearch(league.strLeague).toLocaleLowerCase().replace(/\s+/g, "");

      const matchName = leagueName.includes(term);

      if (!matchName) {
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
