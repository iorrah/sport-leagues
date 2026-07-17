import type { SortField, SortDirection } from "@/types";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

interface Props {
  field: SortField;
  direction: SortDirection;
  onFieldChange: (v: SortField) => void;
  onDirectionChange: (v: SortDirection) => void;
  disabled: boolean;
}

export const SortControl = ({
  field,
  direction,
  onFieldChange,
  onDirectionChange,
  disabled,
}: Props) => {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <div className="flex gap-2 w-full">
        <select
          id="sort-field"
          value={field}
          onChange={(e) => onFieldChange(e.target.value as SortField)}
          disabled={disabled}
          className="h-12 border border-neutral-200 min-w-64 w-full flex-1 text-neutral-400 rounded-sm px-3 bg-background focus:outline-none disabled:opacity-50 focus:z-10 disabled:cursor-not-allowed cursor-pointer"
        >
          <option value="name">Name</option>
          <option value="sport">Sport</option>
          <option value="id">ID</option>
        </select>

        <button
          type="button"
          aria-label={direction === "asc" ? "Sort descending" : "Sort ascending"}
          onClick={() => onDirectionChange(direction === "asc" ? "desc" : "asc")}
          disabled={disabled}
          className="h-12 w-12 px-3 border border-neutral-200 rounded-sm bg-background hover:bg-muted focus:outline-none focus:z-10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
        >
          {direction === "asc" ? (
            <ArrowDownAZ className="h-4 w-4 text-neutral-400" />
          ) : (
            <ArrowUpAZ className="h-4 w-4 text-neutral-400" />
          )}
        </button>
      </div>
    </div>
  );
};
