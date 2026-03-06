import {
  Music, Disc, AudioLines, Radio,
  Piano, Volume2, Monitor, CloudSun,
  Headphones, LayoutGrid, Bluetooth, Lightbulb
} from "lucide-react"

const features = [
  { icon: Music, label: "Built-in Metronome" },
  { icon: Disc, label: "Recording & Playback" },
  { icon: AudioLines, label: "192-note Polyphony" },
  { icon: Radio, label: "Dual-Sensor Velocity Keys" },
  { icon: Piano, label: "MIDI Sequencing" },
  { icon: Volume2, label: "18 Essential Presets" },
  { icon: Monitor, label: "Backlit LCD Screen" },
  { icon: CloudSun, label: "Grand Piano Sound" },
  { icon: Headphones, label: "Hi-Fi Speakers & Audio" },
  { icon: LayoutGrid, label: "88 Weighted Keys" },
  { icon: Bluetooth, label: "Bluetooth Connectivity" },
  { icon: Lightbulb, label: "LED Lighting For Every Key" },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-white/40">
            Professional Grade
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl lg:text-5xl text-balance">
            All the Features You Need
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 md:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col items-center gap-3 text-center"
            >
              <feature.icon
                className="h-7 w-7 text-white/60"
                strokeWidth={1.2}
              />
              <p className="font-sans text-sm font-medium text-white/70 md:text-base">
                {feature.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
