"use client"

import Image from "next/image"

export function SizeVisualSection() {
    return (
        <section className="bg-white py-16 md:py-24">
            <style>{`
        .piano-section-v { font-family: 'Manrope', sans-serif; }
        .piano-title-v { font-size: 2rem; font-weight: 800; margin-bottom: 0.75rem; line-height: 1.1; }
        .piano-desc-v { font-size: 1.125rem; line-height: 1.6; font-weight: 500; white-space: pre-line; }
        .zone-label-v { font-size: 3rem; font-weight: 800; text-align: center; margin-top: 1.5rem; letter-spacing: -0.02em; }
        @media (min-width: 768px) { .zone-label-v { font-size: 3.75rem; } }
        .piano-card-v { border-radius: 1.5rem; padding: 2rem; display: flex; flex-direction: column; transition: all 0.3s ease-out; }
        .piano-card-v:hover { transform: scale(1.03) translateY(-8px); z-index: 50; }
        .theme-dark-v { background-color: #000000; color: #ffffff; }
        .theme-dark-v .piano-desc-v { color: #9ca3af; }
        .theme-dark-v:hover { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        .theme-light-v { background-color: #ffffff; color: #000000; border: 5px solid #000000; }
        .theme-light-v .piano-desc-v { color: #6b7280; }
        .theme-light-v:hover { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
        .img-container-v { width: 100%; aspect-ratio: 3/2; position: relative; overflow: hidden; }
        .img-container-v.piano-view-v { display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
        .img-container-v.hand-view-v { border-radius: 1rem; margin-top: auto; }
      `}</style>

            <div className="max-w-[1600px] mx-auto px-4 piano-section-v">
                <div className="text-center mb-12">
                    <p className="text-gray-500 text-sm tracking-wide mb-4 uppercase font-bold">Introducing the Sizes</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-balance tracking-tight">Find Your Perfect Fit.</h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    {/* DS5.5 + DS6.0 paired */}
                    <div className="flex flex-col md:flex-row flex-[2]">
                        {/* DS5.5 Card */}
                        <div className="flex-1 piano-card-v theme-dark-v md:rounded-r-none">
                            <div className="img-container-v piano-view-v">
                                <Image
                                    src="/images/DS5.5-white_1.png"
                                    alt="Piano DS5.5"
                                    width={500}
                                    height={333}
                                    className="object-contain max-h-full w-auto"
                                />
                            </div>
                            <div className="text-center mb-6">
                                <h3 className="piano-title-v">Piano DS5.5</h3>
                                <p className="piano-desc-v">Perfect for handspans under 7.6 inches.</p>
                            </div>
                            <div className="img-container-v hand-view-v">
                                <Image
                                    src="/images/Zone-A-Diagram.png"
                                    alt="Hand Zone A"
                                    width={904}
                                    height={603}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                            <p className="zone-label-v">Zone A</p>
                        </div>

                        {/* DS6.0 Card */}
                        <div className="flex-1 piano-card-v theme-light-v relative z-10 mt-4 md:mt-0 md:-ml-4 md:rounded-l-none">
                            <div className="img-container-v piano-view-v">
                                <Image
                                    src="/images/DS6.0-Black-2.png"
                                    alt="Piano DS6.0"
                                    width={612}
                                    height={408}
                                    className="object-contain max-h-full w-auto"
                                />
                            </div>
                            <div className="text-center mb-6">
                                <h3 className="piano-title-v">Piano DS6.0</h3>
                                <p className="piano-desc-v">Perfect for handspans between 7.6-8.5 inches.</p>
                            </div>
                            <div className="img-container-v hand-view-v">
                                <Image
                                    src="/images/Zone-B-DIagram.png"
                                    alt="Hand Zone B"
                                    width={901}
                                    height={601}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                            <p className="zone-label-v">Zone B</p>
                        </div>
                    </div>

                    {/* Standard Piano Card */}
                    <div className="flex-1">
                        <div className="piano-card-v theme-dark-v h-full">
                            <div className="img-container-v piano-view-v">
                                <Image
                                    src="/images/DS6.5-Black.png"
                                    alt="Standard Piano"
                                    width={500}
                                    height={333}
                                    className="object-contain max-h-full w-auto"
                                />
                            </div>
                            <div className="text-center mb-6">
                                <h3 className="piano-title-v">Standard Piano</h3>
                                <p className="piano-desc-v">Perfect for handspans over 8.5 inches.</p>
                            </div>
                            <div className="img-container-v hand-view-v">
                                <Image
                                    src="/images/Zone-C-Diagram.png"
                                    alt="Hand Zone C"
                                    width={904}
                                    height={603}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                            <p className="zone-label-v">Zone C</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex justify-center mt-12">
                    <a
                        href="https://www.dropbox.com/scl/fi/9b72rbi4ga0pjterxyoan/DreamPlay-Infographic.pdf?rlkey=mc08i1ahn5tp3thdd0qjnag2d&st=olbh1t9w&dl=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 border-2 border-black rounded-full px-8 py-4 font-semibold text-black hover:bg-black hover:text-white transition-colors duration-300"
                    >
                        Download Our Hand-Measuring Guide
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.0002 5.00391C12.0002 4.45162 11.5525 4.00391 11.0002 4.00391L1.00025 4.00391C0.44796 4.00391 0.000245026 4.45162 0.000245051 5.00391C0.000245075 5.55619 0.44796 6.00391 1.00025 6.00391L11.0002 6.00391C11.5525 6.00391 12.0002 5.55619 12.0002 5.00391Z" fill="currentColor" />
                            <path d="M17.3616 3.77448C18.2131 4.36865 18.2131 5.63135 17.3616 6.22552L12.3417 9.72824C11.3409 10.4266 10.0002 9.6933 10.0002 8.50272L10.0002 1.49728C10.0002 0.306709 11.3409 -0.426616 12.3417 0.271762L17.3616 3.77448Z" fill="currentColor" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
