import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckIcon } from 'lucide-react';

export function Pricing() {
  return (
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center">
          Choose the plan that fits your job search needs
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <Card className="border-accent/20 relative overflow-hidden">
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>Perfect for beginners</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-5 w-5" />
                <span>50 personalized outreach emails</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-5 w-5" />
                <span>AI-powered follow-ups</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-5 w-5" />
                <span>Basic analytics</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Select Plan
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-primary relative overflow-hidden">
            <div className="bg-primary text-primary-foreground absolute top-0 right-0 px-3 py-1 text-xs font-medium">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle>Professional</CardTitle>
              <CardDescription>For serious job seekers</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$59</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-5 w-5" />
                <span>200 personalized outreach emails</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-5 w-5" />
                <span>Advanced follow-up sequences</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-5 w-5" />
                <span>Detailed analytics dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-5 w-5" />
                <span>Email template library</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Select Plan</Button>
            </CardFooter>
          </Card>

          <Card className="border-accent/20 relative overflow-hidden">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For teams and agencies</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-5 w-5" />
                <span>Unlimited outreach emails</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-5 w-5" />
                <span>Priority support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-5 w-5" />
                <span>Multi-user accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-5 w-5" />
                <span>Dedicated account manager</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
