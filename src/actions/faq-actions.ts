'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const DEFAULT_FAQ_ITEMS: FAQItem[] = [
    {
        id: '1',
        question: "What does DS stand for?",
        answer: `<p class="p-regular text-gray">DS stands for the Donison-Steinbuhler Standard, which was created in 1991 to standardize alternative piano sizes. The DS5.5 and DS6.0 sizes are supported widely by piano competitions such as the Dallas International Competition and universities such as Stanford University, Johns Hopkins Peabody Institute, University of Wisconsin-Madison, University of Memphis, State University of Music (HDMK) in Stuttgart, Germany, and countless others. When purchasing a keyboard stamped with the “DS5.5” or “DS6.0” size, you can feel confident knowing your keyboard was manufactured to the exact precision dictated by the DS standard, and they can play on any DS5.5 or DS6.0 keyboard and have the same experience. <a href="/about-us/ds-standard" class="text-blue-500 underline hover:text-blue-600 transition-colors">Learn more about the DS Standard.</a> For more information: <a href="https://dsstandardfoundation.org/" target="_blank" rel="noopener noreferrer">https://dsstandardfoundation.org/</a></p>`
    },
    {
        id: '2',
        question: "Why not do more sizes such as DS5.7 or DS6.2?",
        answer: `<p class="p-regular text-gray">It comes down to one thing: <strong>compatibility.</strong> We don't want you to fall in love with a piano size at home that you can't find anywhere else.<br><br>We strictly build to the International DS standards (5.5 and 6.0) because these are the sizes being adopted by universities and concert halls. If we built a custom size like a 5.7, you’ll need more time to adjust if you had to perform onstage. <br><br>Plus, the data is clear: these two sizes solve the handspan issue for 87% of women and 24% of men. We’d rather build a tool that connects you to the wider music world than a niche instrument that isolates you. <br><br><a href="/about-us/ds-standard" class="text-blue-500 underline hover:text-blue-600 transition-colors">Learn more about the DS Standard.</a></p>`
    },
    {
        id: '3',
        question: "If I practice on this, will I lose my ability to play on a standard keyboard?",
        answer: `<p class="p-regular text-gray"><strong>It’s a natural fear, but the data suggests the opposite: <strong>playing on narrower keys often improves your technique on standard ones (DS6.5 conventional size)<br><br>When you practice on a size that fits your hand (like the DS6.0), you learn to play with less tension. That relaxation carries over when you switch back to a standard keyboard. Your fingers and hands develop smooth, seamless micro-adjustments that carry over to a standard keyboard - it's much easier to "rescale" <strong>proper technique</strong> developed from a smaller keyboard to a larger keyboard, than it is to "fix" <strong>broken technique</strong> from spending years practicing on a keyboard that is too large.<br><br><strong>The Real-World Proof:</strong> Our co-founder, Lionel Yu, practices on a DS6.0 but regularly performs on concert-sized Steinway & Yamaha grand pianos in venues like Carnegie Hall and the Barbican Center. He switches between them seamlessly.<br><br>Hubert Ness, Professor of Jazz Piano (HMDK Stuttgart), noted: <em>"Playing the DS6.0 had a positive effect when going back to the normal keyboard."</em><br><br><strong>See the switch in action:</strong><br><strong>Watch:</strong> [Pianist Linda Gould switching between all three sizes instantly] <a href="https://youtu.be/KkIz-uq5M_k" target="_blank" rel="noopener noreferrer">https://youtu.be/KkIz-uq5M_k</a> <br><strong>Watch:</strong> [Professor Carol Leone playing DS6.0 and DS6.5 back-to-back] <a href="https://youtu.be/fZRML4LOkoo" target="_blank" rel="noopener noreferrer">https://youtu.be/fZRML4LOkoo</a></p>`
    },
    {
        id: '4',
        question: "What's the advantage of reaching a 10th?",
        answer: `<div class="is-flex">
            <div class="faq-image-block">
                <img src="/images/Picture8_1.avif" alt="Hand span comparison" class="faq-image" />
            </div>
            <p class="p-regular text-gray">Being able to reach a 10th isn't just about playing 10ths. Most modern & classical composers avoided using 10ths or more because they knew that women and children would be playing their pieces, even if they could reach the intervals themselves.<br /><br />However, being able to reach a 10th means 9ths and octaves are also much easier. Similarly, the interval between fingers such as the thumb and index finger, or index & pinky, are also commonly used intervals within larger chords.</p>
            <div class="faq-image-block">
                <img src="/images/Picture1.avif" alt="Chord reach example" class="faq-image" />
            </div>
            <p class="p-regular text-gray">For example, the 5-note chord D-G-Bb-D-E has a total interval of a 9th, but pianists who can only reach a 9th will have a hard time playing this chord due to stretching the fingers for the inner notes. They might be able to play it, but only with much strain. With a DS6.0 keyboard, they will be able to play this chord with ease.</p>
        </div>`
    },
    {
        id: '5',
        question: "How does pre-ordering work?",
        answer: `<p class="p-regular text-gray">Reserve your keyboard by pre-ordering now. Your support helps us finish our prototype and start production. We’ll keep you updated, with shipping planned for June 2026. <a href="/information-and-policies/shipping" class="text-blue-500 underline hover:text-blue-600 transition-colors">Read our full Shipping & Refund Policy.</a></p>`
    },
    {
        id: '6',
        question: "Does it feel like a real piano?",
        answer: `<p class="p-regular text-gray">Yes! You’ll enjoy weighted, graded keys and a natural touch. Plus, the LED lights above each key make learning and performing more fun for everyone.</p>`
    }
];

export async function getFaqItems(): Promise<FAQItem[]> {
    try {
        const { data, error } = await supabase
            .from('admin_variables')
            .select('value')
            .eq('key', 'faq_items')
            .single()

        if (error || !data) {
            // If checking for existence error, return defaults
            return DEFAULT_FAQ_ITEMS
        }

        return JSON.parse(data.value)
    } catch (error) {
        console.error('Failed to get FAQ items:', error)
        return DEFAULT_FAQ_ITEMS
    }
}

export async function updateFaqItems(items: FAQItem[]) {
    try {
        const { error } = await supabase
            .from('admin_variables')
            .upsert({
                key: 'faq_items',
                value: JSON.stringify(items),
                updated_at: new Date().toISOString()
            })

        if (error) {
            console.error('Error updating FAQ items:', error)
            throw new Error(error.message)
        }

        return { success: true }
    } catch (error: any) {
        console.error('Failed to update FAQ items:', error)
        return { success: false, error: error.message }
    }
}
