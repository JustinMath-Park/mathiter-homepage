export default function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-bg px-8 py-16 sm:px-16 sm:py-24 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-0">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Navigate Your Math Journey?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Join students from international schools who are already learning
              smarter with AI-powered personalized math education.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <a
                href="https://app.mathiter.com"
                className="bg-white text-primary font-semibold px-8 py-3.5 rounded-full text-base hover:bg-gray-50 transition-colors shadow-lg"
              >
                Start Free Trial
              </a>
              <a
                href="mailto:contact@mathiter.com"
                className="border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-full text-base hover:border-white/60 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
