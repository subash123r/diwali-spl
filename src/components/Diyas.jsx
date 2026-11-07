function Diya({ size = 70, delay = 0, className = '' }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size * 0.9 }}>
      <div className="halo absolute left-1/2 -translate-x-1/2 rounded-full" style={{ bottom: size * 0.3, width: size * 1.8, height: size * 1.8, marginBottom: -size * 0.5, background: 'radial-gradient(circle, rgba(255,170,50,.55), rgba(255,120,20,.15) 45%, transparent 70%)', animationDelay: `${delay}s` }} />
      <svg viewBox="0 0 100 90" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="clay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9953a" /><stop offset=".6" stopColor="#a8501a" /><stop offset="1" stopColor="#4a1f08" /></linearGradient>
          <radialGradient id="fl" cx=".5" cy=".75" r=".7"><stop offset="0" stopColor="#fff8d6" /><stop offset=".35" stopColor="#ffd24a" /><stop offset=".75" stopColor="#ff8a1c" /><stop offset="1" stopColor="#ff4d00" stopOpacity=".1" /></radialGradient>
        </defs>
        <path d="M6 52 Q50 36 94 52 Q88 86 50 88 Q12 86 6 52Z" fill="url(#clay)" />
        <ellipse cx="50" cy="52" rx="44" ry="9" fill="#5b2606" />
        <ellipse cx="50" cy="52" rx="38" ry="6" fill="#ffb64a" opacity=".55" />
        <path d="M12 58 Q50 70 88 58" stroke="#ffd58a" strokeWidth="1.5" fill="none" opacity=".5" />
        <g className="flame" style={{ '--f': `${0.7 + delay * 0.15}s`, animationDelay: `${delay}s` }}>
          <path d="M50 8 C62 24 66 36 50 52 C34 36 38 24 50 8Z" fill="url(#fl)" style={{ filter: 'drop-shadow(0 0 8px #ffa733)' }} />
          <path d="M50 28 C55 36 55 43 50 50 C45 43 45 36 50 28Z" fill="#fffbe6" opacity=".9" />
        </g>
      </svg>
    </div>
  )
}

export default function Diyas() {
  return (
    <div className="flex items-end justify-around px-2 pb-3 sm:px-10">
      <Diya size={56} delay={0.1} className="hidden sm:block" />
      <Diya size={70} delay={0.5} />
      <Diya size={90} delay={0.3} />
      <Diya size={110} delay={0.8} className="hidden sm:block" />
      <Diya size={90} delay={0.2} />
      <Diya size={70} delay={0.6} />
      <Diya size={56} delay={0.4} className="hidden sm:block" />
    </div>
  )
}
