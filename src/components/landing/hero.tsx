import { HeroDialog } from '@/components/landing/hero-dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Land Your Dream Job with
          <span className="text-primary mt-2 block">AI-Powered Outreach</span>
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-md text-lg md:max-w-lg md:text-xl">
          Our AI agents create personalized cold emails to hiring managers and recruiters that get
          responses, not rejections.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/auth/signup">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <HeroDialog />
        </div>
      </div>
    </section>
  );
}
