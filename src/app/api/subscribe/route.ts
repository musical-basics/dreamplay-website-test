import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.error('Missing Supabase environment variables');
            return NextResponse.json({ error: 'Server configuration error: Missing Supabase secrets' }, { status: 500 });
        }

        // Initialize Supabase Admin Client
        // We use the SERVICE_ROLE_KEY to bypass Row Level Security (RLS) so we can insert anyone
        // Initialized inside handler to avoid build-time errors
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        // DEBUG: Verify authentication role
        try {
            if (supabaseKey) {
                const payload = JSON.parse(Buffer.from(supabaseKey.split('.')[1], 'base64').toString());
                console.log('🔑 Supabase Key Role:', payload.role); // Should be 'service_role'
                if (payload.role !== 'service_role') {
                    console.warn('⚠️ WARNING: You are not using the service_role key. RLS may block this request.');
                }
            }
        } catch (e) {
            console.error('Error checking key role:', e);
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            supabaseKey
        );

        // 1. Check if customer already exists to avoid overwriting their ID
        const { data: existingUser } = await supabase
            .from('Customer')
            .select('id, tags')
            .eq('email', email)
            .single();

        let error;

        if (existingUser) {
            // 2a. Update existing user: Append the tag if it's not already there
            const currentTags = existingUser.tags || [];
            if (!currentTags.includes('newsletter-10-off')) {
                const { error: updateError } = await supabase
                    .from('Customer')
                    .update({
                        tags: [...currentTags, 'newsletter-10-off']
                    })
                    .eq('id', existingUser.id);
                error = updateError;
            }
        } else {
            // 2b. Create new user
            const { error: insertError } = await supabase
                .from('Customer')
                .insert({
                    id: uuidv4(), // Generating ID manually as per your schema requirements
                    email: email,
                    name: '', // Optional based on your schema
                    tags: ['newsletter-10-off'],
                    createdAt: new Date().toISOString(),
                });
            error = insertError;
        }

        if (error) {
            console.error('Supabase error:', error);
            // Determine if we are using the correct key
            const isServiceRole = supabaseKey?.includes(process.env.SUPABASE_SERVICE_ROLE_KEY || 'MISSING'); // Checking if var matches

            let debugMessage = '';
            try {
                if (supabaseKey) {
                    const payload = JSON.parse(Buffer.from(supabaseKey.split('.')[1], 'base64').toString());
                    debugMessage = ` (Key Role: ${payload.role})`;
                }
            } catch (e) { }

            return NextResponse.json({
                error: error.message + debugMessage,
                details: error
            }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (err: any) {
        console.error('API Error:', err);
        return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
    }
}
