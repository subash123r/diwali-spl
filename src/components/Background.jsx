import { useEffect, useMemo, useRef } from 'react'
import Diyas from './Diyas.jsx'

const COLORS = [[255, 214, 120], [255, 176, 56], [255, 120, 150], [255, 240, 205], [190, 150, 255]]
const rnd = (a, b) => a + Math.random() * (b - a)

function Fireworks({ grand }) {
  const ref = useRef(null)
  const grandRef = useRef(grand)
  useEffect(() => { grandRef.current = grand }, [grand])

  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w, h, raf, last = performance.now(), timer = 0
    const rockets = [], parts = []
    const resize = () => { w = innerWidth; h = innerHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    resize(); addEventListener('resize', resize)

    const explode = (x, y, heart) => {
      const base = grandRef.current && Math.random() < 0.6 ? COLORS[1] : COLORS[(Math.random() * COLORS.length) | 0]
      const scale = Math.min(w, h) * (heart ? 0.0085 : 0.0042) * rnd(0.8, 1.2)
      const n = heart ? 110 : (w < 600 ? 70 : 110)
      for (let i = 0; i < n; i++) {
        let vx, vy
        if (heart) {
          const t = (i / n) * Math.PI * 2
          vx = 16 * Math.sin(t) ** 3
          vy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
          vx *= scale * 7; vy *= scale * 7
        } else {
          const a = Math.random() * Math.PI * 2, sp = rnd(0.4, 1) * scale * 95
          vx = Math.cos(a) * sp; vy = Math.sin(a) * sp
        }
        parts.push({ x, y, vx, vy, life: 0, max: rnd(1.4, 2.4), col: heart ? [255, 90, 130] : base, size: rnd(1.2, 2.4), grav: heart ? 40 : 90 })
      }
    }
    const launch = (heart) => {
      rockets.push({ x: rnd(w * 0.12, w * 0.88), y: h, vy: -rnd(h * 0.7, h * 0.95), ty: rnd(h * 0.12, h * 0.45), heart })
    }

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05); last = now
      timer -= dt
      if (timer <= 0) {
        const g = grandRef.current
        launch(Math.random() < (g ? 0.3 : 0.1)); if (g && Math.random() < 0.5) launch(false)
        timer = g ? rnd(0.3, 0.8) : rnd(1.4, 2.8)
      }
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        r.y += r.vy * dt; r.vy *= 0.985
        ctx.fillStyle = 'rgba(255,230,170,.95)'; ctx.beginPath(); ctx.arc(r.x, r.y, 2, 0, 7); ctx.fill()
        if (r.y <= r.ty || Math.abs(r.vy) < 60) { explode(r.x, r.y, r.heart); rockets.splice(i, 1) }
      }
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.life += dt
        if (p.life > p.max) { parts.splice(i, 1); continue }
        p.vx *= 0.975; p.vy = p.vy * 0.975 + p.grav * dt
        p.x += p.vx * dt; p.y += p.vy * dt
        const a = 1 - p.life / p.max
        ctx.fillStyle = `rgba(${p.col[0]},${p.col[1]},${p.col[2]},${a})`
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (0.5 + a * 0.5), 0, 7); ctx.fill()
      }
      if (parts.length > 1800) parts.splice(0, parts.length - 1800)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />
}

export default function Background({ grand }) {
  const root = useRef(null)
  const stars = useMemo(() => Array.from({ length: 110 }, () => ({ x: rnd(0, 100), y: rnd(0, 80), s: rnd(1, 2.4), d: rnd(2, 5), dl: rnd(0, 5) })), [])
  const dust = useMemo(() => Array.from({ length: 28 }, () => ({ x: rnd(0, 100), s: rnd(2, 5), d: rnd(14, 28), dl: rnd(-28, 0), dx: rnd(-60, 60) })), [])

  useEffect(() => { // subtle parallax from pointer
    const move = (e) => {
      root.current?.style.setProperty('--px', e.clientX / innerWidth - 0.5)
      root.current?.style.setProperty('--py', e.clientY / innerHeight - 0.5)
    }
    addEventListener('pointermove', move)
    return () => removeEventListener('pointermove', move)
  }, [])

  const layer = (k) => ({ transform: `translate(calc(var(--px, 0) * ${k}px), calc(var(--py, 0) * ${k}px))`, transition: 'transform .4s ease-out' })

  return (
    <div ref={root} className="sky fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -inset-10" style={layer(-14)}>
        {stars.map((s, i) => <span key={i} className="star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, '--d': `${s.d}s`, animationDelay: `${s.dl}s` }} />)}
      </div>
      <Fireworks grand={grand} />
      <div className="absolute inset-0" style={layer(-30)}>
        {dust.map((d, i) => <span key={i} className="dust" style={{ left: `${d.x}%`, width: d.s, height: d.s, '--d': `${d.d}s`, '--dx': `${d.dx}px`, animationDelay: `${d.dl}s` }} />)}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0" style={layer(18)}><Diyas /></div>
    </div>
  )
}
