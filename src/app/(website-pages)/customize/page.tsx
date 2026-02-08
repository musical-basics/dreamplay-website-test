import CustomizeClient from './CustomizeClient'
import { getCustomizePageUrls } from '@/actions/admin-actions'

export const dynamic = 'force-dynamic'

export default async function CustomizePage() {
    // Fetch dynamic URLs from admin settings
    const urls = await getCustomizePageUrls()

    return <CustomizeClient urls={urls} />
}
