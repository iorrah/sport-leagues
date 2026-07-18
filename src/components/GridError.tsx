import { AlertCircle } from "lucide-react";

interface Props {
  refetch: () => void;
}
export const GridError = ({ refetch }: Props) => {
  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <div className="w-full max-w-xl rounded-xl bg-white p-12 shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 flex h-24 w-20 items-center justify-center rounded-xl bg-muted/5">
            <AlertCircle className="h-14 w-14 text-destructive/60" strokeWidth={1} />
          </div>

          <h2 className="mb-3 text-2xl font-semibold text-foreground">Failed to load leagues</h2>

          <p className="max-w-md leading-7 text-muted-foreground">
            We couldn't connect to TheSportsDB API. Check your internet connection or try again in a
            few moments.
          </p>

          <button
            onClick={() => {
              void refetch();
            }}
            className="mt-10 flex min-w-64 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-medium text-white transition-all hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};
