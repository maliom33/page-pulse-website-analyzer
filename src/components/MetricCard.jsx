function MetricCard({ label, value, detail, accent, icon }) {
  return (
    <div className="group rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/20 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/30">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className={`mt-3 text-3xl font-semibold ${accent}`}>{value}</p>
        </div>
        <div className={`rounded-2xl border border-white/10 bg-white/5 p-3 text-xl ${accent}`}>{icon}</div>
      </div>
      <p className="mt-3 text-sm text-slate-400">{detail}</p>
    </div>
  )
}

export default MetricCard
