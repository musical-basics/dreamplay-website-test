import CustomizeClient from './OldCustomizeClient'
import { getCustomizePageUrls } from '@/actions/admin-actions'

export const dynamic = 'force-dynamic'

export default async function OldCustomizePage() {
    const urls = await getCustomizePageUrls()
    return <CustomizeClient urls={urls} />
}
