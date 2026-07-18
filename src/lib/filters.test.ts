import { filterLeagues, normalizeSearch, sortLeagues } from "./filters";

const leagues = [
  {
    idLeague: "1",
    strLeague: "Premier League",
    strSport: "Soccer",
  },
  {
    idLeague: "2",
    strLeague: "NBA",
    strSport: "Basketball",
  },
  {
    idLeague: "3",
    strLeague: "La Liga",
    strSport: "Soccer",
  },
];

describe("filterLeagues", () => {
  it("returns all leagues when search term is empty and sport is all", () => {
    expect(filterLeagues(leagues, "", "all")).toEqual(leagues);
  });

  it("filters by search term case-insensitively using strLeague", () => {
    expect(filterLeagues(leagues, "nba", "all")).toEqual([leagues[1]]);
    expect(filterLeagues(leagues, "premier", "all")).toEqual([leagues[0]]);
  });

  it("filters by selected sport", () => {
    expect(filterLeagues(leagues, "", "Soccer")).toEqual([leagues[0], leagues[2]]);
  });

  it("applies sport and search filters together", () => {
    expect(filterLeagues(leagues, "la", "Soccer")).toEqual([leagues[2]]);
  });

  it("returns empty array when no leagues match", () => {
    expect(filterLeagues(leagues, "xyz", "all")).toEqual([]);
  });

  it("filters by normalized search term input", () => {
    expect(filterLeagues(leagues, normalizeSearch("Premier     League"), "all")).toEqual([
      leagues[0],
    ]);
    expect(filterLeagues(leagues, normalizeSearch("     Premier"), "all")).toEqual([leagues[0]]);
    expect(filterLeagues(leagues, normalizeSearch("Premier\u0000League"), "all")).toEqual([
      leagues[0],
    ]);
  });

  it("supports normalized Unicode equivalent search terms", () => {
    const unicodeLeagues = [{ idLeague: "4", strLeague: "Café", strSport: "Soccer" }];

    expect(filterLeagues(unicodeLeagues, normalizeSearch("Cafe\u0301"), "all")).toEqual(
      unicodeLeagues,
    );
  });

  it("remains case-insensitive after normalization", () => {
    expect(filterLeagues(leagues, normalizeSearch("PREMIER"), "all")).toEqual([leagues[0]]);
    expect(filterLeagues(leagues, normalizeSearch("premier"), "all")).toEqual([leagues[0]]);
    expect(filterLeagues(leagues, normalizeSearch("PrEmIeR"), "all")).toEqual([leagues[0]]);
  });

  it("normalizes search input consistently", () => {
    expect(normalizeSearch("Cafe\u0301")).toBe("Café");
    expect(normalizeSearch(" foo   bar \t baz ")).toBe("foo bar baz");
    expect(normalizeSearch("foo\u0000bar")).toBe("foobar");
  });

  it("treats HTML-like strings as plain text", () => {
    const htmlLeagues = [{ idLeague: "4", strLeague: "<script> League", strSport: "Soccer" }];

    expect(filterLeagues(htmlLeagues, "<script>", "all")).toEqual(htmlLeagues);
  });

  it("treats SQL-like strings as plain text", () => {
    const sqlLeagues = [{ idLeague: "5", strLeague: "DROP TABLE League", strSport: "Basketball" }];

    expect(filterLeagues(sqlLeagues, "DROP TABLE", "all")).toEqual(sqlLeagues);
  });
});

describe("sortLeagues", () => {
  it("sorts by name ascending and descending", () => {
    expect(sortLeagues(leagues, "name", "asc").map((league) => league.idLeague)).toEqual([
      "3",
      "2",
      "1",
    ]);
    expect(sortLeagues(leagues, "name", "desc").map((league) => league.idLeague)).toEqual([
      "1",
      "2",
      "3",
    ]);
  });

  it("sorts by sport ascending and descending", () => {
    expect(sortLeagues(leagues, "sport", "asc").map((league) => league.idLeague)).toEqual([
      "2",
      "1",
      "3",
    ]);
    expect(sortLeagues(leagues, "sport", "desc").map((league) => league.idLeague)).toEqual([
      "1",
      "3",
      "2",
    ]);
  });

  it("sorts by id ascending and descending", () => {
    expect(sortLeagues(leagues, "id", "asc").map((league) => league.idLeague)).toEqual([
      "1",
      "2",
      "3",
    ]);
    expect(sortLeagues(leagues, "id", "desc").map((league) => league.idLeague)).toEqual([
      "3",
      "2",
      "1",
    ]);
  });

  it("maintains stable ordering across sort directions", () => {
    const byNameAsc = sortLeagues(leagues, "name", "asc");
    const byNameDesc = sortLeagues(leagues, "name", "desc");
    expect(byNameAsc).toHaveLength(byNameDesc.length);
  });
});
