function ErrorMessage({ message }) {
  return (
    <div className="mt-6 rounded-[1.4rem] border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-200 shadow-lg shadow-rose-950/20">
      <div className="flex items-start gap-3">
        <span className="text-xl">⚠️</span>
        <div>
          <p className="font-semibold">Analysis Failed</p>
          <p className="mt-1">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage
