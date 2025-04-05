import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQ() {
  return (
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does the AI create personalized emails?</AccordionTrigger>
              <AccordionContent>
                Our AI analyzes the recipient&apos;s professional background, company details, and
                your resume to craft messages that feel personal and contextually relevant. It
                highlights your most relevant skills and experiences for each specific contact.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is this better than applying through job boards?</AccordionTrigger>
              <AccordionContent>
                Yes. Cold outreach bypasses the typical application process where your resume might
                get filtered out by ATS systems. Our users see 3.5x more interviews compared to
                traditional job applications.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How many emails should I expect to send before getting interviews?
              </AccordionTrigger>
              <AccordionContent>
                Results vary by industry and seniority, but our data shows that most users secure
                their first interview after sending 25-35 personalized outreach emails. With our
                Professional plan, you&apos;ll have more than enough capacity to land multiple
                interviews.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I see examples of emails the AI creates?</AccordionTrigger>
              <AccordionContent>
                Absolutely! You can view sample emails in our gallery, or request a free demo where
                we&apos;ll create a personalized sample based on your resume and target companies.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I cancel my subscription anytime?</AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel your subscription at any time with no questions asked. We
                don&apos;t believe in long-term contracts or hidden fees.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
