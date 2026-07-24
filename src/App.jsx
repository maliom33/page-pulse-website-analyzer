import { useState } from 'react'
import HeroSection from './components/HeroSection'
import AnalysisForm from './components/AnalysisForm'
import ResultsDashboard from './components/ResultsDashboard'
import ErrorMessage from './components/ErrorMessage'
import { analyzeWebsite } from './services/api'

function App() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      setError('Please enter a website URL to analyze.')
      setResult(null)
      return
    }

    setError('')
    setLoading(true)

    try {
      const response = await analyzeWebsite(trimmedUrl)
      setResult(response)
    } catch (requestError) {
      setResult(null)
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_32%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <HeroSection />

        <AnalysisForm
          url={url}
          onUrlChange={setUrl}
          onAnalyze={handleAnalyze}
          loading={loading}
        />

        {error ? <ErrorMessage message={error} /> : null}

        {result ? <ResultsDashboard result={result} /> : null}
      </main>

      <footer className="border-t border-white/10 bg-slate-950/60 py-6 text-center text-sm text-slate-400">
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-cyan-300 transition hover:text-cyan-200"
        >
          Built for Digital Heroes Training Task
        </a>
      </footer>
    </div>
  )
}

export default App
