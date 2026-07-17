import { SearchX } from "lucide-react";

export const EmptyState = () => (
  <div className="flex flex-1 items-center justify-center py-20">
    <div className="w-full max-w-xl rounded-xl bg-white pt-12 pb-24 shadow-md">
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 flex h-24 w-20 items-center justify-center rounded-xl bg-muted/5">
          <SearchX className="h-14 w-14 text-muted-foreground/30" strokeWidth={1} />
        </div>

        <h2 className="mb-3 text-2xl font-semibold text-foreground">No leagues found</h2>

        <p className="max-w-md leading-7 text-muted-foreground">
          We couldn't find any leagues matching your current search. Try using a different league
          name or clearing your filters.
        </p>
      </div>
    </div>
  </div>
);
