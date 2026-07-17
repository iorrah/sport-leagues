export const SkeletonGrid = () => {
  const items = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <div
          key={i}
          // Added animate-pulse here
          className="animate-pulse relative flex h-[480px] flex-col overflow-hidden rounded-xl bg-white shadow-md"
        >
          {/* Top spacing */}
          <div className="p-12" />

          {/* Shield area */}
          <div className="flex flex-1 flex-col items-center justify-center bg-muted/5 p-6">
            <div className="h-24 w-20 rounded-lg bg-neutral-200" />
          </div>

          {/* League info */}
          <div className="px-12 text-center">
            <div className="mx-auto mb-3 h-6 w-44 rounded bg-neutral-200" />
            <div className="flex justify-center gap-2">
              <div className="h-6 w-16 rounded-full bg-neutral-200" />
              <div className="h-6 w-20 rounded-full bg-neutral-200" />
            </div>
          </div>

          {/* Button */}
          <div className="p-12">
            <div className="h-[56px] w-full rounded-xl bg-neutral-200" />
          </div>
        </div>
      ))}
    </div>
  );
};
