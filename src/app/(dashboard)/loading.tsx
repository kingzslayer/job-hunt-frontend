'use client';

export default function DashboardLoading() {
  return (
    <>
      {/* Top nav loader */}
      <div className="absolute top-0 left-0 z-50 h-1 w-full overflow-hidden bg-transparent">
        <div className="animate-progress bg-primary h-full w-full" />
      </div>

      {/* Side nav loader indicator */}
      <div className="fixed top-4 left-4 z-50 flex items-center justify-center">
        <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
      </div>

      {/* Content area loader */}
      <div className="flex w-full flex-col gap-6 p-6 md:p-10">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="bg-muted h-8 w-48 animate-pulse rounded"></div>
          <div className="bg-muted h-10 w-24 animate-pulse rounded"></div>
        </div>

        {/* Two cards on top */}
        <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1 */}
          <div className="bg-muted animate-pulse rounded-lg p-6">
            <div className="mb-4 flex justify-between">
              <div className="bg-muted-foreground/20 h-6 w-32 rounded"></div>
              <div className="bg-muted-foreground/20 h-6 w-8 rounded-full"></div>
            </div>
            <div className="bg-muted-foreground/20 mb-2 h-10 w-24 rounded"></div>
            <div className="bg-muted-foreground/20 h-4 w-3/4 rounded"></div>
          </div>

          {/* Card 2 */}
          <div className="bg-muted animate-pulse rounded-lg p-6">
            <div className="mb-4 flex justify-between">
              <div className="bg-muted-foreground/20 h-6 w-32 rounded"></div>
              <div className="bg-muted-foreground/20 h-6 w-8 rounded-full"></div>
            </div>
            <div className="bg-muted-foreground/20 mb-2 h-10 w-24 rounded"></div>
            <div className="bg-muted-foreground/20 h-4 w-3/4 rounded"></div>
          </div>
        </div>

        {/* Call to action section */}
        <div className="bg-muted mt-2 animate-pulse rounded-lg p-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <div className="bg-muted-foreground/20 mb-2 h-6 w-48 rounded"></div>
              <div className="bg-muted-foreground/20 h-4 w-64 rounded"></div>
            </div>
            <div className="bg-muted-foreground/20 h-10 w-32 rounded"></div>
          </div>
        </div>

        {/* Table section */}
        <div className="bg-muted mt-2 animate-pulse rounded-lg p-6">
          {/* Table header */}
          <div className="border-muted-foreground/10 mb-4 border-b pb-2">
            <div className="bg-muted-foreground/20 h-6 w-40 rounded"></div>
          </div>

          {/* Table rows */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="border-muted-foreground/10 flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center">
                <div className="bg-muted-foreground/20 mr-3 h-10 w-10 rounded-full"></div>
                <div>
                  <div className="bg-muted-foreground/20 mb-2 h-4 w-28 rounded"></div>
                  <div className="bg-muted-foreground/20 h-3 w-40 rounded"></div>
                </div>
              </div>
              <div className="bg-muted-foreground/20 h-8 w-20 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
