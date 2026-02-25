"use client";

import { Button } from "@/components/ui/primitives";
import { Users, BookOpen } from "lucide-react";
import Link from "next/link";

export function CRMPortal() {
    return (
        <section className="py-20 bg-bitte-void/50">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto p-1 rounded-2xl bg-gradient-to-r from-bitte-steel/20 to-bitte-steel/5">
                    <div className="bg-bitte-base rounded-xl p-12 border border-white/5 relative overflow-hidden">
                        <Users className="w-16 h-16 text-bitte-coral mx-auto mb-6 opacity-80" />
                        <h2 className="text-3xl font-bold mb-4">CRM Corporativo</h2>
                        <p className="text-bitte-steel mb-8">
                            Gestión integral de clientes potenciada por IA que predice el comportamiento de compra
                            y automatiza el seguimiento.
                        </p>
                        <Button variant="outline">Acceder al Portal Demo</Button>

                        {/* Decorative background blur */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-bitte-coral/10 rounded-full blur-3xl pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}

const courses = [
    {
        name: "Excel Industrial",
        // Spreadsheet / data analytics visual
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&fit=crop",
        accentColor: "#059669",
        href: "/academy/excel-industrial",
    },
    {
        name: "IA para Ejecutivos",
        // Neural network / AI concept visual
        image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&fit=crop",
        accentColor: "#2563EB",
        href: "/academy/ia-para-ejecutivos",
    },
    {
        name: "Data Science",
        // Data visualization / analytics visual
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&fit=crop",
        accentColor: "#7C3AED",
        href: "/academy/data-science",
    },
    {
        name: "IoT Basics",
        // Circuit board / electronic components visual
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&fit=crop",
        accentColor: "#F59E0B",
        href: "/academy/iot-basics",
    },
];

export function BitteTech() {
    return (
        <section id="education" className="py-24">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">Bitte Tech <span className="text-bitte-blue text-lg align-top">Academy</span></h2>
                        <p className="text-bitte-steel">Formación técnica de alto nivel.</p>
                    </div>
                    <Button variant="ghost">Ver todos los cursos</Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {courses.map((course, i) => (
                        <Link key={i} href={course.href}>
                            <div
                                className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/5 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                                style={{
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.borderColor = `${course.accentColor}80`;
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px ${course.accentColor}40`;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.05)";
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.5)";
                                }}
                            >
                                {/* Course cover image */}
                                <img
                                    src={course.image}
                                    alt={course.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Dark gradient overlay — stronger at bottom for legibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 z-10" />

                                {/* Accent color tint on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"
                                    style={{ background: course.accentColor }}
                                />

                                {/* Text content */}
                                <div className="absolute bottom-0 left-0 p-6 z-20">
                                    <span
                                        className="text-xs font-bold mb-2 block tracking-widest uppercase"
                                        style={{ color: course.accentColor }}
                                    >
                                        Curso Online
                                    </span>
                                    <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                                        {course.name}
                                    </h3>
                                </div>

                                {/* Book icon */}
                                <BookOpen
                                    className="absolute top-5 right-5 w-5 h-5 text-white/30 group-hover:text-white/80 transition-colors z-20"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

