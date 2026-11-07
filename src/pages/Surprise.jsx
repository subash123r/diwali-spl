export default function Surprise() {
  return (
    <div className="mx-auto w-[min(94vw,44rem)] px-2 text-center">
      <svg viewBox="0 0 24 24" className="beat mx-auto mb-4 h-12 w-12 sm:h-16 sm:w-16" style={{ filter: 'drop-shadow(0 0 14px #ff5c8a)' }}>
        <path fill="#ff5c8a" d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" />
      </svg>
      <h1 className="title-glow gold-text font-display text-[clamp(2.2rem,10vw,5.5rem)] font-black leading-tight">HAPPY DIWALI! ❤️</h1>
      <div className="panel page-in mt-8 rounded-3xl px-6 py-8 sm:px-10" style={{ animationDelay: '1.2s' }}>
        <p className="text-xl font-medium leading-relaxed text-amber-50 sm:text-2xl">
         Wishing you a Diwali as beautiful and glowing as your smile. 💫 You’re my reason to celebrate every day — but tonight, you’re my favorite light of all. 🪔❤️
        </p>
        <p className="mt-4 text-xl italic leading-relaxed text-amber-100 sm:text-2xl">
           Happy Diwali, my love.
           <br />
           Happy Diwali, BROWNIE! ❤️✨
        </p>
      </div>
    </div>
  )
}
