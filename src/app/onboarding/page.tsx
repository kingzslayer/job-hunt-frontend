import { PreferencesForm } from '@/components/forms/preferences-form';
import { withAuth } from '@/lib/auth';

export default async function OnboardingPage() {
  await withAuth('/onboarding');
  return (
    <div className="bg-background flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-xl flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-1 text-center">
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
