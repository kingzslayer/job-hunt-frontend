import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="text-primary h-6 w-6" />
          <h2 className="font-serif text-xl font-bold">
            <span>ApplyBrain</span> <span className="text-primary">AI</span>
          </h2>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/auth/login">
            <Button variant="outline" size="sm" className="px-2 sm:px-4">
              Log in
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm" className="px-2 sm:px-4">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
