
export interface ABTestStats {
    bucket: string
    visitors: number
    clicks: number
    avgTime: number
}

const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID
const POSTHOG_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

export async function getABTestStats(): Promise<ABTestStats[]> {
    if (!POSTHOG_PROJECT_ID || !POSTHOG_API_KEY) {
        console.warn("Missing PostHog server credentials")
        return []
    }

    const query = `
    select
      properties.ab_test_bucket as bucket,
      count(distinct distinct_id) as visitors,
      countIf(event = 'cta_click') as clicks,
      avgIf(toFloat(properties.duration_seconds), event = 'time_on_page') as avgTime
    from events
    where event in ('time_on_page', 'cta_click')
    and properties.ab_test_bucket is not null
    group by bucket
    order by bucket
  `

    try {
        const res = await fetch(`${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${POSTHOG_API_KEY}`,
            },
            body: JSON.stringify({
                query: {
                    kind: "HogQLQuery",
                    query: query,
                },
            }),
            cache: "no-store", // Real-time data
        })

        if (!res.ok) {
            const errorText = await res.text()
            console.error("PostHog API Error:", errorText)
            throw new Error(`PostHog API Error: ${res.statusText}`)
        }

        const json = await res.json()
        // HogQL returns { results: [[col1, col2...], ...], columns: ... }
        const results = json.results || []

        return results.map((row: any[]) => ({
            bucket: row[0] || 'unknown',
            visitors: Number(row[1]) || 0,
            clicks: Number(row[2]) || 0,
            avgTime: Number(row[3]) || 0,
        }))

    } catch (error) {
        console.error("Failed to fetch analytics:", error)
        return []
    }
}
