'use server';

interface SubscribePayload {
    email: string;
    first_name?: string;
    tags?: string[];
}

interface SubscribeResponse {
    success: boolean;
    error?: string;
    id?: string;
}

export async function subscribeToNewsletter(payload: SubscribePayload): Promise<SubscribeResponse> {
    try {
        const response = await fetch("https://email.dreamplaypianos.com/api/webhooks/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            // Try to parse error message if available
            let errorMessage = "Failed to subscribe";
            try {
                const errorData = await response.json();
                if (errorData.error) errorMessage = errorData.error;
            } catch (e) {
                // Ignore json parse error
            }
            console.error('Subscription API error:', response.status, response.statusText);
            return { success: false, error: errorMessage };
        }

        const data = await response.json();
        return { success: true, id: data.id };

    } catch (error: any) {
        console.error('Server Action subscription error:', error);
        return { success: false, error: error.message || "Internal server error" };
    }
}
