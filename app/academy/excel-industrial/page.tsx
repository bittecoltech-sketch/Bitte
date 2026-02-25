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
    Zap,
    Table,
    Cpu,
    Database
} from "lucide-react";
import Link from "next/link";

const curriculum = [
    {
        title: "Módulo 1: Gestión de Datos a Gran Escala",
        lessons: [
            { title: "Estructuras de datos para entornos industriales", duration: "20 min", type: "video" },
            { title: "Limpieza de datos con Power Query", duration: "35 min", type: "video" },
            { title: "Optimización de modelos de datos", duration: "15 min", type: "reading" },
        ]
    },
    {
        title: "Módulo 2: Automatización con Power Pivot y DAX",
        lessons: [
            { title: "Introducción al modelado dimensional", duration: "25 min", type: "video" },
            { title: "Creación de medidas DAX avanzadas", duration: "40 min", type: "video" },
            { title: "KPIs de rendimiento industrial", duration: "20 min", type: "reading" },
        ]
    },
    {
        title: "Módulo 3: Visualización y Dashboards de Control",
        lessons: [
            { title: "Principios de diseño de dashboards industriales", duration: "30 min", type: "video" },
            { title: "Gráficos dinámicos y segmentadores", duration: "25 min", type: "video" },
            { title: "Reportes automatizados por turno", duration: "20 min", type: "video" },
        ]
    },
    {
        title: "Módulo 4: Integración y Macros (VBA)",
        lessons: [
            { title: "Introducción a la programación en Excel", duration: "20 min", type: "video" },
            { title: "Automatización de tareas repetitivas", duration: "30 min", type: "video" },
            { title: "Seguridad y mantenimiento de macros", duration: "15 min", type: "reading" },
        ]
    }
];

const ACCENT_COLOR = "#059669"; // Emerald Green
const ACCENT_BG = "rgba(5, 150, 105, 0.1)";
const ACCENT_GLOW = "rgba(5, 150, 105, 0.4)";

export default function ExcelIndustrialDetail() {
    const [openModule, setOpenModule] = useState<number | null>(0);

    return (
        <main className="min-h-screen pt-20" style={{ background: "#0B0F19" }}>
            {/* 1. SECTION HERO */}
            <section className="relative py-20 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at 50% -20%, ${ACCENT_COLOR}26 0%, transparent 70%)`,
                    }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <nav className="flex items-center gap-2 text-sm text-bitte-steel mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/academy" className="hover:text-white transition-colors">Academy</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white font-medium">Excel Industrial</span>
                    </nav>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(5,150,105,0.1)] border"
                            style={{ background: ACCENT_BG, borderColor: `${ACCENT_COLOR}33`, color: ACCENT_COLOR }}>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: ACCENT_COLOR }}></span>
                                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: ACCENT_COLOR }}></span>
                            </span>
                            Curso Online
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            Excel Industrial
                        </h1>

                        <p className="text-xl text-bitte-steel mb-8 max-w-2xl leading-relaxed">
                            Domina el análisis de datos masivos y la automatización de reportes para entornos de manufactura y operaciones de alta demanda.
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2 text-white">
                                <Clock className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
                                <span>Duración: 6 Semanas</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <BarChart className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
                                <span>Nivel: Intermedio - Avanzado</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <Award className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
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

                        <div className="lg:col-span-8 space-y-16">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 pl-4" style={{ borderColor: ACCENT_COLOR }}>¿Qué aprenderás?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        "Automatización de limpieza de datos con Power Query.",
                                        "Modelado complejo para reportes de planta y logística.",
                                        "Desarrollo de cuadros de mando (Dashboards) dinámicos.",
                                        "Optimización de procesos mediante macros y VBA."
                                    ].map((item, i) => (
                                        <div key={i} className="p-6 rounded-xl bg-[#161B22] border border-white/5 flex gap-4 transition-all hover:bg-white/5 active:scale-[0.98]">
                                            <div className="flex-shrink-0">
                                                <div className="w-6 h-6 rounded-full flex items-center justify-center border"
                                                    style={{ background: `${ACCENT_COLOR}33`, borderColor: `${ACCENT_COLOR}4D`, boxShadow: `0 0 10px ${ACCENT_COLOR}33` }}>
                                                    <CheckCircle className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                                                </div>
                                            </div>
                                            <p className="text-bitte-steel text-sm leading-relaxed">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div id="syllabus">
                                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 pl-4" style={{ borderColor: ACCENT_COLOR }}>Temario del Curso</h2>
                                <div className="space-y-4">
                                    {curriculum.map((module, mIndex) => (
                                        <div key={mIndex} className="rounded-xl border border-white/5 bg-[#161B22] overflow-hidden transition-all duration-300">
                                            <button
                                                onClick={() => setOpenModule(openModule === mIndex ? null : mIndex)}
                                                className="w-full h-16 px-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                            >
                                                <span className="text-lg font-bold text-white pr-4">{module.title}</span>
                                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openModule === mIndex ? 'rotate-180' : ''}`} style={{ color: ACCENT_COLOR }} />
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
                                                                            <Play className="w-4 h-4 transition-transform group-hover:scale-110" style={{ color: ACCENT_COLOR }} />
                                                                        ) : (
                                                                            <FileText className="w-4 h-4 text-bitte-steel group-hover:text-white transition-colors" />
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

                            <div>
                                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 pl-4" style={{ borderColor: ACCENT_COLOR }}>Requisitos</h2>
                                <ul className="space-y-4">
                                    {[
                                        "Uso básico de Microsoft Excel (Fórmulas básicas).",
                                        "Orientación a la gestión por indicadores.",
                                        "Acceso a una PC con Excel 2019 o superior (o Office 365).",
                                        "Interés en optimización de procesos operativos."
                                    ].map((req, i) => (
                                        <li key={i} className="flex gap-4 items-center group">
                                            <div className="w-2 h-2 rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(5,150,105,0.8)]" style={{ background: ACCENT_COLOR }} />
                                            <span className="text-bitte-steel">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="lg:col-span-4 lg:relative">
                            <div className="lg:sticky lg:top-28 space-y-6">
                                <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all hover:border-white/20 group/card"
                                    style={{
                                        background: "rgba(22, 27, 34, 0.6)",
                                        backdropFilter: "blur(12px)",
                                        WebkitBackdropFilter: "blur(12px)",
                                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
                                    }}>

                                    <div className="h-1 w-full opacity-50 group-hover:opacity-100 transition-opacity" style={{ background: ACCENT_COLOR }} />

                                    <div className="p-1">
                                        <img
                                            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&fit=crop"
                                            alt="Excel Industrial"
                                            className="w-full aspect-video object-cover rounded-xl"
                                        />
                                    </div>

                                    <div className="p-8">
                                        <div className="space-y-2 mb-8">
                                            <h4 className="text-white text-xl font-bold">Consultar Disponibilidad</h4>
                                            <p className="text-bitte-steel text-sm leading-relaxed">
                                                Optimiza los procesos de tu empresa hoy mismo con formación personalizada.
                                            </p>
                                        </div>

                                        <Link href="https://wa.me/573000000000?text=Hola,%20quisiera%20más%20información%20sobre%20el%20curso%20Excel%20Industrial" target="_blank" className="block w-full mb-6">
                                            <button className="w-full py-4 rounded-xl font-bold text-white relative flex items-center justify-center gap-2 overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] group/btn">
                                                <div className="absolute inset-0 z-0 transition-all group-hover:opacity-90" style={{ background: `linear-gradient(to right, ${ACCENT_COLOR}, #065F46)`, boxShadow: `0 4px 20px ${ACCENT_COLOR}40` }} />
                                                <span className="relative z-10 font-bold uppercase tracking-wider text-sm">Contactar Asesor</span>
                                                <ArrowRight className="relative z-10 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </Link>

                                        <div className="space-y-4 pt-4 border-t border-white/5">
                                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Este curso incluye:</h4>
                                            <div className="flex items-center gap-3 text-sm text-bitte-steel">
                                                <Table className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                                                <span>Plantillas industriales premium</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-bitte-steel">
                                                <Database className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                                                <span>Acceso a datasets reales</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-bitte-steel">
                                                <Cpu className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                                                <span>Ejercicios de automatización</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-bitte-steel">
                                                <Award className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                                                <span>Certificación Profesional</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
