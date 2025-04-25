import { PreferencesForm } from '@/components/forms/preference-form';
import { Brain } from 'lucide-react';

export default function JobPreference() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-xl flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex size-8 items-center justify-center rounded-md">
            <Brain className="text-primary size-6" />
          </div>
          <span className="sr-only">ApplyBrain AI</span>
          <h1 className="text-xl font-bold">
            Welcome to ApplyBrain <span className="text-primary">AI</span>
          </h1>
          <div className="text-center text-sm">
            Manage your personal information and job preferences.
          </div>
        </div>
        <PreferencesForm />
      </div>
    </div>
  );
}
