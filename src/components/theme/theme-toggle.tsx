'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(undefined);
  const { setTheme, theme, systemTheme } = useTheme();

  const toggleTheme = () => {
    if (selectedTheme === 'light') setTheme('dark');
    else setTheme('light');
  };

  useEffect(() => {
    if (theme === 'system') setSelectedTheme(systemTheme);
    else setSelectedTheme(theme);
  }, [theme, systemTheme]);

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {selectedTheme === 'light' ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
