import { useEffect } from 'react'
import useISTTime from '../hooks/useISTTime.js'

const pad = (n) => String(n).padStart(2, '0')

export default function TimeCheck({ onMidnight }) {
  const t = useISTTime()
useEffect(() => {
  if (t.status !== 'ok') return

  // Today 6:00 PM IST onwards unlock
  if (t.h >= 10) {
    onMidnight()
  }
}, [t.status, t.h, onMidnight])
  const h12 = t.status === 'ok' ? (t.h % 12 || 12) : 0
  const cd = t.status === 'ok' ? Math.ceil(t.msToMidnight / 1000) : 0

  return (
    <div className="page-in panel mx-auto w-[min(94vw,40rem)] rounded-3xl px-5 py-9 text-center sm:px-10">
      <p className="text-lg font-semibold text-amber-200 sm:text-xl">Indian Standard Time (verified by server)</p>
      {t.status === 'loading' && <p className="glow-digits mt-6 text-2xl">Syncing with time server…</p>}
      {t.status === 'error' && <p className="mt-6 text-xl text-rose-200">Couldn't reach a time server. Check your internet connection and keep this page open. It will retry automatically.</p>}
      {t.status === 'ok' && (
        <>
          <div className="glow-digits mt-4 text-[clamp(2.2rem,10vw,4.6rem)] font-extrabold tabular-nums">
            {pad(h12)}:{pad(t.m)}:{pad(t.s)} <span className="text-[.4em]">{t.h < 12 ? 'AM' : 'PM'}</span>
          </div>
          <p className="mt-8 text-lg text-amber-100 sm:text-xl">Time left for midnight</p>
          <div className="glow-digits mt-1 text-[clamp(1.6rem,7vw,2.8rem)] tabular-nums">
            {pad(Math.floor(cd / 3600))}:{pad(Math.floor((cd % 3600) / 60))}:{pad(cd % 60)}
          </div>
          <p className="gold-text mt-8 font-display text-xl font-black sm:text-3xl">PO PO! 😂 12:00 ku va di kedi! ❤️</p>
        </>
      )}
    </div>
  )
}
