import {
  CTA,
  FAQ,
  Features,
  Footer,
  Header,
  Hero,
  Integrations,
  Pricing,
  SocialProof,
  Testimonial,
} from '@/components/landing';

export default function Home() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <SocialProof />
        <Pricing />
        <Integrations />
        <FAQ />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
