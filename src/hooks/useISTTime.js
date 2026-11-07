import { useEffect, useRef, useState } from 'react'

const IST_MS = 5.5 * 3600 * 1000
const DAY = 86400000

// Trusted server time sources, tried in order. Each returns UTC epoch ms.
const SOURCES = [
  async () => {
    const j = await (await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata', { cache: 'no-store' })).json()
    return new Date(j.utc_datetime).getTime()
  },
  async () => {
    const j = await (await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata', { cache: 'no-store' })).json()
    return new Date(j.dateTime.slice(0, 23) + 'Z').getTime() - IST_MS // dateTime is IST wall-clock
  },
  async () => {
    const r = await fetch(location.href, { method: 'HEAD', cache: 'no-store' }) // HTTP Date header of our own server
    return new Date(r.headers.get('date')).getTime()
  },
]

async function fetchServerTime() {
  for (const src of SOURCES) {
    try {
      const t0 = performance.now()
      const ms = await src()
      if (!Number.isFinite(ms)) continue
      return ms + (performance.now() - t0) / 2 // compensate network latency
    } catch { /* try next source */ }
  }
  return null
}

/**
 * Server-verified IST clock. After each sync we only advance with performance.now()
 * (monotonic), so changing the device clock/timezone has no effect.
 */
export default function useISTTime() {
  const anchor = useRef(null)
  const [state, setState] = useState({ status: 'loading', ms: 0 })

  useEffect(() => {
    let alive = true
    const sync = async () => {
      const server = await fetchServerTime()
      if (!alive) return
      if (server !== null) anchor.current = { server, perf: performance.now() }
      else if (!anchor.current) setState({ status: 'error', ms: 0 })
    }
    sync()
    const resync = setInterval(sync, 5 * 60 * 1000)
    const tick = setInterval(() => {
      const a = anchor.current
      if (a) setState({ status: 'ok', ms: a.server + (performance.now() - a.perf) })
    }, 200)
    return () => { alive = false; clearInterval(resync); clearInterval(tick) }
  }, [])

  if (state.status !== 'ok') return { status: state.status }
  const d = new Date(state.ms + IST_MS)
  const h = d.getUTCHours()
  return {
    status: 'ok',
    h, m: d.getUTCMinutes(), s: d.getUTCSeconds(),
    msToMidnight: DAY - ((state.ms + IST_MS) % DAY),
    isMidnightHour: h === 0, // 12:00 AM – 12:59 AM IST unlocks the surprise
  }
}
