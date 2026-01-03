export function ProductShowcase() {
  return (
    <section className="py-20 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-cyan-400 uppercase tracking-wider text-sm mb-2">Introducing the Sizes</p>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-balance">Find Your Perfect Fit.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* DS5.5 */}
          <div className="bg-neutral-800 rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold">5.5</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Piano DS5.5</h3>
            <p className="text-neutral-400">Perfect for handspans under 7.6 inches.</p>
          </div>

          {/* DS6.0 */}
          <div className="bg-neutral-800 rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-900">
              <span className="text-2xl font-bold">6.0</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Piano DS6.0</h3>
            <p className="text-neutral-400">Perfect for handspans between 7.6–8.5 inches.</p>
          </div>
        </div>

        {/* Did you know section */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-white rounded-[100px] overflow-hidden">
            <img src="/hands-playing-piano-keys-close-up-elegant-artistic.jpg" alt="Hands playing piano" className="w-full h-64 object-cover" />
            <div className="p-8 text-center text-neutral-900">
              <h3 className="text-2xl font-bold mb-4">Did you know?</h3>
              <p className="text-neutral-600 max-w-md mx-auto">
                Traditional pianos are designed for handspans of 8.5 inches or more, leaving behind most women and
                nearly a third of men.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
