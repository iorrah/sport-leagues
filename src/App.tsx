import { useCallback, useMemo, useRef, useState } from "react";
import { Hero, SearchBar, Footer, ControlsBar, LeagueGrid } from "@/components";
import type { SortField, SortDirection } from "@/types";
import { useLeagues, useDebouncedValue } from "@/hooks";
import { RateLimitError } from "@/lib/errors";
import { filterLeagues, sortLeagues } from "@/lib/filters";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [revealMessage, setRevealMessage] = useState("");

  const debouncedSearch = useDebouncedValue(searchTerm, 250);
  const { data: leagues, isLoading, isError, error, refetch } = useLeagues();

  const isRateLimited = error instanceof RateLimitError;

  const sportOptions = useMemo(() => {
    if (!leagues) return [];
    return [...new Set(leagues.map((l) => l.strSport))].sort();
  }, [leagues]);

  const filteredSorted = useMemo(() => {
    if (!leagues) return [];
    const filtered = filterLeagues(leagues, debouncedSearch, selectedSport);
    return sortLeagues(filtered, sortField, sortDirection);
  }, [leagues, debouncedSearch, selectedSport, sortField, sortDirection]);

  const liveRef = useRef<HTMLDivElement>(null);

  const handleReveal = useCallback((leagueName: string) => {
    setRevealMessage(`Badge revealed for ${leagueName}`);
  }, []);

  return (
    <>
      <main>
        <div aria-live="polite" className="sr-only" ref={liveRef}>
          {revealMessage}
        </div>

        <Hero />

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <ControlsBar
          sports={sportOptions}
          selectedSport={selectedSport}
          onSportChange={setSelectedSport}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortFieldChange={setSortField}
          onSortDirectionChange={setSortDirection}
          disabled={!leagues}
        />

        <LeagueGrid
          leagues={filteredSorted}
          isLoading={isLoading}
          isError={isError}
          isRateLimited={isRateLimited}
          refetch={refetch}
          searchTerm={debouncedSearch}
          onReveal={handleReveal}
        />
      </main>

      <Footer />
    </>
  );
};

export default App;
