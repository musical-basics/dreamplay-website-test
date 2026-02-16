'use server';

import { headers } from "next/headers";
import { Resend } from 'resend';

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
        const headerStore = await headers();
        const city = headerStore.get("x-vercel-ip-city") || "Unknown";
        const country = headerStore.get("x-vercel-ip-country") || "Unknown";
        const ip = headerStore.get("x-forwarded-for") || "Unknown";

        const apiPayload = {
            ...payload,
            city,
            country,
            ip_address: ip
        };

        const response = await fetch("https://email.dreamplaypianos.com/api/webhooks/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(apiPayload)
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

        // Send welcome email with Hand-Measuring Guide via Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey) {
            try {
                const resend = new Resend(resendApiKey);
                await resend.emails.send({
                    from: 'DreamPlay <noreply@updates.dreamplaypianos.com>',
                    to: payload.email,
                    subject: 'Here is your Hand-Measuring Guide 🎹',
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                            <h1>Welcome to DreamPlay!</h1>
                            <p>As promised, here is your printable guide to figuring out exactly what piano size fits your biology.</p>
                            
                            <div style="background-color: #f4f4f4; padding: 30px; border-radius: 8px; text-align: center; margin: 30px 0;">
                                <a href="https://www.dropbox.com/scl/fi/9b72rbi4ga0pjterxyoan/DreamPlay-Infographic.pdf?rlkey=mc08i1ahn5tp3thdd0qjnag2d&st=olbh1t9w&dl=1" 
                                   style="background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">
                                   Download PDF Guide
                                </a>
                            </div>

                            <p><strong>A surprise bonus for you...</strong></p>
                            <p>Because you're taking the first step toward pain-free playing, use the secret code <strong>WELCOME5</strong> at checkout to get an extra discount on top of the pre-order pricing.</p>

                            <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
                            
                            <p style="font-size: 12px; color: #666;">
                                If this wasn't you who signed up, you can ignore this email or unsubscribe below.
                            </p>
                        </div>
                    `,
                });
                console.log("Welcome email sent to:", payload.email);
            } catch (emailError) {
                console.error('Failed to send welcome email:', emailError);
            }
        }

        return { success: true, id: data.id };

    } catch (error: any) {
        console.error('Server Action subscription error:', error);
        return { success: false, error: error.message || "Internal server error" };
    }
}
