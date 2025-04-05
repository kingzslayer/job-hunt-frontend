'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16">
        <span className="text-primary/5 text-[12rem] leading-none font-extrabold select-none sm:text-[15rem] md:text-[20rem] lg:text-[30rem]">
          404
        </span>
      </div>
      <div className="z-10 text-center">
        <h1 className="font-bold">
          <span className="block text-3xl">Page Not Found</span>
        </h1>

        <div className="bg-primary/30 mx-auto mt-6 h-1 w-16 rounded-full"></div>

        <p className="text-muted-foreground mt-6 max-w-md text-center">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block transform rounded-md px-5 py-2.5 font-medium transition-transform hover:-translate-y-1"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
