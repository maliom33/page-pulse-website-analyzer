import MetricCard from './MetricCard'

function ResultsDashboard({ result }) {
  const badgeTone = result.statusType === 'success'
    ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
    : result.statusType === 'warning'
      ? 'border-amber-400/30 bg-amber-400/10 text-amber-300'
      : 'border-rose-400/30 bg-rose-400/10 text-rose-300'

  const insights = [
    result.status === 200
      ? '✅ Website is reachable.'
      : '⚠ The server returned a non-success status.',
    result.metaDescription
      ? '✅ Meta description found.'
      : '⚠ No meta description found.',
    result.h1Count > 0
      ? `✅ ${result.h1Count} H1 heading${result.h1Count > 1 ? 's' : ''} detected.`
      : '⚠ No H1 heading detected.',
    result.missingAltImages === 0
      ? '✅ All images contain alt attributes.'
      : `⚠ ${result.missingAltImages} image${result.missingAltImages > 1 ? 's are' : ' is'} missing alt text.`,
    `📄 Approximate word count: ${result.wordCount}.`,
    `⚡ Response time: ${result.responseTime}.`,
  ]

  return (
    <section className="mt-8 animate-[fadeIn_0.5s_ease-out] space-y-6">
      <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30 backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Analysis result</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{result.title || 'Untitled Page'}</h2>
            <p className="mt-2 text-slate-300">Website analysis completed successfully using the backend response.</p>
          </div>
          <div className={`rounded-2xl border px-4 py-3 text-sm font-medium ${badgeTone}`}>
            {result.badgeLabel}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="HTTP Status" value={result.statusText} detail="Server response code" accent="text-cyan-300" icon="🌐" />
        <MetricCard label="Response Time" value={result.responseTime} detail="Request latency" accent="text-violet-300" icon="⚡" />
        <MetricCard label="Word Count" value={`${result.wordCount} Words`} detail="Approximate visible text" accent="text-emerald-300" icon="📄" />
        <MetricCard label="Images Missing Alt" value={`${result.missingAltImages} Images`} detail="Accessibility check" accent="text-amber-300" icon="🖼️" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30">
          <h3 className="text-xl font-semibold text-white">Technical Details</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-slate-400">Page Title</p>
              <p className="mt-1 font-medium text-white">{result.title || 'Untitled Page'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-slate-400">Meta Description</p>
              <p className="mt-1 font-medium text-white">{result.metaDescription || 'No meta description found.'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-slate-400">H1 Count</p>
              <p className="mt-1 font-medium text-white">{result.h1Count}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30">
          <h3 className="text-xl font-semibold text-white">Key Insights</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {insights.map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ResultsDashboard
