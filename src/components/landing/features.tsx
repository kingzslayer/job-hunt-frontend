import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BotIcon, Search, Zap } from 'lucide-react';

export function Features() {
  return (
    <section className="bg-muted/50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">How It Works</h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-xs text-center text-sm sm:mt-4 sm:max-w-lg sm:text-base md:max-w-2xl">
          Our AI does the hard work of finding the right people and crafting personalized messages
        </p>

        <div className="mt-8 grid gap-6 sm:mt-12 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <Card>
            <CardHeader>
              <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12">
                <Search className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <CardTitle className="text-xl">Target Identification</CardTitle>
              <CardDescription>
                Our AI finds the right decision-makers based on your preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Tell us your dream companies, roles, and locations. Our AI will build a list of
                relevant hiring managers, team leads, and recruiters.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12">
                <BotIcon className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <CardTitle className="text-xl">Email Crafting</CardTitle>
              <CardDescription>Personalized outreach messages that get responses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Our AI creates tailored emails that highlight your relevant skills and experience
                for each specific contact, increasing your response rate by 300%.
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12">
                <Zap className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <CardTitle className="text-xl">Automated Follow-up</CardTitle>
              <CardDescription>Never miss an opportunity with smart follow-ups</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Our system automatically sends perfectly-timed follow-up emails to maximize your
                chances of getting a response, without being pushy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
