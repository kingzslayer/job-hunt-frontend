'use client';

export default function Loading() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4">
      <div className="space-y-8 text-center">
        {/* Fixed position loading text with dots sequence */}
        <div className="flex items-center justify-center">
          <h1 className="text-primary text-4xl font-bold md:text-6xl">Loading</h1>
          <div className="ml-2 flex h-12 w-24 items-center justify-start overflow-hidden">
            <span className="dots-animation text-primary text-4xl font-bold md:text-6xl"></span>
          </div>
        </div>

        {/* CSS animated progress bar */}
        <div className="bg-muted relative mx-auto h-4 w-full max-w-md overflow-hidden rounded-full">
          <div className="bg-primary progress-bar absolute top-0 left-0 h-full rounded-full"></div>
        </div>

        {/* Message text */}
        <p className="text-muted-foreground mt-8 text-xl font-medium md:text-2xl">
          Getting everything ready for you...
        </p>
      </div>

      <style jsx>{`
        .dots-animation:after {
          content: '...';
          animation: dotsAnimation 2s steps(4, end) infinite;
          letter-spacing: 4px;
        }

        @keyframes dotsAnimation {
          0%,
          20% {
            content: '.';
          }
          40%,
          60% {
            content: '..';
          }
          80%,
          100% {
            content: '...';
          }
        }

        .progress-bar {
          animation: progress 2s infinite;
          width: 0%;
        }

        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          75% {
            width: 90%;
          }
          90% {
            width: 95%;
          }
          100% {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
