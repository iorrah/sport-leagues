import { MAX_SEARCH_LENGTH } from "@/constants/filters";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: Props) => (
  <div className="w-full border-b border-b-neutral-100 bg-card py-8">
    <div className="max-w-6xl mx-auto relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

      <input
        type="search"
        aria-label="Search leagues"
        placeholder="Search leagues"
        data-testid="search-input"
        autoComplete="off"
        spellCheck={false}
        maxLength={MAX_SEARCH_LENGTH}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-md bg-background text-foreground focus:outline-none focus:border-transparent"
      />
    </div>
  </div>
);
