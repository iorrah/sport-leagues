import { lazy, Suspense, useCallback, useMemo, useRef, useState } from "react";
import {
  Hero,
  SearchBar,
  Footer,
  ControlsBar,
  SkeletonGrid,
  GridSection,
  GridContent,
} from "@/components";
import type { SortField, SortDirection } from "@/types";
import { useLeagues, useDebouncedValue } from "@/hooks";
import { RateLimitError } from "@/lib/errors";
import { filterLeagues, normalizeSearch, sortLeagues } from "@/lib/filters";

const LeagueGrid = lazy(() =>
  import("@/components/LeagueGrid").then((module) => ({
    default: module.LeagueGrid,
  })),
);

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [revealMessage, setRevealMessage] = useState("");

  const debouncedSearch = useDebouncedValue(searchTerm, 250);
  const debouncedNormalizedSearch = useMemo(
    () => normalizeSearch(debouncedSearch),
    [debouncedSearch],
  );
  const { data: leagues, isLoading, isError, error, refetch } = useLeagues();

  const isRateLimited = error instanceof RateLimitError;

  const sportOptions = useMemo(() => {
    if (!leagues) return [];
    return [...new Set(leagues.map((l) => l.strSport))].sort();
  }, [leagues]);

  const filteredSorted = useMemo(() => {
    if (!leagues) return [];
    const filtered = filterLeagues(leagues, debouncedNormalizedSearch, selectedSport);
    return sortLeagues(filtered, sortField, sortDirection);
  }, [leagues, debouncedNormalizedSearch, selectedSport, sortField, sortDirection]);

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

        <Suspense
          fallback={
            <GridSection>
              <GridContent>
                <SkeletonGrid />
              </GridContent>
            </GridSection>
          }
        >
          <LeagueGrid
            leagues={filteredSorted}
            isLoading={isLoading}
            isError={isError}
            isRateLimited={isRateLimited}
            refetch={refetch}
            searchTerm={debouncedNormalizedSearch}
            selectedSport={selectedSport}
            onReveal={handleReveal}
          />
        </Suspense>
      </main>

      <Footer />
    </>
  );
};

export default App;
