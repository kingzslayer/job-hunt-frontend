'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground mb-6 text-center">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-4 py-2 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="border-input hover:bg-accent rounded border px-4 py-2 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
