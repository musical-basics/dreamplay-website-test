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
            first_name: payload.first_name || "",
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
            let errorMessage = "Failed to subscribe";
            try {
                const errorData = await response.json();

                // If the error is "email already exists", treat as success
                // so the user still gets their PDF
                if (response.status === 400 || response.status === 422) {
                    console.log("Subscriber likely already exists, proceeding anyway.");
                    return { success: true };
                }

                if (errorData.error) errorMessage = errorData.error;
            } catch (e) {
                // failed to parse json
            }
            console.error('Subscription API error:', response.status, errorMessage);
            return { success: false, error: errorMessage };
        }

        const data = await response.json();

        // Send welcome email via Resend based on the Tag
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey) {
            try {
                const resend = new Resend(resendApiKey);

                const isShippingLead = apiPayload.tags?.includes("Free Shipping Lead");

                const emailSubject = isShippingLead
                    ? "Your Free Shipping Code is inside 🎹"
                    : "Here is your Hand-Measuring Guide 🎹";

                const emailHtml = isShippingLead
                    ? `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
                            <h1 style="font-family: serif;">Welcome to DreamPlay.</h1>
                            <p>Thank you for joining the VIP list. As promised, here is your code for Free Worldwide Shipping on the DreamPlay One:</p>
                            
                            <div style="background-color: #f5f5f5; border: 1px solid #e5e5e5; padding: 30px; text-align: center; margin: 30px 0;">
                                <span style="font-family: monospace; font-size: 24px; font-weight: bold; letter-spacing: 2px;">VIP-SHIP-FREE</span>
                            </div>

                            <p>Just enter this code at checkout when you configure your piano.</p>
                            <p>Best,<br>Lionel</p>
                            <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
                            <p style="font-size: 12px; color: #666;">If you didn't request this, you can unsubscribe below.</p>
                        </div>
                    `
                    : `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
                            <h1 style="font-family: serif;">Welcome to DreamPlay!</h1>
                            <p>As promised, here is your printable guide to figuring out exactly what piano size fits your biology.</p>
                            
                            <div style="background-color: #f4f4f4; padding: 30px; border-radius: 4px; text-align: center; margin: 30px 0;">
                                <a href="https://www.dropbox.com/scl/fi/9b72rbi4ga0pjterxyoan/DreamPlay-Infographic.pdf?rlkey=mc08i1ahn5tp3thdd0qjnag2d&st=olbh1t9w&dl=1" 
                                   style="background-color: #050505; color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; display: inline-block;">
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
                    `;

                await resend.emails.send({
                    from: 'DreamPlay <noreply@updates.dreamplaypianos.com>',
                    to: payload.email,
                    subject: emailSubject,
                    html: emailHtml,
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
