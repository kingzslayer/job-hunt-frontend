import { HeroDialog } from '@/components/landing/hero-dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="px-4 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Land Your Dream Job with
          <span className="mt-2 block">
            ApplyBrain <span className="text-primary">AI</span>
          </span>
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-sm text-base sm:mt-6 sm:max-w-md sm:text-lg md:text-xl">
          Our AI assistant creates personalized outreach to hiring managers and recruiters that get
          responses, not rejections.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:mt-10 sm:flex-row">
          <Link href="/auth/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full gap-2 sm:w-auto">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <HeroDialog />
        </div>
      </div>
    </section>
  );
}
