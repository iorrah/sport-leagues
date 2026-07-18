export const SkeletonGrid = () => {
  const items = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="w-full">
      {/* League Header Skeleton */}
      <div className="mb-8 animate-pulse">
        {/* Title */}
        <div className="h-9 w-80 rounded-xl bg-neutral-200" />

        {/* Subtitle */}
        <div className="mt-3 h-5 w-64 rounded-md bg-neutral-200" />

        {/* Progress bar */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-5 flex-1 overflow-hidden rounded-md bg-neutral-200" />

          {/* Percentage */}
          <div className="h-5 w-10 rounded-md bg-neutral-200" />
        </div>
      </div>

      {/* League Cards Skeleton */}
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:gap-16 lg:grid-cols-3">
        {items.map((i) => (
          <div
            key={i}
            className="animate-pulse relative flex h-[480px] flex-col overflow-hidden rounded-xl bg-white shadow-md"
          >
            {/* Top spacing */}
            <div className="p-12" />

            {/* Shield area */}
            <div className="flex flex-1 flex-col items-center justify-center bg-muted/5 p-6">
              <div className="h-24 w-20 rounded-lg bg-neutral-200" />
            </div>

            {/* League info */}
            <div className="px-8 text-center">
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
    </div>
  );
};
