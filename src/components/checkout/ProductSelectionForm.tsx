"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { subscribeToNewsletter } from "@/actions/email-actions";

interface ProductSelectionFormProps {
    className?: string;
}

export default function ProductSelectionForm({ className }: ProductSelectionFormProps) {
    return (
        <div className={`w-full max-w-4xl mx-auto flex justify-center ${className}`}>
            <a
                href="https://crowdfund.dreamplaypianos.com"
                className="bg-black text-white px-12 py-4 rounded-full text-base font-semibold hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl w-full max-w-sm text-center"
            >
                Pre-Order Now
            </a>
        </div>
    );
}
