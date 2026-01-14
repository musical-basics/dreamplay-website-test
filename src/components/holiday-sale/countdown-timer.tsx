"use client"

import { useEffect, useState } from "react"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 4,
    minutes: 59,
    seconds: 46,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev
        if (seconds > 0) seconds--
        else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
          seconds = 59
        }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <section className="flex-shrink-0 bg-brand text-brand-foreground py-3">
      <div className="flex items-center justify-center gap-4 text-center">
        <span className="text-sm font-medium tracking-wide mr-2">Sale Ends:</span>
        <div>
          <span className="text-2xl font-semibold tabular-nums">{pad(timeLeft.days)}</span>
          <span className="block text-[10px] uppercase tracking-wider opacity-70">Days</span>
        </div>
        <span className="text-xl opacity-40">:</span>
        <div>
          <span className="text-2xl font-semibold tabular-nums">{pad(timeLeft.hours)}</span>
          <span className="block text-[10px] uppercase tracking-wider opacity-70">Hours</span>
        </div>
        <span className="text-xl opacity-40">:</span>
        <div>
          <span className="text-2xl font-semibold tabular-nums">{pad(timeLeft.minutes)}</span>
          <span className="block text-[10px] uppercase tracking-wider opacity-70">Min</span>
        </div>
        <span className="text-xl opacity-40">:</span>
        <div>
          <span className="text-2xl font-semibold tabular-nums">{pad(timeLeft.seconds)}</span>
          <span className="block text-[10px] uppercase tracking-wider opacity-70">Sec</span>
        </div>
      </div>
    </section>
  )
}
