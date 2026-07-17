import { AlertOctagon } from "lucide-react";

export const RateLimitBanner = () => (
  <div className="w-full sm:p-4 md:p-0">
    <div className="mx-auto flex w-full max-w-6xl items-center gap-5 rounded-xl bg-white p-6 shadow-md">
      {/* Icon container - matching the lightweight/muted style */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-muted/5">
        <AlertOctagon className="h-8 w-8 text-amber-500/80" strokeWidth={1} />
      </div>

      {/* Text content - separated into title and description for hierarchy */}
      <div className="flex flex-col">
        <h3 className="mb-1 text-lg font-semibold text-foreground">Rate limit reached</h3>
        <p className="text-muted-foreground">
          We've received too many requests. Please wait a moment before retrying.
        </p>
      </div>
    </div>
  </div>
);
