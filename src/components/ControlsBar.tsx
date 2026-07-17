import { SportFilter, SortControl } from "./";
import type { SortField, SortDirection } from "../types/sorting";

interface Props {
  sports: string[];
  selectedSport: string;
  onSportChange: (v: string) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  onSortFieldChange: (v: SortField) => void;
  onSortDirectionChange: (v: SortDirection) => void;
  disabled: boolean;
}

export const ControlsBar = ({
  sports,
  selectedSport,
  onSportChange,
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange,
  disabled,
}: Props) => {
  return (
    <div className="w-full shadow-md bg-white px-4 py-8 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <SportFilter
          sports={sports}
          value={selectedSport}
          onChange={onSportChange}
          disabled={disabled}
        />

        <SortControl
          field={sortField}
          direction={sortDirection}
          onFieldChange={onSortFieldChange}
          onDirectionChange={onSortDirectionChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
