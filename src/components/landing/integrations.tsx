import { LayersIcon, Mail, MessageSquareIcon, Users } from 'lucide-react';

export function Integrations() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold">Seamless Integrations</h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center">
          Connect with your favorite tools and platforms
        </p>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
              <LayersIcon className="text-primary h-10 w-10" />
            </div>
            <h3 className="mt-4 font-semibold">LinkedIn</h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
              <Mail className="text-primary h-10 w-10" />
            </div>
            <h3 className="mt-4 font-semibold">Gmail</h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
              <MessageSquareIcon className="text-primary h-10 w-10" />
            </div>
            <h3 className="mt-4 font-semibold">Slack</h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
              <Users className="text-primary h-10 w-10" />
            </div>
            <h3 className="mt-4 font-semibold">Salesforce</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
