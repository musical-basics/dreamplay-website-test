import { getHomepageVersion } from "@/actions/admin-actions"
import SpecialOfferPage from "@/components/special-offer/SpecialOfferPage"
import OldHomepageContent from "./(website-pages)/old-homepage/page"

export const dynamic = 'force-dynamic'

export default async function HomepageWrapper() {
    const version = await getHomepageVersion()

    if (version === "old") {
        return <OldHomepageContent />
    }

    return <SpecialOfferPage />
}
