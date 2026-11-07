import { useState } from 'react'

const NOS = [
  'Adhu epdi di NO nu solra? 😂 Click YES kutty ❤️',
  'NO button ku mela kovam varudhu... YES ah click pannu da 🙈',
  'Seri seri, nee thoongura mathiri nadikkira. Yes sollu ❤️',
  'Even the diyas are laughing at that NO 🪔😂',
  'Last chance! YES nu sollu, illa naan fireworks ah cancel pannidven 😤❤️',
]

export default function Welcome({ onYes }) {
  const [i, setI] = useState(-1)
  const [k, setK] = useState(0)
  return (
    <div className="page-in panel mx-auto w-[min(92vw,34rem)] rounded-3xl px-6 py-10 text-center sm:px-10">
      <h1 className="gold-text font-display text-3xl font-black leading-tight sm:text-5xl">Hii! It's 12:00 ya? ❤️</h1>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <button className="btn btn-yes" onClick={onYes}>YES ❤️</button>
        <button key={k} className="btn btn-no shake" onClick={() => { setI((p) => (p + 1) % NOS.length); setK((x) => x + 1) }}>NO 🙈</button>
      </div>
      <p aria-live="polite" className="mt-7 min-h-[3.5rem] text-xl font-semibold italic text-amber-100 sm:text-2xl">{i >= 0 && NOS[i]}</p>
    </div>
  )
}
