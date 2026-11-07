# Diwali Midnight Surprise
npm install && npm run dev

Time comes from worldtimeapi.org (fallbacks: timeapi.io, your server's HTTP Date header), then advances with a monotonic clock, so changing the device clock has no effect.
The surprise unlocks automatically at 12:00 AM IST and stays unlocked until 12:59 AM.
To test, temporarily change `h === 0` in src/hooks/useISTTime.js to the current IST hour.
