import CustomizeClient from './CustomizeClient'
import { getCustomizePageUrls, getHiddenProducts } from '@/actions/admin-actions'

export const dynamic = 'force-dynamic'

export default async function CustomizePage() {
    const [urls, hiddenProducts] = await Promise.all([
        getCustomizePageUrls(),
        getHiddenProducts()
    ])

    return <CustomizeClient urls={urls} hiddenProducts={hiddenProducts} />
}
