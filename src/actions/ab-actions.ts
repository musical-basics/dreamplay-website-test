"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Use Supabase Service Role for Admin Actions
// Note: createClient from lib/server automatically uses cookies. 
// For admin actions that need service role, we might need a separate helper or 
// just use the generic one if RLS allows. 
// However, the original code used process.env.SUPABASE_SERVICE_ROLE_KEY! explicitly.
// The new helper uses ANON key by default.
// If we need admin privileges (e.g. to write to ab_tests if not public), we might need to adjust.
// Assuming RLS allows authenticated users or public (as per migration "Allow public ..."), anon key is fine.
// IF we need service role, we should instantiate directly here, but using the SSR helper is what was requested.
// Let's stick to the requested fix: "Update the import... to: import { createClient } from "@/lib/supabase/server";"
// And remove the manual instantiation.


export async function createABTest(formData: FormData) {
    const supabase = await createClient(); // Await the async client creation
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const targetPath = formData.get("target_path") as string;
    const variantName = formData.get("variant_name") as string; // e.g. "Variant B"
    const variantPath = formData.get("variant_path") as string; // e.g. "/how-it-works-b"

    // 1. Create the Test Container
    const { data: testData, error: testError } = await supabase
        .from("ab_tests")
        .insert({ name, slug, target_path: targetPath, status: 'active' })
        .select()
        .single();

    if (testError) throw new Error(testError.message);

    // 2. Create "Control" Variant (Default)
    const { error: controlError } = await supabase.from("ab_variants").insert({
        test_id: testData.id,
        name: "Control",
        path_rewrite: targetPath, // Control just rewrites to itself
        traffic_percent: 50,
    });

    if (controlError) throw new Error(controlError.message);

    // 3. Create "Variant B"
    const { error: variantError } = await supabase.from("ab_variants").insert({
        test_id: testData.id,
        name: variantName,
        path_rewrite: variantPath,
        traffic_percent: 50,
    });

    if (variantError) throw new Error(variantError.message);

    revalidatePath("/admin/ab-tests");
    redirect("/admin/ab-tests");
}

export async function toggleTestStatus(testId: string, currentStatus: string) {
    const supabase = await createClient();
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';

    await supabase
        .from("ab_tests")
        .update({ status: newStatus })
        .eq("id", testId);

    revalidatePath("/admin/ab-tests");
}

export async function setWinner(testId: string, variantId: string | null) {
    const supabase = await createClient();
    await supabase
        .from("ab_tests")
        .update({ winning_variant_id: variantId, status: 'completed' })
        .eq("id", testId);

    revalidatePath("/admin/ab-tests");
}
