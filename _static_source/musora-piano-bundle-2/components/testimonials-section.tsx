import { Quote } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-cyan-500 uppercase tracking-wider text-sm mb-2">Why We're Doing This</p>
          <h2 className="text-3xl md:text-5xl font-black text-neutral-900 text-balance">
            Playing the piano
            <br />
            doesn't have to hurt
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-neutral-50 rounded-2xl p-8">
              <Quote className="w-10 h-10 text-cyan-500 mb-4" />
              <p className="text-neutral-700 mb-6 leading-relaxed">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <img
                  src={`/professional-headshot.png?height=60&width=60&query=professional headshot ${testimonial.name}`}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-neutral-900">{testimonial.name}</p>
                  <p className="text-sm text-neutral-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    quote:
      "I often witness pianists place their hands for the first time on a keyboard that better suits their hand span. How often the pianist spontaneously bursts into tears. A lifetime of struggling with a seemingly insurmountable problem vanishes.",
    name: "Dr. Carol Leone",
    title: "Chair of Piano Studies, SMU Meadows School",
  },
  {
    quote:
      "My favorite story is from a piano performance major, who couldn't believe that playing the piano didn't have to hurt. She had been preparing to change over to harpsichord due to keyboard size issues.",
    name: "Kathryn-Ananda Owens",
    title: "Professor of Music - Piano, St Olaf College",
  },
  {
    quote:
      "I can play for much longer and continue to play every day. I don't get frustrated from the pain and from being limited in my playing.",
    name: "Jen McCabe",
    title: "Pianist & Teacher, North Park, Chicago",
  },
]
