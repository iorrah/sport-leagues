export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
}

export interface Leagues {
  leagues: League[];
}

interface Season {
  strSeason: string;
  strBadge: string;
}

export interface Seasons {
  seasons?: Season[];
}
