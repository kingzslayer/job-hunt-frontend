import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  ArrowRight,
  BotIcon,
  CheckIcon,
  LayersIcon,
  Mail,
  MessageSquareIcon,
  Search,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export function HeroDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          See how it works
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 sm:max-w-[850px]">
        <div className="bg-primary text-primary-foreground p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Experience ColdAI Connect</DialogTitle>
            <DialogDescription className="text-primary-foreground/90 text-base">
              Our powerful AI workflow gets you interviews, not rejections
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="space-y-8">
            <div className="group flex items-start gap-6">
              <div className="bg-primary/10 border-primary/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md">
                <span className="text-primary text-lg font-bold">1</span>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold">
                    <Search className="text-primary h-5 w-5" />
                    Set Your Target Parameters
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    Our AI builds your personalized outreach strategy based on your career goals.
                  </p>
                </div>

                <div className="overflow-hidden rounded-lg border shadow-sm">
                  <div className="bg-muted/30 p-4">
                    <div className="flex flex-col gap-3">
                      <div className="bg-background flex items-center gap-2 rounded-md p-3 shadow-sm">
                        <div className="bg-primary/10 rounded-full p-2">
                          <LayersIcon className="text-primary h-4 w-4" />
                        </div>
                        <span className="font-medium">Target Companies</span>
                        <div className="ml-auto flex gap-1">
                          <span className="bg-primary/5 rounded-md px-2 py-1 text-xs">Airbnb</span>
                          <span className="bg-primary/5 rounded-md px-2 py-1 text-xs">Stripe</span>
                          <span className="bg-primary/5 rounded-md px-2 py-1 text-xs">+ Add</span>
                        </div>
                      </div>

                      <div className="bg-background flex items-center gap-2 rounded-md p-3 shadow-sm">
                        <div className="bg-primary/10 rounded-full p-2">
                          <Users className="text-primary h-4 w-4" />
                        </div>
                        <span className="font-medium">Target Roles</span>
                        <div className="ml-auto flex gap-1">
                          <span className="bg-primary/5 rounded-md px-2 py-1 text-xs">
                            Product Manager
                          </span>
                          <span className="bg-primary/5 rounded-md px-2 py-1 text-xs">+ Add</span>
                        </div>
                      </div>

                      <div className="bg-background flex items-center gap-2 rounded-md p-3 shadow-sm">
                        <div className="bg-primary/10 rounded-full p-2">
                          <MessageSquareIcon className="text-primary h-4 w-4" />
                        </div>
                        <span className="font-medium">Experience Level</span>
                        <div className="ml-auto flex gap-1">
                          <span className="bg-primary/5 rounded-md px-2 py-1 text-xs">
                            Mid-Senior
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group flex items-start gap-6">
              <div className="bg-primary/10 border-primary/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md">
                <span className="text-primary text-lg font-bold">2</span>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold">
                    <BotIcon className="text-primary h-5 w-5" />
                    AI Prospect Discovery
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    Our AI identifies decision-makers with hiring authority at your target
                    companies.
                  </p>
                </div>

                <div className="overflow-hidden rounded-lg border shadow-sm">
                  <div className="bg-muted/30 p-4">
                    <div className="bg-background mb-2 flex items-center justify-between rounded-md p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 h-8 w-8 rounded-full"></div>
                        <div>
                          <div className="font-medium">Sarah Johnson</div>
                          <div className="text-muted-foreground text-xs">
                            Head of Product @ Airbnb
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                          98% Match
                        </span>
                        <CheckIcon className="text-primary h-5 w-5" />
                      </div>
                    </div>

                    <div className="bg-background mb-2 flex items-center justify-between rounded-md p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 h-8 w-8 rounded-full"></div>
                        <div>
                          <div className="font-medium">Michael Chen</div>
                          <div className="text-muted-foreground text-xs">
                            Product Director @ Stripe
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                          92% Match
                        </span>
                        <CheckIcon className="text-primary h-5 w-5" />
                      </div>
                    </div>

                    <div className="bg-background flex items-center justify-between rounded-md p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 h-8 w-8 rounded-full"></div>
                        <div>
                          <div className="font-medium">Alex Rodriguez</div>
                          <div className="text-muted-foreground text-xs">
                            VP of Product @ Airbnb
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                          85% Match
                        </span>
                        <CheckIcon className="text-primary h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group flex items-start gap-6">
              <div className="bg-primary/10 border-primary/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md">
                <span className="text-primary text-lg font-bold">3</span>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold">
                    <MessageSquareIcon className="text-primary h-5 w-5" />
                    Hyper-Personalized Outreach
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    Our AI generates emails tailored to each prospect&apos;s background, interests,
                    and company needs.
                  </p>
                </div>

                <div className="overflow-hidden rounded-lg border shadow-sm">
                  <div className="bg-muted/30 p-4">
                    <div className="bg-background rounded-md p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2">
                        <Mail className="text-primary h-4 w-4" />
                        <div className="font-semibold">
                          To: Sarah Johnson (Head of Product @ Airbnb)
                        </div>
                      </div>
                      <div className="bg-muted/30 rounded-md p-3 text-sm">
                        <p className="mb-2">
                          Subject: Your Take on Airbnb&apos;s Product-Led Growth Strategy
                        </p>
                        <p className="mb-2">Hi Sarah,</p>
                        <p className="mb-2">
                          I noticed your recent article on product innovation at Airbnb. Your
                          insights on balancing user experience with business metrics really
                          resonated with me, especially your point about &quot;invisible
                          features&quot; that reduce friction.
                        </p>
                        <p className="mb-2">
                          I&apos;ve spent the last 3 years at [Company] implementing similar
                          strategies that increased user activation by 42%. I&apos;d love to share
                          some thoughts on how these principles could apply to Airbnb&apos;s new
                          market expansion.
                        </p>
                        <p>Would you be open to a 15-minute conversation next week?</p>
                      </div>
                      <div className="mt-3 flex justify-between">
                        <Button variant="outline" size="sm">
                          Regenerate
                        </Button>
                        <Button size="sm" className="gap-1">
                          <CheckIcon className="h-4 w-4" /> Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group flex items-start gap-6">
              <div className="bg-primary/10 border-primary/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md">
                <span className="text-primary text-lg font-bold">4</span>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold">
                    <Zap className="text-primary h-5 w-5" />
                    Smart Follow-up & Analytics
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    Track your success in real-time and let AI handle follow-up sequences for
                    maximum response rates.
                  </p>
                </div>

                <div className="overflow-hidden rounded-lg border shadow-sm">
                  <div className="bg-muted/30 p-4">
                    <div className="mb-4 grid grid-cols-3 gap-3">
                      <div className="bg-background rounded-md p-3 text-center shadow-sm">
                        <div className="text-primary text-3xl font-bold">78%</div>
                        <div className="text-muted-foreground text-xs">Open Rate</div>
                      </div>
                      <div className="bg-background rounded-md p-3 text-center shadow-sm">
                        <div className="text-primary text-3xl font-bold">42%</div>
                        <div className="text-muted-foreground text-xs">Response Rate</div>
                      </div>
                      <div className="bg-background rounded-md p-3 text-center shadow-sm">
                        <div className="text-primary text-3xl font-bold">9</div>
                        <div className="text-muted-foreground text-xs">Interviews</div>
                      </div>
                    </div>

                    <div className="bg-background mb-2 rounded-md p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-100"></div>
                          <span className="font-medium">Sarah Johnson</span>
                        </div>
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                          Interview Scheduled
                        </span>
                      </div>
                    </div>

                    <div className="bg-background rounded-md p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-100"></div>
                          <span className="font-medium">Michael Chen</span>
                        </div>
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                          Follow-up Sent (2/3)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/20 flex flex-col items-center justify-between gap-4 border-t p-6 sm:flex-row">
          <div className="text-muted-foreground text-sm">
            <span className="text-foreground font-medium">70% of our users</span> land interviews
            within 3 weeks
          </div>
          <div className="flex gap-3">
            <DialogTrigger asChild>
              <Button variant="outline">Close</Button>
            </DialogTrigger>
            <Link href="/auth/signup">
              <Button className="gap-2">
                Get Started Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
