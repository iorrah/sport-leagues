export const ProgressBar = ({ percentage }: { percentage: number }) => (
  <div className="mt-4 flex items-center gap-3">
    <div
      className="h-5 flex-1 overflow-hidden rounded-md bg-neutral-200"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Badge revealing progress"
    >
      <div
        className="h-full rounded-md bg-primary bg-[linear-gradient(-45deg,transparent_25%,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.15)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.15)_75%)] bg-[length:16px_16px] transition-[width] duration-700 ease-out animate-[progress-stripes_1s_linear_infinite]"
        style={{ width: `${percentage}%` }}
      />
    </div>

    <span className="text-sm font-bold text-muted-foreground">{percentage}%</span>
  </div>
);
