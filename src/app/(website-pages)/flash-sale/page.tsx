import { Header } from "@/components/holiday-sale/header"
import { FlashSale } from "@/components/holiday-sale/flash-sale"

export const metadata = {
    title: "January Flash Sale | DreamPlay",
    description: "Exclusive limited time offer on DreamPlay One bundles.",
}

export default function FlashSalePage() {
    return (
        <main className="min-h-screen bg-neutral-950">
            <Header />
            <FlashSale />
        </main>
    )
}
