function HeroSection() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur sm:p-10 lg:p-14">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
            Website Analyzer • Live mock insights
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Page Pulse
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
            Analyze any webpage instantly and receive SEO and technical insights.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">SEO audit</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Performance scan</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Accessibility checks</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-violet-500/20 p-6">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Snapshot</span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-emerald-300">
              Healthy
            </span>
          </div>
          <div className="mt-8 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                <span>SEO Score</span>
                <span className="font-semibold text-white">92/100</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                <span>Technical Health</span>
                <span className="font-semibold text-white">89/100</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div className="h-2 w-[89%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
