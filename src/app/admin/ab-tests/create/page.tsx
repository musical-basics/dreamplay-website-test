import { createABTest } from "@/actions/ab-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateTestPage() {
    return (
        <div className="p-10 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Launch New Experiment</h1>

            <form action={createABTest} className="space-y-8 bg-white dark:bg-gray-900 p-8 border rounded-xl shadow-sm">

                {/* Test Basics */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">1. Configuration</h3>

                    <div className="grid gap-2">
                        <Label>Test Name (Internal)</Label>
                        <Input name="name" placeholder="e.g. Customize Page - New Hero" required />
                    </div>

                    <div className="grid gap-2">
                        <Label>Unique Slug (Used for Cookies)</Label>
                        <Input name="slug" placeholder="e.g. customize-hero-v1" required />
                        <p className="text-xs text-gray-500">This will be the cookie name: <code>ab_customize-hero-v1</code></p>
                    </div>

                    <div className="grid gap-2">
                        <Label>Target URL Path</Label>
                        <Input name="target_path" placeholder="/customize" required />
                        <p className="text-xs text-gray-500">The page where the test will run.</p>
                    </div>
                </div>

                {/* Variant B Config */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">2. Variant B Details</h3>

                    <div className="grid gap-2">
                        <Label>Variant Name</Label>
                        <Input name="variant_name" defaultValue="Variant B" required />
                    </div>

                    <div className="grid gap-2">
                        <Label>Variant File Path</Label>
                        <Input name="variant_path" placeholder="/checkout-pages/customize-b" required />
                        <p className="text-xs text-gray-500">The internal path to the new version of the page.</p>
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-4">
                    <Button type="button" variant="ghost">Cancel</Button>
                    <Button type="submit">Launch Test</Button>
                </div>
            </form>
        </div>
    );
}
