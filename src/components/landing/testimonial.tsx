export function Testimonial() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <blockquote className="mx-auto max-w-3xl text-center">
          <p className="text-xl font-medium italic">
            &ldquo;After months of sending applications with no response, I tried ColdAI Connect.
            Within two weeks, I had interviews at three companies I was excited about, and landed my
            dream job at a tech startup!&rdquo;
          </p>
          <footer className="mt-4">
            <p className="font-semibold">Sarah J.</p>
            <p className="text-muted-foreground text-sm">Senior Product Designer</p>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
