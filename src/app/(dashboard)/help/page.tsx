'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronRight,
  ExternalLink,
  FileText,
  Mail,
  MessageSquare,
  Search,
  ThumbsUp,
  User,
  Video,
} from 'lucide-react';

export default function HelpPage() {
  // Dummy data for the help center
  const faqs = [
    {
      id: 'faq-1',
      question: 'How do I create a resume on JobHunt?',
      answer:
        'Navigate to the Profile section and click on "Create Resume". You can either upload an existing resume or use our AI-powered resume builder to create one from scratch. Simply fill in your details and our system will format it professionally.',
    },
    {
      id: 'faq-2',
      question: 'How does the AI job matching work?',
      answer:
        'Our AI system analyzes your resume, skills, experience, and preferences to find jobs that match your profile. We look at keywords, required skills, and company culture to suggest positions where you have the highest chance of success.',
    },
    {
      id: 'faq-3',
      question: 'Can I track my job applications?',
      answer:
        'Yes! All applications submitted through JobHunt are automatically tracked in your dashboard. For jobs you applied to elsewhere, you can manually add them to your Jobs page to keep all your applications organized in one place.',
    },
    {
      id: 'faq-4',
      question: 'What are job credits and how do I get more?',
      answer:
        'Job credits are used for premium features like AI resume reviews and automated applications. You receive a monthly allocation based on your subscription plan. Additional credits can be purchased from your account page.',
    },
    {
      id: 'faq-5',
      question: 'How do I prepare for interviews?',
      answer:
        'We offer AI-powered interview preparation tools. Navigate to the Jobs section, select an upcoming interview, and click "Prepare". You\'ll get personalized practice questions based on the job description and your experience.',
    },
  ];

  const guides = [
    {
      id: 'guide-1',
      title: 'Getting started with JobHunt',
      description: 'Learn the basics of using the platform',
      icon: <FileText className="text-primary h-6 w-6" />,
      link: '/help/guides/getting-started',
    },
    {
      id: 'guide-2',
      title: 'Creating an effective resume',
      description: 'Tips and templates for building a standout resume',
      icon: <FileText className="text-primary h-6 w-6" />,
      link: '/help/guides/resume-building',
    },
    {
      id: 'guide-3',
      title: 'Job search strategies',
      description: 'How to find and apply to the right positions',
      icon: <FileText className="text-primary h-6 w-6" />,
      link: '/help/guides/job-search',
    },
    {
      id: 'guide-4',
      title: 'Interview mastery',
      description: 'Prepare for and excel in job interviews',
      icon: <Video className="text-primary h-6 w-6" />,
      link: '/help/guides/interviews',
    },
    {
      id: 'guide-5',
      title: 'Using AI features effectively',
      description: "Get the most out of JobHunt's AI tools",
      icon: <FileText className="text-primary h-6 w-6" />,
      link: '/help/guides/ai-features',
    },
  ];

  const supportOptions = [
    {
      title: 'Email Support',
      description: 'Get help from our team within 24 hours',
      icon: <Mail className="text-primary h-8 w-8" />,
      action: 'Email Us',
      link: 'mailto:support@jobhunt.ai',
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support agents in real-time',
      icon: <MessageSquare className="text-primary h-8 w-8" />,
      action: 'Start Chat',
      link: '#chat',
    },
    {
      title: 'Community Forum',
      description: 'Join discussions with other job seekers',
      icon: <User className="text-primary h-8 w-8" />,
      action: 'Browse Forum',
      link: '/community',
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers to common questions and learn how to make the most of JobHunt
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-3 left-3 h-5 w-5" />
        <Input
          type="search"
          placeholder="Search for help articles..."
          className="h-12 pl-10 text-base"
        />
      </div>

      <Tabs defaultValue="faqs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="support">Get Support</TabsTrigger>
        </TabsList>

        {/* FAQs Tab */}
        <TabsContent value="faqs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions about using JobHunt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                      <div className="mt-2 flex items-center text-sm">
                        <Button variant="ghost" size="sm" className="h-auto p-0">
                          <ThumbsUp className="mr-1 h-3 w-3" />
                          <span>Helpful?</span>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guides Tab */}
        <TabsContent value="guides" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Helpful Guides</CardTitle>
              <CardDescription>
                In-depth guides to help you navigate your job search journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {guides.map((guide) => (
                  <Card key={guide.id} className="hover:bg-muted/50 cursor-pointer transition">
                    <CardContent className="flex items-start p-4">
                      <div className="mt-1 mr-4">{guide.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-medium">{guide.title}</h3>
                        <p className="text-muted-foreground text-sm">{guide.description}</p>
                        <Button variant="link" className="mt-1 h-auto p-0">
                          <span>Read Guide</span>
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Get Support</CardTitle>
              <CardDescription>Need more help? Contact our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {supportOptions.map((option, index) => (
                  <Card key={index} className="border-0 shadow-none">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <div className="bg-primary/10 mb-4 rounded-full p-3">{option.icon}</div>
                      <h3 className="mb-1 font-medium">{option.title}</h3>
                      <p className="text-muted-foreground mb-4 text-sm">{option.description}</p>
                      <Button asChild>
                        <a href={option.link} className="inline-flex items-center">
                          {option.action}
                          {option.link.startsWith('http') && (
                            <ExternalLink className="ml-1 h-3 w-3" />
                          )}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
