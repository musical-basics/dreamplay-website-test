import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // 1. Log to Supabase
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                process.env.SUPABASE_SERVICE_ROLE_KEY
            );

            const { error: dbError } = await supabase
                .from("contact_submissions")
                .insert({
                    name,
                    email,
                    subject,
                    message,
                    created_at: new Date().toISOString(),
                });

            if (dbError) {
                console.error("Supabase insert error:", dbError);
                // Don't fail the request — still try to send the email
            }
        }

        // 2. Send notification email to support via Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey) {
            const resend = new Resend(resendApiKey);

            try {
                await resend.emails.send({
                    from: "DreamPlay <noreply@updates.dreamplaypianos.com>",
                    to: "support@dreamplaypianos.com",
                    replyTo: email,
                    subject: `[Contact Form] ${subject} — from ${name}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="margin-bottom: 4px;">New Contact Form Submission</h2>
                            <p style="color: #666; font-size: 13px; margin-top: 0;">Received ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PT</p>
                            
                            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 10px 0; font-weight: bold; width: 100px; vertical-align: top;">Name</td>
                                    <td style="padding: 10px 0;">${name}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Email</td>
                                    <td style="padding: 10px 0;"><a href="mailto:${email}">${email}</a></td>
                                </tr>
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Subject</td>
                                    <td style="padding: 10px 0;">${subject}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Message</td>
                                    <td style="padding: 10px 0; white-space: pre-wrap;">${message}</td>
                                </tr>
                            </table>

                            <p style="font-size: 12px; color: #999; margin-top: 30px;">
                                You can reply directly to this email to respond to ${name}.
                            </p>
                        </div>
                    `,
                });
                console.log("📬 Contact notification sent to support@dreamplaypianos.com");
            } catch (emailError) {
                console.error("Failed to send contact notification email:", emailError);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Contact form error:", error);
        return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
    }
}
