"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    Clock,
    BarChart,
    Award,
    CheckCircle,
    ChevronDown,
    Play,
    FileText,
    ArrowRight,
    Star,
    Globe,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/primitives";
import Link from "next/link";

const curriculum = [
    {
        title: "Módulo 1: ¿Qué es la IA? (Para todos)",
        lessons: [
            { title: "La IA explicada sin tecnicismos: ¿cómo piensa una máquina?", duration: "15 min", type: "video" },
            { title: "IA en tu teléfono: asistentes, recomendaciones y filtros", duration: "20 min", type: "video" },
            { title: "Historia de la IA contada de forma simple", duration: "10 min", type: "reading" },
            { title: "Actividad: Identifica la IA en tu día a día", duration: "10 min", type: "reading" },
        ]
    },
    {
        title: "Módulo 2: IA en Casa y en el Trabajo",
        lessons: [
            { title: "Asistentes de voz: Alexa, Siri y Google — cómo sacarles partido", duration: "20 min", type: "video" },
            { title: "Cómo usar ChatGPT para tareas del hogar y el trabajo", duration: "25 min", type: "video" },
            { title: "IA para adultos mayores: herramientas de salud y compañía", duration: "20 min", type: "video" },
            { title: "IA para niños: aprendizaje, juego y creatividad", duration: "15 min", type: "reading" },
        ]
    },
    {
        title: "Módulo 3: Crear con IA — Sin Saber Programar",
        lessons: [
            { title: "Genera imágenes con IA: arte sin ser artista", duration: "25 min", type: "video" },
            { title: "Escribe textos, cartas y correos con ayuda de la IA", duration: "20 min", type: "video" },
            { title: "Traduce, resume y aprende idiomas con IA", duration: "15 min", type: "video" },
            { title: "Actividad práctica: crea tu primer proyecto con IA", duration: "20 min", type: "reading" },
        ]
    },
    {
        title: "Módulo 4: IA Responsable y Segura",
        lessons: [
            { title: "¿Cómo proteger tu información personal?", duration: "15 min", type: "video" },
            { title: "Fake news e imágenes falsas: cómo detectarlas", duration: "20 min", type: "video" },
            { title: "El futuro de la IA: oportunidades y cómo prepararte", duration: "15 min", type: "video" },
            { title: "Cierre: tu próximo paso en el mundo de la IA", duration: "10 min", type: "reading" },
        ]
    }
];

export default function CourseDetail() {
    const [openModule, setOpenModule] = useState<number | null>(0);

    return (
        <main className="min-h-screen pt-20" style={{ background: "#0B0F19" }}>
            {/* 1. SECTION HERO */}
            <section className="relative py-20 border-b border-white/5 overflow-hidden">
                {/* Background Texture & Glow */}
                <div className="absolute inset-0 z-0 opactiy-20 pointer-events-none"
                    style={{
                        background: "radial-gradient(circle at 50% -20%, rgba(37, 99, 235, 0.15) 0%, transparent 70%)",
                    }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <nav className="flex items-center gap-2 text-sm text-bitte-steel mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/academy" className="hover:text-white transition-colors">Academy</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white font-medium">IA en tu Vida Diaria</span>
                    </nav>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bitte-blue/10 border border-bitte-blue/20 text-bitte-blue text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bitte-blue opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-bitte-blue"></span>
                            </span>
                            Curso Online
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            IA en tu Vida Diaria
                        </h1>

                        <p className="text-xl text-bitte-steel mb-8 max-w-2xl leading-relaxed">
                            Descubre el mundo de la Inteligencia Artificial sin necesidad de experiencia previa. Un curso pensado para todos: niños, adultos mayores y cualquier persona curiosa que quiera entender y usar la IA en su día a día.
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2 text-white">
                                <Clock className="w-5 h-5 text-bitte-blue" />
                                <span>Duración: 4 Semanas</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <BarChart className="w-5 h-5 text-bitte-blue" />
                                <span>Nivel: Sin experiencia requerida</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <Award className="w-5 h-5 text-bitte-blue" />
                                <span>Certificado Incluido</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. MAIN LAYOUT GRID */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* LEFT COLUMN (8/12) */}
                        <div className="lg:col-span-8 space-y-16">

                            {/* ¿Qué aprenderás? */}
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-bitte-blue pl-4">¿Qué aprenderás?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        "Entender qué es la IA y cómo funciona en tu vida cotidiana.",
                                        "Usar asistentes de voz, ChatGPT y herramientas de IA sin complicaciones.",
                                        "Crear imágenes, textos y traducciones con IA desde cero.",
                                        "Protegerte de riesgos digitales y usar la IA de forma segura."
                                    ].map((item, i) => (
                                        <div key={i} className="p-6 rounded-xl bg-[#161B22] border border-white/5 flex gap-4 transition-all hover:bg-white/5 active:scale-[0.98]">
                                            <div className="flex-shrink-0">
                                                <div className="w-6 h-6 rounded-full bg-bitte-blue/20 flex items-center justify-center border border-bitte-blue/30 shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                                                    <CheckCircle className="w-4 h-4 text-bitte-blue" />
                                                </div>
                                            </div>
                                            <p className="text-bitte-steel text-sm leading-relaxed">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Temario (Curriculum) */}
                            <div id="syllabus">
                                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-bitte-blue pl-4">Temario del Curso</h2>
                                <div className="space-y-4">
                                    {curriculum.map((module, mIndex) => (
                                        <div key={mIndex} className="rounded-xl border border-white/5 bg-[#161B22] overflow-hidden transition-all duration-300">
                                            <button
                                                onClick={() => setOpenModule(openModule === mIndex ? null : mIndex)}
                                                className="w-full h-16 px-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                            >
                                                <span className="text-lg font-bold text-white pr-4">{module.title}</span>
                                                <ChevronDown className={`w-5 h-5 text-bitte-blue transition-transform duration-300 ${openModule === mIndex ? 'rotate-180' : ''}`} />
                                            </button>

                                            <AnimatePresence>
                                                {openModule === mIndex && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="p-6 pt-0 space-y-2">
                                                            {module.lessons.map((lesson, lIndex) => (
                                                                <div key={lIndex} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                                                                    <div className="flex items-center gap-3">
                                                                        {lesson.type === 'video' ? (
                                                                            <Play className="w-4 h-4 text-bitte-blue group-hover:scale-110 transition-transform" />
                                                                        ) : (
                                                                            <FileText className="w-4 h-4 text-bitte-steel group-hover:text-bitte-blue transition-colors" />
                                                                        )}
                                                                        <span className="text-sm text-bitte-steel group-hover:text-white transition-colors">{lesson.title}</span>
                                                                    </div>
                                                                    <span className="text-xs text-bitte-steel font-mono">{lesson.duration}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Requisitos */}
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-bitte-blue pl-4">Requisitos</h2>
                                <ul className="space-y-4">
                                    {[
                                        "Cero experiencia requerida — apto para cualquier edad.",
                                        "Solo necesitas un teléfono, tablet o computadora con internet.",
                                        "Ganas de aprender y curiosidad por el mundo digital.",
                                        "Ideal para niños desde 10 años y adultos mayores sin límite de edad."
                                    ].map((req, i) => (
                                        <li key={i} className="flex gap-4 items-center group">
                                            <div className="w-2 h-2 rounded-full bg-bitte-blue group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                                            <span className="text-bitte-steel">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT COLUMN (4/12) - STICKY SIDEBAR */}
                        <div className="lg:col-span-4 lg:relative">
                            <div className="lg:sticky lg:top-28 space-y-6">
                                <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all hover:border-bitte-blue/30 group/card"
                                    style={{
                                        background: "rgba(22, 27, 34, 0.6)",
                                        backdropFilter: "blur(12px)",
                                        WebkitBackdropFilter: "blur(12px)",
                                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
                                    }}>

                                    {/* Content Border Glow Accent */}
                                    <div className="h-1 bg-bitte-blue w-full opacity-50 group-hover:opacity-100 transition-opacity" />

                                    <div className="p-1">
                                        <img
                                            src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&fit=crop"
                                            alt="IA para Ejecutivos"
                                            className="w-full aspect-video object-cover rounded-xl"
                                        />
                                    </div>

                                    <div className="p-8">
                                        <div className="space-y-2 mb-8">
                                            <h4 className="text-white text-xl font-bold">Consultar Disponibilidad</h4>
                                            <p className="text-bitte-steel text-sm leading-relaxed">
                                                Este curso cuenta con cupos limitados por semestre para asegurar la mejor experiencia de aprendizaje.
                                            </p>
                                        </div>

                                        <Link href="https://wa.me/573000000000?text=Hola,%20quisiera%20más%20información%20sobre%20el%20curso%20IA%20para%20Ejecutivos" target="_blank" className="block w-full mb-6">
                                            <button className="w-full py-4 rounded-xl font-bold text-white relative flex items-center justify-center gap-2 overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] group/btn">
                                                {/* Button Gradient & Glow */}
                                                <div
                                                    className="absolute inset-0 bg-gradient-to-r from-bitte-blue to-blue-700 z-0 transition-opacity"
                                                    style={{
                                                        boxShadow: "0 4px 20px rgba(37, 99, 235, 0.4)"
                                                    }}
                                                />
                                                <span className="relative z-10 font-bold uppercase tracking-wider text-sm">Contactar Asesor</span>
                                                <ArrowRight className="relative z-10 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </Link>

                                        <div className="space-y-4 pt-4 border-t border-white/5">
                                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Este curso incluye:</h4>
                                            <div className="flex items-center gap-3 text-sm text-bitte-steel">
                                                <Zap className="w-4 h-4 text-bitte-blue" />
                                                <span>Acceso de por vida para toda la familia</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-bitte-steel">
                                                <Globe className="w-4 h-4 text-bitte-blue" />
                                                <span>Guias visuales y material descargable</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-bitte-steel">
                                                <Star className="w-4 h-4 text-bitte-blue" />
                                                <span>Sesiones de Q&A en vivo</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-bitte-steel">
                                                <Award className="w-4 h-4 text-bitte-blue" />
                                                <span>Certificación Profesional</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 rounded-xl border border-white/5 bg-white/5">
                                    <h4 className="text-white font-bold mb-2">¿Tienes dudas?</h4>
                                    <p className="text-sm text-bitte-steel mb-4">Contáctanos y te ayudamos a elegir el plan ideal para ti o para tu familia.</p>
                                    <Button variant="ghost" className="w-full border border-white/10 hover:border-bitte-blue/50 text-bitte-steel hover:text-white">
                                        Hablar con un asesor
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
