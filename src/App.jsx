import { useCallback, useState } from 'react'
import Background from './components/Background.jsx'
import Welcome from './pages/Welcome.jsx'
import TimeCheck from './pages/TimeCheck.jsx'
import Surprise from './pages/Surprise.jsx'

export default function App() {
  const [page, setPage] = useState('welcome')
  const unlock = useCallback(() => setPage('surprise'), [])
  return (
    <>
      {/* Background lives outside the pages, so it never restarts between them */}
      <Background grand={page === 'surprise'} />
      <main className="relative z-10 flex h-full items-center justify-center overflow-y-auto px-3 pb-36 pt-6">
        {page === 'welcome' && <Welcome key="w" onYes={() => setPage('surprise')} />}
        {page === 'time' && <TimeCheck key="t" onMidnight={unlock} />}
        {page === 'surprise' && <Surprise key="s" />}
      </main>
    </>
  )
}
