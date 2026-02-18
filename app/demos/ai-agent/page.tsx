"use client";

import AIPlayground from "@/components/sections/AIPlayground";
import { Button } from "@/components/ui/primitives";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AIPlaygroundPage() {
    return (
        <div className="pt-24 min-h-screen bg-bitte-base">
            <div className="container mx-auto px-6 mb-8">
                <Link href="/">
                    <Button variant="ghost" className="pl-0 gap-2">
                        <ArrowLeft className="w-4 h-4" /> Volver al Inicio
                    </Button>
                </Link>
            </div>
            <AIPlayground />
        </div>
    );
}
