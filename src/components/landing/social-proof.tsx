export function SocialProof() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold">Results That Speak</h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="bg-secondary flex flex-col items-center rounded-lg p-8 text-center">
            <span className="text-5xl font-bold">70%</span>
            <p className="text-muted-foreground mt-2">Response Rate</p>
          </div>
          <div className="bg-secondary flex flex-col items-center rounded-lg p-8 text-center">
            <span className="text-5xl font-bold">3.5x</span>
            <p className="text-muted-foreground mt-2">More Interviews</p>
          </div>
          <div className="bg-secondary flex flex-col items-center rounded-lg p-8 text-center">
            <span className="text-5xl font-bold">42</span>
            <p className="text-muted-foreground mt-2">Days to Job Offer (Avg.)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
