import { Search } from "lucide-react";

const pillClassName =
  "inline-flex items-center gap-1.5 rounded-full bg-neutral-200 px-3 py-1 text-xs font-medium text-neutral-500";

export const GridFilterPills = ({
  searchTerm,
  selectedSport,
}: {
  searchTerm: string;
  selectedSport: string;
}) => {
  if (!searchTerm && selectedSport === "all") {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {searchTerm && (
        <span className={pillClassName}>
          <Search className="h-3.5 w-3.5" />
          Search: {searchTerm}
        </span>
      )}

      {selectedSport !== "all" && <span className={pillClassName}>{selectedSport}</span>}
    </div>
  );
};
