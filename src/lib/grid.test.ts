import { buildTitle, buildStatusText, getProgressPercentage } from "./grid";

describe("grid helpers", () => {
  describe("buildTitle", () => {
    it("returns search message when searchTerm is present", () => {
      expect(
        buildTitle({ leagueCount: 3, sportsCount: 2, searchTerm: "cup", selectedSport: "all" }),
      ).toBe('3 leagues found for "cup"');
    });

    it("returns sport-specific title when selectedSport !== all and searchTerm empty", () => {
      expect(
        buildTitle({ leagueCount: 1, sportsCount: 3, searchTerm: "", selectedSport: "Soccer" }),
      ).toBe("1 Soccer league");
    });

    it("returns fallback title for all sports when no searchTerm and selectedSport is all", () => {
      expect(
        buildTitle({ leagueCount: 2, sportsCount: 2, searchTerm: "", selectedSport: "all" }),
      ).toBe("2 leagues across 2 sports");
    });

    it("pluralizes league and sport correctly for singular and plural counts", () => {
      expect(
        buildTitle({ leagueCount: 1, sportsCount: 1, searchTerm: "", selectedSport: "all" }),
      ).toBe("1 league across 1 sport");
      expect(
        buildTitle({ leagueCount: 2, sportsCount: 1, searchTerm: "", selectedSport: "all" }),
      ).toBe("2 leagues across 1 sport");
    });
  });

  describe("buildStatusText", () => {
    it("returns zero-reveal text for no revealed badges", () => {
      expect(buildStatusText(0, 3)).toBe(
        "You haven't revealed any league badges for these leagues yet",
      );
    });

    it("returns complete text when revealedCount equals leagueCount", () => {
      expect(buildStatusText(2, 2)).toBe("You've revealed all the badges for these leagues!");
    });

    it("returns partial reveal text when some badges are revealed", () => {
      expect(buildStatusText(1, 3)).toBe("1 badge revealed · 2 to reveal");
    });

    it("handles zero leagues edge case without crashing", () => {
      expect(buildStatusText(0, 0)).toBe(
        "You haven't revealed any league badges for these leagues yet",
      );
    });
  });

  describe("getProgressPercentage", () => {
    it("returns 0 when leagueCount is 0", () => {
      expect(getProgressPercentage(1, 0)).toBe(0);
    });

    it("returns 0 when no badges revealed", () => {
      expect(getProgressPercentage(0, 5)).toBe(0);
    });

    it("returns rounded partial percentage", () => {
      expect(getProgressPercentage(1, 3)).toBe(33);
      expect(getProgressPercentage(2, 3)).toBe(67);
    });

    it("returns 100 when all badges revealed", () => {
      expect(getProgressPercentage(3, 3)).toBe(100);
    });
  });
});
