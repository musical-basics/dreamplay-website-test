import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Send to your email via a simple webhook or email service
        // For now, we'll log and return success — you can hook this up to
        // Resend, SendGrid, or any email provider later.
        console.log("📬 Contact form submission:", { name, email, subject, message, timestamp: new Date().toISOString() });

        // Optional: Forward to an email address via fetch to an email API
        // Example with Resend (if you have it set up):
        // await fetch("https://api.resend.com/emails", { ... })

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Contact form error:", error);
        return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
    }
}
