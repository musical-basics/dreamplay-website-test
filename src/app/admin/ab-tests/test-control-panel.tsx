"use client";

import { useTransition } from "react";
import { setWinner, toggleTestStatus } from "@/actions/ab-actions";

interface Variant {
    id: string;
    name: string;
    traffic_percent: number;
}

interface Test {
    id: string;
    name: string;
    status: string;
    winning_variant_id: string | null;
    ab_variants: Variant[];
}

export function TestControlPanel({ test }: { test: Test }) {
    const [isPending, startTransition] = useTransition();

    const handleWinnerChange = (variantId: string | "none") => {
        startTransition(async () => {
            await setWinner(test.id, variantId === "none" ? null : variantId);
        });
    };

    const handleStatusChange = (status: string) => {
        startTransition(async () => {
            // New action is a toggle, so we just call it. 
            // The UI dropdown implies setting specific status.
            // But the user provided `toggleTestStatus` which flips active/paused.
            // If the UI allows "completed", we might need a `updateTestStatus` action.
            // I will create a new `updateTestStatus` in ab-actions.ts to support the dropdown fully.
            await toggleTestStatus(test.id, status);
        });
    };

    return (
        <div className="mt-4 flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status:</span>
                    <select
                        value={test.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        disabled={isPending}
                        className="text-sm border rounded px-2 py-1 bg-white dark:bg-gray-900"
                    >
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Winner:</span>
                    <select
                        value={test.winning_variant_id || "none"}
                        onChange={(e) => handleWinnerChange(e.target.value)}
                        disabled={isPending}
                        className="text-sm border rounded px-2 py-1 bg-white dark:bg-gray-900"
                    >
                        <option value="none">Running (No Winner)</option>
                        {(test.ab_variants || []).map(v => (
                            <option key={v.id} value={v.id}>Force {v.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            {isPending && <p className="text-xs text-blue-500">Updating...</p>}
        </div>
    );
}
