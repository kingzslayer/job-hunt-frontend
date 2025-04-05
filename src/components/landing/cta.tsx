import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-20">
      <div className="bg-primary/5 container mx-auto rounded-xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold">Ready to Transform Your Job Search?</h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
          Join thousands of professionals who&apos;ve discovered the power of AI-assisted networking
          and cold outreach.
        </p>
        <div className="mt-10">
          <Link href="/auth/signup">
            <Button size="lg" className="gap-2">
              Get Started Today <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
