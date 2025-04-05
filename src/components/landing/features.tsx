import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BotIcon, Search, Zap } from 'lucide-react';

export function Features() {
  return (
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold">How It Works</h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center">
          Our AI does the hard work of finding the right people and crafting personalized messages
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Search className="text-primary h-6 w-6" />
              </div>
              <CardTitle>Target Identification</CardTitle>
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
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <BotIcon className="text-primary h-6 w-6" />
              </div>
              <CardTitle>Email Crafting</CardTitle>
              <CardDescription>Personalized outreach messages that get responses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Our AI creates tailored emails that highlight your relevant skills and experience
                for each specific contact, increasing your response rate by 300%.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Zap className="text-primary h-6 w-6" />
              </div>
              <CardTitle>Automated Follow-up</CardTitle>
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
