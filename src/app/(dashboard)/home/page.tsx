'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Brain, CheckCircleIcon, LineChart, TrendingUpIcon } from 'lucide-react';

export default function HomePage() {
  // Dummy data
  const applicationStats = {
    total: 25,
    applied: 18,
    interviews: 4,
    offers: 1,
    rejected: 7,
    pending: 10,
  };

  const recentActivity = [
    { date: 'Today', activity: 'Applied for Senior Developer at TechCorp' },
    { date: 'Yesterday', activity: 'Received interview request from InnoSoft' },
    { date: 'Apr 2', activity: 'Completed technical assessment for DataFirm' },
    { date: 'Mar 30', activity: 'Application rejected by CloudTech' },
  ];

  // AI Insights data
  const aiInsights = [
    {
      message: 'Your resume matches 87% of senior developer positions',
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
    },
    {
      message: 'Add Docker to your skills to increase matches by 24%',
      icon: <TrendingUpIcon className="h-5 w-5 text-blue-500" />,
    },
    {
      message: 'Your response rate is 35% above average',
      icon: <LineChart className="h-5 w-5 text-green-500" />,
    },
    {
      message: 'Applications to startups have 2.5x higher response rate',
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
    },
  ];

  // AI Recommended Jobs data
  const recommendedJobs = [
    {
      title: 'Senior React Developer',
      company: 'TechVision',
      matchScore: 95,
      salary: '$130,000 - $160,000',
      location: 'Remote',
    },
    {
      title: 'Frontend Team Lead',
      company: 'InnovateSoft',
      matchScore: 92,
      salary: '$140,000 - $170,000',
      location: 'San Francisco (Hybrid)',
    },
    {
      title: 'Full Stack Engineer',
      company: 'CloudScale',
      matchScore: 89,
      salary: '$125,000 - $155,000',
      location: 'Austin (Remote)',
    },
  ];

  // AI Skills Gap Analysis data
  const skillsAnalysis = {
    strongSkills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Next.js'],
    gapSkills: ['Docker', 'AWS', 'GraphQL'],
    matchRate: 87,
    improvementSuggestions: [
      'Add Docker experience to your profile',
      "Highlight any AWS projects you've worked on",
      'Consider adding a GraphQL certification',
    ],
  };

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.total}</div>
            <p className="text-muted-foreground text-xs">+4 applications this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.interviews}</div>
            <p className="text-muted-foreground text-xs">2 upcoming interviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.offers}</div>
            <p className="text-muted-foreground text-xs">Awaiting response from 3 companies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((applicationStats.interviews / applicationStats.applied) * 100)}%
            </div>
            <p className="text-muted-foreground text-xs">Interview success rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Smart analytics from your job search</CardDescription>
            </div>
            <Brain className="text-primary h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight, i) => (
                <div key={i} className="flex items-start space-x-2">
                  {insight.icon}
                  <p className="text-sm">{insight.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>Track your application progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">Applied ({applicationStats.applied})</div>
                <div className="text-muted-foreground text-sm">
                  {Math.round((applicationStats.applied / applicationStats.total) * 100)}%
                </div>
              </div>
              <Progress
                value={(applicationStats.applied / applicationStats.total) * 100}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">Interviews ({applicationStats.interviews})</div>
                <div className="text-muted-foreground text-sm">
                  {Math.round((applicationStats.interviews / applicationStats.total) * 100)}%
                </div>
              </div>
              <Progress
                value={(applicationStats.interviews / applicationStats.total) * 100}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">Pending ({applicationStats.pending})</div>
                <div className="text-muted-foreground text-sm">
                  {Math.round((applicationStats.pending / applicationStats.total) * 100)}%
                </div>
              </div>
              <Progress
                value={(applicationStats.pending / applicationStats.total) * 100}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">Rejected ({applicationStats.rejected})</div>
                <div className="text-muted-foreground text-sm">
                  {Math.round((applicationStats.rejected / applicationStats.total) * 100)}%
                </div>
              </div>
              <Progress
                value={(applicationStats.rejected / applicationStats.total) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>AI Job Matches</CardTitle>
            <CardDescription>Top matches based on your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedJobs.map((job, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-muted-foreground text-sm">{job.company}</p>
                    </div>
                    <div
                      className={`rounded-full px-2 py-1 text-xs font-medium ${job.matchScore > 90 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}
                    >
                      {job.matchScore}% Match
                    </div>
                  </div>
                  <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span>{job.salary}</span>
                    <span>{job.location}</span>
                  </div>
                  {i < recommendedJobs.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
              <Button variant="outline" className="mt-2 w-full">
                View All Matches
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>AI Skills Analysis</CardTitle>
            <CardDescription>Based on your target job titles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium">Skills Match Rate</p>
                  <p className="text-sm font-medium">{skillsAnalysis.matchRate}%</p>
                </div>
                <Progress value={skillsAnalysis.matchRate} className="h-2" />
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">Strong Skills</p>
                <div className="flex flex-wrap gap-2">
                  {skillsAnalysis.strongSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">Skills to Add</p>
                <div className="flex flex-wrap gap-2">
                  {skillsAnalysis.gapSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="mt-2 w-full">
                Get Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest job search activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex flex-col space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{activity.activity}</p>
                    <p className="text-muted-foreground text-sm">{activity.date}</p>
                  </div>
                  {i < recentActivity.length - 1 && <Separator className="my-1" />}
                </div>
              ))}
              <Button variant="outline" className="mt-2 w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
