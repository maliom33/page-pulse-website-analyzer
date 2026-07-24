function AnalysisForm({ url, onUrlChange, onAnalyze, loading }) {
  return (
    <section className="mt-8 rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/30 backdrop-blur sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <label className="flex-1">
          <span className="mb-2 block text-sm font-medium text-slate-300">Website URL</span>
          <input
            type="text"
            value={url}
            onChange={(event) => onUrlChange(event.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-400"
          />
        </label>
        <button
          type="button"
          onClick={onAnalyze}
          disabled={loading}
          className="inline-flex min-w-[180px] items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center gap-3">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Analyzing website...
            </span>
          ) : (
            'Analyze Page'
          )}
        </button>
      </div>
      {loading ? (
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
            <span>Progress</span>
            <span>Working...</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-2 w-full animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default AnalysisForm
