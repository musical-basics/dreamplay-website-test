import {
  Timer, CircleDot, Music, Radio,
  Cpu, Volume2, Monitor, PianoIcon,
  Headphones, LayoutGrid, Bluetooth, Lightbulb
} from "lucide-react"

const features = [
  { icon: Timer, label: "Built-in Metronome" },
  { icon: CircleDot, label: "Recording & Playback" },
  { icon: Music, label: "256-note Polyphony" },
  { icon: Radio, label: "Dual-Sensor Velocity Keys" },
  { icon: Cpu, label: "MIDI Sequencing" },
  { icon: Volume2, label: "18 Essential Presets" },
  { icon: Monitor, label: "Backlit LCD Screen" },
  { icon: PianoIcon, label: "Grand Piano Sound" },
  { icon: Headphones, label: "High-fidelity Speakers and Headphone Audio" },
  { icon: LayoutGrid, label: "88 Graded, Weighted Keys" },
  { icon: Bluetooth, label: "Bluetooth Connectivity" },
  { icon: Lightbulb, label: "LED Lighting For Every Key" },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 lg:py-32">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-3xl leading-tight text-white md:text-4xl lg:text-5xl text-balance">
            Everything You Need, Built In
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-y-12 gap-x-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col items-center gap-4 text-center"
            >
              <feature.icon
                className="h-8 w-8 text-white"
                strokeWidth={1.5}
              />
              <p className="font-sans text-sm font-semibold text-white/90 md:text-base max-w-[180px]">
                {feature.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
